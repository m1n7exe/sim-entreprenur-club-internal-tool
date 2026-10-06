"use client";

export type ContactDetails = {
  id: string;
  name: string;
  occupation: string | null;
  organization: string | null;
  industry: string | null;
  email: string | null;

  // Phone number
  phoneNumber: string | null;

  linkedinUrl: string | null;
  website: string | null;
  networkedBy: string | null;
  networkingContext: string | null;
  notes: string | null;
  photoUrl: string | null;
  createdAt: string;
};

type ContactDetailsModalProps = {
  contact: ContactDetails | null;
  onClose: () => void;
};

export default function ContactDetailsModal({
  contact,
  onClose,
}: ContactDetailsModalProps) {
  if (!contact) {
    return null;
  }

  const initials = contact.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = contact.createdAt
    ? new Date(contact.createdAt).toLocaleDateString(
        "en-SG",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) =>
          event.stopPropagation()
        }
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/10 bg-[#101010] shadow-2xl"
      >
        {/* TOP BAR */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#101010]/95 px-6 py-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#D4AF37]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Contact Profile
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact details"
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-xl text-neutral-500 transition hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
          >
            ×
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* PROFILE */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* PROFILE PHOTO */}
            <div className="h-24 w-24 shrink-0 overflow-hidden border border-[#D4AF37]/30 bg-[#D4AF37]/5">
              {contact.photoUrl ? (
                <img
                  src={contact.photoUrl}
                  alt={`${contact.name} profile`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold tracking-wide text-[#D4AF37]">
                  {initials}
                </div>
              )}
            </div>

            {/* PROFILE INFORMATION */}
            <div className="min-w-0">
              {contact.industry && (
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {contact.industry}
                </p>
              )}

              <h2
                id="contact-modal-title"
                className="break-words text-3xl font-bold tracking-tight text-[#F5F1E8]"
              >
                {contact.name}
              </h2>

              <p className="mt-2 text-sm text-neutral-300">
                {contact.occupation ||
                  "No occupation recorded"}
              </p>

              {contact.organization && (
                <p className="mt-1 text-sm text-neutral-500">
                  {contact.organization}
                </p>
              )}
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <section className="mt-8 border-t border-white/10 pt-7">
            <SectionTitle
              number="01"
              title="Contact"
            />

            <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {/* EMAIL */}
              <Detail
                label="Email"
                value={contact.email}
                href={
                  contact.email
                    ? `mailto:${contact.email}`
                    : null
                }
              />

              {/* PHONE */}
              <Detail
                label="Phone"
                value={contact.phoneNumber}
                href={
                  contact.phoneNumber
                    ? `tel:${contact.phoneNumber}`
                    : null
                }
              />

              {/* LINKEDIN */}
              <Detail
                label="LinkedIn"
                value={contact.linkedinUrl}
                href={contact.linkedinUrl}
              />

              {/* WEBSITE */}
              <Detail
                label="Website"
                value={contact.website}
                href={contact.website}
              />

              {/* INDUSTRY */}
              <Detail
                label="Industry"
                value={contact.industry}
              />
            </div>
          </section>

          {/* RELATIONSHIP */}
          <section className="mt-8 border-t border-white/10 pt-7">
            <SectionTitle
              number="02"
              title="Relationship"
            />

            <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <Detail
                label="Networked by"
                value={contact.networkedBy}
              />

              <Detail
                label="Added"
                value={formattedDate}
              />
            </div>

            <div className="mt-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                Networking Context
              </p>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-neutral-300">
                {contact.networkingContext ||
                  "No networking context recorded."}
              </p>
            </div>
          </section>

          {/* NOTES */}
          <section className="mt-8 border-t border-white/10 pt-7">
            <SectionTitle
              number="03"
              title="Notes"
            />

            <div className="mt-5 border-l-2 border-[#D4AF37]/40 pl-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-neutral-300">
                {contact.notes ||
                  "No notes recorded."}
              </p>
            </div>
          </section>

          {/* RECORD */}
          <section className="mt-8 border-t border-white/10 pt-5">
            <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-700">
              Record ID · {contact.id}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION TITLE                                                              */
/* -------------------------------------------------------------------------- */

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-[#D4AF37]">
        {number}
      </span>

      <div className="h-px w-5 bg-[#D4AF37]/40" />

      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1E8]">
        {title}
      </h3>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DETAIL                                                                     */
/* -------------------------------------------------------------------------- */

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null;
  href?: string | null;
}) {
  /*
   * Only normal web URLs should open
   * in a new browser tab.
   *
   * mailto: opens the email client.
   * tel: opens the phone/dialer.
   */
  const isExternalLink =
    href?.startsWith("http://") ||
    href?.startsWith("https://");

  return (
    <div className="min-w-0">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
        {label}
      </p>

      {href && value ? (
        <a
          href={href}
          target={
            isExternalLink
              ? "_blank"
              : undefined
          }
          rel={
            isExternalLink
              ? "noopener noreferrer"
              : undefined
          }
          className="mt-2 block break-words text-sm text-neutral-300 transition hover:text-[#D4AF37]"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {value}
        </a>
      ) : (
        <p className="mt-2 break-words text-sm text-neutral-300">
          {value || "—"}
        </p>
      )}
    </div>
  );
}