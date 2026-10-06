import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F1E8]">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-[#D4AF37]">
              SIM YEN
            </h1>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Internal Tools
            </p>
          </div>

          <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Menu
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            What would you like to access?
          </h2>
        </div>

        {/* Tool Menu */}
        <div className="border-t border-white/10">
          {/* Outreach */}
          <Link
            href="/contacts"
            className="group grid gap-5 border-b border-white/10 py-8 transition hover:bg-white/[0.025] md:grid-cols-[80px_1fr_auto] md:items-center md:px-5"
          >
            <span className="font-mono text-sm text-[#D4AF37]">
              01
            </span>

            <div>
              <h3 className="text-2xl font-bold transition group-hover:text-[#D4AF37]">
                Outreach
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                Professional contacts and organizations in the SIM YEN
                network.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Open
              </span>

              <span className="text-xl text-[#D4AF37] transition-transform group-hover:translate-x-2">
                →
              </span>
            </div>
          </Link>

          {/* Leadership */}
          <Link
            href="/leadership"
            className="group grid gap-5 border-b border-white/10 py-8 transition hover:bg-white/[0.025] md:grid-cols-[80px_1fr_auto] md:items-center md:px-5"
          >
            <span className="font-mono text-sm text-[#D4AF37]">
              02
            </span>

            <div>
              <h3 className="text-2xl font-bold transition group-hover:text-[#D4AF37]">
                Leadership
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                Current SIM YEN leaders, committee roles and responsibilities.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Open
              </span>

              <span className="text-xl text-[#D4AF37] transition-transform group-hover:translate-x-2">
                →
              </span>
            </div>
          </Link>

{/* Events */}
<Link
  href="/events"
  className="group grid gap-5 border-b border-white/10 py-8 transition hover:bg-white/[0.025] md:grid-cols-[80px_1fr_auto] md:items-center md:px-5"
>
  <span className="font-mono text-sm text-[#D4AF37]">
    03
  </span>

  <div>
    <h3 className="text-2xl font-bold transition group-hover:text-[#D4AF37]">
      Events
    </h3>

    <p className="mt-2 text-sm text-neutral-500">
      View upcoming SIM YEN events, activities and important dates.
    </p>
  </div>

  <div className="flex items-center gap-3">
    <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
      Open
    </span>

    <span className="text-xl text-[#D4AF37] transition-transform group-hover:translate-x-2">
      →
    </span>
  </div>
</Link>

          {/* Resources */}
          <div className="grid gap-5 border-b border-white/10 py-8 opacity-50 md:grid-cols-[80px_1fr_auto] md:items-center md:px-5">
            <span className="font-mono text-sm text-neutral-600">
              04
            </span>

            <div>
              <h3 className="text-2xl font-bold">
                Resources
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                Documents, templates and institutional knowledge.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Coming Soon
            </span>
          </div>

          {/* Opportunities */}
          <div className="grid gap-5 border-b border-white/10 py-8 opacity-50 md:grid-cols-[80px_1fr_auto] md:items-center md:px-5">
            <span className="font-mono text-sm text-neutral-600">
              05
            </span>

            <div>
              <h3 className="text-2xl font-bold">
                Opportunities
              </h3>

              <p className="mt-2 text-sm text-neutral-500">
                Competitions, partnerships and external opportunities.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Coming Soon
            </span>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex items-center justify-between text-xs text-neutral-700">
          <p>SIM Young Entrepreneur Network</p>
          <p>Internal Platform</p>
        </footer>
      </section>
    </main>
  );
}