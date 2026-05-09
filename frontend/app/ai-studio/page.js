'use client';

import { useState } from 'react';
import { Sparkles, Wand2, Download, Loader2, Play, Square } from 'lucide-react';
import FigmaNavbar from '../../components/figma/FigmaNavbar';
import ExplainAgent from '../../components/ExplainAgent';
import { generateVoicePreview } from '../../utils/elevenlabs';
import { toast } from '../../utils/toast';
import Toast from '../../components/Toast';

export default function AIStudioPage() {
  const [text, setText] = useState('Living life on the blockchain wave...');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some lyrics first.');
      return;
    }

    try {
      setIsGenerating(true);
      // Clean up previous audio instance
      if (audio) {
        audio.pause();
        setAudio(null);
      }
      setAudioUrl(null);
      setIsPlaying(false);

      const url = await generateVoicePreview(text);
      setAudioUrl(url);

      const newAudio = new Audio(url);
      newAudio.onended = () => setIsPlaying(false);
      setAudio(newAudio);

      toast.success('Voice generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate voice. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'ai-vocals.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-gray-900">
      <FigmaNavbar />
      <Toast />
      <div className="pt-24 px-4 md:px-6 pb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
          AI Voice Studio
        </h1>
        <p className="text-gray-600 mb-8">Generate professional AI vocals and multilingual hooks.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-white/70 border border-purple-200/50 p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-purple-700">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold text-sm tracking-wide uppercase">Powered by ElevenLabs</span>
            </div>
            
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your lyrics here..."
              className="w-full rounded-2xl border border-purple-200 bg-white/90 p-5 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300/40 transition-shadow resize-none"
            />
            
            <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !text.trim()}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold flex items-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                {isGenerating ? 'Generating...' : 'Generate AI Voice'}
              </button>

              {audioUrl && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlayback}
                    className="p-4 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors shadow-sm"
                  >
                    {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                  </button>

                  <button 
                    onClick={handleDownload}
                    className="px-6 py-4 rounded-xl border-2 border-purple-200 bg-white text-purple-700 font-semibold hover:bg-purple-50 flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Download className="w-5 h-5" />
                    Export MP3
                  </button>
                </div>
              )}
            </div>
          </div>
          <ExplainAgent page="marketplace" />
        </div>
      </div>
    </div>
  );
}
