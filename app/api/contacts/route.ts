import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_IMAGE_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

function getString(
  formData: FormData,
  key: string
): string | null {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed || null;
}

export async function POST(request: Request) {
  const client = await db.connect();

  try {
    /*
     * The frontend now sends multipart/form-data
     * because the form may contain an image.
     */
    const formData = await request.formData();

    const name = getString(formData, "name");
    const occupation = getString(formData, "occupation");
    const email = getString(formData, "email");
    const linkedinUrl = getString(formData, "linkedinUrl");

    const organization = getString(
      formData,
      "organization"
    );

    const industry = getString(formData, "industry");
    const website = getString(formData, "website");

    const networkedBy = getString(
      formData,
      "networkedBy"
    );

    const networkingContext = getString(
      formData,
      "networkingContext"
    );

    const notes = getString(formData, "notes");

    const photo = formData.get("photo");

    /* ---------------------------------------------------------------------- */
    /* VALIDATION                                                             */
    /* ---------------------------------------------------------------------- */

    if (!name) {
      return NextResponse.json(
        {
          error: "Name is required.",
        },
        {
          status: 400,
        }
      );
    }

    let photoUrl: string | null = null;

    /* ---------------------------------------------------------------------- */
    /* PHOTO                                                                  */
    /* ---------------------------------------------------------------------- */

    if (photo instanceof File && photo.size > 0) {
      const extension = ALLOWED_IMAGE_TYPES.get(
        photo.type
      );

      if (!extension) {
        return NextResponse.json(
          {
            error:
              "Profile photo must be a JPG, PNG, or WebP image.",
          },
          {
            status: 400,
          }
        );
      }

      if (photo.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error:
              "Profile photo must be smaller than 5 MB.",
          },
          {
            status: 400,
          }
        );
      }

      /*
       * Generate our own filename instead of trusting
       * the filename supplied by the browser.
       */
      const filename = `${crypto.randomUUID()}${extension}`;

      const uploadDirectory = path.join(
        process.cwd(),
        "public",
        "uploads",
        "contacts"
      );

      await mkdir(uploadDirectory, {
        recursive: true,
      });

      const filePath = path.join(
        uploadDirectory,
        filename
      );

      const bytes = await photo.arrayBuffer();

      await writeFile(
        filePath,
        Buffer.from(bytes)
      );

      /*
       * This is what gets stored in PostgreSQL.
       *
       * Example:
       *
       * /uploads/contacts/abc-123.jpg
       */
      photoUrl = `/uploads/contacts/${filename}`;
    }

    /* ---------------------------------------------------------------------- */
    /* DATABASE TRANSACTION                                                   */
    /* ---------------------------------------------------------------------- */

    await client.query("BEGIN");

    let organizationId: string | null = null;

    /* ---------------------------------------------------------------------- */
    /* ORGANIZATION                                                           */
    /* ---------------------------------------------------------------------- */

    if (organization) {
      const existingOrganization =
        await client.query(
          `
          SELECT id
          FROM organizations
          WHERE LOWER(name) = LOWER($1)
          LIMIT 1
          `,
          [organization]
        );

      if (existingOrganization.rows.length > 0) {
        organizationId =
          existingOrganization.rows[0].id;

        /*
         * Optional improvement:
         *
         * Fill missing organization information when
         * we encounter the organization again.
         */
        await client.query(
          `
          UPDATE organizations
          SET
            industry = COALESCE(industry, $2),
            website = COALESCE(website, $3)
          WHERE id = $1
          `,
          [
            organizationId,
            industry,
            website,
          ]
        );
      } else {
        const newOrganization =
          await client.query(
            `
            INSERT INTO organizations (
              name,
              industry,
              website
            )
            VALUES (
              $1,
              $2,
              $3
            )
            RETURNING id
            `,
            [
              organization,
              industry,
              website,
            ]
          );

        organizationId =
          newOrganization.rows[0].id;
      }
    }

    /* ---------------------------------------------------------------------- */
    /* CONTACT                                                                */
    /* ---------------------------------------------------------------------- */

    const result = await client.query(
      `
      INSERT INTO contacts (
        name,
        occupation,
        organization_id,
        email,
        linkedin_url,
        networked_by,
        networking_context,
        notes,
        photo_url
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9
      )
      RETURNING *
      `,
      [
        name,
        occupation,
        organizationId,
        email,
        linkedinUrl,
        networkedBy,
        networkingContext,
        notes,
        photoUrl,
      ]
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "Contact created successfully",
        contact: result.rows[0],
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    /*
     * ROLLBACK can itself fail if BEGIN was never
     * successfully executed, so don't let that hide
     * the original error.
     */
    try {
      await client.query("ROLLBACK");
    } catch {
      // Ignore rollback failure.
    }

    console.error(
      "Failed to create contact:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create contact",
      },
      {
        status: 500,
      }
    );
  } finally {
    client.release();
  }
}