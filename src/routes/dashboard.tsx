import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, Upload } from "lucide-react";
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
  UserCircle2,
  Building2,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";

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
  const [collapsed, setCollapsed] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedAvatar = window.localStorage.getItem("dashboard-avatar");
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (avatarSrc) {
      window.localStorage.setItem("dashboard-avatar", avatarSrc);
    } else {
      window.localStorage.removeItem("dashboard-avatar");
    }
  }, [avatarSrc]);

  const location = useLocation();
  const displayName = user?.name || user?.email?.split("@")[0] || "User";
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const createAvatarSvg = (label: string, color: string) => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
        <rect width="120" height="120" rx="60" fill="${color}" />
        <circle cx="60" cy="48" r="24" fill="rgba(255,255,255,0.9)" />
        <path d="M32 104c8-20 24-30 28-30s20 10 28 30" fill="rgba(255,255,255,0.9)" />
        <text x="60" y="60" text-anchor="middle" dominant-baseline="middle" font-size="30" font-family="Arial, sans-serif" fill="white">${label}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const presetAvatars = [
    { id: "blue", label: initials, src: createAvatarSvg(initials, "#2563eb") },
    { id: "green", label: initials, src: createAvatarSvg(initials, "#16a34a") },
    { id: "violet", label: initials, src: createAvatarSvg(initials, "#7c3aed") },
    { id: "amber", label: initials, src: createAvatarSvg(initials, "#d97706") },
  ];

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setAvatarSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-gray-50">
      {/* Top Navbar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3A943F] text-white font-bold">
            V
          </div>

          {!collapsed && <span className="text-xl font-bold text-brand">VORDLABS</span>}
        </div>
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <Bell className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3A943F] text-[10px] font-bold text-white">
              3
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-left transition hover:bg-gray-100">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatarSrc ?? undefined} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <p className="font-medium text-gray-700">{displayName}</p>
                  <p className="text-xs text-gray-500">{user?.email || "Signed in"}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-2">
                <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                <p className="text-xs text-gray-500">{user?.email || "Signed in"}</p>
              </div>
              <DropdownMenuSeparator />
              <div className="space-y-3 px-2 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarSrc ?? undefined} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{displayName}</p>
                    <p className="text-xs text-gray-500">Your avatar</p>
                  </div>
                </div>

                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50">
                  <Upload className="h-4 w-4" />
                  <span>Upload avatar</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </label>

                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Choose a preset
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {presetAvatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => setAvatarSrc(avatar.src)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-white transition hover:scale-105"
                        style={{
                          backgroundColor: avatar.src.includes("#2563eb")
                            ? "#2563eb"
                            : avatar.src.includes("#16a34a")
                              ? "#16a34a"
                              : avatar.src.includes("#7c3aed")
                                ? "#7c3aed"
                                : "#d97706",
                        }}
                      >
                        {initials}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAvatarSrc(null)}
                  className="text-sm text-gray-600 transition hover:text-gray-900"
                >
                  Use initials only
                </button>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                <UserCircle2 className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Brand profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex cursor-pointer items-center gap-2 text-red-600 focus:text-red-600"
                onSelect={(event) => {
                  event.preventDefault();
                  void handleSignOut();
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            ${collapsed ? "w-20" : "w-[260px]"}
            flex shrink-0 flex-col overflow-y-auto border-r bg-white transition-all duration-300
          `}
        >
          <div className="flex items-center justify-between p-4">
            {/* {!collapsed && (
              <span className="font-bold text-[#3A943F]">
                Menu
              </span>
            )} */}

            {/* <button
              onClick={() => setCollapsed(!collapsed)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button> */}
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  // className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  //   isActive
                  //     ? "bg-[#3A943F] text-white"
                  //     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  // }`}
                  className={`flex items-center ${collapsed ? "justify-center" : "gap-3"} 
                    ${
                      isActive
                        ? "rounded-full bg-brand text-white font-medium"
                        : "text-white-600 hover:bg-gray-100 hover:text-white-900"
                    }rounded-l px-3 py-3 transition `}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                  {/* {item.label} */}
                  {!collapsed && item.label}
                </Link>
              );
            })}
          </nav>

          {/* <div className="p-4 mt-auto"> */}
          {!collapsed && (
            <div className="p-4 mt-auto">
              <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand mb-3">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Upgrade Your Plan</h4>
                <p className="text-xs text-gray-500 mb-4">
                  Unlock more features and grow your business faster.
                </p>
                <button className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {/* <div className="border-t p-4"> */}
          <div className="border-t p-4">
            {/* <div className="flex items-center gap-3 cursor-pointer"> */}
            <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white font-medium">
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
        <main className="min-h-0 flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
