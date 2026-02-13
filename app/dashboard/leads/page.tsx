//·app/dashboard/leads/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
  X,
  Copy,
  ExternalLink,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type LeadStatus = "new" | "contacted" | "qualified" | "closed";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  listing: string;
  location: string;
  message: string;
  receivedAt: string;
  status: LeadStatus;
};

const STORAGE_KEY = "eyb.leads.v1";

const seedLeads: Lead[] = [
  {
    id: "L-1042",
    name: "James Mitchell",
    email: "james.mitchell@email.com",
    phone: "+1 305 555 0192",
    listing: "2023 Sunseeker Predator 74",
    location: "Fort Lauderdale, FL",
    message:
      "Is the vessel available for a viewing next week? Interested in full specs and service history.",
    receivedAt: "Today · 09:12",
    status: "new",
  },
  {
    id: "L-1039",
    name: "Sofia Alvarez",
    email: "sofia.alvarez@email.com",
    phone: "+34 611 204 991",
    listing: "2022 Pershing 7X",
    location: "Ibiza, Spain",
    message:
      "Can you share the latest photos and confirm VAT status? Also curious about delivery options.",
    receivedAt: "Yesterday · 17:48",
    status: "contacted",
  },
  {
    id: "L-1036",
    name: "Oliver Bennett",
    email: "oliver.bennett@email.com",
    listing: "2021 Lagoon Seventy 7",
    location: "Mallorca, Spain",
    message:
      "Looking for a 77ft catamaran for summer. What is the charter history and maintenance schedule?",
    receivedAt: "Jan 31 · 11:03",
    status: "qualified",
  },
  {
    id: "L-1031",
    name: "Amélie Laurent",
    email: "amelie.laurent@email.com",
    phone: "+33 6 12 34 56 78",
    listing: "2020 Benetti Oasis 40M",
    location: "Antibes, France",
    message: "We’re considering an offer. Please advise on negotiation range and inclusions.",
    receivedAt: "Jan 29 · 15:20",
    status: "closed",
  },
];

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function statusLabel(s: LeadStatus) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function statusPillClass(status: LeadStatus) {
  return status === "new"
    ? "bg-emerald-100 text-emerald-700"
    : status === "contacted"
    ? "bg-blue-100 text-blue-700"
    : status === "qualified"
    ? "bg-amber-100 text-amber-700"
    : "bg-gray-100 text-gray-700";
}

function StatusPill({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusPillClass(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {statusLabel(status)}
    </span>
  );
}

export default function LeadsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LeadStatus | "all">("all");

  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [copied, setCopied] = useState<string | null>(null);

  // Load persisted leads once
  useEffect(() => {
    const stored = safeParse<{ data: Lead[] }>(window.localStorage.getItem(STORAGE_KEY));
    if (stored?.data?.length) setLeads(stored.data);
  }, []);

  function persist(next: Lead[]) {
    setLeads(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: next }));
  }

  const selectedLead = useMemo(
    () => leads.find((l) => l.id === selectedId) ?? null,
    [leads, selectedId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      const matchesStatus = status === "all" ? true : l.status === status;
      const matchesQuery =
        q.length === 0
          ? true
          : [l.name, l.email, l.listing, l.location, l.id, l.message].some((v) =>
              v.toLowerCase().includes(q)
            );

      return matchesStatus && matchesQuery;
    });
  }, [query, status, leads]);

  function openLead(id: string) {
    setSelectedId(id);
  }

  function closeLead() {
    setSelectedId(null);
    setCopied(null);
  }

  function updateStatus(id: string, nextStatus: LeadStatus) {
    const next = leads.map((l) => (l.id === id ? { ...l, status: nextStatus } : l));
    persist(next);
  }

  async function copyToClipboard(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      // If clipboard fails, do nothing (still avoids crashes)
    }
  }

  function mailtoForLead(l: Lead) {
    const subject = `EYB Inquiry · ${l.listing} · ${l.id}`;
    const body = `Hi ${l.name},%0D%0A%0D%0AThanks for your inquiry about ${l.listing}.%0D%0A%0D%0A—%0D%0A${l.message}%0D%0A%0D%0ABest,%0D%0A${"Marina Harbor"}`;
    return `mailto:${encodeURIComponent(l.email)}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight truncate">Leads & Inquiries</h1>
          <p className="text-muted-foreground mt-1">Track inbound leads from your listings</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" className="gap-2">
            Export
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            Create follow-up
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search leads, listings, email..."
            className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="h-10 pl-3 pr-9 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="closed">Closed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-70" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Lead
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Listing
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Received
              </th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">
                Status
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-sm truncate">{l.name}</div>
                        <div className="text-xs text-muted-foreground">{l.id}</div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="inline-flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {l.email}
                        </span>
                        {l.phone && (
                          <>
                            <span className="opacity-50">•</span>
                            <span className="inline-flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {l.phone}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {l.message}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="text-sm font-medium">{l.listing}</div>
                  <div className="text-xs text-muted-foreground">{l.location}</div>
                </td>

                <td className="px-4 py-3 text-sm text-muted-foreground">{l.receivedAt}</td>

                <td className="px-4 py-3">
                  <StatusPill status={l.status} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => openLead(l.id)}
                    >
                      View
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-lg"
                      onClick={() => openLead(l.id)}
                      aria-label="Open lead details"
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </Button>
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
                  No leads match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
        <span>
          Showing {filtered.length} of {leads.length} leads
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {/* Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeLead}
            aria-hidden="true"
          />

          <div className="relative w-[92vw] max-w-2xl bg-white rounded-2xl border border-border shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-lg truncate">{selectedLead.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedLead.id}</div>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <StatusPill status={selectedLead.status} />
                  <span className="text-xs text-muted-foreground">
                    Received {selectedLead.receivedAt}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeLead}
                className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Email</div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium truncate">{selectedLead.email}</div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedLead.email, "email")}
                        className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
                        aria-label="Copy email"
                      >
                        {copied === "email" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
                        href={mailtoForLead(selectedLead)}
                        aria-label="Email lead"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Phone</div>
                  {selectedLead.phone ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium truncate">{selectedLead.phone}</div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(selectedLead.phone!, "phone")}
                          className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
                          aria-label="Copy phone"
                        >
                          {copied === "phone" ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <a
                          className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground"
                          href={`tel:${selectedLead.phone}`}
                          aria-label="Call lead"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No phone provided</div>
                  )}
                </div>
              </div>

              {/* Listing */}
              <div className="p-4 rounded-xl border border-border">
                <div className="text-xs text-muted-foreground mb-1">Listing</div>
                <div className="text-sm font-medium">{selectedLead.listing}</div>
                <div className="text-xs text-muted-foreground mt-1">{selectedLead.location}</div>
              </div>

              {/* Message */}
              <div className="p-4 rounded-xl border border-border">
                <div className="text-xs text-muted-foreground mb-2">Message</div>
                <div className="text-sm leading-6 text-foreground whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

              {/* Status actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm font-medium">Update status</div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedLead.id, "new")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      selectedLead.status === "new"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : "bg-white border-border hover:bg-muted"
                    }`}
                  >
                    New
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedLead.id, "contacted")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      selectedLead.status === "contacted"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-white border-border hover:bg-muted"
                    }`}
                  >
                    Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedLead.id, "qualified")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      selectedLead.status === "qualified"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-white border-border hover:bg-muted"
                    }`}
                  >
                    Qualified
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedLead.id, "closed")}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      selectedLead.status === "closed"
                        ? "bg-gray-100 text-gray-800 border-gray-200"
                        : "bg-white border-border hover:bg-muted"
                    }`}
                  >
                    Closed
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-border flex items-center justify-end gap-2">
              <Button variant="outline" onClick={closeLead}>
                Close
              </Button>
              <a href={mailtoForLead(selectedLead)}>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                  Email lead
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
