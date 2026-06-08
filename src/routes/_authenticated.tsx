import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="size-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24 max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Dashboard</h1>
        <p className="text-ink/60 mb-8">
          Welcome back{user.email ? ", " + user.email.split("@")[0] : ""}. Your content calendar is ready.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 ring-1 ring-black/5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">Posts this month</div>
            <div className="text-3xl font-semibold">0</div>
          </div>
          <div className="bg-white rounded-2xl p-6 ring-1 ring-black/5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">Scheduled</div>
            <div className="text-3xl font-semibold">0</div>
          </div>
          <div className="bg-white rounded-2xl p-6 ring-1 ring-black/5">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink/40 mb-1">Published</div>
            <div className="text-3xl font-semibold">0</div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-8 ring-1 ring-black/5 text-center">
          <h2 className="text-xl font-medium mb-2">Your content calendar</h2>
          <p className="text-ink/60 mb-6 max-w-md mx-auto">
            You haven't created any posts yet. Get started by setting up your business profile.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors"
          >
            Set up profile
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
