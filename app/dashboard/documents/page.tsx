//·app/dashboard/documents/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  FileText,
  Shield,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type DocCategory =
  | "Listing Agreements"
  | "Sales Contracts"
  | "Commission & Fees"
  | "Compliance"
  | "Brand Assets"
  | "Other";

type DocRegion = "Global" | "EU" | "UK" | "US" | "UAE";

type DocumentItem = {
  id: string;
  title: string;
  category: DocCategory;
  region: DocRegion;
  fileType: "PDF" | "DOCX" | "XLSX" | "ZIP";
  updatedAt: string; // keep simple for now
  size: string;
  href: string; // points to /public/documents/...
  description?: string;
};

const docs: DocumentItem[] = [
  {
    id: "DOC-001",
    title: "Exclusive Listing Agreement (Template)",
    category: "Listing Agreements",
    region: "Global",
    fileType: "PDF",
    updatedAt: "Feb 2, 2026",
    size: "182 KB",
    href: "/documents/exclusive-listing-agreement-template.pdf",
    description: "Standard exclusive listing agreement template for partners.",
  },
  {
    id: "DOC-002",
    title: "Non-Exclusive Listing Agreement (Template)",
    category: "Listing Agreements",
    region: "Global",
    fileType: "PDF",
    updatedAt: "Jan 28, 2026",
    size: "164 KB",
    href: "/documents/non-exclusive-listing-agreement-template.pdf",
    description: "Non-exclusive listing agreement template.",
  },
  {
    id: "DOC-003",
    title: "Sales & Purchase Agreement (SPA) – Yacht",
    category: "Sales Contracts",
    region: "EU",
    fileType: "PDF",
    updatedAt: "Jan 20, 2026",
    size: "244 KB",
    href: "/documents/sales-purchase-agreement-yacht-eu.pdf",
    description: "EU SPA template for yacht sales.",
  },
  {
    id: "DOC-004",
    title: "Commission Schedule & Fee Structure",
    category: "Commission & Fees",
    region: "Global",
    fileType: "PDF",
    updatedAt: "Dec 18, 2025",
    size: "98 KB",
    href: "/documents/commission-schedule-fees.pdf",
    description: "Reference sheet for commissions, fees, and payout timings.",
  },
  {
    id: "DOC-005",
    title: "KYC / AML Compliance Checklist",
    category: "Compliance",
    region: "UK",
    fileType: "PDF",
    updatedAt: "Nov 30, 2025",
    size: "120 KB",
    href: "/documents/kyc-aml-checklist-uk.pdf",
    description: "Partner checklist for onboarding clients and compliance.",
  },
  {
    id: "DOC-006",
    title: "EYB Partner Brand Pack",
    category: "Brand Assets",
    region: "Global",
    fileType: "ZIP",
    updatedAt: "Oct 9, 2025",
    size: "12.4 MB",
    href: "/documents/eyb-partner-brand-pack.zip",
    description: "Logos, social templates, and brand guidelines.",
  },
];

function typeBadgeClass(fileType: DocumentItem["fileType"]) {
  if (fileType === "PDF") return "bg-red-50 text-red-700 border-red-100";
  if (fileType === "DOCX") return "bg-blue-50 text-blue-700 border-blue-100";
  if (fileType === "XLSX") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  return "bg-gray-50 text-gray-700 border-gray-100";
}

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DocCategory | "all">("all");
  const [region, setRegion] = useState<DocRegion | "all">("all");

  const categories = useMemo(() => {
    const set = new Set<DocCategory>();
    docs.forEach((d) => set.add(d.category));
    return Array.from(set);
  }, []);

  const regions = useMemo(() => {
    const set = new Set<DocRegion>();
    docs.forEach((d) => set.add(d.region));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return docs.filter((d) => {
      const matchesCategory = category === "all" ? true : d.category === category;
      const matchesRegion = region === "all" ? true : d.region === region;

      const matchesQuery =
        q.length === 0
          ? true
          : [d.title, d.id, d.category, d.region, d.fileType, d.description ?? ""]
              .join(" ")
              .toLowerCase()
              .includes(q);

      return matchesCategory && matchesRegion && matchesQuery;
    });
  }, [query, category, region]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight truncate">
            Documents & Contracts
          </h1>
          <p className="text-muted-foreground mt-1">
            Listing agreements, contracts, templates and downloadable resources
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            Documents are read-only for partners (admin upload later).
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" className="gap-2">
            Request a document
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search documents, IDs, categories..."
            className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Category</div>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="h-10 pl-3 pr-9 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-70" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">Region</div>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as any)}
                className="h-10 pl-3 pr-9 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-70" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Document
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Category
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Region
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Updated
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-sm truncate">{d.title}</div>
                        <div className="text-xs text-muted-foreground">{d.id}</div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${typeBadgeClass(
                            d.fileType
                          )}`}
                        >
                          {d.fileType}
                        </span>
                      </div>

                      {d.description && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {d.description}
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground mt-1">
                        Size: {d.size}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="text-sm font-medium">{d.category}</div>
                </td>

                <td className="px-4 py-3">
                  <div className="text-sm text-muted-foreground">{d.region}</div>
                </td>

                <td className="px-4 py-3">
                  <div className="text-sm text-muted-foreground">{d.updatedAt}</div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <a href={d.href} download className="inline-block">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-muted-foreground"
                >
                  No documents match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <span>
          Showing {filtered.length} of {docs.length} documents
        </span>
        <div className="text-xs text-muted-foreground">
          Add files to <span className="font-medium text-foreground">/public/documents</span>
        </div>
      </div>
    </div>
  );
}
