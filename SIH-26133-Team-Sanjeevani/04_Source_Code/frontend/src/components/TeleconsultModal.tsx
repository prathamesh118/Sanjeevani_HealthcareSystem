import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Activity,
  FileText,
  User,
  Heart,
  Thermometer,
  Wind,
  ShieldCheck,
  Send,
  MessageSquare,
  Volume2
} from 'lucide-react';
import doctorTeleImg from '../assets/images/doctor_teleconsult_1788025790089.jpg';
import ashaCareImg from '../assets/images/asha_worker_care_1788025776530.jpg';
import patientFamilyImg from '../assets/images/patient_family_wellness_1788025804396.jpg';

export const TeleconsultModal: React.FC = () => {
  const {
    activeTeleconsultPatient,
    setActiveTeleconsultPatient,
    currentRole
  } = useHealth();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'ASHA Sunita Bai', text: 'Namaste Doctor, patient Savita Devi is present with me at Rampur Sub-centre.', time: '11:02 AM' },
    { sender: 'Doctor', text: 'Namaste Sunita. I can see her vitals. She has high BP 165/102. Is she feeling dizzy?', time: '11:03 AM' },
    { sender: 'Patient (Savita)', text: 'Doctor sahab, severe headache since yesterday morning and feet have swollen.', time: '11:04 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [consultNotes, setConsultNotes] = useState('Patient 28 weeks ANC. Pedal edema +2. Start Tab Labetalol 100mg BD. Urgent urine albumin test.');

  if (!activeTeleconsultPatient) return null;

  const pat = activeTeleconsultPatient;
  const vitals = pat.lastVitals;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      {
        sender: currentRole === 'doctor' ? 'Dr. Rajesh Kulkarni' : 'ANM / ASHA',
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-base sm:text-lg">
                eSanjeevani / Sanjeevani AI Teleconsultation Session
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs px-2 py-0.5 rounded-full font-medium">
                Encrypted &bull; WebRTC Link Active
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTeleconsultPatient(null)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <PhoneOff className="w-5 h-5 text-rose-400" />
          </button>
        </div>

        {/* Teleconsult Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 p-4 overflow-y-auto">
          {/* Main Video Stage (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            {/* Primary Video Feed: Remote Patient / Sub-centre */}
            <div className="relative aspect-video bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
              {isVideoOn ? (
                <div className="w-full h-full relative">
                  <img
                    src={currentRole === 'doctor' ? ashaCareImg : doctorTeleImg}
                    alt="Teleconsultation Stream"
                    className="w-full h-full object-cover filter contrast-105 brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40"></div>

                  {/* Top Feed Indicators */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <div className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 flex items-center space-x-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      <span>{currentRole === 'doctor' ? `${pat.name} & ASHA ${pat.linkedAshaName}` : 'Dr. Rajesh Kulkarni (MO)'}</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 backdrop-blur-md text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      720p HD &bull; 48ms
                    </span>
                  </div>

                  {/* Audio Waveform simulation indicator */}
                  <div className="absolute top-3 right-40 sm:right-48 flex items-center space-x-1 bg-slate-900/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
                    <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                    <span className="w-1 h-3 bg-teal-400 rounded-full animate-pulse"></span>
                    <span className="w-1 h-4 bg-teal-300 rounded-full animate-pulse delay-75"></span>
                    <span className="w-1 h-2 bg-teal-400 rounded-full animate-pulse delay-150"></span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 flex flex-col items-center">
                  <VideoOff className="w-12 h-12 mb-2" />
                  <span>Video Muted</span>
                </div>
              )}

              {/* Doctor / Self PiP Video Preview */}
              <div className="absolute top-3 right-3 w-36 sm:w-44 aspect-video bg-slate-900 rounded-xl border border-slate-700/90 shadow-2xl overflow-hidden flex flex-col justify-end group">
                <img
                  src={currentRole === 'doctor' ? doctorTeleImg : ashaCareImg}
                  alt="Self Camera Preview"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                <div className="relative z-10 p-1.5 flex items-center justify-between text-white text-[10px]">
                  <span className="font-extrabold truncate">
                    {currentRole === 'doctor' ? 'Dr. Rajesh (You)' : 'Rampur HWC (You)'}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                </div>
              </div>

              {/* Live HUD Vitals Overlay */}
              {vitals && (
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-rose-400 text-[11px] font-semibold">
                      <Heart className="w-3 h-3" />
                      <span>BP</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {vitals.bpSystolic}/{vitals.bpDiastolic} <span className="text-[10px] text-slate-400">mmHg</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-amber-400 text-[11px] font-semibold">
                      <Thermometer className="w-3 h-3" />
                      <span>Temp</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {vitals.temperature || 98.6}°F
                    </div>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-emerald-400 text-[11px] font-semibold">
                      <Wind className="w-3 h-3" />
                      <span>SpO2</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {vitals.spO2 || 98}%
                    </div>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800">
                    <div className="flex items-center justify-center space-x-1 text-teal-400 text-[11px] font-semibold">
                      <Activity className="w-3 h-3" />
                      <span>Pulse</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      {vitals.pulse || 80} <span className="text-[10px] text-slate-400">bpm</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="bg-slate-800/90 rounded-xl p-3 flex items-center justify-center space-x-4 border border-slate-700">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isMicOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
                title="Toggle Mic"
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-colors cursor-pointer ${
                  isVideoOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-rose-600 text-white hover:bg-rose-700'
                }`}
                title="Toggle Camera"
              >
                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setActiveTeleconsultPatient(null)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-2.5 rounded-full flex items-center space-x-2 transition-colors cursor-pointer shadow-lg shadow-rose-900/30"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Teleconsult</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Clinical Chat & Scratchpad */}
          <div className="flex flex-col space-y-3 bg-slate-950/60 rounded-xl p-3 border border-slate-800">
            {/* ABHA Verification & Consent Check */}
            <div className="bg-teal-950/60 border border-teal-700/60 rounded-lg p-2.5 flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">ABHA Record Consent Active</div>
                <div className="text-slate-300 text-[11px]">ID: {pat.abhaId || '91-4829-1029-3321'}</div>
              </div>
            </div>

            {/* Live Chat / Intercom Feed */}
            <div className="flex-1 flex flex-col min-h-[180px] bg-slate-900 rounded-lg border border-slate-800 p-2.5">
              <div className="flex items-center space-x-1.5 pb-2 mb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
                <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                <span>Live Intercom (ASHA &bull; Doctor &bull; Patient)</span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 text-xs pr-1">
                {chatMessages.map((msg, i) => (
                  <div key={i} className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between text-[10px] text-teal-300 font-semibold mb-0.5">
                      <span>{msg.sender}</span>
                      <span className="text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-slate-200">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="mt-2 flex space-x-1.5 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type advice or message..."
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Quick Consultation Notes */}
            <div className="bg-slate-900 rounded-lg border border-slate-800 p-2.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300 mb-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Doctor Consultation Scratchpad</span>
              </div>
              <textarea
                value={consultNotes}
                onChange={e => setConsultNotes(e.target.value)}
                rows={2}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-slate-100 focus:outline-hidden focus:border-amber-400 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
