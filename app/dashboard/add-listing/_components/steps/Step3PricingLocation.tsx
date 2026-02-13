//·app/dashboard/add-listing/_components/steps/Step3PricingLocation.tsx
"use client";

import type { FormData } from "../../_types/listing";
import { COUNTRIES, CURRENCIES } from "../../_data/options";

export default function Step3PricingLocation({
  form,
  updateForm,
}: {
  form: FormData;
  updateForm: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-semibold text-lg">Pricing & location</div>
        <div className="text-sm text-muted-foreground mt-1">
          Set where the boat is and how it’s priced.
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Select
          label="Country"
          value={form.country}
          onChange={(v) => updateForm({ country: v })}
          options={["", ...COUNTRIES]}
          required
        />
        <Field
          label="City / Area"
          value={form.location}
          onChange={(v) => updateForm({ location: v })}
          placeholder="e.g. Palma, Mallorca"
          required
        />

        <Field
          label="Marina (optional)"
          value={form.marina}
          onChange={(v) => updateForm({ marina: v })}
          placeholder="e.g. Puerto Portals"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field
            label="Price"
            value={form.price}
            onChange={(v) => updateForm({ price: v })}
            placeholder="e.g. 3250000"
          />
          <Select
            label="Currency"
            value={form.currency}
            onChange={(v) => updateForm({ currency: v })}
            options={CURRENCIES.map((c) => c.code)}
          />
          <Select
            label="Price type"
            value={form.priceType}
            onChange={(v) => updateForm({ priceType: v as any })}
            options={["fixed", "negotiable", "poa"]}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            id="acceptOffers"
            type="checkbox"
            checked={form.acceptOffers}
            onChange={(e) => updateForm({ acceptOffers: e.target.checked })}
            className="h-4 w-4"
          />
          <label htmlFor="acceptOffers" className="text-sm">
            Accept offers
          </label>
        </div>
      </div>
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

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">
        {label} {required ? <span className="text-red-600">*</span> : null}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "" ? "Select..." : o}
          </option>
        ))}
      </select>
    </label>
  );
}
