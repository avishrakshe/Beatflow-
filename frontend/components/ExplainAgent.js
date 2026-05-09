'use client';

import { useMemo, useState } from 'react';
import { Globe, Volume2 } from 'lucide-react';
import { generateVoicePreview } from '../utils/elevenlabs';
import { toast } from '../utils/toast';

const LANGS = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'Hindi' },
  { id: 'mr', label: 'Marathi' },
  { id: 'es', label: 'Spanish' },
  { id: 'fr', label: 'French' },
];

function getScript({ page, lang }) {
  const scripts = {
    en: {
      trading:
        'Welcome to BeatFlow Trading. Here you can invest in beats and songs based on popularity, volume, and chat sentiment. Choose an asset, tap invest, and track positions.',
      community:
        'Welcome to BeatFlow Community. Join channels, discuss collaborations, share stems, and plan remixes. Use the sidebar to switch topics.',
      marketplace:
        'Welcome to BeatFlow Marketplace. Browse trending beats, open details, tip the artist using Solana, and invest or trade on momentum.',
    },
    hi: {
      trading:
        'BeatFlow Trading में आपका स्वागत है। यहाँ आप बीट्स और गानों में उनकी लोकप्रियता, वॉल्यूम और चैट सेंटिमेंट के आधार पर निवेश कर सकते हैं।',
      community:
        'BeatFlow Community में आपका स्वागत है। चैनल्स में जुड़ें, सहयोग पर चर्चा करें, स्टेम्स शेयर करें और रीमिक्स प्लान करें।',
      marketplace:
        'BeatFlow Marketplace में आपका स्वागत है। ट्रेंडिंग बीट्स देखें, डिटेल्स खोलें, Solana से आर्टिस्ट को टिप करें और ट्रेडिंग करें।',
    },
    mr: {
      trading:
        'BeatFlow Trading मध्ये स्वागत आहे. येथे तुम्ही लोकप्रियता, व्हॉल्युम आणि चॅट सेंटिमेंटवरून बीट्स/गाण्यांमध्ये गुंतवणूक करू शकता.',
      community:
        'BeatFlow Community मध्ये स्वागत आहे. चॅनेल्समध्ये सहभागी व्हा, कोलॅबवर चर्चा करा, स्टेम्स शेअर करा आणि रिमिक्स प्लॅन करा.',
      marketplace:
        'BeatFlow Marketplace मध्ये स्वागत आहे. ट्रेंडिंग बीट्स पाहा, डिटेल्स उघडा, Solana ने टिप करा आणि ट्रेडिंग करा.',
    },
  };

  const base = scripts[lang] || scripts.en;
  return base[page] || base.marketplace;
}

/**
 * ExplainAgent (MVP)
 * - Generates spoken explanation with ElevenLabs
 * - Supports a few languages + fallback to English
 */
export default function ExplainAgent({ page = 'marketplace' }) {
  const [lang, setLang] = useState('en');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const script = useMemo(() => getScript({ page, lang }), [page, lang]);

  const speak = async () => {
    try {
      setLoading(true);
      const url = await generateVoicePreview(script);
      setAudioUrl(url);
      toast.success('Explanation ready');
    } catch (e) {
      toast.error(e.message || 'Failed to generate explanation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <p className="font-semibold">Explain</p>
        </div>
        <select
          className="input py-1 px-2 text-sm"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {LANGS.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-400 mb-4 line-clamp-3">{script}</p>

      <button className="btn-secondary w-full py-2 text-sm flex items-center justify-center gap-2" onClick={speak} disabled={loading}>
        <Volume2 className="w-4 h-4" />
        {loading ? 'Generating...' : 'Play Explanation (11labs)'}
      </button>

      {audioUrl && <audio controls src={audioUrl} className="w-full mt-3" />}
    </div>
  );
}

