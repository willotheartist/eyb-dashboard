"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, MessageSquare, HelpCircle, Search } from "lucide-react";

const STORAGE_KEY = "eyb.settings.v1";
const SETTINGS_EVENT = "eyb:settings-updated";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function TopNav() {
  const [displayName, setDisplayName] = useState("Marina Harbor");
  const [role, setRole] = useState("Partner Broker");

  function loadFromStorage() {
    const stored = safeParse<{
      data?: { profile?: { name?: string; role?: string } };
    }>(window.localStorage.getItem(STORAGE_KEY));

    const nextName = stored?.data?.profile?.name?.trim();
    const nextRole = stored?.data?.profile?.role?.trim();

    if (nextName) setDisplayName(nextName);
    if (nextRole) setRole(nextRole);
  }

  useEffect(() => {
    loadFromStorage();

    const onCustom = () => loadFromStorage();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) loadFromStorage();
    };
    const onFocus = () => loadFromStorage();
    const onVisibility = () => {
      if (document.visibilityState === "visible") loadFromStorage();
    };

    window.addEventListener(SETTINGS_EVENT, onCustom as EventListener);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener(SETTINGS_EVENT, onCustom as EventListener);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 px-6 flex items-center justify-between">
      {/* Logo - Premium Apple-style */}
      <Link href="/dashboard" className="flex items-baseline gap-[3px]">
        <span className="text-[18px] font-semibold tracking-[-0.04em] text-gray-900">
          EYB
        </span>
        <span 
          className="text-[18px] text-gray-500 tracking-[-0.02em]"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic' }}
        >
          Partner
        </span>
      </Link>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-gray-400" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search listings, leads, documents..."
            className="w-full h-9 pl-9 pr-12 text-[13px] bg-gray-100/80 border-0 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-gray-400 font-medium bg-white px-1.5 py-0.5 rounded border border-gray-200/80">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
        >
          <HelpCircle className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 relative transition-colors"
        >
          <Bell className="w-[18px] h-[18px]" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
        </button>

        <button
          type="button"
          className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
        >
          <MessageSquare className="w-[18px] h-[18px]" strokeWidth={1.5} />
        </button>

        <div className="w-px h-5 bg-gray-200 mx-3" />

        <button className="flex items-center gap-3 pl-1 pr-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-[11px] font-medium tracking-wide">
            {getInitials(displayName)}
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[13px] font-medium text-gray-900 tracking-[-0.01em]">{displayName}</div>
            <div className="text-[11px] text-gray-500">{role}</div>
          </div>
          <svg className="w-4 h-4 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
