
import Image from "next/image";
import Link from "next/link";

const leaders = [
  {
    id: 1,
    name: "Jeevika",
    role: "President",
    department: "Executive Committee",
    email: "jeevika@example.com",
    photo: "/images/leadership/jeevika.jpg",
  },
  {
    id: 2,
    name: "Disha",
    role: "Vice President",
    department: "Executive Committee",
    email: "disha@example.com",
    photo: "/images/leadership/disha.jpg",
  },
  {
    id: 3,
    name: "Winston",
    role: "Director of Operations",
    department: "Operations",
    email: "winston@example.com",
    photo: "/images/leadership/winston.jpg",
  },
  {
    id: 4,
    name: "Harini",
    role: "Director of Human Resources",
    department: "Human Resources",
    email: "harini@example.com",
    photo: "/images/leadership/harini.jpg",
  },
  {
    id: 5,
    name: "Celine",
    role: "Director of Marketing",
    department: "Marketing",
    email: "celine@example.com",
    photo: "/images/leadership/celine.jpg",
  },
  {
    id: 6,
    name: "Zayn",
    role: "Director of Ambassadors",
    department: "Human Resources",
    email: "mintharoffice@gmail.com",
    photo: "/images/leadership/zayn.jpg",
  },
];

export default function LeadershipPage() {
  const executives = leaders.filter(
    (leader) =>
      leader.role === "President" ||
      leader.role === "Vice President"
  );

  const directors = leaders.filter(
    (leader) =>
      leader.role !== "President" &&
      leader.role !== "Vice President"
  );

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F1E8]">
      {/* ================================================================ */}
      {/* NAVIGATION                                                       */}
      {/* ================================================================ */}

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
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

      {/* ================================================================ */}
      {/* PAGE HEADING                                                     */}
      {/* ================================================================ */}

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#D4AF37]">
              02
            </span>

            <div className="h-px w-8 bg-[#D4AF37]/50" />

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Leadership
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Current Leadership
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500">
            Current SIM YEN committee members and their respective
            leadership roles.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* LEADERSHIP CONTENT                                               */}
      {/* ================================================================ */}

      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* SUMMARY */}

        <div className="flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Committee
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Leadership Team
            </h2>
          </div>

          <p className="font-mono text-xs text-neutral-600">
            {leaders.length} MEMBERS
          </p>
        </div>

        {/* ============================================================ */}
        {/* EXECUTIVE LEADERSHIP                                         */}
        {/* ============================================================ */}

        <div className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#D4AF37]">
              01
            </span>

            <div className="h-px w-5 bg-[#D4AF37]/40" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Executive Leadership
            </p>
          </div>

          <div className="grid gap-px bg-[#D4AF37]/20 md:grid-cols-2">
            {executives.map((leader, index) => (
              <article
                key={leader.id}
                className="group relative bg-[#0B0B0B] p-8 transition hover:bg-[#101010] sm:p-10"
              >
                {/* CARD HEADER */}

                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-[#D4AF37]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="border border-[#D4AF37]/30 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    Executive
                  </span>
                </div>

                {/* PROFILE */}

                <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-center">
                  {/* PHOTO */}

                  <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5">
                    <Image
                      src={leader.photo}
                      alt={`${leader.name} profile photo`}
                      fill
                      sizes="128px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* DETAILS */}

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                      {leader.role}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold tracking-tight">
                      {leader.name}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-500">
                      {leader.department}
                    </p>
                  </div>
                </div>

                {/* CONTACT */}

                <div className="mt-9 border-t border-white/10 pt-5">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-700">
                    Contact
                  </p>

                  <a
                    href={`mailto:${leader.email}`}
                    className="break-all text-xs text-neutral-500 transition hover:text-[#D4AF37]"
                  >
                    {leader.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* DIRECTORS                                                    */}
        {/* ============================================================ */}

        <div className="mt-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#D4AF37]">
              02
            </span>

            <div className="h-px w-5 bg-[#D4AF37]/40" />

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              Directors
            </p>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {directors.map((leader, index) => (
              <article
                key={leader.id}
                className="group relative flex flex-col bg-[#080808] p-7 transition hover:bg-[#101010]"
              >
                {/* CARD HEADER */}

                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-neutral-700">
                    {String(index + 3).padStart(2, "0")}
                  </span>

                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                </div>

                {/* PHOTO */}

                <div className="relative mt-8 h-24 w-24 overflow-hidden rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                  <Image
                    src={leader.photo}
                    alt={`${leader.name} profile photo`}
                    fill
                    sizes="96px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* DETAILS */}

                <div className="mt-7 flex-1">
                  <p className="text-[10px] font-bold uppercase leading-5 tracking-[0.18em] text-[#D4AF37]">
                    {leader.role}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {leader.name}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-600">
                    {leader.department}
                  </p>
                </div>

                {/* CONTACT */}

                <div className="mt-7 border-t border-white/10 pt-5">
                  <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-700">
                    Contact
                  </p>

                  <a
                    href={`mailto:${leader.email}`}
                    className="break-all text-xs text-neutral-500 transition hover:text-[#D4AF37]"
                  >
                    {leader.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* FOOTER                                                       */}
        {/* ============================================================ */}

        <footer className="mt-20 flex flex-col gap-2 border-t border-white/10 py-8 text-xs text-neutral-700 sm:flex-row sm:items-center sm:justify-between">
          <p>SIM Young Entrepreneur Network</p>
          <p>Leadership Directory</p>
        </footer>
      </section>
    </main>
  );
}
