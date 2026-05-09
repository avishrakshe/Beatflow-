'use client';

import { useMemo, useState } from 'react';
import { Hash, Users, Volume2 } from 'lucide-react';
import Layout from '../../components/Layout';
import ExplainAgent from '../../components/ExplainAgent';

const communities = [
  { id: 'astro', name: 'AstroBeats DAO' },
  { id: 'fitow', name: 'Fitow Studio' },
  { id: 'lyrical', name: 'MC Lyrical Lab' },
];

const channelsByCommunity = {
  astro: [
    { id: 'ann', name: 'announcements' },
    { id: 'collab', name: 'collab-requests' },
    { id: 'remix', name: 'remix-submissions' },
  ],
  fitow: [
    { id: 'ann', name: 'announcements' },
    { id: 'stems', name: 'stems-drop' },
    { id: 'mix', name: 'mix-feedback' },
  ],
  lyrical: [
    { id: 'ann', name: 'announcements' },
    { id: 'writing', name: 'writing-room' },
    { id: 'beats', name: 'beat-reviews' },
  ],
};

const mockMessages = [
  {
    id: 'm1',
    user: '0x91f2...8ad3',
    text: 'Looking for a vocalist for the hook, 140 BPM, dark vibe.',
    time: '2m ago',
  },
  {
    id: 'm2',
    user: '0xa0b1...3cf0',
    text: 'I can send a melody idea. Also can we keep stems naming consistent?',
    time: '7m ago',
  },
  {
    id: 'm3',
    user: '0x7db2...11ff',
    text: 'Posted a new stems pack. Feedback on the kick transient appreciated.',
    time: '18m ago',
  },
];

export default function CommunityPage() {
  const [communityId, setCommunityId] = useState('astro');
  const [channelId, setChannelId] = useState('collab');

  const channels = useMemo(() => channelsByCommunity[communityId] || [], [communityId]);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Communities rail */}
        <aside className="hidden lg:block w-64 border-r border-dark-border bg-dark-surface/70">
          <div className="p-4 border-b border-dark-border">
            <p className="font-semibold">Communities</p>
            <p className="text-xs text-gray-500">DAO + creator circles</p>
          </div>
          <div className="p-3 space-y-2">
            {communities.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCommunityId(c.id);
                  setChannelId((channelsByCommunity[c.id] || [])[1]?.id || 'ann');
                }}
                className={`w-full text-left rounded-xl px-3 py-3 border transition-colors ${
                  communityId === c.id
                    ? 'bg-dark-hover border-dark-border text-white'
                    : 'bg-transparent border-transparent text-gray-400 hover:bg-dark-card hover:text-white'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Channels */}
        <aside className="hidden lg:block w-64 border-r border-dark-border bg-dark-bg">
          <div className="p-4 border-b border-dark-border">
            <p className="font-semibold">Channels</p>
            <p className="text-xs text-gray-500">#{channelId}</p>
          </div>
          <div className="p-3 space-y-1">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setChannelId(ch.id)}
                className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                  channelId === ch.id ? 'bg-dark-hover text-white' : 'text-gray-400 hover:bg-dark-card hover:text-white'
                }`}
              >
                <Hash className="w-4 h-4" />
                {ch.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main chat area */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-dark-border bg-dark-surface/60 backdrop-blur-xl">
            <div className="min-w-0">
              <p className="font-semibold truncate">{communities.find((c) => c.id === communityId)?.name}</p>
              <p className="text-xs text-gray-500 truncate">#{channels.find((c) => c.id === channelId)?.name}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
              <Users className="w-4 h-4" /> 128 online
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 scrollbar-custom">
            {mockMessages.map((m) => (
              <div key={m.id} className="rounded-xl border border-dark-border bg-dark-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm">{m.user}</span>
                  <span className="text-xs text-gray-500">{m.time}</span>
                </div>
                <p className="text-sm text-gray-300">{m.text}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-dark-border p-4">
            <input className="input w-full" placeholder="Write a message… (MVP UI only)" />
          </div>
        </main>

        {/* Right panel */}
        <aside className="hidden xl:block w-96 border-l border-dark-border bg-dark-surface/70 p-4">
          <ExplainAgent page="community" />
          <div className="mt-4 card p-5">
            <p className="font-semibold mb-2">Voice Rooms</p>
            <button className="btn-secondary w-full py-2 text-sm flex items-center justify-center gap-2">
              <Volume2 className="w-4 h-4" />
              Join “Live Studio”
            </button>
          </div>
        </aside>
      </div>
    </Layout>
  );
}

