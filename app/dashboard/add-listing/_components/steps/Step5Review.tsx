//·app/dashboard/add-listing/_components/steps/Step5Review.tsx
"use client";

import type { FormData } from "../../_types/listing";
import { Button } from "@/components/ui/button";

export default function Step5Review({
  form,
  onEditStep,
}: {
  form: FormData;
  onEditStep: (s: 1 | 2 | 3 | 4) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-semibold text-lg">Review</div>
        <div className="text-sm text-muted-foreground mt-1">
          Check the details before submitting.
        </div>
      </div>

      <Section title="Type" onEdit={() => onEditStep(1)}>
        <Row label="Listing type" value={form.listingType ?? "—"} />
        <Row label="Boat category" value={form.boatCategory ?? "—"} />
      </Section>

      <Section title="Basics" onEdit={() => onEditStep(2)}>
        <Row label="Title" value={form.title || "—"} />
        <Row label="Brand / Model" value={`${form.brand || "—"} ${form.model || ""}`} />
        <Row label="Year" value={form.year || "—"} />
        <Row label="Length" value={[form.lengthFt ? `${form.lengthFt} ft` : "", form.lengthM ? `${form.lengthM} m` : ""].filter(Boolean).join(" / ") || "—"} />
        <Row label="Engines" value={`${form.engineCount || "—"} × ${form.engineMake || "—"} ${form.engineModel || ""} ${form.enginePower ? `(${form.enginePower} hp)` : ""}`} />
      </Section>

      <Section title="Pricing & location" onEdit={() => onEditStep(3)}>
        <Row label="Country" value={form.country || "—"} />
        <Row label="City / Area" value={form.location || "—"} />
        <Row label="Marina" value={form.marina || "—"} />
        <Row
          label="Price"
          value={
            form.priceType === "poa"
              ? "POA"
              : `${form.currency} ${form.price || "—"} (${form.priceType})`
          }
        />
        <Row label="Accept offers" value={form.acceptOffers ? "Yes" : "No"} />
      </Section>

      <Section title="Media & seller" onEdit={() => onEditStep(4)}>
        <Row label="Photos" value={form.photos.length ? `${form.photos.length} uploaded` : "None"} />
        <Row label="Video" value={form.videoUrl || "—"} />
        <Row label="Features" value={form.features.length ? form.features.join(", ") : "—"} />
        <Row label="Seller email" value={form.sellerEmail || "—"} />
        <Row label="Seller phone" value={form.sellerPhone || "—"} />
        <Row label="WhatsApp" value={form.sellerWhatsapp ? "Yes" : "No"} />
      </Section>

      <div className="pt-2">
        <div className="text-xs text-muted-foreground">
          Submitting is mocked for now — next step is wiring this to your backend and syncing
          with SellYourBoatEYB listings.
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-right max-w-[65%] break-words">
        {value}
      </div>
    </div>
  );
}
