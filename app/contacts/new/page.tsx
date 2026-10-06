"use client";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function NewContactPage() {
  const router = useRouter();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [name, setName] = useState("");

  const [photo, setPhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState<string | null>(null);

  /* ---------------------------------------------------------------------- */
  /* PHOTO PREVIEW                                                          */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }

    const objectUrl =
      URL.createObjectURL(photo);

    setPhotoPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [photo]);

  /* ---------------------------------------------------------------------- */
  /* PHOTO HANDLING                                                         */
  /* ---------------------------------------------------------------------- */

  function handlePhotoChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !ALLOWED_PHOTO_TYPES.includes(
        file.type
      )
    ) {
      setError(
        "Please select a JPG, PNG, or WebP image."
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setError(
        "Profile photo must be smaller than 5 MB."
      );

      event.target.value = "";
      return;
    }

    setError("");
    setPhoto(file);
  }

  function removePhoto() {
    setPhoto(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* ---------------------------------------------------------------------- */
  /* SUBMIT                                                                 */
  /* ---------------------------------------------------------------------- */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    const form = new FormData(
      event.currentTarget
    );

    try {
      const response = await fetch(
        "/api/contacts",
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => null);

        setError(
          data?.error ||
            "Unable to add contact. Please try again."
        );

        setSubmitting(false);
        return;
      }

      router.push("/contacts");
      router.refresh();
    } catch (error) {
      console.error(
        "Failed to submit contact:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );

      setSubmitting(false);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* INITIALS                                                               */
  /* ---------------------------------------------------------------------- */

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* ---------------------------------------------------------------------- */
  /* PAGE                                                                   */
  /* ---------------------------------------------------------------------- */

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F1E8]">
      {/* HEADER */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Link
            href="/"
            className="group"
          >
            <p className="font-bold tracking-wide text-[#D4AF37]">
              SIM YEN
            </p>

            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-700">
              Internal Tools
            </p>
          </Link>

          <Link
            href="/contacts"
            className="text-xs font-semibold uppercase tracking-widest text-neutral-500 transition hover:text-[#D4AF37]"
          >
            ← Directory
          </Link>
        </div>
      </header>

      {/* PAGE HEADER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-12">
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
            Add Contact
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
            Add a person to the SIM Young
            Entrepreneur Network outreach
            directory.
          </p>
        </div>
      </section>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12 lg:py-12">
          {/* LEFT SIDEBAR */}
          <aside>
            <div className="lg:sticky lg:top-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                Profile
              </p>

              {/* PROFILE PHOTO */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="group relative flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden border border-white/10 bg-[#101010] transition hover:border-[#D4AF37]/60"
                >
                  {photoPreview ? (
                    <>
                      <img
                        src={photoPreview}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/60 group-hover:opacity-100">
                        <span className="text-xs font-bold uppercase tracking-widest text-white">
                          Change Photo
                        </span>
                      </div>
                    </>
                  ) : initials ? (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-[#D4AF37]">
                        {initials}
                      </span>

                      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/30 px-4 py-3">
                        <p className="text-center text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                          Select Photo
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="px-6 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#D4AF37]/30 text-2xl text-[#D4AF37]">
                        +
                      </div>

                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-neutral-400">
                        Add Photo
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-neutral-700">
                        JPG, PNG or WebP
                      </p>
                    </div>
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                {photo ? (
                  <div className="mt-3">
                    <p className="truncate text-xs text-neutral-500">
                      {photo.name}
                    </p>

                    <button
                      type="button"
                      onClick={removePhoto}
                      className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-400 transition hover:text-red-300"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 max-w-[220px] text-[11px] leading-5 text-neutral-700">
                    Optional. Select a profile
                    photo from your computer.
                  </p>
                )}
              </div>

              {/* FORM GUIDE */}
              <div className="mt-8 hidden border-t border-white/10 pt-6 lg:block">
                <div className="space-y-4">
                  <Step
                    number="01"
                    label="Personal details"
                  />

                  <Step
                    number="02"
                    label="Organization"
                  />

                  <Step
                    number="03"
                    label="Relationship"
                  />

                  <Step
                    number="04"
                    label="Notes"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <div className="space-y-12">
            {/* ------------------------------------------------------------ */}
            {/* 01 PERSONAL DETAILS                                          */}
            {/* ------------------------------------------------------------ */}

            <FormSection
              number="01"
              title="Personal Details"
              description="Basic information and contact details for this person."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* FULL NAME */}
                <Field
                  label="Full Name"
                  required
                >
                  <input
                    required
                    name="name"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    autoComplete="name"
                    placeholder="Full name"
                    className={inputStyle}
                  />
                </Field>

                {/* OCCUPATION */}
                <Field label="Occupation">
                  <input
                    name="occupation"
                    autoComplete="organization-title"
                    placeholder="Founder, Engineer, Investor..."
                    className={inputStyle}
                  />
                </Field>

                {/* EMAIL */}
                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    className={inputStyle}
                  />
                </Field>

                {/* PHONE NUMBER */}
                <Field label="Phone Number">
                  <input
                    type="tel"
                    name="phoneNumber"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+65 9123 4567"
                    className={inputStyle}
                  />
                </Field>

                {/* LINKEDIN */}
                <div className="sm:col-span-2">
                  <Field label="LinkedIn">
                    <input
                      type="url"
                      name="linkedinUrl"
                      placeholder="https://linkedin.com/in/..."
                      className={inputStyle}
                    />
                  </Field>
                </div>
              </div>
            </FormSection>

            {/* ------------------------------------------------------------ */}
            {/* 02 ORGANIZATION                                              */}
            {/* ------------------------------------------------------------ */}

            <FormSection
              number="02"
              title="Organization"
              description="Where this person works or the organization they represent."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Organization">
                  <input
                    name="organization"
                    autoComplete="organization"
                    placeholder="Company or organization"
                    className={inputStyle}
                  />
                </Field>

                <Field label="Industry">
                  <input
                    name="industry"
                    placeholder="Technology, Finance..."
                    className={inputStyle}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Organization Website">
                    <input
                      type="url"
                      name="website"
                      placeholder="https://company.com"
                      className={inputStyle}
                    />
                  </Field>
                </div>
              </div>
            </FormSection>

            {/* ------------------------------------------------------------ */}
            {/* 03 RELATIONSHIP                                              */}
            {/* ------------------------------------------------------------ */}

            <FormSection
              number="03"
              title="Relationship"
              description="Record who established the connection and how the relationship started."
            >
              <div className="space-y-5">
                <Field
                  label="Networked By"
                  required
                >
                  <input
                    required
                    name="networkedBy"
                    placeholder="Name of SIM YEN member"
                    className={inputStyle}
                  />
                </Field>

                <Field label="Networking Context">
                  <textarea
                    name="networkingContext"
                    rows={5}
                    placeholder="For example: Met at Singapore FinTech Festival. Discussed startup partnerships and potential collaboration..."
                    className={`${inputStyle} resize-y`}
                  />
                </Field>
              </div>
            </FormSection>

            {/* ------------------------------------------------------------ */}
            {/* 04 INTERNAL NOTES                                            */}
            {/* ------------------------------------------------------------ */}

            <FormSection
              number="04"
              title="Internal Notes"
              description="Additional information that may be useful to future SIM YEN committees."
            >
              <Field label="Notes">
                <textarea
                  name="notes"
                  rows={6}
                  placeholder="Follow-up opportunities, interests, previous conversations, introductions, or other useful information..."
                  className={`${inputStyle} resize-y`}
                />
              </Field>
            </FormSection>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="border border-red-500/30 bg-red-500/5 p-4"
              >
                <p className="text-sm font-medium text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-neutral-700">
                Fields marked with * are
                required.
              </p>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Link
                  href="/contacts"
                  className="flex h-12 items-center justify-center border border-white/10 px-6 text-sm font-semibold text-neutral-400 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </Link>

                <button
                  disabled={submitting}
                  type="submit"
                  className="h-12 min-w-[150px] bg-[#D4AF37] px-7 text-sm font-bold text-[#080808] transition hover:bg-[#E5C14B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Adding..."
                    : "Add Contact"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#D4AF37]">
            {number}
          </span>

          <div className="h-px w-5 bg-[#D4AF37]/40" />

          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1E8]">
            {title}
          </h2>
        </div>

        <p className="mt-2 text-xs leading-5 text-neutral-600">
          {description}
        </p>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
        {label}

        {required && (
          <span className="ml-1 text-[#D4AF37]">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function Step({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[9px] text-[#D4AF37]/60">
        {number}
      </span>

      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600">
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STYLES                                                                     */
/* -------------------------------------------------------------------------- */

const inputStyle =
  "mt-2 w-full border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#F5F1E8] outline-none transition placeholder:text-neutral-700 hover:border-white/20 focus:border-[#D4AF37] focus:bg-[#121212]";