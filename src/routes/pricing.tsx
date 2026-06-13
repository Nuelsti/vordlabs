import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Vordlabs" },
      {
        name: "description",
        content:
          "Simple, transparent pricing for the Vordlabs AI content platform. Start with a 14-day free trial.",
      },
      { property: "og:title", content: "Pricing — Vordlabs" },
      {
        property: "og:description",
        content:
          "Simple pricing. Start free, then pick the plan that matches your posting cadence.",
      },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    price: "$0",
    cadence: "14-day trial",
    desc: "Try the full workflow before you commit.",
    features: [
      "1 business profile",
      "7-day content calendar",
      "20 AI-generated posts",
      "Buffer connection",
    ],
    featured: false,
    cta: "Start free",
  },
  {
    name: "Standard",
    price: "$49",
    cadence: "/ month",
    desc: "Everything a small business needs to stay consistent.",
    features: [
      "Unlimited 30-day calendars",
      "Unlimited post generation",
      "On-brand design generation",
      "All Buffer-connected channels",
      "Brand voice & color profiles",
    ],
    featured: true,
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "$129",
    cadence: "/ month",
    desc: "For teams running multiple brands or locations.",
    features: [
      "Up to 5 business profiles",
      "Team collaboration",
      "Priority publishing queue",
      "Premium template library",
      "Dedicated support",
    ],
    featured: false,
    cta: "Contact sales",
  },
];

function PricingPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
              Pricing
            </h3>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance mb-6">
              Pay for consistency, not features.
            </h1>
            <p className="text-lg text-ink/60 text-pretty">
              One simple platform. No add-ons, no per-post fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => (
              <div
                key={p.name}
                className={
                  p.featured
                    ? "bg-ink text-white rounded-3xl p-8 ring-1 ring-ink relative"
                    : "bg-white rounded-3xl p-8 ring-1 ring-black/5"
                }
              >
                {p.featured && (
                  <div className="absolute -top-3 left-8 bg-brand text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most popular
                  </div>
                )}
                <h3
                  className={
                    p.featured
                      ? "text-sm font-semibold uppercase tracking-wider text-white/60 mb-2"
                      : "text-sm font-semibold uppercase tracking-wider text-ink/50 mb-2"
                  }
                >
                  {p.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-semibold">{p.price}</span>
                  <span className={p.featured ? "text-white/60 text-sm" : "text-ink/60 text-sm"}>
                    {p.cadence}
                  </span>
                </div>
                <p
                  className={p.featured ? "text-sm text-white/70 mb-8" : "text-sm text-ink/60 mb-8"}
                >
                  {p.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className={
                        p.featured
                          ? "flex items-start gap-3 text-sm text-white/90"
                          : "flex items-start gap-3 text-sm text-ink/70"
                      }
                    >
                      <div
                        className={
                          p.featured
                            ? "size-5 bg-white/10 text-white rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            : "size-5 bg-brand-muted text-brand rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        }
                      >
                        <span className="text-[10px]">✓</span>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={
                    p.featured
                      ? "block text-center w-full bg-brand text-white text-sm font-medium py-3 rounded-xl ring-1 ring-brand hover:bg-brand/90 transition-colors"
                      : "block text-center w-full bg-white text-ink text-sm font-medium py-3 rounded-xl ring-1 ring-ink/10 hover:ring-ink/20 transition-colors"
                  }
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-ink/50 mt-10">
            All plans include OpenAI, Pexels, and Buffer integrations. Cancel anytime.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
