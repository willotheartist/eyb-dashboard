//·app/dashboard/add-listing/ListingWizard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import type { FormData, ListingType } from "@/app/add-listing/_types/listing";
import { initialFormData } from "@/app/add-listing/_types/listing";
import {
  LISTING_TYPES,
  BOAT_CATEGORIES,
  CHARTER_TYPES,
  SERVICE_CATEGORIES,
  BRANDS,
  HULL_MATERIALS,
  HULL_TYPES,
  FUEL_TYPES,
  CURRENCIES,
  COUNTRIES,
  TAX_STATUSES,
  FEATURE_OPTIONS,
  ELECTRONICS_OPTIONS,
  SAFETY_OPTIONS,
  CHARTER_INCLUDED_OPTIONS,
} from "@/app/add-listing/_data/options";

type StepId =
  | "type"
  | "category"
  | "details"
  | "specs"
  | "equipment"
  | "pricing"
  | "media"
  | "description"
  | "seller"
  | "review";

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: "type", title: "Listing type", subtitle: "Sale, charter, service, parts" },
  { id: "category", title: "Category", subtitle: "Boat, charter type, service type" },
  { id: "details", title: "Details", subtitle: "Make, model, year, condition" },
  { id: "specs", title: "Specs", subtitle: "Dimensions, hull, engine" },
  { id: "equipment", title: "Equipment", subtitle: "Features, electronics, safety" },
  { id: "pricing", title: "Pricing", subtitle: "Price, tax status, location" },
  { id: "media", title: "Media", subtitle: "Photos, video, virtual tour" },
  { id: "description", title: "Description", subtitle: "Highlights, recent works" },
  { id: "seller", title: "Seller", subtitle: "Contact details" },
  { id: "review", title: "Review", subtitle: "Check everything before submitting" },
];

const STORAGE_KEY = "eyb.dashboard.addListing.v2";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function clampNumberString(v: string) {
  return v.replace(/[^\d.]/g, "");
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getCurrencySymbol(code: string) {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? "";
}

function isFilled(v: string | null | undefined) {
  return !!(v && v.toString().trim().length > 0);
}

export default function ListingWizard() {
  const [step, setStep] = React.useState<StepId>("type");
  const [form, setForm] = React.useState<FormData>(initialFormData);

  const [isSaving, setIsSaving] = React.useState(false);
  const [savedTick, setSavedTick] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = safeParse<{ data: FormData }>(
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    );
    if (stored?.data) {
      setForm({ ...initialFormData, ...stored.data });
    }
  }, []);

  const stepIndex = React.useMemo(
    () => STEPS.findIndex((s) => s.id === step),
    [step]
  );

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function patch(updates: Partial<FormData>) {
    setForm((f) => ({ ...f, ...updates }));
  }

  function resetDraft() {
    setError(null);
    setForm(initialFormData);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setStep("type");
  }

  async function saveDraft() {
    setError(null);
    setIsSaving(true);
    setSavedTick(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: form }));
      await new Promise((r) => setTimeout(r, 200));
      setSavedTick(true);
      window.setTimeout(() => setSavedTick(false), 1200);
    } catch {
      setError("Could not save draft. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function goNext() {
    const next = STEPS[stepIndex + 1]?.id;
    if (next) setStep(next);
  }

  function goBack() {
    const prev = STEPS[stepIndex - 1]?.id;
    if (prev) setStep(prev);
  }

  const validation = React.useMemo(() => validateStep(step, form), [step, form]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight truncate">Add Listing</h1>
          <p className="text-muted-foreground mt-1">
            Build a complete listing with equipment, pricing, media and seller info
          </p>
          {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/dashboard/listings">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Listings
            </Button>
          </Link>

          <Button
            onClick={resetDraft}
            variant="outline"
            className="gap-2"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
            Reset
          </Button>

          <Button
            onClick={saveDraft}
            disabled={isSaving}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            type="button"
          >
            {savedTick ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : savedTick ? "Saved" : "Save Draft"}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold">{STEPS[stepIndex]?.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {STEPS[stepIndex]?.subtitle}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span>Step</span>
              <span className="text-foreground font-medium">
                {stepIndex + 1}/{STEPS.length}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <StepPills active={step} onStep={setStep} />
          </div>
        </div>

        <div className="p-5">
          {step === "type" && (
            <div className="space-y-4">
              <div className="text-sm font-medium">Choose listing type</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {LISTING_TYPES.map((t) => {
                  const Icon = t.icon;
                  const active = form.listingType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        // reset branch-specific fields on type change
                        patch({
                          listingType: t.id,
                          boatCategory: null,
                          charterType: null,
                          serviceCategory: null,
                        });
                      }}
                      className={cx(
                        "text-left p-4 rounded-xl border transition-all",
                        active
                          ? "border-blue-600 bg-blue-50"
                          : "border-border bg-white hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cx(
                            "w-10 h-10 rounded-xl flex items-center justify-center text-white",
                            t.color
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm">{t.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {t.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "category" && (
            <div className="space-y-6">
              {form.listingType === "sale" && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Boat category</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {BOAT_CATEGORIES.map((c) => {
                      const active = form.boatCategory === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update("boatCategory", c.id as any)}
                          className={cx(
                            "p-4 rounded-xl border text-left transition-all",
                            active
                              ? "border-blue-600 bg-blue-50"
                              : "border-border bg-white hover:bg-muted/30"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-sm">{c.label}</div>
                            <div className="text-lg">{c.icon}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {form.listingType === "charter" && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Charter type</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CHARTER_TYPES.map((c) => {
                      const active = form.charterType === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update("charterType", c.id as any)}
                          className={cx(
                            "p-4 rounded-xl border text-left transition-all",
                            active
                              ? "border-blue-600 bg-blue-50"
                              : "border-border bg-white hover:bg-muted/30"
                          )}
                        >
                          <div className="font-semibold text-sm">{c.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {c.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {form.listingType === "service" && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Service category</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SERVICE_CATEGORIES.map((s) => {
                      const Icon = s.icon;
                      const active = form.serviceCategory === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => update("serviceCategory", s.id as any)}
                          className={cx(
                            "p-4 rounded-xl border text-left transition-all",
                            active
                              ? "border-blue-600 bg-blue-50"
                              : "border-border bg-white hover:bg-muted/30"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm">{s.label}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {form.listingType === "parts" && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">Parts basics</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Field
                      label="Parts category"
                      value={form.partsCategory}
                      onChange={(v) => update("partsCategory", v)}
                      placeholder="e.g. Winch, GPS, Propeller..."
                    />
                    <SelectField
                      label="Condition"
                      value={form.partsCondition}
                      onChange={(v) => update("partsCondition", v as any)}
                      options={[
                        { value: "", label: "Select…" },
                        { value: "new", label: "New" },
                        { value: "used", label: "Used" },
                        { value: "refurbished", label: "Refurbished" },
                      ]}
                    />
                    <Field
                      label="Compatibility"
                      value={form.partsCompatibility}
                      onChange={(v) => update("partsCompatibility", v)}
                      placeholder="e.g. Fits Sunseeker 74 / Volvo Penta..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "details" && (
            <div className="space-y-6">
              {(form.listingType === "sale" || form.listingType === "charter") && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <SelectField
                    label="Make (brand)"
                    value={form.brand}
                    onChange={(v) => update("brand", v)}
                    options={[
                      { value: "", label: "Select…" },
                      ...BRANDS.map((b) => ({ value: b, label: b })),
                    ]}
                  />
                  <Field
                    label="Model"
                    value={form.model}
                    onChange={(v) => update("model", v)}
                    placeholder="e.g. Predator 74"
                  />
                  <Field
                    label="Year"
                    value={form.year}
                    onChange={(v) => update("year", clampNumberString(v))}
                    placeholder="e.g. 2023"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Field
                  label="Title"
                  value={form.title}
                  onChange={(v) => update("title", v)}
                  placeholder="e.g. 2023 Sunseeker Predator 74"
                />

                <SelectField
                  label="Condition"
                  value={form.condition}
                  onChange={(v) => update("condition", v as any)}
                  options={[
                    { value: "", label: "Select…" },
                    { value: "new", label: "New" },
                    { value: "used", label: "Used" },
                  ]}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Cabins"
                    value={form.cabins}
                    onChange={(v) => update("cabins", clampNumberString(v))}
                    placeholder="e.g. 4"
                  />
                  <Field
                    label="Heads"
                    value={form.heads}
                    onChange={(v) => update("heads", clampNumberString(v))}
                    placeholder="e.g. 3"
                  />
                </div>
              </div>

              {form.listingType === "charter" && (
                <div className="bg-muted/20 border border-border rounded-xl p-4 space-y-4">
                  <div className="text-sm font-semibold">Charter details</div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Field
                      label="Guests"
                      value={form.charterGuests}
                      onChange={(v) => update("charterGuests", clampNumberString(v))}
                      placeholder="e.g. 10"
                    />
                    <Field
                      label="Crew"
                      value={form.charterCrew}
                      onChange={(v) => update("charterCrew", clampNumberString(v))}
                      placeholder="e.g. 2"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Field
                        label="Base price"
                        value={form.charterBasePrice}
                        onChange={(v) => update("charterBasePrice", clampNumberString(v))}
                        placeholder="e.g. 15000"
                      />
                      <SelectField
                        label="Per"
                        value={form.charterPricePeriod}
                        onChange={(v) => update("charterPricePeriod", v as any)}
                        options={[
                          { value: "hour", label: "Hour" },
                          { value: "day", label: "Day" },
                          { value: "week", label: "Week" },
                        ]}
                      />
                    </div>
                    <Field
                      label="Available from"
                      value={form.charterAvailableFrom}
                      onChange={(v) => update("charterAvailableFrom", v)}
                      placeholder="e.g. 2026-06-01"
                    />
                    <Field
                      label="Available to"
                      value={form.charterAvailableTo}
                      onChange={(v) => update("charterAvailableTo", v)}
                      placeholder="e.g. 2026-09-30"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <MultiSelect
                      label="Included"
                      value={form.charterIncluded}
                      options={CHARTER_INCLUDED_OPTIONS}
                      onChange={(next) => update("charterIncluded", next)}
                      hint="What’s included in the base price"
                    />
                    <ExtrasEditor
                      value={form.charterExtras}
                      onChange={(next) => update("charterExtras", next)}
                    />
                  </div>
                </div>
              )}

              {form.listingType === "service" && (
                <div className="bg-muted/20 border border-border rounded-xl p-4 space-y-4">
                  <div className="text-sm font-semibold">Service details</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Field
                      label="Service name"
                      value={form.serviceName}
                      onChange={(v) => update("serviceName", v)}
                      placeholder="e.g. Yacht Survey & Valuation"
                    />
                    <Field
                      label="Experience"
                      value={form.serviceExperience}
                      onChange={(v) => update("serviceExperience", v)}
                      placeholder="e.g. 10+ years"
                    />
                    <TagsInput
                      label="Service areas"
                      value={form.serviceAreas}
                      onChange={(next) => update("serviceAreas", next)}
                      placeholder="Add area and press Enter"
                    />
                    <TagsInput
                      label="Certifications"
                      value={form.serviceCertifications}
                      onChange={(next) => update("serviceCertifications", next)}
                      placeholder="Add certification and press Enter"
                    />
                  </div>
                  <label className="block">
                    <div className="text-sm font-medium mb-2">Service description</div>
                    <textarea
                      value={form.serviceDescription}
                      onChange={(e) => update("serviceDescription", e.target.value)}
                      placeholder="Describe what you offer, response times, coverage, and pricing approach..."
                      className="w-full min-h-[140px] p-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {step === "specs" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Length (ft)"
                    value={form.lengthFt}
                    onChange={(v) => update("lengthFt", clampNumberString(v))}
                    placeholder="e.g. 74"
                  />
                  <Field
                    label="Length (m)"
                    value={form.lengthM}
                    onChange={(v) => update("lengthM", clampNumberString(v))}
                    placeholder="e.g. 22.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Beam (ft)"
                    value={form.beamFt}
                    onChange={(v) => update("beamFt", clampNumberString(v))}
                    placeholder="e.g. 18"
                  />
                  <Field
                    label="Beam (m)"
                    value={form.beamM}
                    onChange={(v) => update("beamM", clampNumberString(v))}
                    placeholder="e.g. 5.5"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Draft (ft)"
                    value={form.draftFt}
                    onChange={(v) => update("draftFt", clampNumberString(v))}
                    placeholder="e.g. 6"
                  />
                  <Field
                    label="Draft (m)"
                    value={form.draftM}
                    onChange={(v) => update("draftM", clampNumberString(v))}
                    placeholder="e.g. 1.9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <SelectField
                  label="Hull material"
                  value={form.hullMaterial}
                  onChange={(v) => update("hullMaterial", v)}
                  options={[
                    { value: "", label: "Select…" },
                    ...HULL_MATERIALS.map((m) => ({ value: m, label: m })),
                  ]}
                />
                <SelectField
                  label="Hull type"
                  value={form.hullType}
                  onChange={(v) => update("hullType", v)}
                  options={[
                    { value: "", label: "Select…" },
                    ...HULL_TYPES.map((h) => ({ value: h, label: h })),
                  ]}
                />
                <Field
                  label="Hull color"
                  value={form.hullColor}
                  onChange={(v) => update("hullColor", v)}
                  placeholder="e.g. White / Navy"
                />
              </div>

              <div className="bg-muted/20 border border-border rounded-xl p-4 space-y-4">
                <div className="text-sm font-semibold">Engine</div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Field
                    label="Engine make"
                    value={form.engineMake}
                    onChange={(v) => update("engineMake", v)}
                    placeholder="e.g. Volvo Penta"
                  />
                  <Field
                    label="Engine model"
                    value={form.engineModel}
                    onChange={(v) => update("engineModel", v)}
                    placeholder="e.g. D13"
                  />
                  <Field
                    label="Engine power"
                    value={form.enginePower}
                    onChange={(v) => update("enginePower", v)}
                    placeholder="e.g. 900 HP"
                  />
                  <Field
                    label="Engine count"
                    value={form.engineCount}
                    onChange={(v) => update("engineCount", clampNumberString(v))}
                    placeholder="e.g. 2"
                  />
                  <Field
                    label="Engine hours"
                    value={form.engineHours}
                    onChange={(v) => update("engineHours", clampNumberString(v))}
                    placeholder="e.g. 640"
                  />
                  <SelectField
                    label="Fuel type"
                    value={form.fuelType}
                    onChange={(v) => update("fuelType", v)}
                    options={[
                      { value: "", label: "Select…" },
                      ...FUEL_TYPES.map((f) => ({ value: f, label: f })),
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {step === "equipment" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <MultiSelect
                label="Features"
                hint="Comfort, deck hardware, handling"
                value={form.features}
                options={FEATURE_OPTIONS}
                onChange={(next) => update("features", next)}
              />
              <MultiSelect
                label="Electronics"
                hint="Navigation, comms, audio"
                value={form.electronics}
                options={ELECTRONICS_OPTIONS}
                onChange={(next) => update("electronics", next)}
              />
              <MultiSelect
                label="Safety"
                hint="Life-saving, pumps, detectors"
                value={form.safetyEquipment}
                options={SAFETY_OPTIONS}
                onChange={(next) => update("safetyEquipment", next)}
              />
              <div className="xl:col-span-3">
                <label className="block">
                  <div className="text-sm font-medium mb-2">Custom notes</div>
                  <textarea
                    value={form.customFeatures}
                    onChange={(e) => update("customFeatures", e.target.value)}
                    placeholder="Anything unique worth calling out (refits, upgrades, rare options)..."
                    className="w-full min-h-[120px] p-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </label>
              </div>
            </div>
          )}

          {step === "pricing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <Field
                  label="Price"
                  value={form.price}
                  onChange={(v) => update("price", clampNumberString(v))}
                  placeholder="e.g. 3250000"
                  leftAddon={getCurrencySymbol(form.currency)}
                />
                <SelectField
                  label="Currency"
                  value={form.currency}
                  onChange={(v) => update("currency", v)}
                  options={CURRENCIES.map((c) => ({ value: c.code, label: `${c.code} — ${c.label}` }))}
                />
                <SelectField
                  label="Price type"
                  value={form.priceType}
                  onChange={(v) => update("priceType", v as any)}
                  options={[
                    { value: "fixed", label: "Fixed" },
                    { value: "negotiable", label: "Negotiable" },
                    { value: "poa", label: "POA" },
                    { value: "auction", label: "Auction" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <SelectField
                  label="Tax status"
                  value={form.taxStatus}
                  onChange={(v) => update("taxStatus", v)}
                  options={[
                    { value: "", label: "Select…" },
                    ...TAX_STATUSES.map((t) => ({ value: t, label: t })),
                  ]}
                />
                <SelectField
                  label="Country"
                  value={form.country}
                  onChange={(v) => update("country", v)}
                  options={[
                    { value: "", label: "Select…" },
                    ...COUNTRIES.map((c) => ({ value: c, label: c })),
                  ]}
                />
                <Field
                  label="City / Area"
                  value={form.location}
                  onChange={(v) => update("location", v)}
                  placeholder="e.g. Fort Lauderdale"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Field
                  label="Marina"
                  value={form.marina}
                  onChange={(v) => update("marina", v)}
                  placeholder="e.g. Pier 66"
                />
                <SelectField
                  label="Lying"
                  value={form.lying}
                  onChange={(v) => update("lying", v as any)}
                  options={[
                    { value: "", label: "Select…" },
                    { value: "afloat", label: "Afloat" },
                    { value: "ashore", label: "Ashore" },
                  ]}
                />
              </div>
            </div>
          )}

          {step === "media" && (
            <div className="space-y-6">
              <div className="bg-muted/20 border border-border rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">Photos</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      For now we store selected files locally (draft). Next step is UploadThing/S3.
                    </div>
                  </div>
                  <label className="inline-flex">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files ?? []);
                        if (files.length === 0) return;
                        update("photos", [...form.photos, ...files] as any);
                      }}
                    />
                    <Button type="button" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                      <Upload className="w-4 h-4" />
                      Add photos
                    </Button>
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {form.photos.length === 0 && (
                    <div className="col-span-full text-sm text-muted-foreground">
                      No photos added yet.
                    </div>
                  )}

                  {form.photos.slice(0, 12).map((f, idx) => (
                    <div key={`${f.name}-${idx}`} className="border border-border rounded-xl overflow-hidden bg-white">
                      <div className="aspect-square bg-muted" />
                      <div className="p-2">
                        <div className="text-[11px] font-medium truncate">{f.name}</div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = form.photos.filter((_, i) => i !== idx);
                            update("photos", next as any);
                          }}
                          className="text-[11px] text-blue-600 hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Field
                  label="Video URL"
                  value={form.videoUrl}
                  onChange={(v) => update("videoUrl", v)}
                  placeholder="https://"
                />
                <Field
                  label="Virtual tour URL"
                  value={form.virtualTourUrl}
                  onChange={(v) => update("virtualTourUrl", v)}
                  placeholder="https://"
                />
              </div>
            </div>
          )}

          {step === "description" && (
            <div className="space-y-4">
              <label className="block">
                <div className="text-sm font-medium mb-2">Description</div>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Luxury sales description, layout, performance, condition, usage, ownership..."
                  className="w-full min-h-[160px] p-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </label>

              <TagsInput
                label="Highlights"
                value={form.highlights}
                onChange={(next) => update("highlights", next)}
                placeholder="Add highlight and press Enter"
              />

              <label className="block">
                <div className="text-sm font-medium mb-2">Recent works & upgrades</div>
                <textarea
                  value={form.recentWorks}
                  onChange={(e) => update("recentWorks", e.target.value)}
                  placeholder="Refits, engine service, electronics upgrade, teak, paint, new canvas..."
                  className="w-full min-h-[120px] p-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </label>
            </div>
          )}

          {step === "seller" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <SelectField
                  label="Seller type"
                  value={form.sellerType ?? ""}
                  onChange={(v) => update("sellerType", (v || null) as any)}
                  options={[
                    { value: "", label: "Select…" },
                    { value: "private", label: "Private" },
                    { value: "professional", label: "Professional" },
                  ]}
                />
                <Field
                  label="Seller name"
                  value={form.sellerName}
                  onChange={(v) => update("sellerName", v)}
                  placeholder="e.g. Marina Harbor"
                />
                <Field
                  label="Company"
                  value={form.sellerCompany}
                  onChange={(v) => update("sellerCompany", v)}
                  placeholder="e.g. Marina Harbor Yachts"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <Field
                  label="Email"
                  value={form.sellerEmail}
                  onChange={(v) => update("sellerEmail", v)}
                  placeholder="name@email.com"
                />
                <Field
                  label="Phone"
                  value={form.sellerPhone}
                  onChange={(v) => update("sellerPhone", v)}
                  placeholder="+1 305 555 0101"
                />
                <Field
                  label="Website"
                  value={form.sellerWebsite}
                  onChange={(v) => update("sellerWebsite", v)}
                  placeholder="https://"
                />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <Field
                  label="Seller location"
                  value={form.sellerLocation}
                  onChange={(v) => update("sellerLocation", v)}
                  placeholder="e.g. Fort Lauderdale, FL"
                />
                <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-white">
                  <div>
                    <div className="text-sm font-medium">WhatsApp enabled</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Show WhatsApp contact on the listing
                    </div>
                  </div>
                  <Toggle checked={form.sellerWhatsapp} onChange={(v) => update("sellerWhatsapp", v)} />
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-white">
                  <div>
                    <div className="text-sm font-medium">Featured</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Higher visibility
                    </div>
                  </div>
                  <Toggle checked={form.featured} onChange={(v) => update("featured", v)} />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-white">
                  <div>
                    <div className="text-sm font-medium">Urgent</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Badge on cards
                    </div>
                  </div>
                  <Toggle checked={form.urgent} onChange={(v) => update("urgent", v)} />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-xl bg-white">
                  <div>
                    <div className="text-sm font-medium">Accept offers</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Buyers can propose
                    </div>
                  </div>
                  <Toggle checked={form.acceptOffers} onChange={(v) => update("acceptOffers", v)} />
                </div>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Review</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    This still submits as a placeholder. Next step is wiring to Sellyourboateyb → dashboard listings.
                  </div>
                </div>

                <Button
                  type="button"
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={async () => {
                    await saveDraft();
                    alert("Draft saved. Next: connect to your real listing pipeline + DB.");
                  }}
                >
                  Submit (placeholder)
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <ReviewCard label="Type" value={String(form.listingType ?? "—")} />
                <ReviewCard label="Title" value={form.title || "—"} />
                <ReviewCard label="Make / Model" value={form.brand && form.model ? `${form.brand} ${form.model}` : "—"} />
                <ReviewCard label="Year" value={form.year || "—"} />
                <ReviewCard
                  label="Price"
                  value={
                    form.price
                      ? `${getCurrencySymbol(form.currency)}${new Intl.NumberFormat("en-US").format(Number(form.price))} ${form.currency}`
                      : "—"
                  }
                />
                <ReviewCard label="Location" value={[form.location, form.country].filter(Boolean).join(", ") || "—"} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <ReviewCard label="Features" value={form.features.length ? `${form.features.length} selected` : "—"} />
                <ReviewCard label="Electronics" value={form.electronics.length ? `${form.electronics.length} selected` : "—"} />
                <ReviewCard label="Safety" value={form.safetyEquipment.length ? `${form.safetyEquipment.length} selected` : "—"} />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="border border-border rounded-xl bg-white p-4">
                  <div className="text-xs text-muted-foreground">Description</div>
                  <div className="text-sm mt-2 whitespace-pre-wrap">{form.description || "—"}</div>
                </div>
                <div className="border border-border rounded-xl bg-white p-4">
                  <div className="text-xs text-muted-foreground">Recent works</div>
                  <div className="text-sm mt-2 whitespace-pre-wrap">{form.recentWorks || "—"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="min-w-0 text-xs text-muted-foreground truncate">
            {validation.ok ? " " : validation.message}
          </div>

          <Button
            type="button"
            onClick={goNext}
            disabled={stepIndex === STEPS.length - 1 || !validation.ok}
            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepPills({ active, onStep }: { active: StepId; onStep: (id: StepId) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {STEPS.map((s) => {
        const isActive = s.id === active;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onStep(s.id)}
            className={cx(
              "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
              isActive
                ? "bg-blue-600 text-white border-transparent"
                : "bg-white text-muted-foreground border-border hover:bg-muted/30"
            )}
          >
            {s.title}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  leftAddon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  leftAddon?: string;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="relative">
        {leftAddon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {leftAddon}
          </div>
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cx(
            "w-full h-10 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            leftAddon ? "pl-8 pr-3" : "px-3"
          )}
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 pl-3 pr-9 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          {options.map((o) => (
            <option key={`${o.value}-${o.label}`} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-70" />
      </div>
    </label>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-blue-600" : "bg-muted"
      )}
      aria-pressed={checked}
    >
      <span
        className={cx(
          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-5" : "translate-x-1"
        )}
      />
    </button>
  );
}

function ReviewCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-1">{value}</div>
    </div>
  );
}

function MultiSelect({
  label,
  hint,
  value,
  options,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string[];
  options: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return options;
    return options.filter((o) => o.toLowerCase().includes(s));
  }, [q, options]);

  function toggleItem(item: string) {
    const has = value.includes(item);
    if (has) onChange(value.filter((v) => v !== item));
    else onChange([...value, item]);
  }

  return (
    <div className="rounded-xl border border-border bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full p-4 text-left flex items-start justify-between gap-3"
      >
        <div className="min-w-0">
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {hint ? hint : "Select options"}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {value.length === 0 && (
              <span className="text-xs text-muted-foreground">None selected</span>
            )}
            {value.slice(0, 4).map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
              >
                {v}
              </span>
            ))}
            {value.length > 4 && (
              <span className="text-xs text-muted-foreground">+{value.length - 4} more</span>
            )}
          </div>
        </div>
        <ChevronDown className={cx("w-4 h-4 text-muted-foreground mt-1 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search options..."
              className="w-full h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={() => onChange([])}
              disabled={value.length === 0}
            >
              Clear
            </Button>
          </div>

          <div className="mt-3 max-h-64 overflow-auto rounded-lg border border-border">
            {filtered.length === 0 && (
              <div className="p-4 text-sm text-muted-foreground">No results.</div>
            )}

            {filtered.map((opt) => {
              const checked = value.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleItem(opt)}
                  className={cx(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm border-b border-border last:border-b-0",
                    "hover:bg-muted/30"
                  )}
                >
                  <span className="truncate">{opt}</span>
                  <span
                    className={cx(
                      "w-6 h-6 rounded-md border flex items-center justify-center shrink-0",
                      checked ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-border text-transparent"
                    )}
                  >
                    <Check className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{value.length} selected</span>
            <Button type="button" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpen(false)}>
              Done
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function TagsInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = React.useState("");

  function addTag(raw: string) {
    const t = raw.trim();
    if (!t) return;
    if (value.includes(t)) return;
    onChange([...value, t]);
  }

  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {value.length === 0 && <div className="text-xs text-muted-foreground">None added</div>}
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium">
            {t}
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => onChange(value.filter((x) => x !== t))}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(text);
              setText("");
            }
          }}
        />
        <Button
          type="button"
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            addTag(text);
            setText("");
          }}
        >
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </div>
  );
}

function ExtrasEditor({
  value,
  onChange,
}: {
  value: { name: string; price: string }[];
  onChange: (next: { name: string; price: string }[]) => void;
}) {
  function addRow() {
    onChange([...value, { name: "", price: "" }]);
  }

  function updateRow(i: number, patchRow: Partial<{ name: string; price: string }>) {
    const next = value.map((r, idx) => (idx === i ? { ...r, ...patchRow } : r));
    onChange(next);
  }

  function removeRow(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold">Extras</div>
          <div className="text-xs text-muted-foreground mt-1">
            Add optional extras and their prices
          </div>
        </div>
        <Button type="button" variant="outline" className="gap-2" onClick={addRow}>
          <Plus className="w-4 h-4" />
          Add extra
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {value.length === 0 && (
          <div className="text-sm text-muted-foreground">No extras added.</div>
        )}

        {value.map((r, idx) => (
          <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-2">
            <input
              value={r.name}
              onChange={(e) => updateRow(idx, { name: e.target.value })}
              placeholder="Extra name (e.g. Jet ski, BBQ, Chef)"
              className="h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              value={r.price}
              onChange={(e) => updateRow(idx, { price: clampNumberString(e.target.value) })}
              placeholder="Price"
              className="h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button type="button" variant="outline" className="gap-2" onClick={() => removeRow(idx)}>
              <Trash2 className="w-4 h-4" />
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function validateStep(step: StepId, f: FormData): { ok: boolean; message?: string } {
  if (step === "type") {
    if (!f.listingType) return { ok: false, message: "Select a listing type to continue." };
    return { ok: true };
  }

  if (step === "category") {
    if (f.listingType === "sale" && !f.boatCategory) {
      return { ok: false, message: "Select a boat category." };
    }
    if (f.listingType === "charter" && !f.charterType) {
      return { ok: false, message: "Select a charter type." };
    }
    if (f.listingType === "service" && !f.serviceCategory) {
      return { ok: false, message: "Select a service category." };
    }
    return { ok: true };
  }

  if (step === "details") {
    if (!isFilled(f.title)) return { ok: false, message: "Add a title." };
    if (f.listingType === "sale" || f.listingType === "charter") {
      if (!isFilled(f.brand)) return { ok: false, message: "Select a make (brand)." };
      if (!isFilled(f.model)) return { ok: false, message: "Add a model." };
      if (!isFilled(f.year)) return { ok: false, message: "Add a year." };
    }
    if (f.listingType === "parts") {
      if (!isFilled(f.partsCategory)) return { ok: false, message: "Add a parts category." };
      if (!isFilled(f.partsCondition)) return { ok: false, message: "Select parts condition." };
    }
    if (f.listingType === "service") {
      if (!isFilled(f.serviceName)) return { ok: false, message: "Add a service name." };
      if (!isFilled(f.serviceDescription)) return { ok: false, message: "Add a service description." };
    }
    return { ok: true };
  }

  if (step === "pricing") {
    if (!isFilled(f.currency)) return { ok: false, message: "Select a currency." };
    if (f.priceType !== "poa" && f.priceType !== "auction" && !isFilled(f.price)) {
      return { ok: false, message: "Add a price or switch to POA." };
    }
    if (!isFilled(f.country)) return { ok: false, message: "Select a country." };
    if (!isFilled(f.location)) return { ok: false, message: "Add a city / area." };
    return { ok: true };
  }

  if (step === "seller") {
    if (!f.sellerType) return { ok: false, message: "Select seller type." };
    if (!isFilled(f.sellerName)) return { ok: false, message: "Add seller name." };
    if (!isFilled(f.sellerEmail)) return { ok: false, message: "Add seller email." };
    return { ok: true };
  }

  return { ok: true };
}
