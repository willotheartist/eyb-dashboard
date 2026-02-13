"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  variant?: "signup" | "login";
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Deep Ocean Gradient */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800">
          {/* Wave pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,45 50,50 T100,50 V100 H0 Z" fill="currentColor" className="text-white animate-pulse" />
              <path d="M0,60 Q25,55 50,60 T100,60 V100 H0 Z" fill="currentColor" className="text-cyan-300" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(56,189,248,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(14,165,233,0.2)_0%,transparent_50%)]" />
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>
        
        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <svg className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17h1m16 0h1M5.6 17L3 14.4m15.4 2.6l2.6-2.6M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">EYB Dashboard</span>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-300 text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              PARTNER PORTAL
            </span>
          </div>
          <h1 className="text-white text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight mb-4">
            Your brokerage,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              one dashboard.
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg leading-relaxed max-w-md">
            Listings, leads, commissions, and documents — everything you need to run your yacht brokerage, all in one place.
          </p>
          
          {/* Stats row */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-blue-300/60 text-sm mt-1">Active Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">€2.4B</p>
              <p className="text-blue-300/60 text-sm mt-1">Sales Volume</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-blue-300/60 text-sm mt-1">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50/80">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}
