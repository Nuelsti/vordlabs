import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vordlabs — AI Content Calendar for Small Businesses" },
      {
        name: "description",
        content:
          "Stay consistently visible online. Vordlabs plans your content calendar, generates posts and designs, and publishes them with one click.",
      },
      { property: "og:title", content: "Vordlabs — AI Content Calendar for Small Businesses" },
      {
        property: "og:description",
        content:
          "AI-powered content planning, generation, and publishing for small businesses.",
      },
    ],
  }),
  component: Index,
});

const dayCells = [
  { kind: "post", tone: "muted", label: "Product" },
  { kind: "empty" },
  { kind: "post", tone: "brand", label: "Story" },
  { kind: "empty" },
  { kind: "empty" },
  { kind: "weekend" },
  { kind: "weekend" },
  { kind: "empty" },
  { kind: "add" },
  { kind: "empty" },
  { kind: "post", tone: "muted", label: "Tip" },
  { kind: "empty" },
  { kind: "weekend" },
  { kind: "weekend" },
  { kind: "empty" },
  { kind: "post", tone: "brand", label: "Launch" },
  { kind: "empty" },
  { kind: "post", tone: "muted", label: "Quote" },
  { kind: "empty" },
  { kind: "weekend" },
  { kind: "weekend" },
  { kind: "empty" },
  { kind: "empty" },
  { kind: "post", tone: "muted", label: "Promo" },
  { kind: "empty" },
  { kind: "empty" },
  { kind: "weekend" },
  { kind: "weekend" },
] as const;

function Index() {
  return (
    <div className="bg-canvas text-ink">
      <SiteHeader />
      <main className="pt-32">
        {/* Hero */}
        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink/10 bg-white/50 mb-8">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] font-medium tracking-widest text-ink/60 uppercase">
                AI Content Calendar
              </span>
            </div>
            <h1 className="text-4xl md:text-7xl font-semibold leading-[1.05] text-ink text-balance mb-6 tracking-tight">
              Stay visible every day,
              <br />
              <span className="italic font-display text-brand">without the grind.</span>
            </h1>
            <p className="text-lg md:text-xl text-ink/60 text-pretty max-w-[52ch] mx-auto mb-10">
              Vordlabs plans your content calendar, generates the posts and
              designs, and publishes them to your social channels — so your
              business never goes quiet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <Link
                to="/contact"
                className="bg-brand text-white text-sm font-medium px-6 py-3 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors"
              >
                Start free trial
              </Link>
              <Link
                to="/how-it-works"
                className="bg-white text-ink text-sm font-medium px-6 py-3 rounded-full ring-1 ring-ink/10 hover:ring-ink/20 transition-colors"
              >
                See how it works
              </Link>
            </div>

            {/* Calendar Mockup */}
            <div className="relative p-4 bg-zinc-100 rounded-[24px] ring-1 ring-black/5">
              <div className="bg-white rounded-[12px] shadow-sm overflow-hidden">
                <div className="border-b border-zinc-100 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">October 2026</span>
                    <div className="flex gap-1">
                      <div className="size-6 rounded-md bg-zinc-50 flex items-center justify-center border border-zinc-200">
                        <span className="text-[10px] text-zinc-400">←</span>
                      </div>
                      <div className="size-6 rounded-md bg-zinc-50 flex items-center justify-center border border-zinc-200">
                        <span className="text-[10px] text-zinc-400">→</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex h-8 px-3 items-center rounded-md bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500">
                      Generate week
                    </div>
                    <div className="h-8 w-8 bg-brand rounded-md flex items-center justify-center text-white text-sm">
                      +
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 divide-x divide-zinc-100">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div
                      key={d}
                      className="h-8 flex items-center justify-center text-[10px] font-medium text-zinc-400 uppercase tracking-wider bg-zinc-50/50"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 grid-rows-4 divide-x divide-y divide-zinc-100 h-96">
                  {dayCells.map((cell, i) => {
                    if (cell.kind === "weekend")
                      return <div key={i} className="p-2 bg-zinc-50/30" />;
                    if (cell.kind === "add")
                      return (
                        <div key={i} className="p-2 flex items-center justify-center">
                          <button className="size-8 rounded-full border border-dashed border-zinc-300 text-zinc-400 text-xl font-light leading-none">
                            +
                          </button>
                        </div>
                      );
                    if (cell.kind === "post") {
                      const brand = cell.tone === "brand";
                      return (
                        <div key={i} className="p-2">
                          <div
                            className={
                              brand
                                ? "rounded-lg bg-brand-muted p-2 border border-brand/10 text-left"
                                : "rounded-lg bg-zinc-50/80 p-2 border border-zinc-100 text-left"
                            }
                          >
                            <div className="flex items-center gap-1.5 mb-2">
                              <div
                                className={
                                  brand
                                    ? "w-1.5 h-1.5 rounded-full bg-brand"
                                    : "w-1.5 h-1.5 rounded-full bg-zinc-300"
                                }
                              />
                              <span
                                className={
                                  brand
                                    ? "text-[9px] font-semibold uppercase tracking-wider text-brand"
                                    : "text-[9px] font-semibold uppercase tracking-wider text-zinc-400"
                                }
                              >
                                {cell.label}
                              </span>
                            </div>
                            <div className="w-full h-10 bg-white rounded border border-zinc-100" />
                          </div>
                        </div>
                      );
                    }
                    return <div key={i} className="p-2" />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-24 bg-zinc-50 border-y border-ink/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-ink text-balance">
                Most small businesses don't have a content problem.
                <span className="text-ink/40"> They have a consistency problem.</span>
              </h2>
              <div className="space-y-4 text-ink/60 text-pretty text-lg">
                <p>
                  You know you should post regularly. But between running the
                  business, serving customers, and everything else — what to
                  post and when keeps slipping.
                </p>
                <p>
                  Vordlabs replaces the blank page with a ready-made calendar
                  built around your brand, your audience, and your goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
              The Workflow
            </h3>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 max-w-2xl text-balance">
              From business profile to published post in four steps.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  n: "1",
                  t: "Set up your profile",
                  d: "Tell us about your business, audience, goals, and brand personality through simple forms.",
                },
                {
                  n: "2",
                  t: "Generate your calendar",
                  d: "Vordlabs builds a structured 7 or 30-day content plan tailored to your business — no prompts required.",
                },
                {
                  n: "3",
                  t: "Generate posts & designs",
                  d: "Click any day to generate captions, hashtags, CTAs and on-brand designs from our template library.",
                },
                {
                  n: "4",
                  t: "Publish via Buffer",
                  d: "Review, refine, and publish to your connected social accounts — all from a single screen.",
                },
              ].map((s) => (
                <div key={s.n}>
                  <div className="size-9 rounded-full bg-brand-muted text-brand flex items-center justify-center font-semibold text-sm mb-6 ring-1 ring-brand/10">
                    {s.n}
                  </div>
                  <h4 className="text-lg font-medium mb-2">{s.t}</h4>
                  <p className="text-sm text-ink/60 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Features */}
        <section className="py-12 pb-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 bg-zinc-50 rounded-3xl p-8 ring-1 ring-black/5">
                <h4 className="text-xl font-medium mb-3">
                  A calendar built around your business
                </h4>
                <p className="text-ink/60 text-sm max-w-[52ch] mb-8">
                  Vordlabs converts your business profile into structured
                  prompts and asks OpenAI to produce a strategic content
                  calendar — content pillars, post types, captions, and
                  cadence — all stored and ready to edit.
                </p>
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={
                        [3, 5, 10, 14, 17, 22, 25].includes(i)
                          ? "aspect-square rounded-md bg-brand/80"
                          : [1, 8, 12, 19, 26].includes(i)
                            ? "aspect-square rounded-md bg-brand-muted"
                            : "aspect-square rounded-md bg-white border border-zinc-100"
                      }
                    />
                  ))}
                </div>
              </div>
              <div className="md:col-span-4 bg-brand text-white rounded-3xl p-8 flex flex-col">
                <h4 className="text-xl font-medium mb-3">One-click publishing</h4>
                <p className="text-white/80 text-sm mb-8">
                  Approve a post and hit publish. Buffer handles delivery to
                  every connected social account.
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                  {["Instagram", "Facebook", "LinkedIn"].map((p) => (
                    <div
                      key={p}
                      className="h-10 bg-white/10 rounded-lg border border-white/10 flex items-center px-3 text-sm text-white/90"
                    >
                      <div className="size-2 rounded-full bg-white mr-3" />
                      {p}
                      <span className="ml-auto text-[10px] uppercase tracking-wider text-white/60">
                        Connected
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 bg-white rounded-3xl p-8 ring-1 ring-black/5">
                <h4 className="text-lg font-medium mb-3">Designs that look on-brand</h4>
                <p className="text-ink/60 text-sm">
                  Pick a template, drop in your logo and brand colors, and
                  Vordlabs fills it with the right copy and imagery.
                </p>
              </div>
              <div className="md:col-span-4 bg-white rounded-3xl p-8 ring-1 ring-black/5">
                <h4 className="text-lg font-medium mb-3">No prompts, ever</h4>
                <p className="text-ink/60 text-sm">
                  You fill simple forms. We translate them into structured
                  prompts behind the scenes. You stay in your business, not in
                  AI tools.
                </p>
              </div>
              <div className="md:col-span-4 bg-white rounded-3xl p-8 ring-1 ring-black/5">
                <h4 className="text-lg font-medium mb-3">Stock imagery, included</h4>
                <p className="text-ink/60 text-sm">
                  Supporting visuals come from Pexels and our template library
                  — no separate subscription required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-16 border-t border-ink/5">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink/40 mb-10">
              Powered by best-in-class infrastructure
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-6 text-ink/50">
              {["OpenAI", "Buffer", "Pexels", "Supabase", "Meta"].map((p) => (
                <span
                  key={p}
                  className="text-base font-semibold tracking-tight"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
                Pricing
              </h3>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
                Simple plan. Real growth.
              </h2>
            </div>
            <div className="max-w-md mx-auto bg-white rounded-3xl p-10 ring-1 ring-black/5 text-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-2">
                Standard
              </h3>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-5xl font-semibold">$49</span>
                <span className="text-ink/60">/mo</span>
              </div>
              <ul className="text-sm text-ink/70 space-y-3 mb-8 text-left">
                {[
                  "AI-generated 30-day content calendar",
                  "Unlimited captions, hashtags & CTAs",
                  "On-brand design generation",
                  "Buffer publishing to all your channels",
                  "Brand voice & color profiles",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="size-5 bg-brand-muted text-brand rounded-full flex items-center justify-center shrink-0">
                      <span className="text-[10px]">✓</span>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="block w-full bg-brand text-white text-sm font-medium py-3 rounded-xl ring-1 ring-brand hover:bg-brand/90 transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-brand">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight text-balance">
              Stop disappearing from your customers' feeds.
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-10">
              Start your free trial and see your first month of content in
              minutes.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-brand text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/95 transition-colors"
            >
              Start your 14-day free trial
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
