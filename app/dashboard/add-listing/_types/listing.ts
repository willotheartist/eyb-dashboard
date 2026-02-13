//·app/dashboard/add-listing/_types/listing.ts
export type ListingType = "sale" | "charter" | "service" | "parts" | null;

export type BoatCategory =
  | "sailboat"
  | "motor-yacht"
  | "catamaran"
  | "rib"
  | "superyacht"
  | "fishing"
  | "dinghy"
  | "jetski"
  | "other";

export type ServiceCategory =
  | "broker"
  | "surveyor"
  | "captain"
  | "crew"
  | "maintenance"
  | "transport"
  | "insurance"
  | "finance"
  | "legal"
  | "other";

export type CharterType = "bareboat" | "crewed" | "day-charter" | "corporate";

export type SellerType = "private" | "professional";

export type FormData = {
  listingType: ListingType;

  boatCategory: BoatCategory | null;
  charterType: CharterType | null;
  serviceCategory: ServiceCategory | null;

  title: string;
  brand: string;
  model: string;
  year: string;
  condition: "new" | "used" | "";

  lengthFt: string;
  lengthM: string;

  engineMake: string;
  engineModel: string;
  enginePower: string;
  engineCount: string;

  cabins: string;
  berths: string;
  heads: string;

  location: string;
  country: string;
  marina: string;
  price: string;
  currency: string;
  priceType: "fixed" | "negotiable" | "poa";

  features: string[];

  photos: File[];
  photoUrls: string[];
  videoUrl: string;

  description: string;
  highlights: string[];
  recentWorks: string;

  sellerType: SellerType | null;
  sellerName: string;
  sellerCompany: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerWhatsapp: boolean;
  sellerWebsite: string;

  acceptOffers: boolean;
};

export const initialFormData: FormData = {
  listingType: null,

  boatCategory: null,
  charterType: null,
  serviceCategory: null,

  title: "",
  brand: "",
  model: "",
  year: "",
  condition: "",

  lengthFt: "",
  lengthM: "",

  engineMake: "",
  engineModel: "",
  enginePower: "",
  engineCount: "1",

  cabins: "",
  berths: "",
  heads: "",

  location: "",
  country: "",
  marina: "",
  price: "",
  currency: "EUR",
  priceType: "negotiable",

  features: [],

  photos: [],
  photoUrls: [],
  videoUrl: "",

  description: "",
  highlights: [],
  recentWorks: "",

  sellerType: null,
  sellerName: "",
  sellerCompany: "",
  sellerEmail: "",
  sellerPhone: "",
  sellerWhatsapp: false,
  sellerWebsite: "",

  acceptOffers: true,
};
