import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vordlabs" },
      {
        name: "description",
        content:
          "Get in touch with the Vordlabs team. Start your trial, ask a question, or book a demo.",
      },
      { property: "og:title", content: "Contact — Vordlabs" },
      {
        property: "og:description",
        content: "Start your trial, ask a question, or book a demo.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: dbError } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      business: form.business || null,
      message: form.message,
    });

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand mb-4">
              Contact
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-6">
              Let's get your business posting again.
            </h1>
            <p className="text-lg text-ink/60 mb-10">
              Tell us a bit about your business and we'll set up your trial, walk through the
              workflow, and answer any questions.
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 ring-1 ring-black/5">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                  Email
                </div>
                <div className="text-ink">hello@vordlabs.com</div>
              </div>
              <div className="bg-white rounded-2xl p-5 ring-1 ring-black/5">
                <div className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">
                  Sales
                </div>
                <div className="text-ink">sales@vordlabs.com</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 ring-1 ring-black/5">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="size-12 mx-auto bg-brand-muted text-brand rounded-full flex items-center justify-center mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-medium mb-2">Thanks — message sent.</h3>
                <p className="text-sm text-ink/60">
                  We'll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-zinc-50 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-zinc-50 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="you@business.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                    Business
                  </label>
                  <input
                    value={form.business}
                    onChange={(e) => setForm((f) => ({ ...f, business: e.target.value }))}
                    className="w-full bg-zinc-50 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                    placeholder="Business name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                    How can we help?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-zinc-50 border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
                    placeholder="Tell us about your goals…"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand text-white text-sm font-medium py-3 rounded-xl ring-1 ring-brand hover:bg-brand/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
