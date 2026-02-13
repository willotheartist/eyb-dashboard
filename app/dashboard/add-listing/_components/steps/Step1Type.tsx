//·app/dashboard/add-listing/_components/steps/Step1Type.tsx
"use client";

import type { FormData, ListingType } from "../../_types/listing";
import { LISTING_TYPES } from "../../_data/options";

export default function Step1Type({
  form,
  updateForm,
}: {
  form: FormData;
  updateForm: (updates: Partial<FormData>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="font-semibold text-lg">What are you listing?</div>
      <div className="text-sm text-muted-foreground">
        Choose the type of listing you want to create.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {LISTING_TYPES.map((t) => {
          const selected = form.listingType === t.id;
          const Icon = t.icon;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => updateForm({ listingType: t.id as ListingType })}
              className={`text-left p-4 rounded-xl border transition-colors ${
                selected ? "border-blue-600 bg-blue-50" : "border-border hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${t.color} flex items-center justify-center text-white`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <div className="font-semibold">{t.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{t.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
