//·app/dashboard/add-listing/_components/steps/Step4MediaSeller.tsx
"use client";

import * as React from "react";
import { X, Upload, Link as LinkIcon } from "lucide-react";
import type { FormData } from "../../_types/listing";
import { FEATURE_OPTIONS } from "../../_data/options";

export default function Step4MediaSeller({
  form,
  updateForm,
}: {
  form: FormData;
  updateForm: (updates: Partial<FormData>) => void;
}) {
  const previews = React.useMemo(() => {
    const urls = form.photos.map((f) => URL.createObjectURL(f));
    return urls;
  }, [form.photos]);

  React.useEffect(() => {
    return () => {
      previews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [previews]);

  function addPhotos(files: FileList | null) {
    if (!files || files.length === 0) return;
    const next = Array.from(files).slice(0, 12);
    updateForm({ photos: [...form.photos, ...next] });
  }

  function removePhoto(idx: number) {
    const next = [...form.photos];
    next.splice(idx, 1);
    updateForm({ photos: next });
  }

  function toggleFeature(feature: string) {
    const has = form.features.includes(feature);
    updateForm({
      features: has
        ? form.features.filter((f) => f !== feature)
        : [...form.features, feature],
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="font-semibold text-lg">Media, features & seller</div>
        <div className="text-sm text-muted-foreground mt-1">
          Upload photos, add key features, and provide contact details.
        </div>
      </div>

      {/* Photos */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Photos</div>
            <div className="text-sm text-muted-foreground">Up to 12 photos for now.</div>
          </div>

          <label className="inline-flex items-center gap-2 px-3 h-10 rounded-lg border border-border hover:bg-muted/30 cursor-pointer text-sm font-medium">
            <Upload className="w-4 h-4" />
            Upload
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addPhotos(e.target.files)}
            />
          </label>
        </div>

        {form.photos.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-border text-sm text-muted-foreground">
            No photos yet. Upload a few to make the listing stand out.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {previews.map((src, idx) => (
              <div key={src} className="relative rounded-xl overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Photo ${idx + 1}`} className="w-full h-32 object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/90 border border-border flex items-center justify-center"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="space-y-3">
        <div>
          <div className="font-semibold">Key features</div>
          <div className="text-sm text-muted-foreground">Select what applies.</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FEATURE_OPTIONS.map((f) => {
            const active = form.features.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleFeature(f)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  active ? "border-blue-600 bg-blue-50" : "border-border hover:bg-muted/30"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* Description */}
      <section className="space-y-3">
        <div className="font-semibold">Description</div>
        <textarea
          value={form.description}
          onChange={(e) => updateForm({ description: e.target.value })}
          placeholder="Write a compelling overview of the vessel, condition, usage, and why buyers should care..."
          className="w-full min-h-32 p-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </section>

      {/* Video */}
      <section className="space-y-3">
        <div className="font-semibold">Video URL (optional)</div>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={form.videoUrl}
            onChange={(e) => updateForm({ videoUrl: e.target.value })}
            placeholder="https://youtube.com/..."
            className="w-full h-10 pl-10 pr-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* Seller */}
      <section className="space-y-4">
        <div>
          <div className="font-semibold">Seller contact</div>
          <div className="text-sm text-muted-foreground">
            This is what buyers will use to reach you.
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Field label="Name" value={form.sellerName} onChange={(v) => updateForm({ sellerName: v })} />
          <Field label="Company" value={form.sellerCompany} onChange={(v) => updateForm({ sellerCompany: v })} />

          <Field
            label="Email"
            value={form.sellerEmail}
            onChange={(v) => updateForm({ sellerEmail: v })}
            required
          />
          <Field
            label="Phone"
            value={form.sellerPhone}
            onChange={(v) => updateForm({ sellerPhone: v })}
          />

          <Field
            label="Website (optional)"
            value={form.sellerWebsite}
            onChange={(v) => updateForm({ sellerWebsite: v })}
            placeholder="https://..."
          />

          <div className="flex items-center gap-3 pt-2">
            <input
              id="sellerWhatsapp"
              type="checkbox"
              checked={form.sellerWhatsapp}
              onChange={(e) => updateForm({ sellerWhatsapp: e.target.checked })}
              className="h-4 w-4"
            />
            <label htmlFor="sellerWhatsapp" className="text-sm">
              WhatsApp available
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </label>
  );
}
