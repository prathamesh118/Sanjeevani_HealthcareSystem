import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { UserRole, Language } from '../types';
import {
  HeartPulse,
  User,
  Users,
  Stethoscope,
  Activity,
  ShieldCheck,
  Globe,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Info,
  LogOut,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Mic,
  Volume2
} from 'lucide-react';
import { VoiceAssistant } from './VoiceAssistant';
import { SanjeevaniLogo } from './SanjeevaniLogo';

export const Header: React.FC = () => {
  const {
    currentRole,
    currentUser,
    logout,
    language,
    setLanguage,
    t,
    isOffline,
    setIsOffline,
    pendingOfflineSyncCount,
    syncOfflineQueue,
    resetDemoData,
    notification
  } = useHealth();

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const roleMeta: Record<
    UserRole,
    {
      portalTitle: string;
      tier: string;
      badgeBg: string;
      badgeText: string;
      icon: React.ComponentType<{ className?: string }>;
      color: string;
    }
  > = {
    patient: {
      portalTitle: 'Citizen ABHA Portal',
      tier: 'Personal Health Locker',
      badgeBg: 'bg-rose-50 border-rose-200',
      badgeText: 'text-rose-700',
      icon: User,
      color: 'bg-rose-600'
    },
    doctor: {
      portalTitle: 'Doctor OPD & Clinical Portal',
      tier: 'PHC / Hospital Workstation',
      badgeBg: 'bg-indigo-50 border-indigo-200',
      badgeText: 'text-indigo-700',
      icon: Stethoscope,
      color: 'bg-indigo-600'
    },
    admin: {
      portalTitle: 'District Health Command HQ',
      tier: 'Public Health Oversight',
      badgeBg: 'bg-slate-100 border-slate-300',
      badgeText: 'text-slate-900',
      icon: ShieldCheck,
      color: 'bg-slate-900'
    },
    asha: {
      portalTitle: 'ASHA Field Worker Portal',
      tier: 'Village Community Outreach',
      badgeBg: 'bg-teal-50 border-teal-200',
      badgeText: 'text-teal-800',
      icon: Users,
      color: 'bg-teal-600'
    },
    anm: {
      portalTitle: 'CHO / ANM Sub-centre Portal',
      tier: 'Sub-centre HWC Node',
      badgeBg: 'bg-sky-50 border-sky-200',
      badgeText: 'text-sky-800',
      icon: Activity,
      color: 'bg-sky-600'
    }
  };

  const currentMeta = roleMeta[currentRole] || roleMeta.patient;
  const RoleIcon = currentMeta.icon;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top Official Status Ribbon */}
        <div className="bg-slate-900 text-slate-300 text-[11px] px-4 sm:px-6 py-1 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
            <span className="font-semibold text-slate-200 tracking-wide uppercase">
              National Health Mission &bull; Public Healthcare Continuity Network
            </span>
            <span className="hidden md:inline text-teal-400 font-medium border-l border-slate-700 pl-2">
              ABDM Certified Node
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Offline Sync State (especially for field workers) */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
              title="Toggle Offline Sync Simulation"
            >
              {isOffline ? (
                <>
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span className="text-amber-300 font-medium">Offline ({pendingOfflineSyncCount})</span>
                  {pendingOfflineSyncCount > 0 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        syncOfflineQueue();
                      }}
                      className="ml-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-1 rounded text-[9px]"
                    >
                      Sync
                    </span>
                  )}
                </>
              ) : (
                <>
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Live Synced</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center space-x-0.5 bg-slate-800 rounded p-0.5 border border-slate-700">
              <Globe className="w-3 h-3 text-slate-400 ml-1 mr-0.5" />
              {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                    language === lang
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
                </button>
              ))}
            </div>

            {/* Reset Demo State */}
            <button
              onClick={resetDemoData}
              className="text-slate-400 hover:text-amber-300 transition-colors flex items-center space-x-1 cursor-pointer"
              title="Reset to Initial Demo State"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Main Header Bar for Authenticated Role */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Official Sanjeevani Brand Logo + Active Portal Identity */}
          <div className="flex items-center">
            <SanjeevaniLogo
              size="md"
              badge={
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentMeta.badgeBg} ${currentMeta.badgeText} inline-flex items-center gap-1.5 shadow-2xs`}>
                  <RoleIcon className="w-3.5 h-3.5" />
                  <span>{currentMeta.portalTitle}</span>
                </span>
              }
              facilitySubtitle={`${currentMeta.tier} • ${currentUser?.facility || 'National Health Grid'}`}
            />
          </div>

          {/* Right: Voice Assistant Quick Trigger + User Info + Switch Portal Logout */}
          <div className="flex items-center space-x-2.5">
            {/* Voice Assistant Header Button with Waveform Indicator */}
            <button
              onClick={() => setIsVoiceOpen(true)}
              id="btn-header-voice-assistant"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 border border-teal-200/90 text-teal-900 text-xs font-bold transition-all cursor-pointer shadow-xs hover:shadow-sm group relative overflow-hidden"
              title="Activate Sanjeevani AI Voice Assistant"
            >
              <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                <Mic className="w-3 h-3 animate-pulse" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[11px] font-extrabold text-teal-950 flex items-center gap-1">
                  {language === 'hi' ? 'संजीवनी AI' : language === 'mr' ? 'संजीवनी AI' : 'Sanjeevani AI'}
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-400" />
                </span>
                <span className="text-[9px] text-teal-700 font-medium hidden sm:inline">
                  Voice Care Assistant
                </span>
              </div>
              {/* Mini animated sound wave bars */}
              <div className="flex items-center space-x-0.5 ml-1 h-3">
                <div className="w-0.5 bg-teal-500 rounded-full soundwave-bar"></div>
                <div className="w-0.5 bg-teal-600 rounded-full soundwave-bar"></div>
                <div className="w-0.5 bg-teal-500 rounded-full soundwave-bar"></div>
              </div>
            </button>

            {/* Current User Card */}
            {currentUser && (
              <div className="flex items-center space-x-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50/90 shadow-2xs">
                <div className={`w-7 h-7 rounded-lg ${currentMeta.color} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-1 ring-white`}>
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate max-w-[140px]">
                    {currentUser.identifier}
                  </div>
                </div>
              </div>
            )}

            {/* Clean Logout / Switch Portal */}
            <button
              onClick={logout}
              id="btn-switch-portal-logout"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 hover:border-rose-300 border border-rose-200 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Sign Out to Portal Selection"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Switch Portal</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {notification && (
          <div className="fixed bottom-5 left-5 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div
              className={`flex items-start space-x-3 p-4 rounded-xl shadow-xl border text-sm font-medium ${
                notification.type === 'success'
                  ? 'bg-emerald-900 text-emerald-50 border-emerald-700'
                  : notification.type === 'alert'
                  ? 'bg-amber-950 text-amber-50 border-amber-600'
                  : 'bg-slate-900 text-slate-50 border-slate-700'
              }`}
            >
              {notification.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {notification.type === 'alert' && (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              {notification.type === 'info' && (
                <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 leading-snug">{notification.message}</div>
            </div>
          </div>
        )}
      </header>

      {/* Voice Assistant Modal Component */}
      <VoiceAssistant isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </>
  );
};
