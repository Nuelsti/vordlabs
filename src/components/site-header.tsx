import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null);
    });

    const subscription = data?.subscription;

    return () => {
      if (subscription && typeof (subscription as any).unsubscribe === "function") {
        (subscription as any).unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-ink/5">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-semibold tracking-tight text-ink">
            Vordlabs
          </Link>
          <div className="hidden md:flex gap-6">
            <Link
              to="/features"
              className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              activeProps={{ className: "text-sm font-medium text-ink transition-colors" }}
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              activeProps={{ className: "text-sm font-medium text-ink transition-colors" }}
            >
              How it works
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              activeProps={{ className: "text-sm font-medium text-ink transition-colors" }}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              activeProps={{ className: "text-sm font-medium text-ink transition-colors" }}
            >
              About
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-ink/60 truncate max-w-[160px]">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden sm:block text-sm font-medium text-ink/60 hover:text-ink transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="bg-brand text-white text-sm font-medium px-4 py-2 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
