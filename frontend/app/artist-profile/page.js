'use client';

import { Shield, TrendingUp } from 'lucide-react';
import FigmaNavbar from '../../components/figma/FigmaNavbar';

export default function ArtistProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <div className="pt-24 px-4 md:px-6 pb-12 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 bg-gradient-to-br from-purple-600 to-purple-900 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20" />
            <div>
              <h1 className="text-3xl font-bold">Stellar Waves</h1>
              <p className="text-purple-100">Electronic Producer</p>
            </div>
            <Shield className="w-5 h-5 ml-auto" />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {['Total Streams', 'Total Earnings', 'Followers', 'Total Likes'].map((label) => (
            <div key={label} className="rounded-2xl bg-white/60 border border-purple-200/50 p-5">
              <div className="flex items-center gap-1 text-green-600 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                +12%
              </div>
              <p className="text-2xl font-bold">8.5M</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
