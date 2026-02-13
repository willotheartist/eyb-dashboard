import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { 
    label: "Active Listings", 
    value: "12", 
    change: "+2 this month",
    trend: "up",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    )
  },
  {
    label: "New Leads",
    value: "23",
    change: "+18% vs last month",
    trend: "up",
    accent: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    )
  },
  {
    label: "Commission YTD",
    value: "€142,500",
    change: "€18,200 pending",
    trend: "neutral",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    )
  },
  { 
    label: "Total Views", 
    value: "8,492", 
    change: "+24% vs last month",
    trend: "up",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
];

const recentListings = [
  {
    id: 1,
    name: "Sunseeker Predator 74",
    year: "2023",
    location: "Monaco",
    price: "€2,950,000",
    status: "live",
    views: 1247,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Princess Y85",
    year: "2022",
    location: "Mallorca, Spain",
    price: "€5,200,000",
    status: "live",
    views: 892,
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Azimut Grande 27M",
    year: "2024",
    location: "Antibes, France",
    price: "€6,800,000",
    status: "pending",
    views: 0,
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Ferretti Yachts 670",
    year: "2021",
    location: "Sardinia, Italy",
    price: "€1,850,000",
    status: "sold",
    views: 3421,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Riva 90 Argo",
    year: "2023",
    location: "Monaco",
    price: "€7,900,000",
    status: "live",
    views: 2156,
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Pershing 7X",
    year: "2022",
    location: "Ibiza, Spain",
    price: "€3,800,000",
    status: "live",
    views: 678,
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop",
  },
];

const recentLeads = [
  {
    id: 1,
    name: "Marcus van der Berg",
    email: "marcus@example.com",
    yacht: "Sunseeker Predator 74",
    time: "2 hours ago",
    status: "new",
  },
  {
    id: 2,
    name: "Sophie Laurent",
    email: "sophie.l@example.com",
    yacht: "Princess Y85",
    time: "5 hours ago",
    status: "contacted",
  },
  {
    id: 3,
    name: "James Morrison",
    email: "j.morrison@example.com",
    yacht: "Riva 90 Argo",
    time: "Yesterday",
    status: "new",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-gray-900">
            Good morning, Marina
          </h1>
          <p className="text-[14px] text-gray-500 mt-1">
            Here&apos;s what&apos;s happening with your brokerage today
          </p>
        </div>

        <Link href="/dashboard/add-listing" className="shrink-0">
          <Button className="h-9 px-4 gap-2 bg-gray-900 text-white text-[13px] font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
            <Plus className="w-4 h-4" strokeWidth={2} />
            Add Listing
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-5 transition-all ${
              stat.accent
                ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
                : "bg-white border border-gray-200/60 hover:border-gray-300/80 hover:shadow-sm"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.accent ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                <span className={stat.accent ? "text-white" : "text-gray-600"}>
                  {stat.icon}
                </span>
              </div>
              {stat.trend === "up" && (
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  stat.accent ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-600"
                }`}>
                  ↑ Up
                </span>
              )}
            </div>

            <div className={`text-[13px] mb-1 ${stat.accent ? "text-blue-100" : "text-gray-500"}`}>
              {stat.label}
            </div>

            <div className={`text-[28px] font-semibold tracking-[-0.02em] ${stat.accent ? "text-white" : "text-gray-900"}`}>
              {stat.value}
            </div>

            <div className={`text-[12px] mt-2 ${stat.accent ? "text-blue-200" : "text-gray-400"}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Listings - Takes 2 columns */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200/60">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-[15px] font-semibold text-gray-900">Recent Listings</h2>
            <Link
              href="/dashboard/listings"
              className="text-[13px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentListings.map((listing) => (
              <Link
                href={`/dashboard/listings/${listing.id}`}
                key={listing.id}
                className="group rounded-xl border border-gray-200/60 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-sm ${
                        listing.status === "live"
                          ? "bg-emerald-500/90 text-white"
                          : listing.status === "pending"
                          ? "bg-amber-500/90 text-white"
                          : "bg-gray-500/90 text-white"
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="text-[15px] font-semibold text-gray-900 tracking-[-0.01em]">
                    {listing.price}
                  </div>
                  <h3 className="text-[13px] font-medium text-gray-700 mt-0.5 truncate">
                    {listing.year} {listing.name}
                  </h3>
                  <p className="text-[12px] text-gray-400 mt-0.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {listing.location}
                  </p>
                  <div className="flex items-center gap-1 mt-2.5 text-[11px] text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {listing.views.toLocaleString()} views
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Leads - Takes 1 column */}
        <div className="bg-white rounded-2xl border border-gray-200/60">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-[15px] font-semibold text-gray-900">Recent Leads</h2>
            <Link
              href="/dashboard/leads"
              className="text-[13px] text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View all
            </Link>
          </div>

          <div className="p-2">
            {recentLeads.map((lead, index) => (
              <div
                key={lead.id}
                className={`p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== recentLeads.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-[12px] font-medium text-gray-600 shrink-0">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium text-gray-900 truncate">{lead.name}</span>
                      {lead.status === "new" && (
                        <span className="shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 truncate mt-0.5">{lead.yacht}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{lead.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4">
            <button className="w-full py-2.5 text-[13px] font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              View all leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
