import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Vordlabs" },
      {
        name: "description",
        content: "Sign in or create your Vordlabs account.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        if (!username.trim()) throw new Error("Please provide a username.");

        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username: username.trim() } },
        });

        if (signUpError) throw signUpError;

        const userId = data?.user?.id;
        if (userId) {
          try {
            const { error: profileError } = await supabase
              .from("profiles")
              .upsert({ id: userId, full_name: username.trim() });
            if (profileError) console.warn("profiles upsert failed:", profileError);
          } catch (err) {
            console.warn("profiles upsert error", err);
          }
        } else {
          // If no user is returned (email confirmation flow), persist username locally
          try {
            if (typeof window !== "undefined") {
              localStorage.setItem("pending_username", username.trim());
            }
          } catch (err) {
            console.warn("could not save pending username", err);
          }
        }

        setMessage("Check your email to confirm your account.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : "Google sign-in failed");
    }
  };

  return (
    <div className="bg-canvas text-ink min-h-screen">
      <SiteHeader />
      <main className="pt-32 pb-24">
        <div className="max-w-sm mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-ink/60">
              {mode === "signin"
                ? "Sign in to manage your content calendar."
                : "Start your free trial today."}
            </p>
          </div>

          <button
            onClick={handleGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-white rounded-xl px-4 py-3 text-sm font-medium ring-1 ring-black/10 hover:ring-black/20 transition-all mb-6"
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-canvas px-2 text-ink/40 uppercase tracking-wider">or</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="you@business.com"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                  placeholder="your-username"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}
            {message && (
              <p className="text-sm text-brand bg-brand-muted/30 rounded-lg px-3 py-2">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand text-white text-sm font-medium py-3 rounded-xl ring-1 ring-brand hover:bg-brand/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-ink/60 mt-6">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setMessage("");
                  }}
                  className="text-brand font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("signin");
                    setError("");
                    setMessage("");
                  }}
                  className="text-brand font-medium hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="text-center text-xs text-ink/40 mt-6">
            By continuing, you agree to our{" "}
            <Link to="/" className="underline hover:text-ink/60">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/" className="underline hover:text-ink/60">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
