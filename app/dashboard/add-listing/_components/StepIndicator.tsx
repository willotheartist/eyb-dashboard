//·app/dashboard/add-listing/_components/StepIndicator.tsx
"use client";

type StepId = 1 | 2 | 3 | 4 | 5;

const steps: { id: StepId; label: string }[] = [
  { id: 1, label: "Type" },
  { id: 2, label: "Basics" },
  { id: 3, label: "Pricing & Location" },
  { id: 4, label: "Media & Seller" },
  { id: 5, label: "Review" },
];

export default function StepIndicator({ step }: { step: StepId }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, idx) => {
        const active = s.id === step;
        const done = s.id < step;

        return (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`h-9 px-3 rounded-lg border text-sm font-medium flex items-center gap-2 ${
                active
                  ? "bg-blue-600 text-white border-transparent"
                  : done
                  ? "bg-muted border-border text-foreground"
                  : "bg-white border-border text-muted-foreground"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-semibold ${
                  active ? "bg-white/20" : done ? "bg-white" : "bg-muted"
                }`}
              >
                {s.id}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>

            {idx !== steps.length - 1 && (
              <div className="hidden sm:block w-6 h-px bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
