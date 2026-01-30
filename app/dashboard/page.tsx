// app/dashboard/page.tsx

import {
  Ship,
  Users,
  DollarSign,
  Eye,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RightSidebar } from "@/components/RightSidebar";

const stats = [
  { label: "Active Listings", value: "12", change: "+2 this month", icon: Ship },
  {
    label: "New Leads",
    value: "23",
    change: "+18% vs last month",
    icon: Users,
    accent: true,
  },
  {
    label: "Commission YTD",
    value: "$142,500",
    change: "$18,200 pending",
    icon: DollarSign,
  },
  { label: "Total Views", value: "8,492", change: "+24% vs last month", icon: Eye },
];

const recentListings = [
  {
    id: 1,
    name: "2023 Sunseeker Predator 74",
    location: "Fort Lauderdale, FL",
    price: "$3,250,000",
    status: "live",
    views: 1247,
    image:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "2022 Princess Y85",
    location: "Miami Beach, FL",
    price: "$5,800,000",
    status: "live",
    views: 892,
    image:
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "2024 Azimut Grande 27M",
    location: "Naples, FL",
    price: "$7,200,000",
    status: "pending",
    views: 0,
    image:
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "2021 Ferretti Yachts 670",
    location: "Palm Beach, FL",
    price: "$2,100,000",
    status: "sold",
    views: 3421,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "2023 Riva 90 Argo",
    location: "Monaco",
    price: "$8,500,000",
    status: "live",
    views: 2156,
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "2022 Pershing 7X",
    location: "Ibiza, Spain",
    price: "$4,200,000",
    status: "live",
    views: 678,
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop",
  },
];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      {/* Main column */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight truncate">
              Good morning, Marina
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your listings today
            </p>
          </div>

          <Button className="gap-2 bg-primary text-white hover:bg-primary/90 shrink-0">
            <Plus className="w-4 h-4" />
            Add Listing
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl p-5 border ${
                stat.accent
                  ? "bg-accent text-white border-transparent"
                  : "bg-card border-border"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  stat.accent ? "bg-white/20" : "bg-muted"
                }`}
              >
                <stat.icon
                  className={`w-5 h-5 ${
                    stat.accent ? "text-white" : "text-foreground"
                  }`}
                />
              </div>

              <div
                className={`text-sm mb-1 ${
                  stat.accent ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {stat.label}
              </div>

              <div className="text-3xl font-semibold tracking-tight">
                {stat.value}
              </div>

              <div
                className={`flex items-center gap-1 text-sm mt-2 ${
                  stat.accent ? "text-white/80" : "text-muted-foreground"
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Listings */}
        <div className="bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-semibold">Recent Listings</h2>
            <Link
              href="/dashboard/listings"
              className="text-sm text-accent hover:underline font-medium"
            >
              View all →
            </Link>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {recentListings.map((listing) => (
              <div
                key={listing.id}
                className="group rounded-xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        listing.status === "live"
                          ? "bg-success-light text-success"
                          : listing.status === "pending"
                          ? "bg-warning-light text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {listing.status.charAt(0).toUpperCase() +
                        listing.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="font-semibold text-lg text-primary">
                    {listing.price}
                  </div>
                  <h3 className="font-medium text-sm mt-1 truncate">
                    {listing.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {listing.location}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                    <Eye className="w-3.5 h-3.5" />
                    {listing.views.toLocaleString()} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right column (dashboard home only) */}
      <div className="hidden xl:block">
        <div className="xl:sticky xl:top-20">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
