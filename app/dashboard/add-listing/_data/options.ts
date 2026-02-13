//·app/dashboard/add-listing/_data/options.ts
import {
  Calendar,
  Package,
  Ship,
  Wrench,
} from "lucide-react";

export const LISTING_TYPES = [
  {
    id: "sale" as const,
    title: "Sell a boat",
    description: "List your boat, yacht, or watercraft for sale",
    icon: Ship,
    color: "bg-orange-500",
  },
  {
    id: "charter" as const,
    title: "Charter listing",
    description: "Offer your boat for charter rentals",
    icon: Calendar,
    color: "bg-sky-500",
  },
  {
    id: "service" as const,
    title: "Professional service",
    description: "Advertise your marine services",
    icon: Wrench,
    color: "bg-emerald-500",
  },
  {
    id: "parts" as const,
    title: "Parts & equipment",
    description: "Sell boat parts, gear, or accessories",
    icon: Package,
    color: "bg-violet-500",
  },
];

export const BOAT_CATEGORIES = [
  { id: "sailboat", label: "Sailboat", icon: "⛵️" },
  { id: "motor-yacht", label: "Motor Yacht", icon: "🛥️" },
  { id: "catamaran", label: "Catamaran", icon: "🌊" },
  { id: "rib", label: "RIB / Tender", icon: "🚤" },
  { id: "superyacht", label: "Superyacht", icon: "🧭" },
  { id: "fishing", label: "Fishing Boat", icon: "🎣" },
  { id: "dinghy", label: "Dinghy", icon: "🚣" },
  { id: "jetski", label: "Jet Ski / PWC", icon: "🏄" },
  { id: "other", label: "Other", icon: "⚓️" },
];

export const BRANDS = [
  "Beneteau",
  "Jeanneau",
  "Sunseeker",
  "Princess",
  "Lagoon",
  "Azimut",
  "Ferretti",
  "Bavaria",
  "Dufour",
  "Hanse",
  "Fountaine Pajot",
  "Axopar",
  "Riva",
  "Pershing",
  "Fairline",
  "Prestige",
  "Absolute",
  "Other",
];

export const CURRENCIES = [
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "GBP", symbol: "£", label: "British Pound" },
];

export const COUNTRIES = [
  "France",
  "Spain",
  "Italy",
  "Greece",
  "Croatia",
  "Turkey",
  "Monaco",
  "United Kingdom",
  "Netherlands",
  "Germany",
  "Portugal",
  "Malta",
  "Cyprus",
  "Montenegro",
  "United States",
  "Other",
];

export const FEATURE_OPTIONS = [
  "Air conditioning",
  "Heating",
  "Generator",
  "Solar panels",
  "Bow thruster",
  "Stern thruster",
  "Teak cockpit",
  "Hydraulic swim platform",
  "Electric windlass",
  "Underwater lights",
  "Stabilizers",
  "Watermaker",
];
