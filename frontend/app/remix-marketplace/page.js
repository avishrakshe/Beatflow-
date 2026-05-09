'use client';

import { Play, Shield } from 'lucide-react';
import FigmaNavbar from '../../components/figma/FigmaNavbar';
import { mockBeats } from '../../data/mockData';

export default function RemixMarketplacePage() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <div className="pt-24 px-4 md:px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
          Remix Marketplace
        </h1>
        <p className="text-gray-600 mb-8">License verified beats and stems with cryptographic proof.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBeats.slice(0, 6).map((beat) => (
            <div key={beat.id} className="rounded-2xl p-5 bg-white/60 border border-purple-200/50 shadow-lg">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 mb-4 relative flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white" />
                <span className="absolute top-2 right-2 p-1 rounded-full bg-green-500">
                  <Shield className="w-3 h-3 text-white" />
                </span>
              </div>
              <p className="font-semibold">{beat.name}</p>
              <p className="text-sm text-gray-600">{beat.producer}</p>
              <button className="mt-3 w-full rounded-xl bg-purple-700 text-white py-2">License</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
