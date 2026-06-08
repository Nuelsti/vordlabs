import { Link } from "@tanstack/react-router";

export function SiteHeader() {
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
          <button className="hidden sm:block text-sm font-medium text-ink/60 hover:text-ink">
            Sign in
          </button>
          <Link
            to="/contact"
            className="bg-brand text-white text-sm font-medium px-4 py-2 rounded-full ring-1 ring-brand hover:bg-brand/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
