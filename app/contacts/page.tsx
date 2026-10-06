import Link from "next/link";
import { db } from "@/lib/db";
import ContactsDirectory from "@/components/ContactsDirectory/ContactsDirectory";

export const dynamic = "force-dynamic";

type ContactRow = {
  id: string;
  name: string;
  occupation: string | null;
  email: string | null;
  phone_number: string | null;
  linkedin_url: string | null;
  networked_by: string | null;
  networking_context: string | null;
  notes: string | null;
  photo_url: string | null;
  created_at: Date | string;
  organization: string | null;
  industry: string | null;
  website: string | null;
};

export default async function ContactsPage() {
  const result = await db.query<ContactRow>(`
    SELECT
      c.id,
      c.name,
      c.occupation,
      c.email,
      c.phone_number,
      c.linkedin_url,
      c.networked_by,
      c.networking_context,
      c.notes,
      c.photo_url,
      c.created_at,
      o.name AS organization,
      o.industry,
      o.website
    FROM contacts c
    LEFT JOIN organizations o
      ON c.organization_id = o.id
    ORDER BY c.created_at DESC
  `);

  const contacts = result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    occupation: row.occupation,
    organization: row.organization,
    industry: row.industry,
    email: row.email,
    phoneNumber: row.phone_number,
    linkedinUrl: row.linkedin_url,
    website: row.website,
    networkedBy: row.networked_by,
    networkingContext: row.networking_context,
    notes: row.notes,
    photoUrl: row.photo_url,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : row.created_at,
  }));

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F1E8]">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" className="group">
            <p className="font-bold tracking-wide text-[#D4AF37]">
              SIM YEN
            </p>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
              Internal Tools
            </p>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500 transition hover:text-[#D4AF37]"
          >
            ← Menu
          </Link>
        </div>
      </header>

      {/* PAGE HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#D4AF37]">
                  01
                </span>

                <div className="h-px w-8 bg-[#D4AF37]/50" />

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Outreach
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                Network Directory
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500">
                People and organizations connected to the SIM Young
                Entrepreneur Network.
              </p>
            </div>

            <Link
              href="/contacts/new"
              className="inline-flex w-full items-center justify-center bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#080808] transition hover:bg-[#E5C14B] sm:w-auto"
            >
              + Add Contact
            </Link>
          </div>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <ContactsDirectory contacts={contacts} />

        <footer className="mt-20 flex flex-col gap-2 border-t border-white/10 py-8 text-xs text-neutral-700 sm:flex-row sm:items-center sm:justify-between">
          <p>SIM Young Entrepreneur Network</p>
          <p>Outreach Directory</p>
        </footer>
      </section>
    </main>
  );
}