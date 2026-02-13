//·app/dashboard/settings/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  User,
  Bell,
  CreditCard,
  Shield,
  Save,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ProfileState = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

type BusinessState = {
  company: string;
  website: string;
  city: string;
  country: string;
};

type PayoutsState = {
  currency: string;
  method: string;
  beneficiary: string;
  iban: string;
};

type NotificationsState = {
  newLeadsEmail: boolean;
  newLeadsPush: boolean;
  payoutUpdatesEmail: boolean;
  listingUpdatesEmail: boolean;
};

type SettingsState = {
  profile: ProfileState;
  business: BusinessState;
  payouts: PayoutsState;
  notifications: NotificationsState;
};

const STORAGE_KEY = "eyb.settings.v1";
const SETTINGS_EVENT = "eyb:settings-updated";

const DEFAULTS: SettingsState = {
  profile: {
    name: "Marina Harbor",
    role: "Partner Broker",
    email: "marina.harbor@eyb.com",
    phone: "+1 305 555 0101",
  },
  business: {
    company: "Marina Harbor Yachts",
    website: "marinaharbor.com",
    city: "Fort Lauderdale",
    country: "United States",
  },
  payouts: {
    currency: "USD",
    method: "Bank transfer",
    beneficiary: "Marina Harbor Yachts LLC",
    iban: "US00XXXX0000000000000000",
  },
  notifications: {
    newLeadsEmail: true,
    newLeadsPush: true,
    payoutUpdatesEmail: true,
    listingUpdatesEmail: false,
  },
};

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<ProfileState>(DEFAULTS.profile);
  const [business, setBusiness] = useState<BusinessState>(DEFAULTS.business);
  const [payouts, setPayouts] = useState<PayoutsState>(DEFAULTS.payouts);
  const [notifications, setNotifications] = useState<NotificationsState>(
    DEFAULTS.notifications
  );

  const [isSaving, setIsSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load saved settings once
  useEffect(() => {
    const stored = safeParse<{
      data: SettingsState;
      lastSavedAt: string;
    }>(
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null
    );

    if (stored?.data) {
      setProfile(stored.data.profile ?? DEFAULTS.profile);
      setBusiness(stored.data.business ?? DEFAULTS.business);
      setPayouts(stored.data.payouts ?? DEFAULTS.payouts);
      setNotifications(stored.data.notifications ?? DEFAULTS.notifications);
      setLastSavedAt(stored.lastSavedAt ?? null);
    }
  }, []);

  const currentState: SettingsState = useMemo(
    () => ({ profile, business, payouts, notifications }),
    [profile, business, payouts, notifications]
  );

  async function onSave() {
    setError(null);
    setIsSaving(true);
    setSavedTick(false);

    try {
      const now = new Date().toISOString();
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data: currentState,
          lastSavedAt: now,
        })
      );

      // Notify TopNav (same-tab) immediately
      window.dispatchEvent(new Event(SETTINGS_EVENT));

      // Small UX delay so the user sees the saving state
      await new Promise((r) => setTimeout(r, 450));

      setLastSavedAt(now);
      setSavedTick(true);

      // Hide the tick after a moment
      window.setTimeout(() => setSavedTick(false), 1500);
    } catch (e) {
      setError("Could not save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight truncate">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Profile, business info, payouts and notifications
          </p>

          <div className="mt-2 text-xs text-muted-foreground">
            {lastSavedAt ? (
              <>
                Last saved:{" "}
                <span className="text-foreground">
                  {new Date(lastSavedAt).toLocaleString()}
                </span>
              </>
            ) : (
              <>Not saved yet</>
            )}
          </div>

          {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
        </div>

        <Button
          onClick={onSave}
          disabled={isSaving}
          className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shrink-0"
        >
          {savedTick ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : savedTick ? "Saved" : "Save changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Profile */}
        <section className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold">Profile</div>
              <div className="text-sm text-muted-foreground">
                Your public broker information
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <Field
              label="Display name"
              value={profile.name}
              onChange={(v) => setProfile((p) => ({ ...p, name: v }))}
            />
            <Field
              label="Role"
              value={profile.role}
              onChange={(v) => setProfile((p) => ({ ...p, role: v }))}
            />
            <Field
              label="Email"
              value={profile.email}
              onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
            />
            <Field
              label="Phone"
              value={profile.phone}
              onChange={(v) => setProfile((p) => ({ ...p, phone: v }))}
            />
          </div>
        </section>

        {/* Business */}
        <section className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold">Business</div>
              <div className="text-sm text-muted-foreground">
                Company details shown on listings
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <Field
              label="Company name"
              value={business.company}
              onChange={(v) => setBusiness((b) => ({ ...b, company: v }))}
            />
            <Field
              label="Website"
              value={business.website}
              onChange={(v) => setBusiness((b) => ({ ...b, website: v }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="City"
                value={business.city}
                onChange={(v) => setBusiness((b) => ({ ...b, city: v }))}
              />
              <Field
                label="Country"
                value={business.country}
                onChange={(v) => setBusiness((b) => ({ ...b, country: v }))}
              />
            </div>
          </div>
        </section>

        {/* Payouts */}
        <section className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold">Payouts</div>
              <div className="text-sm text-muted-foreground">
                Where commissions are paid
              </div>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <SelectField
              label="Payout currency"
              value={payouts.currency}
              onChange={(v) => setPayouts((p) => ({ ...p, currency: v }))}
              options={["USD", "EUR", "GBP"]}
            />
            <SelectField
              label="Method"
              value={payouts.method}
              onChange={(v) => setPayouts((p) => ({ ...p, method: v }))}
              options={["Bank transfer", "Wire", "Other"]}
            />
            <Field
              label="Beneficiary"
              value={payouts.beneficiary}
              onChange={(v) => setPayouts((p) => ({ ...p, beneficiary: v }))}
            />
            <Field
              label="IBAN / Account"
              value={payouts.iban}
              onChange={(v) => setPayouts((p) => ({ ...p, iban: v }))}
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              Payout details are stored securely (locally for now).
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-semibold">Notifications</div>
              <div className="text-sm text-muted-foreground">
                Choose what you get notified about
              </div>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <ToggleRow
              title="New leads by email"
              desc="Get an email when a new inquiry arrives."
              checked={notifications.newLeadsEmail}
              onChange={(checked) =>
                setNotifications((n) => ({ ...n, newLeadsEmail: checked }))
              }
            />
            <ToggleRow
              title="New leads in app"
              desc="Show real-time notifications in the dashboard."
              checked={notifications.newLeadsPush}
              onChange={(checked) =>
                setNotifications((n) => ({ ...n, newLeadsPush: checked }))
              }
            />
            <ToggleRow
              title="Payout updates by email"
              desc="When payouts are scheduled or completed."
              checked={notifications.payoutUpdatesEmail}
              onChange={(checked) =>
                setNotifications((n) => ({ ...n, payoutUpdatesEmail: checked }))
              }
            />
            <ToggleRow
              title="Listing updates by email"
              desc="When a listing is approved, edited or sold."
              checked={notifications.listingUpdatesEmail}
              onChange={(checked) =>
                setNotifications((n) => ({ ...n, listingUpdatesEmail: checked }))
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
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
  options: string[];
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
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground opacity-70">
          ▾
        </span>
      </div>
    </label>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground mt-1">{desc}</div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-muted"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
