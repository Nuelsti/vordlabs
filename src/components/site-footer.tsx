import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="py-16 bg-canvas border-t border-ink/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="font-semibold tracking-tight text-ink text-lg">Vordlabs</span>
            <p className="mt-4 text-sm text-ink/50 max-w-sm text-pretty">
              AI-powered content planning and publishing — built so small
              businesses can stay consistently visible online.
            </p>
          </div>
          <div className="flex flex-wrap gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                Product
              </span>
              <Link to="/features" className="text-sm text-ink/60 hover:text-ink">
                Features
              </Link>
              <Link to="/how-it-works" className="text-sm text-ink/60 hover:text-ink">
                How it works
              </Link>
              <Link to="/pricing" className="text-sm text-ink/60 hover:text-ink">
                Pricing
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink/40">
                Company
              </span>
              <Link to="/about" className="text-sm text-ink/60 hover:text-ink">
                About
              </Link>
              <Link to="/contact" className="text-sm text-ink/60 hover:text-ink">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-ink/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <span className="text-xs text-ink/40">
            © {new Date().getFullYear()} Vordlabs. All rights reserved.
          </span>
          <span className="text-xs text-ink/40">
            Built for businesses that want to stay consistent.
          </span>
        </div>
      </div>
    </footer>
  );
}
