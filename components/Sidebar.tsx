// components/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ship,
  Users,
  DollarSign,
  FileText,
  UserPlus,
  Settings,
  ChevronDown,
} from "lucide-react";

const mainMenu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/dashboard/leads", icon: Users, hasSubmenu: true },
  { name: "Analytics", href: "/dashboard/analytics", icon: Ship, hasSubmenu: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, hasSubmenu: true },
];

const financialMenu = [
  { name: "Commissions", href: "/dashboard/commissions", icon: DollarSign, hasSubmenu: true },
  { name: "Invoices", href: "/dashboard/invoices", icon: FileText, hasSubmenu: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-56 bg-white border-r border-border p-4 overflow-y-auto">
      <div className="flex min-h-full flex-col">
        <div className="mb-6">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
            Main Menu
          </span>
          <nav className="mt-2 space-y-1">
            {mainMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mb-6">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
            Financial
          </span>
          <nav className="mt-2 space-y-1">
            {financialMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.hasSubmenu && <ChevronDown className="w-4 h-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom upgrade card */}
        <div className="mt-auto p-4 bg-muted rounded-xl">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center mb-3">
            <UserPlus className="w-4 h-4 text-white" />
          </div>
          <div className="font-medium text-sm">Upgrade & Unlock all</div>
          <div className="text-xs text-muted-foreground mb-3">Premium Features</div>
          <button className="text-sm font-medium flex items-center gap-1" type="button">
            Manage your Plan <span>›</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
