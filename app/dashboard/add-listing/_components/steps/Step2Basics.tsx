//·app/dashboard/add-listing/_components/steps/Step2Basics.tsx
"use client";

import type { FormData } from "../../_types/listing";
import { BOAT_CATEGORIES, BRANDS } from "../../_data/options";

export default function Step2Basics({
  form,
  updateForm,
}: {
  form: FormData;
  updateForm: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <div className="font-semibold text-lg">Basic information</div>
        <div className="text-sm text-muted-foreground mt-1">
          Title, brand/model and key specs.
        </div>
      </div>

      {form.listingType === "sale" || form.listingType === "charter" ? (
        <div className="space-y-3">
          <div className="text-sm font-medium">Boat category</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BOAT_CATEGORIES.map((c) => {
              const selected = form.boatCategory === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => updateForm({ boatCategory: c.id as any })}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selected ? "border-blue-600 bg-blue-50" : "border-border hover:bg-muted/30"
                  }`}
                >
                  <span className="mr-2">{c.icon}</span>
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Field
          label="Title"
          value={form.title}
          onChange={(v) => updateForm({ title: v })}
          placeholder="e.g. 2022 Princess Y85 – Immaculate Condition"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Brand"
            value={form.brand}
            onChange={(v) => updateForm({ brand: v })}
            options={BRANDS}
          />
          <Field
            label="Model"
            value={form.model}
            onChange={(v) => updateForm({ model: v })}
            placeholder="e.g. Y85"
          />
          <Field
            label="Year"
            value={form.year}
            onChange={(v) => updateForm({ year: v })}
            placeholder="e.g. 2022"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Condition"
            value={form.condition}
            onChange={(v) => updateForm({ condition: v as any })}
            options={["", "new", "used"]}
          />
          <Field
            label="Length (ft)"
            value={form.lengthFt}
            onChange={(v) => updateForm({ lengthFt: v })}
            placeholder="e.g. 74"
          />
          <Field
            label="Length (m)"
            value={form.lengthM}
            onChange={(v) => updateForm({ lengthM: v })}
            placeholder="e.g. 22.6"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Field
            label="Engine make"
            value={form.engineMake}
            onChange={(v) => updateForm({ engineMake: v })}
            placeholder="e.g. MAN"
          />
          <Field
            label="Engine model"
            value={form.engineModel}
            onChange={(v) => updateForm({ engineModel: v })}
            placeholder="e.g. V12"
          />
          <Field
            label="Power (hp)"
            value={form.enginePower}
            onChange={(v) => updateForm({ enginePower: v })}
            placeholder="e.g. 1550"
          />
          <Field
            label="Count"
            value={form.engineCount}
            onChange={(v) => updateForm({ engineCount: v })}
            placeholder="e.g. 2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field
            label="Cabins"
            value={form.cabins}
            onChange={(v) => updateForm({ cabins: v })}
            placeholder="e.g. 4"
          />
          <Field
            label="Berths"
            value={form.berths}
            onChange={(v) => updateForm({ berths: v })}
            placeholder="e.g. 8"
          />
          <Field
            label="Heads"
            value={form.heads}
            onChange={(v) => updateForm({ heads: v })}
            placeholder="e.g. 3"
          />
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
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
