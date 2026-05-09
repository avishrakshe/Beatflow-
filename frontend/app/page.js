'use client';

import Link from 'next/link';
import { Sparkles, TrendingUp, Shield, DollarSign, Music, Lock } from 'lucide-react';
import FigmaNavbar from '../components/figma/FigmaNavbar';
import Toast from '../components/Toast';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <Toast />

      <div className="pt-16 md:pt-20">
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-300/50 mb-8">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700">Powered by Zero-Knowledge Proofs</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-800 bg-clip-text text-transparent leading-tight">
              Own Your Music.
              <br />
              Prove It Privately.
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              The first Web3 music platform with zero-knowledge ownership proofs, privacy-preserving streaming, and
              instant artist payments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/discover"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 text-center"
              >
                Start Listening
              </Link>
              <Link
                href="/upload"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border-2 border-purple-300 text-purple-700 hover:bg-purple-50 transition-all text-center"
              >
                Upload Music
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-purple-600" />,
                title: 'ZK Ownership Verification',
                description:
                  'Prove you own music rights without revealing sensitive data. Zero-knowledge cryptography ensures privacy and authenticity.',
              },
              {
                icon: <DollarSign className="w-8 h-8 text-purple-600" />,
                title: 'First-Listen Payments',
                description:
                  'Artists get paid instantly when someone plays their track for the first time. Fair compensation, powered by smart contracts.',
              },
              {
                icon: <Music className="w-8 h-8 text-purple-600" />,
                title: 'Remix Licensing',
                description: 'License beats and stems with cryptographic proofs and transparent royalty splits.',
              },
              {
                icon: <Lock className="w-8 h-8 text-purple-600" />,
                title: 'Privacy-Preserving Streaming',
                description: 'Your listening history stays private while streaming and collecting.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl p-8 backdrop-blur-xl bg-white/60 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
              Ready to revolutionize music?
            </h2>
            <p className="text-xl text-gray-600 mb-8">Join thousands of artists already earning on BeatFlow</p>
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50"
            >
              <TrendingUp className="w-5 h-5" />
              Start Earning Today
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
