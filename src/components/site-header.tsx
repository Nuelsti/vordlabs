import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

const navLinks = [
  { to: "/features", label: "Features" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [user, setUser] = useState<{ id: string; username?: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(
        session?.user
          ? { id: session.user.id, username: session.user.user_metadata?.username }
          : null,
      );
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? { id: session.user.id, username: session.user.user_metadata?.username }
          : null,
      );
    });

    const subscription = data?.subscription as { unsubscribe?: () => void } | undefined;

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-ink/5 bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-8">
          <Link to="/" className="truncate font-semibold tracking-tight text-ink">
            Vordlabs
          </Link>
          <div className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
                activeProps={{ className: "text-sm font-medium text-ink transition-colors" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <span className="hidden max-w-[160px] truncate text-sm text-ink/60 sm:block">
                {user.username}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-ink/60 transition-colors hover:text-ink"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="hidden text-sm font-medium text-ink/60 transition-colors hover:text-ink sm:block"
              >
                Sign in
              </Link>
              {/* Want to get rid of get started button when in mobile mode  */}
              {/* but i want to keep it for desktop, the hidden takes it off from both mobile and desktop but that is not what i want, how do i fix that? */}
              <Link
                to="/auth"
              //   className=" rounded-full bg-brand px-4 py-2 text-sm font-medium text-white ring-1 ring-brand transition-colors hover:bg-brand/90"
              // >
                className="hidden text-sm rounded-full bg-brand px-4 py-2 font-medium text-white ring-1 ring-brand transition-colors hover:bg-brand/90 sm:block"
              >
                Get Started
              </Link>
            </>
          )}

{/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink/70 transition-colors hover:bg-white hover:text-ink md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b px-6 py-4">
                  <Link to="/" className="font-semibold tracking-tight text-ink" onClick={closeMobileMenu}>
                    Vordlabs
                  </Link>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                      activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors" }}
                    >
                      {link.label}
                    </Link>
                  ))}
{/* inside hamburger */}
                  <div className="mt-auto space-y-3 border-t pt-4">
                    {user ? (
                      <button
                        onClick={handleSignOut}
                        className="w-full rounded-lg border border-ink/10 px-3 py-2 text-left text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                      >
                        Sign out
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/auth"
                          onClick={closeMobileMenu}
                          className="block rounded-lg border border-ink/10 px-3 py-2 text-center text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/auth"
                          onClick={closeMobileMenu}
                          className="block rounded-lg bg-brand px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand/90 sm:hidden"
                        >
                          Get Started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
