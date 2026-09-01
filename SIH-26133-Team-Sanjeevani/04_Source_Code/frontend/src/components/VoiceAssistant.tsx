import React, { useState, useEffect, useRef } from 'react';
import { useHealth } from '../context/HealthContext';
import { UserRole, Language, Patient, Referral } from '../types';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  X,
  Bot,
  User,
  ArrowRight,
  Stethoscope,
  Phone,
  Calendar,
  AlertCircle,
  FileText,
  Activity,
  HeartPulse,
  RefreshCw,
  Globe,
  Radio
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  action?: {
    label: string;
    type: 'open_teleconsult' | 'view_patient' | 'view_referrals' | 'call_asha' | 'view_prescriptions';
    payload?: any;
  };
}

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const {
    currentRole,
    currentUser,
    patients,
    referrals,
    followUps,
    appointments,
    encounters,
    setActiveTeleconsultPatient,
    setSelectedPatientId,
    language: appLanguage,
    setNotification
  } = useHealth();

  const [language, setLanguage] = useState<Language>(appLanguage);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSpeechSentence, setActiveSpeechSentence] = useState<string>('');

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechQueueRef = useRef<string[]>([]);
  const isSpeakingRef = useRef<boolean>(false);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Synchronize language when app language changes
  useEffect(() => {
    setLanguage(appLanguage);
  }, [appLanguage]);

  // Clean up speech synthesis on unmount or close
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const stopSpeaking = () => {
    speechQueueRef.current = [];
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    setActiveSpeechSentence('');
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }
  };

  // Find best browser voice for chosen language
  const getBestVoice = (lang: Language): SpeechSynthesisVoice | null => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    if (lang === 'hi') {
      const hiVoice =
        voices.find(
          (v) =>
            v.lang.toLowerCase().includes('hi') ||
            v.name.toLowerCase().includes('hindi') ||
            v.name.includes('हिन्दी')
        ) ||
        voices.find((v) => v.lang === 'hi-IN') ||
        voices.find((v) => v.lang === 'en-IN');
      return hiVoice || null;
    }

    if (lang === 'mr') {
      const mrVoice =
        voices.find(
          (v) =>
            v.lang.toLowerCase().includes('mr') ||
            v.name.toLowerCase().includes('marathi') ||
            v.name.includes('मराठी')
        ) ||
        voices.find((v) => v.lang.toLowerCase().includes('hi')) ||
        voices.find((v) => v.lang === 'en-IN');
      return mrVoice || null;
    }

    // Default English (prefer Indian English if available)
    const enVoice =
      voices.find((v) => v.lang === 'en-IN' || v.name.toLowerCase().includes('india')) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];
    return enVoice || null;
  };

  // Sanitize text for clear, natural speech synthesis without saying "dot", "bullet", or gibberish
  const prepareTextForSpeech = (rawText: string, lang: Language): string[] => {
    if (!rawText) return [];

    let cleaned = rawText;

    // 1. Remove markdown symbols
    cleaned = cleaned.replace(/[*_~`#]/g, '');

    // 2. Remove bullet symbols (which synthesizers pronounce as "dot" or "bullet")
    cleaned = cleaned.replace(/[•●▪◆■★-]\s*/g, ' ');
    cleaned = cleaned.replace(/\s*•\s*/g, ' ');
    cleaned = cleaned.replace(/\.{2,}/g, '. '); // Replace ellipses (...) with single period

    // 3. Remove numbered list markers like "1. ", "2. " to avoid "one dot", "two dot"
    cleaned = cleaned.replace(/^\s*\d+\.\s*/gm, ' ');
    cleaned = cleaned.replace(/\n\s*\d+\.\s*/g, '. ');

    // 4. Expand medical shorthand and symbols phonetically
    if (lang === 'hi') {
      cleaned = cleaned.replace(/BP/gi, 'रक्तचाप');
      cleaned = cleaned.replace(/mmHg/gi, 'मिलीमीटर मरकरी');
      cleaned = cleaned.replace(/Tab\b|Tab\./gi, 'दवा गोली');
      cleaned = cleaned.replace(/(\d+)\/(\d+)/g, '$1 बटा $2');
      cleaned = cleaned.replace(/(\d+)\s*mg\b/gi, '$1 मिलीग्राम');
      cleaned = cleaned.replace(/SpO2/gi, 'ऑक्सीजन स्तर');
      cleaned = cleaned.replace(/bpm/gi, 'धड़कन प्रति मिनट');
      cleaned = cleaned.replace(/OPD/gi, 'ओ पी डी');
      cleaned = cleaned.replace(/PHC/gi, 'प्राथमिक स्वास्थ्य केंद्र');
      cleaned = cleaned.replace(/ABHA/gi, 'आभा');
    } else if (lang === 'mr') {
      cleaned = cleaned.replace(/BP/gi, 'रक्तदाब');
      cleaned = cleaned.replace(/mmHg/gi, 'मिलीमीटर मरक्युरी');
      cleaned = cleaned.replace(/Tab\b|Tab\./gi, 'गोळी');
      cleaned = cleaned.replace(/(\d+)\/(\d+)/g, '$1 भागिले $2');
      cleaned = cleaned.replace(/(\d+)\s*mg\b/gi, '$1 मिलीग्राम');
      cleaned = cleaned.replace(/SpO2/gi, 'ऑक्सिजन पातळी');
      cleaned = cleaned.replace(/bpm/gi, 'धडधड प्रति मिनिट');
      cleaned = cleaned.replace(/OPD/gi, 'ओ पी डी');
      cleaned = cleaned.replace(/PHC/gi, 'प्राथमिक आरोग्य केंद्र');
      cleaned = cleaned.replace(/ABHA/gi, 'आभा');
    } else {
      cleaned = cleaned.replace(/\bBP\b/g, 'Blood Pressure');
      cleaned = cleaned.replace(/mmHg/gi, 'millimeter mercury');
      cleaned = cleaned.replace(/Tab\b|Tab\./gi, 'Tablet');
      cleaned = cleaned.replace(/(\d+)\/(\d+)/g, '$1 over $2');
      cleaned = cleaned.replace(/(\d+)\s*mg\b/gi, '$1 milligrams');
      cleaned = cleaned.replace(/SpO2/gi, 'Oxygen level');
      cleaned = cleaned.replace(/bpm/gi, 'beats per minute');
      cleaned = cleaned.replace(/\bANC\b/g, 'Antenatal care');
      cleaned = cleaned.replace(/\bOPD\b/g, 'O P D');
      cleaned = cleaned.replace(/\bPHC\b/g, 'P H C');
      cleaned = cleaned.replace(/\bABHA\b/g, 'Abha');
    }

    // 5. Replace newlines and extra spaces
    cleaned = cleaned.replace(/\n+/g, '. ');
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    // 6. Split into clean, coherent sentences (max 150 chars each for 100% reliable Chrome/Safari playback)
    const rawSentences = cleaned.split(/(?<=[.?!।॥])\s+/);
    const validSentences: string[] = [];

    rawSentences.forEach((s) => {
      const trimmed = s.replace(/^[.,:;\s]+|[.,:;\s]+$/g, '').trim();
      if (trimmed.length > 0) {
        if (trimmed.length > 160) {
          // Sub-split by comma or clause if very long
          const parts = trimmed.split(/,\s+/);
          parts.forEach((p) => {
            const pTrim = p.trim();
            if (pTrim.length > 0) validSentences.push(pTrim);
          });
        } else {
          validSentences.push(trimmed);
        }
      }
    });

    return validSentences;
  };

  // Robust Sentence-Chained Speech Synthesizer
  const speakResponse = (fullText: string, lang: Language) => {
    if (!isTtsEnabled || !('speechSynthesis' in window)) return;

    stopSpeaking();

    const sentences = prepareTextForSpeech(fullText, lang);
    if (sentences.length === 0) return;

    speechQueueRef.current = [...sentences];
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    const playNextSentence = () => {
      if (!isSpeakingRef.current || speechQueueRef.current.length === 0) {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setActiveSpeechSentence('');
        return;
      }

      const nextSentence = speechQueueRef.current.shift();
      if (!nextSentence) {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setActiveSpeechSentence('');
        return;
      }

      setActiveSpeechSentence(nextSentence);

      const utterance = new SpeechSynthesisUtterance(nextSentence);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
      utterance.rate = lang === 'en' ? 0.95 : 0.92; // Natural Indian cadence
      utterance.pitch = 1.0;

      const voice = getBestVoice(lang);
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => {
        // Small pause between sentences for natural breathing rhythm
        setTimeout(() => {
          playNextSentence();
        }, 120);
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        // Continue to next sentence in case of minor audio frame glitch
        setTimeout(() => {
          playNextSentence();
        }, 100);
      };

      currentUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    // Chrome workaround: load voices if not ready
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        playNextSentence();
      };
    } else {
      playNextSentence();
    }
  };

  // Initialize Welcome Message upon opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting = getInitialGreeting(currentRole, currentUser?.name, language);
      const welcomeMsg: Message = {
        id: 'msg-welcome',
        sender: 'assistant',
        text: initialGreeting.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        action: initialGreeting.action
      };
      setMessages([welcomeMsg]);

      if (isTtsEnabled) {
        setTimeout(() => {
          speakResponse(initialGreeting.text, language);
        }, 300);
      }
    }
  }, [isOpen, currentRole, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isListening, isProcessing]);

  // Speech Recognition (STT) Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          handleUserQuery(currentTranscript);
          recognition.stop();
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error('Failed to start speech recognition', e);
        setNotification({
          type: 'info',
          message: 'Microphone ready. You can speak or select quick chips below.'
        });
      }
    }
  };

  const handleUserQuery = async (query: string) => {
    if (!query.trim()) return;

    stopSpeaking();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setTranscript('');
    setIsProcessing(true);

    // Context-Aware Healthcare Response Generation
    setTimeout(() => {
      const responseData = generateContextualResponse(query, currentRole, currentUser, {
        patients,
        referrals,
        followUps,
        appointments,
        encounters,
        language
      });

      const assistantMsg: Message = {
        id: `assist-${Date.now()}`,
        sender: 'assistant',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        action: responseData.action
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsProcessing(false);

      if (isTtsEnabled) {
        speakResponse(responseData.text, language);
      }
    }, 400);
  };

  const handleExecuteAction = (action: Message['action']) => {
    if (!action) return;

    if (action.type === 'open_teleconsult') {
      const pat = patients.find((p) => p.id === action.payload?.patientId) || patients[0];
      setActiveTeleconsultPatient(pat);
      setNotification({
        type: 'success',
        message: `Teleconsultation room initiated with ${pat.name}.`
      });
      onClose();
    } else if (action.type === 'view_patient') {
      if (action.payload?.patientId) {
        setSelectedPatientId(action.payload.patientId);
        setNotification({
          type: 'info',
          message: `Opened clinical chart for patient ${action.payload.patientId}.`
        });
      }
      onClose();
    } else if (action.type === 'call_asha') {
      setNotification({
        type: 'info',
        message: `Calling assigned ASHA worker Sunita Bai (+91 94231 88990)...`
      });
    } else if (action.type === 'view_prescriptions') {
      onClose();
    }
  };

  const roleSuggestions = getQuickPrompts(currentRole, language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl flex flex-col h-[86vh] max-h-[700px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/30 border border-teal-300/40 flex items-center justify-center text-teal-200 shadow-inner">
              <Sparkles className="w-5 h-5 text-teal-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base tracking-tight flex items-center space-x-1.5">
                  <span>Sanjeevani AI</span>
                  <span className="text-teal-300 font-normal text-xs">(संजीवनी)</span>
                </h3>
                <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-300/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Voice Assistant
                </span>
              </div>
              <p className="text-xs text-teal-200/90 font-medium">
                {currentRole === 'patient' && 'Personal Citizen Health & Medicine Companion'}
                {currentRole === 'doctor' && 'Clinical Decision & Hospital OPD Copilot'}
                {currentRole === 'asha' && 'Village Screening & High-Risk Maternal Companion'}
                {currentRole === 'anm' && 'Sub-centre Health & Care Coordinator'}
                {currentRole === 'admin' && 'District Healthcare Command Analytics Copilot'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Switcher in Voice Modal */}
            <div className="flex items-center bg-teal-900/60 rounded-lg p-0.5 border border-teal-600/50">
              {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    stopSpeaking();
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    language === lang
                      ? 'bg-white text-teal-900 shadow-xs'
                      : 'text-teal-200 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
                </button>
              ))}
            </div>

            {/* Mute/Unmute Audio Button */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                }
                setIsTtsEnabled(!isTtsEnabled);
              }}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isTtsEnabled
                  ? 'bg-teal-500/20 text-teal-200 border-teal-400/40 hover:bg-teal-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title={isTtsEnabled ? 'Mute Spoken Audio' : 'Enable Spoken Audio'}
            >
              {isTtsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-teal-900/40 hover:bg-teal-900 text-teal-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Voice Live Speaking Strip */}
        {isSpeaking && (
          <div className="bg-teal-50 border-b border-teal-200 px-4 py-2 flex items-center justify-between text-teal-900 text-xs shrink-0 animate-in fade-in">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span className="font-bold text-teal-800 shrink-0">Sanjeevani Speaking:</span>
              <span className="italic truncate text-slate-700 text-[11px]">
                "{activeSpeechSentence || 'Speaking full message...'}"
              </span>
            </div>
            <button
              onClick={stopSpeaking}
              className="px-2 py-0.5 text-[10px] font-bold bg-teal-200 hover:bg-teal-300 text-teal-900 rounded cursor-pointer shrink-0 ml-2"
            >
              Stop Audio
            </button>
          </div>
        )}

        {/* Assistant Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/60">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${
                  isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow-2xs ${
                    isUser
                      ? 'bg-slate-800 text-white'
                      : 'bg-teal-600 text-white shadow-teal-600/20'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] sm:max-w-[78%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-slate-900 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Action Button if attached */}
                    {msg.action && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => handleExecuteAction(msg.action)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
                        >
                          {msg.action.type === 'open_teleconsult' && (
                            <Stethoscope className="w-3.5 h-3.5" />
                          )}
                          {msg.action.type === 'call_asha' && <Phone className="w-3.5 h-3.5" />}
                          {msg.action.type === 'view_patient' && <Activity className="w-3.5 h-3.5" />}
                          {msg.action.type === 'view_prescriptions' && (
                            <FileText className="w-3.5 h-3.5" />
                          )}
                          <span>{msg.action.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className={`text-[10px] text-slate-400 font-mono px-1 flex items-center justify-between`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakResponse(msg.text, msg.language)}
                        className="text-teal-600 hover:text-teal-800 flex items-center space-x-1 cursor-pointer font-medium"
                        title="Replay Voice Speech"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Replay</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Processing / Speaking Animation Indicator */}
          {(isProcessing || isListening) && (
            <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs w-fit">
              {isListening && (
                <div className="flex items-center space-x-2 text-rose-600 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span>
                    Listening in {language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English'}...{' '}
                    {transcript ? `"${transcript}"` : 'Speak into microphone'}
                  </span>
                </div>
              )}
              {isProcessing && (
                <div className="flex items-center space-x-2 text-slate-600">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                  <span>Sanjeevani AI is formulating clinical response...</span>
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200/80 shrink-0">
          <div className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>
                {language === 'hi'
                  ? 'त्वरित प्रश्न चुनें:'
                  : language === 'mr'
                  ? 'जलद विचारणा निवडा:'
                  : `Voice questions for ${currentUser?.name}:`}
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Click to ask instantly</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {roleSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleUserQuery(prompt)}
                className="px-2.5 py-1 bg-white hover:bg-teal-50 hover:border-teal-300 border border-slate-200 text-slate-700 hover:text-teal-900 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer shadow-2xs shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Mic Button */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          {/* Audio Wave Visualizer while listening */}
          {isListening && (
            <div className="mb-3 p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-rose-700 animate-pulse">
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-rose-600" />
                <span className="text-xs font-bold">Microphone Active &bull; Speak clearly</span>
              </div>
              <div className="flex items-center space-x-1">
                {[40, 75, 100, 60, 90, 45, 80, 50].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 bg-rose-500 rounded-full h-4 animate-bounce"
                  ></span>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserQuery(inputText);
            }}
            className="flex items-center space-x-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center cursor-pointer shadow-xs ${
                isListening
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200 animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak into Sanjeevani AI'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <div className="relative flex-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'यहाँ बोलें या टाइप करें (उदा. मेरा रक्तचाप कितना है?)...'
                    : language === 'mr'
                    ? 'येथे बोला किंवा टाइप करा (उदा. माझी औषधे कशी घ्यावीत?)...'
                    : 'Ask Sanjeevani about vitals, medicines, appointments, referrals...'
                }
                className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden font-medium"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-teal-600 hover:text-teal-800 disabled:text-slate-300 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Initial Greeting with Natural Speech Phrasing
function getInitialGreeting(
  role: UserRole,
  userName?: string,
  lang: Language = 'en'
): { text: string; action?: Message['action'] } {
  const name = userName || 'User';

  if (lang === 'hi') {
    if (role === 'patient') {
      return {
        text: `नमस्ते ${name}! मैं आपकी संजीवनी स्वास्थ्य सहायक हूँ। आप मुझसे अपने रक्तचाप, दवाइयों के समय, आशा कार्यकर्ता या डॉक्टर अपॉइंटमेंट के बारे में पूछ सकते हैं।`,
        action: { label: 'दवाइयाँ देखें', type: 'view_prescriptions' }
      };
    } else if (role === 'doctor') {
      return {
        text: `नमस्कार डॉक्टर ${name}। मैं आपकी संजीवनी क्लिनिकल सहायक हूँ। आप प्रलंबित रेफरल सूची, मरीज केस सारांश या टेलीकंसल्टेशन के बारे में पूछ सकते हैं।`,
        action: {
          label: 'टेलीकंसल्ट रूम खोलें',
          type: 'open_teleconsult',
          payload: { patientId: 'pat-101' }
        }
      };
    } else if (role === 'admin') {
      return {
        text: `नमस्ते अधिकारी महोदय। संजीवनी जिला स्वास्थ्य कमांड कोपायलट तैयार है। आप रेफरल क्लोजर दर, मरीज प्रतीक्षा समय या अस्पताल क्षमता के आंकड़े पूछ सकते हैं।`
      };
    } else {
      return {
        text: `नमस्ते ${name}! मैं आपकी संजीवनी आशा साथी हूँ। आप आज की गृह भेंट, उच्च जोखिम गर्भवती महिलाओं और रक्तचाप जांच के बारे में पूछ सकते हैं।`
      };
    }
  }

  if (lang === 'mr') {
    if (role === 'patient') {
      return {
        text: `नमस्कार ${name}! मी आपली संजीवनी आरोग्य सहाय्यक आहे. आपण मला रक्तदाब तपासणी, औषधांचे वेळापत्रक, आशा सेविका किंवा डॉक्टरांच्या भेटीबद्दल विचारू शकता.`,
        action: { label: 'औषधांचे तपशील', type: 'view_prescriptions' }
      };
    } else if (role === 'doctor') {
      return {
        text: `नमस्कार डॉक्टर ${name}. मी आपली संजीवनी ओपीडी सहाय्यक आहे. प्रलंबित रेफरल्स, रुग्ण सारांश किंवा टेलिकन्सल्टेशन सुरू करण्याबद्दल विचारू शकता.`,
        action: {
          label: 'टेलिकन्सल्ट सुरू करा',
          type: 'open_teleconsult',
          payload: { patientId: 'pat-101' }
        }
      };
    } else {
      return {
        text: `नमस्कार ${name}! मी आपली संजीवनी आरोग्य सहाय्यक आहे. आपण आजच्या गृहभेटी, औषध वाटप आणि उच्च जोखीम रुग्णांविषयी विचारू शकता.`
      };
    }
  }

  // English
  if (role === 'patient') {
    return {
      text: `Hello ${name}! I am Sanjeevani, your personal healthcare companion. You can ask me about your blood pressure readings, doctor prescriptions, appointment timings, or connect with your village ASHA worker.`,
      action: { label: 'View My Prescriptions', type: 'view_prescriptions' }
    };
  } else if (role === 'doctor') {
    return {
      text: `Welcome Doctor ${name}. Sanjeevani Clinical Voice Assistant is active. You can request patient summaries, inspect pending inbound referrals, check follow-up loops, or launch teleconsultations.`,
      action: {
        label: 'Start Teleconsult Room',
        type: 'open_teleconsult',
        payload: { patientId: 'pat-101' }
      }
    };
  } else if (role === 'admin') {
    return {
      text: `Greetings Officer. Sanjeevani District Health Command Voice Copilot is ready. Inquire about referral loop closure rates, average patient transit times, or critical facility loads.`
    };
  } else {
    return {
      text: `Hello ${name}! Sanjeevani Field Companion is active. Ask about today's home follow-up visits, antenatal high-risk alerts, or blood pressure triage guidelines.`
    };
  }
}

function getQuickPrompts(role: UserRole, lang: Language): string[] {
  if (lang === 'hi') {
    if (role === 'patient') {
      return [
        'मेरा रक्तचाप कितना है?',
        'मेरी दवाइयाँ और खुराक बताएं',
        'मेरी डॉक्टर से अपॉइंटमेंट कब है?',
        'आशा कार्यकर्ता को कॉल करें'
      ];
    } else if (role === 'doctor') {
      return [
        'पेंडिंग रेफरल की संख्या बताओ',
        'सविता देवी का केस सारांश',
        'टेलीकंसल्टेशन शुरू करो',
        'फॉलो-अप अनुपालन दर क्या है?'
      ];
    } else if (role === 'admin') {
      return [
        'जिले का रेफरल क्लोजर रेट क्या है?',
        'किस अस्पताल में सबसे ज्यादा वेटिंग है?',
        'आज के हाई-रिस्क इमरजेंसी केस'
      ];
    } else {
      return [
        'आज किस मरीज के घर जाना है?',
        'हाई बीपी का रेफरल कैसे करें?',
        'सविता देवी का फॉलो-अप चेक'
      ];
    }
  }

  if (lang === 'mr') {
    if (role === 'patient') {
      return [
        'माझा रक्तदाब किती नोंदवला आहे?',
        'माझी औषधे कशी घ्यावीत?',
        'डॉक्टरांशी ऑनलाइन संपर्क करा',
        'आशा सेविकेशी संपर्क करा'
      ];
    } else if (role === 'doctor') {
      return [
        'प्रलंबित रेफरल्स दाखवा',
        'सविता देवीची केस माहिती',
        'टेलिकन्सल्टेशन सुरू करा',
        'उच्च जोखीम गर्भवती रुग्ण'
      ];
    } else {
      return [
        'आजच्या गृहभेटींची यादी',
        'रक्तदाब जास्त असल्यास काय करावे?',
        'आशा फॉलो-अप स्थिती'
      ];
    }
  }

  // English
  if (role === 'patient') {
    return [
      'What is my latest blood pressure?',
      'Explain my prescribed medicines',
      'When is my doctor appointment?',
      'Call my linked ASHA worker'
    ];
  } else if (role === 'doctor') {
    return [
      'Show pending inbound referrals',
      'Summarize patient Savita Devi',
      'Launch teleconsult with Savita',
      'What is the follow-up compliance rate?'
    ];
  } else if (role === 'admin') {
    return [
      'What is the district referral loop closure rate?',
      'Which facility has the highest backlog?',
      'Show critical emergency triage volume'
    ];
  } else {
    return [
      'Who needs a home visit today?',
      'Protocol for BP triage over 140/90',
      'Show overdue maternal follow-ups'
    ];
  }
}

function generateContextualResponse(
  query: string,
  role: UserRole,
  user: any,
  context: {
    patients: Patient[];
    referrals: Referral[];
    followUps: any[];
    appointments: any[];
    encounters: any[];
    language: Language;
  }
): { text: string; action?: Message['action'] } {
  const q = query.toLowerCase();
  const { patients, referrals, followUps, appointments, encounters, language } = context;

  // 1. PATIENT QUERIES
  if (role === 'patient') {
    const patient = patients.find((p) => p.id === user?.linkedPatientId) || patients[0];
    const patientReferral = referrals.find((r) => r.patientId === patient.id);
    const patientFollowUp = followUps.find((f) => f.patientId === patient.id);
    const patientAppt = appointments.find((a) => a.patientId === patient.id);

    if (
      q.includes('bp') ||
      q.includes('blood pressure') ||
      q.includes('रक्तचाप') ||
      q.includes('रक्तदाब') ||
      q.includes('vitals') ||
      q.includes('बीपी')
    ) {
      const bpSys = patient.lastVitals?.bpSystolic || 150;
      const bpDia = patient.lastVitals?.bpDiastolic || 95;
      const bp = `${bpSys}/${bpDia} mmHg`;

      if (language === 'hi') {
        return {
          text: `आपका नवीनतम दर्ज रक्तचाप ${bpSys} बटा ${bpDia} मिलीमीटर मरकरी है, जो सामान्य से अधिक है। कृपया डॉक्टर द्वारा सुझाई गई एमलोडिपिन दवा नियमित रूप से लें, अधिक पानी पिएं और भोजन में नमक कम रखें।`,
          action: { label: 'प्रिस्क्रिप्शन देखें', type: 'view_prescriptions' }
        };
      } else if (language === 'mr') {
        return {
          text: `आपला नवीनतम रक्तदाब ${bpSys} भागिले ${bpDia} मिलीमीटर मरक्युरी नोंदवला गेला आहे, जो उच्च श्रेणीत आहे. कृपया डॉ. कुलकर्णी यांनी दिलेली एमलोडिपिन औषधे वेळेवर घ्या आणि आहारात मिठाचे प्रमाण कमी ठेवा.`,
          action: { label: 'औषध तपशील', type: 'view_prescriptions' }
        };
      }
      return {
        text: `Your latest recorded blood pressure is ${bpSys} over ${bpDia} millimeters of mercury, which is classified as elevated Stage-1 Hypertension. Dr. Rajesh Kulkarni has advised regular medication and low sodium diet.`,
        action: { label: 'View Prescription Details', type: 'view_prescriptions' }
      };
    }

    if (
      q.includes('medicine') ||
      q.includes('medication') ||
      q.includes('दवा') ||
      q.includes('औषध') ||
      q.includes('prescription') ||
      q.includes('पर्ची')
    ) {
      if (language === 'hi') {
        return {
          text: `आपकी सक्रिय दवाइयाँ इस प्रकार हैं। पहली दवा, एमलोडिपिन 5 मिलीग्राम, रोज़ सुबह नाश्ते के बाद 1 गोली लें। दूसरी दवा, आयरन और फोलिक एसिड, दोपहर के भोजन के बाद 1 गोली लें। तीसरी दवा, कैल्शियम 500 मिलीग्राम, रात के भोजन के बाद 1 गोली लें। कृपया दवाइयां नियमित रूप से लें।`,
          action: { label: 'डिजिटल पर्ची देखें', type: 'view_prescriptions' }
        };
      } else if (language === 'mr') {
        return {
          text: `आपली चालू औषधे पुढीलप्रमाणे आहेत. पहिली औषध गोळी, एमलोडिपिन 5 मिलीग्राम, दररोज सकाळी न्याहारीनंतर 1 गोळी. दुसरी गोळी, आयर्न आणि फॉलिक ॲसिड, दुपारी जेवणानंतर 1 गोळी. तिसरी गोळी, कॅल्शियम 500 मिलीग्राम, रात्री जेवणानंतर 1 गोळी. कृपया वेळेवर औषधोपचार करा.`,
          action: { label: 'ई-प्रिस्क्रिप्शन', type: 'view_prescriptions' }
        };
      }
      return {
        text: `Your active prescribed regimen is as follows: First, Tablet Amlodipine 5 milligrams, one tablet once daily in the morning after breakfast. Second, Tablet Iron and Folic Acid, one tablet post-lunch. Third, Tablet Calcium 500 milligrams, one tablet at night. Daily adherence is essential for maintaining safe blood pressure levels.`,
        action: { label: 'View E-Prescription Card', type: 'view_prescriptions' }
      };
    }

    if (
      q.includes('appointment') ||
      q.includes('doctor') ||
      q.includes('भेंट') ||
      q.includes('डॉक्टर') ||
      q.includes('अपॉइंटमेंट') ||
      q.includes('तपासणी')
    ) {
      const time = patientAppt?.time || '02:30 PM';
      const doc = patientAppt?.providerName || 'Dr. Rajesh Kulkarni';
      if (language === 'hi') {
        return {
          text: `आपकी डॉ. राजेश कुलकर्णी के साथ आज दोपहर 2 बजकर 30 मिनट पर चांदूर प्राथमिक स्वास्थ्य केंद्र द्वारा डिजिटल टेलीकंसल्टेशन समीक्षा तय है।`,
          action: {
            label: 'टेलीकंसल्ट रूम से जुड़ें',
            type: 'open_teleconsult',
            payload: { patientId: patient.id }
          }
        };
      } else if (language === 'mr') {
        return {
          text: `आपली डॉ. राजेश कुलकर्णी यांच्यासोबत आज दुपारी २ वाजून ३० मिनिटांनी चांदूर प्राथमिक आरोग्य केंद्राद्वारे ऑनलाइन टेलिकन्सल्टेशन तपासणी नियोजित आहे.`,
          action: {
            label: 'टेलिकन्सल्ट मध्ये सामील व्हा',
            type: 'open_teleconsult',
            payload: { patientId: patient.id }
          }
        };
      }
      return {
        text: `You have a scheduled teleconsultation review with ${doc} today at ${time} via Chandur Primary Health Centre digital line.`,
        action: {
          label: 'Join Teleconsultation',
          type: 'open_teleconsult',
          payload: { patientId: patient.id }
        }
      };
    }

    if (
      q.includes('asha') ||
      q.includes('call') ||
      q.includes('आशा') ||
      q.includes('फोन') ||
      q.includes('सेविका') ||
      q.includes('tai')
    ) {
      if (language === 'hi') {
        return {
          text: `आपकी गाँव की स्वास्थ्य कार्यकर्ता सुनीता बाई हैं, जिनका संपर्क नंबर 94231 88990 है। क्या आप उन्हें गृह जांच सहायता के लिए अभी कॉल करना चाहते हैं?`,
          action: { label: `आशा कार्यकर्ता को कॉल करें`, type: 'call_asha' }
        };
      } else if (language === 'mr') {
        return {
          text: `आपल्या गावच्या आशा सेविका सुनिता बाई आहेत, ज्यांचा संपर्क क्रमांक 94231 88990 आहे. आपण त्यांना गृहभेटीसाठी संपर्क करू शकता.`,
          action: { label: `आशा सेविकेशी संपर्क`, type: 'call_asha' }
        };
      }
      return {
        text: `Your assigned village health worker is ${patient.linkedAshaName} with contact number 94231 88990. Would you like to call her now for home checkup assistance?`,
        action: { label: `Call ASHA (${patient.linkedAshaName})`, type: 'call_asha' }
      };
    }
  }

  // 2. DOCTOR QUERIES
  if (role === 'doctor') {
    const pendingReferrals = referrals.filter(
      (r) => r.status === 'Created' || r.status === 'Accepted'
    );

    if (
      q.includes('referral') ||
      q.includes('pending') ||
      q.includes('मरीज') ||
      q.includes('रेफरल') ||
      q.includes('queue') ||
      q.includes('रुग्ण')
    ) {
      if (language === 'hi') {
        return {
          text: `डॉक्टर साहब, आपके पास वर्तमान में ${pendingReferrals.length} सक्रिय इनबाउंड रेफरल केस हैं। उच्च प्राथमिकता केस सविता देवी का है, जिनका रक्तचाप 150 बटा 95 और 28 सप्ताह का गर्भकाल है।`,
          action: {
            label: 'सविता देवी केस देखें',
            type: 'open_teleconsult',
            payload: { patientId: 'pat-101' }
          }
        };
      } else if (language === 'mr') {
        return {
          text: `डॉक्टर, आपल्याकडे सध्या ${pendingReferrals.length} सक्रिय रेफरल्स प्रलंबित आहेत. उच्च प्राधान्य रुग्ण सविता देवी, रक्तदाब 150 भागिले 95, 28 आठवडे गरोदरपण, रामपूर उपकेंद्राकडून आलेले आहे.`,
          action: {
            label: 'सविता देवीची माहिती',
            type: 'open_teleconsult',
            payload: { patientId: 'pat-101' }
          }
        };
      }
      return {
        text: `Doctor, you currently have ${pendingReferrals.length} active inbound referrals requiring clinical evaluation. High-priority case: Savita Devi, blood pressure 150 over 95, 28-weeks pregnant, referred from Rampur Sub-centre.`,
        action: {
          label: 'Review Savita Devi',
          type: 'open_teleconsult',
          payload: { patientId: 'pat-101' }
        }
      };
    }

    if (
      q.includes('savita') ||
      q.includes('summary') ||
      q.includes('case') ||
      q.includes('सविता')
    ) {
      if (language === 'hi') {
        return {
          text: `सविता देवी का क्लिनिकल सारांश: उम्र 28 वर्ष, 28 सप्ताह का गर्भकाल। दर्ज रक्तचाप 150 बटा 95, पल्स 82 और ऑक्सीजन स्तर 98 प्रतिशत है। प्रारंभिक लक्षण: पैरों में हल्की सूजन और सिरदर्द। स्थिति: जेस्टेशनल हाइपरटेंशन। सुझाई गई कार्यवाही: एमलोडिपिन 5 मिलीग्राम प्रिस्क्रिप्शन और 72 घंटे में आशा फॉलो-अप।`,
          action: {
            label: 'टेलीकंसल्ट ओपीडी खोलें',
            type: 'open_teleconsult',
            payload: { patientId: 'pat-101' }
          }
        };
      } else if (language === 'mr') {
        return {
          text: `सविता देवी यांचा रुग्ण सारांश: वय 28 वर्षे, 28 आठवडे गरोदर. रक्तदाब 150 भागिले 95, नाडी 82 आणि ऑक्सिजन पातळी 98 टक्के. प्राथमिक लक्षणे: पायावर हलकी सूज आणि डोकेदुखी. निदान: गरोदरपणातील उच्च रक्तदाब. उपचार: एमलोडिपिन 5 मिलीग्राम आणि 72 तासांत आशा गृह तपासणी.`,
          action: {
            label: 'टेलिकन्सल्ट ओपीडी उघडा',
            type: 'open_teleconsult',
            payload: { patientId: 'pat-101' }
          }
        };
      }
      return {
        text: `Clinical Summary for Savita Devi: Age 28, 28-weeks gestation. Vitals: Blood pressure 150 over 95, Pulse 82 beats per minute, Oxygen saturation 98 percent. Presentation: Mild pedal edema and morning headache. Triage Category: High Risk Gestational Hypertension. Recommended action: E-Prescription for Amlodipine 5 milligrams and structured ASHA follow-up within 72 hours.`,
        action: {
          label: 'Open Teleconsult OPD',
          type: 'open_teleconsult',
          payload: { patientId: 'pat-101' }
        }
      };
    }

    if (q.includes('teleconsult') || q.includes('call') || q.includes('ऑनलाइन')) {
      return {
        text: `Starting teleconsultation link for Chandur Primary Health Centre digital clinic. Connecting to Rampur Sub-centre Community Health Officer and patient.`,
        action: {
          label: 'Connect Teleconsult Room',
          type: 'open_teleconsult',
          payload: { patientId: 'pat-101' }
        }
      };
    }
  }

  // 3. ADMIN / DHO QUERIES
  if (role === 'admin') {
    if (
      q.includes('rate') ||
      q.includes('closure') ||
      q.includes('kpi') ||
      q.includes('दर') ||
      q.includes('loop')
    ) {
      if (language === 'hi') {
        return {
          text: `जिले का रेफरल क्लोजर दर 78.4 प्रतिशत है। इस महीने कुल 142 रेफरल दर्ज हुए, जिनमें से 111 केस सफलतापूर्वक पूरे किए गए। उपकेंद्र से प्राथमिक स्वास्थ्य केंद्र तक औसत समय 4.2 घंटे दर्ज हुआ है।`
        };
      } else if (language === 'mr') {
        return {
          text: `जिल्ह्याचा रेफरल लूप क्लोजर दर 78.4 टक्के आहे. या महिन्यात एकूण 142 रेफरल्स निर्माण झाले, त्यापैकी 111 रुग्णांचे उपचार यशस्वीपणे पूर्ण झाले. सरासरी पोहोच वेळ 4.2 तास नोंदवली आहे.`
        };
      }
      return {
        text: `District Referral Continuum Status: Referral Loop Closure Rate is 78.4 percent against target of 85 percent. Total referrals generated this month is 142, with 111 completed clinical outcomes. Average transit time is 4.2 hours from Sub-centre to PHC consult.`
      };
    }

    if (
      q.includes('backlog') ||
      q.includes('bottleneck') ||
      q.includes('अस्पताल') ||
      q.includes('facility') ||
      q.includes('प्रतीक्षा')
    ) {
      if (language === 'hi') {
        return {
          text: `अस्पताल क्षमता अलर्ट: इगतपुरी ग्रामीण अस्पताल में 4 रेफरल परामर्श लंबित हैं और बेड क्षमता 82 प्रतिशत है। चांदूर प्राथमिक स्वास्थ्य केंद्र 92 प्रतिशत क्लोजर दर के साथ सुचारू रूप से कार्य कर रहा है।`
        };
      }
      return {
        text: `Facility Bottleneck Alert: Igatpuri Rural Hospital has 4 overdue referral consultations and an active bed occupancy of 82 percent. Chandur PHC is functioning smoothly at 92 percent loop closure.`
      };
    }

    if (
      q.includes('emergency') ||
      q.includes('high risk') ||
      q.includes('इमरजेंसी') ||
      q.includes('आणीबाणी')
    ) {
      return {
        text: `Active Triage Breakdown: Emergency Tier has 2 active cases transferred to District Civil Hospital. High-Risk Tier has 5 active maternal and cardiac cases under close monitoring.`
      };
    }
  }

  // 4. ASHA / ANM QUERIES
  if (role === 'asha' || role === 'anm') {
    const pendingVisits = followUps.filter((f) => f.status === 'pending');

    if (
      q.includes('visit') ||
      q.includes('home') ||
      q.includes('भेंट') ||
      q.includes('घर') ||
      q.includes('task') ||
      q.includes('तपासणी')
    ) {
      if (language === 'hi') {
        return {
          text: `रामपूर गाँव में आज आपकी ${pendingVisits.length} गृह भेंटें निर्धारित हैं। पहली, सविता देवी के लिए मातृ रक्तचाप और दवा जांच। दूसरी, रेखा बाई के लिए श्वसन सुधार जांच। क्या आप सविता देवी का रिकॉर्ड खोलना चाहते हैं?`,
          action: {
            label: 'सविता देवी रिकॉर्ड खोलें',
            type: 'view_patient',
            payload: { patientId: 'pat-101' }
          }
        };
      } else if (language === 'mr') {
        return {
          text: `रामपूर गावात आज आपल्या ${pendingVisits.length} गृहभेटी प्रलंबित आहेत. पहिली, सविता देवी यांच्यासाठी गरोदर रक्तदाब आणि औषध तपासणी. दुसरी, रेखा बाई यांची तपासणी. सविता देवींचे रेकॉर्ड उघडू का?`,
          action: {
            label: 'सविता देवीचे रेकॉर्ड',
            type: 'view_patient',
            payload: { patientId: 'pat-101' }
          }
        };
      }
      return {
        text: `You have ${pendingVisits.length} assigned home visits pending today in Rampur Village: First, Savita Devi for Maternal Blood Pressure and Medication Check. Second, Rekha Bai for respiratory recovery check. Would you like to open the home visit record?`,
        action: {
          label: 'Open Savita Devi Record',
          type: 'view_patient',
          payload: { patientId: 'pat-101' }
        }
      };
    }

    if (
      q.includes('bp') ||
      q.includes('triage') ||
      q.includes('protocol') ||
      q.includes('नियम') ||
      q.includes('बीपी')
    ) {
      if (language === 'hi') {
        return {
          text: `आशा रक्तचाप प्रोटोकॉल: यदि सिस्टोलिक 140 या डायस्टोलिक 90 से अधिक हो और गर्भावस्था के लक्षण हों, तो यह उच्च जोखिम है। मरीज को 15 मिनट आराम देकर दोबारा जांचें और तुरंत चांदूर प्राथमिक स्वास्थ्य केंद्र के लिए डिजिटल रेफरल दर्ज करें।`
        };
      }
      return {
        text: `ASHA Protocol for Blood Pressure: Systolic 140 or Diastolic 90 and above with pregnancy symptoms is classified as High Risk. Recheck blood pressure after 15 minutes rest and trigger immediate digital referral to Chandur PHC.`
      };
    }
  }

  // Fallback General Response
  if (language === 'hi') {
    return {
      text: `मैंने आपकी स्वास्थ्य संबंधी क्वेरी दर्ज कर ली है। आप रक्तचाप, निर्धारित दवाइयों, अगली डॉक्टर अपॉइंटमेंट या रेफरल की स्थिति के बारे में पूछ सकते हैं।`,
      action: {
        label: 'मरीज रिकॉर्ड देखें',
        type: 'view_patient',
        payload: { patientId: 'pat-101' }
      }
    };
  } else if (language === 'mr') {
    return {
      text: `मी आपली विचारणा नोंदवून घेतली आहे. आपण रक्तदाब, औषधोपचार, डॉक्टर तपासणी वेळ किंवा रेफरल स्थितीबद्दल अधिक विचारू शकता.`,
      action: {
        label: 'रुग्ण तपशील पहा',
        type: 'view_patient',
        payload: { patientId: 'pat-101' }
      }
    };
  }

  return {
    text: `I have processed your care coordination inquiry. You can ask for live vitals, pending referrals, medication schedules, or activate teleconsultations.`,
    action: {
      label: 'Open Patient Health Chart',
      type: 'view_patient',
      payload: { patientId: 'pat-101' }
    }
  };
}
