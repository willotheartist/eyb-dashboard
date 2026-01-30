// app/dashboard/layout.tsx

import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <div className="flex pt-16">
        {/* Left sidebar: hidden on mobile */}
        <Sidebar />

        {/* Main content
            - mobile: full width
            - desktop: leaves space for fixed left sidebar (w-56)
            - no right margin anymore (RightSidebar is NOT global)
        */}
        <main className="flex-1 p-4 sm:p-6 md:ml-56">{children}</main>
      </div>
    </div>
  );
}
