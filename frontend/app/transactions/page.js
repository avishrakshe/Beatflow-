'use client';

import { ArrowDownLeft, ArrowUpRight, CheckCircle } from 'lucide-react';
import FigmaNavbar from '../../components/figma/FigmaNavbar';

const rows = [
  ['First-Listen Payment', 'Neon Dreams', '-0.01 SOL', '2h ago'],
  ['Stream Revenue', 'Midnight Escape', '+0.15 SOL', '5h ago'],
  ['Remix License', 'Ethereal Synth Loop', '-0.05 SOL', '1d ago'],
];

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <div className="pt-24 px-4 md:px-6 pb-12 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
          Transaction History
        </h1>
        <p className="text-gray-600 mb-8">Track all your payments, earnings, and blockchain activity.</p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Stat icon={<ArrowDownLeft className="w-5 h-5 text-green-600" />} label="Total Earned" value="0.55 SOL" />
          <Stat icon={<ArrowUpRight className="w-5 h-5 text-purple-600" />} label="Total Spent" value="0.17 SOL" />
          <Stat icon={<CheckCircle className="w-5 h-5 text-blue-600" />} label="Transactions" value="124" />
        </div>
        <div className="rounded-3xl backdrop-blur-xl bg-white/60 border border-purple-200/50 shadow-lg overflow-hidden">
          {rows.map((r) => (
            <div key={r[0]} className="p-4 border-b last:border-b-0 border-purple-100 flex items-center justify-between">
              <div>
                <p className="font-medium">{r[0]}</p>
                <p className="text-sm text-gray-600">{r[1]}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{r[2]}</p>
                <p className="text-xs text-gray-500">{r[3]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl backdrop-blur-xl bg-white/60 border border-purple-200/50 shadow-lg p-5">
      <div className="mb-3">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
