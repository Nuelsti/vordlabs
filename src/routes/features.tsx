import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Vordlabs" },
      {
        name: "description",
        content:
          "Explore Vordlabs' AI content calendar, post generation, on-brand design generation, and one-click Buffer publishing for small businesses.",
      },
      { property: "og:title", content: "Features — Vordlabs" },
      {
        property: "og:description",
        content:
          "AI content calendar, post and design generation, and Buffer publishing — all in one place.",
      },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  {
    title: "AI Content Calendar",
    body: "Generate a structured 7 or 30-day plan tailored to your business. Pillars, post types, and cadence — all configured automatically.",
  },
  {
    title: "Business Profile First",
    body: "Define your brand once: name, industry, audience, goals, personality, platforms, logo, brand colors. The AI learns from there.",
  },
  {
    title: "Post Generation",
    body: "Open any day on the calendar to instantly generate captions, hashtags, CTAs, and post copy aligned with that day's topic.",
  },
  {
    title: "Design Generation",
    body: "Pick from the Vordlabs template library. AI-generated content is dropped into the template with your brand colors and logo applied.",
  },
  {
    title: "Built-in Stock Imagery",
    body: "Pexels integration provides supporting visuals so you never need a separate stock photo subscription.",
  },
  {
    title: "Buffer Publishing",
    body: "Review and approve. One click sends posts to every connected social platform via Buffer's API.",
  },
];

function FeaturesPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
              Features
            </h3>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance mb-6">
              Everything you need to stay consistent online.
            </h1>
            <p className="text-lg text-ink/60 text-pretty">
              Vordlabs is built as a single workflow — from business profile, to calendar, to
              generated posts and designs, to published content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-3xl p-8 ring-1 ring-black/5">
                <div className="size-9 rounded-full bg-brand-muted text-brand flex items-center justify-center mb-6 ring-1 ring-brand/10">
                  <span className="text-sm">✦</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{f.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-zinc-50 rounded-3xl p-10 ring-1 ring-black/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Coming on the roadmap</h3>
              <p className="text-sm text-ink/60 max-w-xl">
                Content performance analytics, a customer interaction assistant, and advanced
                marketing automation are next.
              </p>
            </div>
            <Link
              to="/how-it-works"
              className="bg-brand text-white text-sm font-medium px-6 py-3 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors whitespace-nowrap"
            >
              See the workflow
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
