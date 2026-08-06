import { Bell, Search, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { BrandService } from "@/services/brand.service";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const displayName = user?.name || "there";
  const [brandName, setBrandName] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setBrandName(null);
      return;
    }

    const loadBrandName = async () => {
      try {
        const brands = await BrandService.getUserBrands();
        if (brands.length > 0 && brands[0]) {
          setBrandName(brands[0].name);
        }
      } catch (err) {
        console.warn("Error loading user brands:", err);
      }
    };

    void loadBrandName();
  }, [user?.id]);

  return (
    <header className="flex flex-col gap-5 border-b border-gray-200 bg-white px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Good morning, {displayName} 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's how your business is performing today.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-brand focus:bg-white"
          />
        </div>

        {/* Notification */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50">
          <Bell className="h-5 w-5 text-gray-600" />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand"></span>
        </button>

        {/* Brand Switcher */}
        <button
          type="button"
          onClick={() => navigate({ to: "/dashboard/my-brand" })}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
        >

          <Avatar className="h-10 w-10">
            <AvatarImage src="https://i.pravatar.cc/150?img=20" />
            <AvatarFallback>VH</AvatarFallback>
          </Avatar>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-gray-900">
              {brandName || "Register your brand"}
            </p>

            <p className="text-xs text-gray-500">
              {brandName ? "Brand profile" : "Set up your business"}
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

      </div>
    </header>
  );
}