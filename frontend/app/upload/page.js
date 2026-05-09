'use client';

import { Upload, Shield } from 'lucide-react';
import FigmaNavbar from '../../components/figma/FigmaNavbar';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <div className="pt-24 px-4 md:px-6 pb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
          Upload Your Music
        </h1>
        <p className="text-gray-600 mb-8">Share tracks and generate ownership proof automatically.</p>

        <div className="rounded-3xl p-10 bg-white/70 border-2 border-dashed border-purple-300 text-center">
          <Upload className="w-10 h-10 text-purple-700 mx-auto mb-4" />
          <p className="font-medium mb-2">Drag and drop your file</p>
          <p className="text-sm text-gray-600 mb-4">MP3, WAV, FLAC</p>
          <button className="px-5 py-3 rounded-xl bg-purple-700 text-white">Select File</button>
        </div>

        <div className="rounded-2xl mt-6 p-6 bg-white/60 border border-purple-200/50">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-700 mt-1" />
            <p className="text-sm text-gray-700">
              Zero-knowledge ownership proof and Solana hash proof flow run behind the scenes after upload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
