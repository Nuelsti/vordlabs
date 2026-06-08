import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vordlabs" },
      {
        name: "description",
        content:
          "Vordlabs is building the simplest way for small businesses to stay consistently visible online with AI-powered content planning and publishing.",
      },
      { property: "og:title", content: "About — Vordlabs" },
      {
        property: "og:description",
        content:
          "Our mission: help small businesses stay consistently visible online.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <section className="max-w-3xl mx-auto px-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
            About
          </h3>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance mb-8">
            We're building the operating system for small-business consistency.
          </h1>

          <div className="space-y-6 text-lg text-ink/70 leading-relaxed">
            <p>
              Most small businesses don't fail at marketing because they lack
              good ideas. They fail because doing it every day is genuinely
              hard. There's always something more urgent than writing a
              caption.
            </p>
            <p>
              Vordlabs replaces the blank page with a structured plan. We
              translate what makes your business unique into a content
              calendar, then generate the posts and designs to execute it —
              and ship them to your social channels through Buffer.
            </p>
            <p>
              The MVP focuses on a tight loop: <span className="text-ink font-medium">profile → calendar → content → design → publish</span>.
              Performance analytics, a customer-interaction assistant, and
              broader marketing automation are next on the roadmap.
            </p>
            <p>
              Built on React, Supabase, OpenAI, Pexels, and Buffer — chosen
              because they keep the platform simple, scalable, and affordable
              while delivering real business value.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { k: "Phase", v: "MVP" },
              { k: "Focus", v: "Consistency" },
              { k: "Built for", v: "SMBs" },
              { k: "Next", v: "Analytics" },
            ].map((s) => (
              <div key={s.k} className="bg-white rounded-2xl p-5 ring-1 ring-black/5">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-ink/40 mb-2">
                  {s.k}
                </div>
                <div className="text-lg font-medium">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              to="/contact"
              className="inline-block bg-brand text-white text-sm font-medium px-6 py-3 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
