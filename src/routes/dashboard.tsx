import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  Home,
  Calendar,
  SquarePen,
  Paintbrush,
  Shield,
  BarChart2,
  Star,
  Settings,
  Bell,
  ChevronDown,
  Crown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { label: "Content Calendar", icon: Calendar, path: "/dashboard/content-calendar" },
  { label: "Create Content", icon: SquarePen, path: "/dashboard/create-content" },
  { label: "Designs", icon: Paintbrush, path: "/dashboard/designs" },
  { label: "My Brand", icon: Shield, path: "/dashboard/my-brand" },
  { label: "Analytics", icon: BarChart2, path: "/dashboard/analytics" },
  { label: "Integrations", icon: Star, path: "/dashboard/integrations" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      {/* Top Navbar */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#3A943F] text-white font-bold text-xl">
            V
          </div>
          <span className="text-xl font-bold text-[#3A943F] tracking-wide">VORDLABS</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3A943F] text-[10px] font-bold text-white">
              3
            </span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-700">Sarah</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[260px] overflow-y-auto border-r bg-white flex flex-col">
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#3A943F] text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto">
            <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3A943F] mb-3">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Upgrade Your Plan</h4>
              <p className="text-xs text-gray-500 mb-4">
                Unlock more features and grow your business faster.
              </p>
              <button className="w-full rounded-lg bg-[#3A943F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3A943F]/90">
                Upgrade Now
              </button>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3A943F] text-white font-medium">
                SF
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900">Sarah's Fashion Store</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
