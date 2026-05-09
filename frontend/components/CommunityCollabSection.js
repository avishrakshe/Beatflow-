'use client';

import { MessageSquare, Users, Link2 } from 'lucide-react';

const mockCollabThreads = [
  {
    id: 'c1',
    title: 'Trap x Drill crossover collab',
    starter: '0x91f2...8ad3',
    participants: 12,
    lastMessage: 'Looking for a vocalist and mix engineer for the hook section.',
    tags: ['Trap', 'Drill', 'Collab'],
  },
  {
    id: 'c2',
    title: 'Remix pack feedback circle',
    starter: '0xa0b1...3cf0',
    participants: 8,
    lastMessage: 'Shared stems v2. Need feedback on 808 layering and snare transient.',
    tags: ['Remix', 'Feedback', 'Stems'],
  },
  {
    id: 'c3',
    title: 'Weekly producer challenge',
    starter: '0x7db2...11ff',
    participants: 26,
    lastMessage: 'Theme this week: cinematic dark vibe at 130 BPM.',
    tags: ['Challenge', 'Community'],
  },
];

/**
 * Community collaboration preview section
 * (MVP mock threads; can connect to Creator Circle/DAO chat backend later)
 */
export default function CommunityCollabSection() {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-accent-blue" />
        <h2 className="text-2xl font-bold">Talking Community</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {mockCollabThreads.map((thread) => (
          <div key={thread.id} className="card p-5 hover:border-accent-blue/40">
            <h3 className="font-semibold mb-2 line-clamp-1">{thread.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2 mb-4">{thread.lastMessage}</p>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span className="font-mono">{thread.starter}</span>
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" />
                {thread.participants}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-4">
              {thread.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full border border-dark-border text-gray-300">
                  {tag}
                </span>
              ))}
            </div>

            <button className="btn-secondary w-full py-2 text-sm inline-flex items-center justify-center gap-2">
              <Link2 className="w-4 h-4" />
              Join Discussion
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

