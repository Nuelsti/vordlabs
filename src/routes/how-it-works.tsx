import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — Vordlabs" },
      {
        name: "description",
        content:
          "From sign up to published post: the Vordlabs workflow takes you from business profile to a fully scheduled month of content.",
      },
      { property: "og:title", content: "How it works — Vordlabs" },
      {
        property: "og:description",
        content:
          "Sign up, build your business profile, generate your calendar, create posts and designs, and publish via Buffer.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    n: "01",
    title: "Sign up",
    body: "Create your Vordlabs account in seconds. No credit card needed for the trial.",
  },
  {
    n: "02",
    title: "Create your business profile",
    body: "Enter your business name, industry, products and services, and what makes you different.",
  },
  {
    n: "03",
    title: "Configure brand information",
    body: "Set brand personality, posting frequency, target audience, and the social platforms you publish to. Optional: upload your logo and brand colors.",
  },
  {
    n: "04",
    title: "Generate your content calendar",
    body: "Vordlabs converts your profile into a structured prompt and asks OpenAI to produce a tailored 7 or 30-day plan.",
  },
  {
    n: "05",
    title: "Select a calendar day",
    body: "Click any day to open the content topic for that slot.",
  },
  {
    n: "06",
    title: "Generate content",
    body: "Captions, hashtags, CTAs and post copy are generated based on the selected topic and your brand voice.",
  },
  {
    n: "07",
    title: "Generate design",
    body: "Pick a template from the Vordlabs library. AI-generated content is dropped in, with Pexels imagery and your brand styling applied.",
  },
  {
    n: "08",
    title: "Preview",
    body: "See your post exactly as it will appear on each platform before it goes live.",
  },
  {
    n: "09",
    title: "Publish via Buffer",
    body: "One click pushes the post to every connected channel through Buffer's publishing API.",
  },
];

function HowItWorksPage() {
  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <section className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
              How it works
            </h3>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-balance mb-6">
              Nine steps from sign-up to published.
            </h1>
            <p className="text-lg text-ink/60 text-pretty max-w-2xl">
              You never interact with AI prompts. You fill simple forms.
              Vordlabs handles the rest.
            </p>
          </div>

          <ol className="space-y-4">
            {steps.map((s) => (
              <li
                key={s.n}
                className="bg-white rounded-2xl p-6 md:p-8 ring-1 ring-black/5 flex gap-6"
              >
                <div className="text-brand font-display text-3xl md:text-4xl shrink-0 leading-none">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{s.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-block bg-brand text-white text-sm font-medium px-8 py-4 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors"
            >
              Try the workflow free
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
