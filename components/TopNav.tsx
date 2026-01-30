// components/TopNav.tsx

import Link from 'next/link';
import { Ship, Bell, MessageSquare, HelpCircle } from 'lucide-react';

export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
          <Ship className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-base">EYB Partner</span>
      </Link>

      {/* Center Nav */}
      <nav className="flex items-center gap-1">
        <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-foreground bg-muted rounded-lg">
          Dashboard
        </Link>
        <Link href="/dashboard/listings" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">
          Listings
        </Link>
        <Link href="/dashboard/leads" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg">
          Leads
        </Link>
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>
        <button className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground">
          <MessageSquare className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-border mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-medium">
            MH
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">Marina Harbor</div>
            <div className="text-xs text-muted-foreground">Partner Broker</div>
          </div>
        </div>
      </div>
    </header>
  );
}