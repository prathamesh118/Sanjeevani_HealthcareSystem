import React, { useState } from 'react';
import { Sparkles, Mic, Volume2 } from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';
import { useHealth } from '../context/HealthContext';

export const VoiceAssistantButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, language } = useHealth();

  const label =
    language === 'hi'
      ? 'संजीवनी वॉयस (AI)'
      : language === 'mr'
      ? 'संजीवनी व्हॉईस (AI)'
      : 'Sanjeevani Voice AI';

  return (
    <>
      {/* Floating Trigger Button on Bottom Right */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        <button
          onClick={() => setIsOpen(true)}
          id="btn-voice-assistant-fab"
          className="group flex items-center space-x-2.5 bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-teal-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-teal-300/40 ring-4 ring-teal-500/20"
          title="Open Sanjeevani AI Healthcare Voice Assistant"
        >
          <div className="relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center relative">
              <Mic className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="text-left pr-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-teal-200 leading-none flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-teal-300 inline" />
              <span>Sanjeevani AI</span>
            </div>
            <div className="text-xs font-extrabold text-white leading-tight">
              {label}
            </div>
          </div>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

