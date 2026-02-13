//·app/dashboard/add-listing/page.tsx
import ListingWizard from "./ListingWizard";

export default function AddListingPage() {
  return (
    <div className="space-y-6">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight truncate">Add Listing</h1>
        <p className="text-muted-foreground mt-1">
          Create a new listing for sale, charter, services or parts
        </p>
      </div>

      <ListingWizard />
    </div>
  );
}
