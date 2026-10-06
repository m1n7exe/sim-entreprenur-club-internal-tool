type ContactCardProps = {
  name: string;
  occupation: string;
  organization: string;
  industry: string;
  networkedBy: string;
  photoUrl?: string;
};

export default function ContactCard({
  name,
  occupation,
  organization,
  industry,
  networkedBy,
  photoUrl,
}: ContactCardProps) {
  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <article className="group cursor-pointer overflow-hidden border border-white/10 bg-[#101010] transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/60">
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0C0C0C]">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center">
            {/* Gold glow */}
            <div className="absolute h-32 w-32 rounded-full bg-[#D4AF37]/10 blur-3xl" />

            {/* Initials */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-2xl font-bold tracking-wide text-[#D4AF37]">
              {initials}
            </div>
          </div>
        )}

        {/* Industry overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="border border-[#D4AF37]/30 bg-[#080808]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D4AF37] backdrop-blur">
            {industry}
          </span>
        </div>
      </div>

      {/* Information */}
      <div className="p-5">
        {/* Name */}
        <h2 className="text-lg font-bold tracking-tight text-[#F5F1E8] transition group-hover:text-[#D4AF37]">
          {name}
        </h2>

        {/* Occupation */}
        <p className="mt-2 text-sm font-medium text-neutral-300">
          {occupation}
        </p>

        {/* Organization */}
        <p className="mt-1 text-sm text-neutral-600">
          {organization}
        </p>

        {/* Network provenance */}
        <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
              Networked by
            </p>

            <p className="mt-1.5 text-sm font-semibold text-neutral-400">
              {networkedBy}
            </p>
          </div>

          {/* Arrow */}
          <span className="text-lg text-[#D4AF37] opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
            →
          </span>
        </div>
      </div>
    </article>
  );
}