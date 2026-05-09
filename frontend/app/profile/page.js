'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { mockArtists, mockBeats, mockRemixes } from '../../data/mockData';
import { generateVoicePreview } from '../../utils/elevenlabs';
import { toast } from '../../utils/toast';

export default function ProfilePage() {
  const artist = mockArtists[0];
  const uploadedBeats = mockBeats.filter((b) => b.producer === artist.name);
  const createdRemixes = mockRemixes.filter((r) => r.remixer === artist.name);
  const [voicePrompt, setVoicePrompt] = useState('Welcome to my BeatFlow profile. Check out my latest beats.');
  const [voiceAudioUrl, setVoiceAudioUrl] = useState('');
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);

  const onGenerateVoice = async () => {
    try {
      setIsGeneratingVoice(true);
      const url = await generateVoicePreview(voicePrompt);
      setVoiceAudioUrl(url);
      toast.success('Voice preview generated');
    } catch (e) {
      toast.error(e.message || 'Failed to generate voice preview');
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <section className="card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img src={artist.avatar} alt={artist.name} className="w-20 h-20 rounded-full object-cover border border-dark-border" />
                <div>
                  <h1 className="text-3xl font-bold">{artist.name}</h1>
                  <p className="text-gray-400">Wallet: {artist.address}</p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card p-5">
                <p className="text-xs text-gray-500 mb-1">Followers</p>
                <p className="text-2xl font-bold">{artist.followers.toLocaleString()}</p>
              </div>
              <div className="card p-5">
                <p className="text-xs text-gray-500 mb-1">Beats Minted</p>
                <p className="text-2xl font-bold">{uploadedBeats.length}</p>
              </div>
              <div className="card p-5">
                <p className="text-xs text-gray-500 mb-1">Remixes</p>
                <p className="text-2xl font-bold">{createdRemixes.length}</p>
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Uploaded Beats</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedBeats.map((beat) => (
                  <div key={beat.id} className="rounded-xl border border-dark-border p-3">
                    <img src={beat.coverImage} alt={beat.name} className="w-full aspect-square rounded-lg object-cover mb-3" />
                    <p className="font-medium">{beat.name}</p>
                    <p className="text-xs text-gray-400">{beat.price} ETH</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-lg font-semibold mb-2">ElevenLabs Voice Intro</h2>
              <p className="text-sm text-gray-400 mb-4">
                Generate a short artist voice intro (server-side API route, key stays hidden).
              </p>
              <textarea
                className="input w-full h-24 mb-3"
                value={voicePrompt}
                onChange={(e) => setVoicePrompt(e.target.value)}
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="btn-primary" onClick={onGenerateVoice} disabled={isGeneratingVoice}>
                  {isGeneratingVoice ? 'Generating...' : 'Generate Voice Preview'}
                </button>
                {voiceAudioUrl && (
                  <audio controls src={voiceAudioUrl} className="w-full sm:w-auto" />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}

