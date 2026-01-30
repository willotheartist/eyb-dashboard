// app/dashboard/listings/page.tsx

'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List,
  MoreVertical,
  Ruler,
  Calendar,
  Anchor,
  Mail,
  ChevronDown,
  FileDown,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const listings = [
  { id: 5001, name: '2023 Sunseeker Predator 74', type: 'Motor Yacht', location: 'Fort Lauderdale, FL', price: 3250000, status: 'live', views: 1247, length: '74 ft', cabins: 4, year: 2023, image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&h=400&fit=crop' },
  { id: 5002, name: '2022 Princess Y85', type: 'Motor Yacht', location: 'Miami Beach, FL', price: 5800000, status: 'live', views: 892, length: '85 ft', cabins: 5, year: 2022, image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=600&h=400&fit=crop' },
  { id: 5003, name: '2024 Azimut Grande 27M', type: 'Motor Yacht', location: 'Naples, FL', price: 7200000, status: 'pending', views: 0, length: '88 ft', cabins: 5, year: 2024, image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&h=400&fit=crop' },
  { id: 5004, name: '2021 Ferretti Yachts 670', type: 'Motor Yacht', location: 'Palm Beach, FL', price: 2100000, status: 'sold', views: 3421, length: '67 ft', cabins: 3, year: 2021, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop' },
  { id: 5005, name: '2023 Riva 90 Argo', type: 'Motor Yacht', location: 'Monaco', price: 8500000, status: 'live', views: 2156, length: '90 ft', cabins: 4, year: 2023, image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&h=400&fit=crop' },
  { id: 5006, name: '2022 Pershing 7X', type: 'Performance Yacht', location: 'Ibiza, Spain', price: 4200000, status: 'live', views: 678, length: '70 ft', cabins: 3, year: 2022, image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop' },
  { id: 5007, name: '2020 Benetti Oasis 40M', type: 'Superyacht', location: 'Antibes, France', price: 15000000, status: 'live', views: 4532, length: '131 ft', cabins: 6, year: 2020, image: 'https://images.unsplash.com/photo-1575362227633-f9d36e0e0ee5?w=600&h=400&fit=crop' },
  { id: 5008, name: '2023 Sanlorenzo SL96', type: 'Motor Yacht', location: 'St. Tropez, France', price: 9200000, status: 'draft', views: 0, length: '96 ft', cabins: 5, year: 2023, image: 'https://images.unsplash.com/photo-1586456198767-b8fe53c2e5f2?w=600&h=400&fit=crop' },
  { id: 5009, name: '2021 Lagoon Seventy 7', type: 'Catamaran', location: 'Mallorca, Spain', price: 3800000, status: 'live', views: 1893, length: '77 ft', cabins: 4, year: 2021, image: 'https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?w=600&h=400&fit=crop' },
  { id: 5010, name: '2022 Oyster 745', type: 'Sailing Yacht', location: 'Southampton, UK', price: 4500000, status: 'live', views: 756, length: '74 ft', cabins: 4, year: 2022, image: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?w=600&h=400&fit=crop' },
  { id: 5011, name: '2023 Absolute Navetta 68', type: 'Motor Yacht', location: 'Barcelona, Spain', price: 2900000, status: 'live', views: 1122, length: '68 ft', cabins: 4, year: 2023, image: 'https://images.unsplash.com/photo-1562281302-809108fd533c?w=600&h=400&fit=crop' },
  { id: 5012, name: '2024 Prestige X70', type: 'Motor Yacht', location: 'Cannes, France', price: 3100000, status: 'pending', views: 0, length: '70 ft', cabins: 4, year: 2024, image: 'https://images.unsplash.com/photo-1588401667987-e06480c453b8?w=600&h=400&fit=crop' },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ListingsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Listings</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <FileDown className="w-4 h-4" />
            Export
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4" />
            Add Listing
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Button variant="outline" className="gap-2">
          Save Search
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>

        <div className="w-px h-6 bg-border" />

        <Button variant="outline" className="gap-2">
          Bulk Action
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>

        {/* View Toggle */}
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button 
            onClick={() => setView('grid')}
            className={`p-2.5 transition-colors ${view === 'grid' ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`p-2.5 transition-colors ${view === 'list' ? 'bg-blue-600 text-white' : 'text-muted-foreground hover:bg-muted'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>

        <Button variant="outline" className="gap-2">
          Newest to Oldest
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-4 gap-5">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-4/3 bg-muted relative overflow-hidden group">
                <img 
                  src={listing.image} 
                  alt={listing.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <button className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center text-blue-600 border border-blue-200">
                    <Anchor className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold">{formatPrice(listing.price)}</span>
                  <span className="text-sm text-blue-600 font-medium">#{listing.id}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">{listing.type}</div>
                <div className="text-sm text-muted-foreground mb-3">{listing.location}</div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Ruler className="w-4 h-4" />
                    <span>{listing.length}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Anchor className="w-4 h-4" />
                    <span>{listing.cabins} cabins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{listing.year}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  Send Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Vessel</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Location</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Specs</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Views</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={listing.image} 
                        alt={listing.name}
                        className="w-16 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-sm">{listing.name}</div>
                        <div className="text-xs text-muted-foreground">#{listing.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{listing.type}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{listing.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{listing.length}</span>
                      <span>•</span>
                      <span>{listing.cabins} cab</span>
                      <span>•</span>
                      <span>{listing.year}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(listing.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      {listing.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      listing.status === 'live' ? 'bg-green-100 text-green-700' :
                      listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      listing.status === 'sold' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-2 rounded-lg hover:bg-muted">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
        <span>Showing 12 of 47 listings</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}