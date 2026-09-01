import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { UserRole, Language, UserProfile } from '../types';
import {
  HeartPulse,
  User,
  Users,
  Stethoscope,
  Activity,
  ShieldCheck,
  Globe,
  Smartphone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Lock,
  FileCheck,
  Hospital,
  Zap,
  Check,
  ShieldAlert,
  Layers,
  Mic,
  BookOpen,
  Info
} from 'lucide-react';
import { SanjeevaniLogo } from './SanjeevaniLogo';
import ruralHeroImg from '../assets/images/rural_healthcare_hero_1788025759730.jpg';
import ashaCareImg from '../assets/images/asha_worker_care_1788025776530.jpg';
import doctorTeleImg from '../assets/images/doctor_teleconsult_1788025790089.jpg';
import patientFamilyImg from '../assets/images/patient_family_wellness_1788025804396.jpg';

type PortalType = 'patient' | 'doctor' | 'admin' | 'field';

export const LoginView: React.FC = () => {
  const { login, availableUsers, language, setLanguage, t } = useHealth();

  // Active Portal Gateway
  const [activePortal, setActivePortal] = useState<PortalType>('patient');

  // Citizen Portal State
  const [patientInput, setPatientInput] = useState('');
  const [patientOtpSent, setPatientOtpSent] = useState(false);
  const [patientOtpCode, setPatientOtpCode] = useState('4821');
  const [selectedCitizen, setSelectedCitizen] = useState<UserProfile | null>(null);
  const [patientError, setPatientError] = useState('');
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(false);
  const [autoLoginProfileName, setAutoLoginProfileName] = useState('');

  // Doctor Portal State
  const [doctorHprId, setDoctorHprId] = useState('HPR-MH-DOC-4019');
  const [doctorFacility, setDoctorFacility] = useState('Chandur Primary Health Centre (PHC)');
  const [doctorPin, setDoctorPin] = useState('1234');
  const [doctorError, setDoctorError] = useState('');

  // Admin Portal State
  const [adminGovId, setAdminGovId] = useState('GOV-MH-DHO-001');
  const [adminPin, setAdminPin] = useState('1234');
  const [adminError, setAdminError] = useState('');

  // Field Staff (ASHA/ANM) State
  const [fieldStaffId, setFieldStaffId] = useState('ASHA-MH-NSK-042');
  const [fieldStaffPin, setFieldStaffPin] = useState('1234');
  const [fieldSubcentre, setFieldSubcentre] = useState('Rampur Health Sub-centre');
  const [fieldError, setFieldError] = useState('');

  const citizenUsers = availableUsers.filter((u) => u.role === 'patient');
  const doctorUsers = availableUsers.filter((u) => u.role === 'doctor');
  const adminUsers = availableUsers.filter((u) => u.role === 'admin');
  const ashaUsers = availableUsers.filter((u) => u.role === 'asha');
  const anmUsers = availableUsers.filter((u) => u.role === 'anm');

  // Citizen Auto-OTP & Instant Login Handler
  const handleSendCitizenOtp = (user?: UserProfile, instantLogin: boolean = true) => {
    const target =
      user ||
      citizenUsers.find(
        (u) =>
          u.phone === patientInput ||
          u.identifier === patientInput ||
          u.name.toLowerCase().includes(patientInput.toLowerCase())
      ) ||
      citizenUsers[0];

    setSelectedCitizen(target);
    setPatientInput(target.phone || target.identifier);
    setPatientOtpCode('4821'); // Auto-give demo OTP automatically
    setPatientOtpSent(true);
    setPatientError('');

    if (instantLogin) {
      setIsAutoLoggingIn(true);
      setAutoLoginProfileName(target.name);
      setTimeout(() => {
        login(target);
      }, 500);
    }
  };

  const handleVerifyCitizenOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const userToLogin = selectedCitizen || citizenUsers[0];
    setIsAutoLoggingIn(true);
    setAutoLoginProfileName(userToLogin.name);
    setTimeout(() => {
      login(userToLogin);
    }, 350);
  };

  // Instant Login helper for any profile
  const handleInstantProfileLogin = (profile: UserProfile) => {
    setIsAutoLoggingIn(true);
    setAutoLoginProfileName(profile.name);
    setTimeout(() => {
      login(profile);
    }, 450);
  };

  // Doctor Login Handler
  const handleDoctorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorHprId.trim()) {
      setDoctorError('Please enter Healthcare Professional ID (HPR)');
      return;
    }
    const matched =
      doctorUsers.find(
        (u) =>
          u.identifier.toLowerCase() === doctorHprId.toLowerCase() ||
          u.name.toLowerCase().includes(doctorHprId.toLowerCase())
      ) || doctorUsers[0];

    handleInstantProfileLogin(matched);
  };

  // Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminGovId.trim()) {
      setAdminError('Please enter Government Officer ID');
      return;
    }
    const matched =
      adminUsers.find(
        (u) =>
          u.identifier.toLowerCase() === adminGovId.toLowerCase() ||
          u.name.toLowerCase().includes(adminGovId.toLowerCase())
      ) || adminUsers[0];

    handleInstantProfileLogin(matched);
  };

  // Field Staff Login Handler
  const handleFieldLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldStaffId.trim()) {
      setFieldError('Please enter ASHA / CHO Registration ID');
      return;
    }
    const matched =
      [...ashaUsers, ...anmUsers].find(
        (u) =>
          u.identifier.toLowerCase() === fieldStaffId.toLowerCase() ||
          u.name.toLowerCase().includes(fieldStaffId.toLowerCase())
      ) || ashaUsers[0];

    handleInstantProfileLogin(matched);
  };

  const portalTabs = [
    {
      id: 'patient' as PortalType,
      title: 'Citizen / Patient',
      sub: 'ABHA & Personal Health',
      icon: User,
      color: 'rose',
      borderActive: 'border-rose-600 bg-rose-50/70 text-rose-900',
      badge: 'Auto OTP (4821)'
    },
    {
      id: 'doctor' as PortalType,
      title: 'Doctor / Medical Officer',
      sub: 'Hospital & PHC OPD',
      icon: Stethoscope,
      color: 'indigo',
      borderActive: 'border-indigo-600 bg-indigo-50/70 text-indigo-900',
      badge: 'HPR Registry'
    },
    {
      id: 'admin' as PortalType,
      title: 'District Administration',
      sub: 'Health Command & KPIs',
      icon: ShieldCheck,
      color: 'slate',
      borderActive: 'border-slate-800 bg-slate-100 text-slate-900',
      badge: 'DHO 2FA'
    },
    {
      id: 'field' as PortalType,
      title: 'ASHA / ANM / CHO',
      sub: 'Village & Sub-centre',
      icon: Users,
      color: 'teal',
      borderActive: 'border-teal-600 bg-teal-50/70 text-teal-900',
      badge: 'Field App'
    }
  ];

  // Key demo highlight profiles
  const keyDemoProfiles = [
    {
      profile: citizenUsers[0], // Savita Devi
      roleLabel: 'Citizen / Patient',
      tag: 'High-Risk ANC',
      icon: User,
      desc: 'Auto-fills OTP (4821) & opens ABHA Locker'
    },
    {
      profile: doctorUsers[0], // Dr. Rajesh Kulkarni
      roleLabel: 'Doctor / MO',
      tag: 'Chandur PHC',
      icon: Stethoscope,
      desc: 'OPD Triage & Teleconsult Workstation'
    },
    {
      profile: ashaUsers[0], // Sunita Bai
      roleLabel: 'ASHA Worker',
      tag: 'Rampur Village',
      icon: Users,
      desc: 'Offline Field Screening & Surveys'
    },
    {
      profile: anmUsers[0], // Kavita Shinde
      roleLabel: 'CHO / ANM',
      tag: 'Health Sub-centre',
      icon: Activity,
      desc: 'Sub-centre Care Coordinator Node'
    },
    {
      profile: adminUsers[0], // Dr. Anand Deshmukh
      roleLabel: 'District Officer',
      tag: 'Nashik HQ',
      icon: ShieldCheck,
      desc: 'District Command & Referral KPIs'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      {/* Auto-Login Progress Overlay */}
      {isAutoLoggingIn && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center animate-bounce">
              <Zap className="w-7 h-7 fill-teal-500 text-teal-600" />
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                <Check className="w-4 h-4" />
                <span>Demo OTP (4821) Auto-Verified</span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                Logging in to {autoLoginProfileName}...
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Loading clinical dashboard, ABHA records, and active workflow queue.
              </p>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full w-full animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* Top Government Official Strip */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <SanjeevaniLogo
              size="md"
              badge={
                <span className="bg-teal-50 text-teal-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-teal-200 hidden sm:inline">
                  National Health Mission &bull; ABDM
                </span>
              }
              facilitySubtitle="Rural Healthcare Continuity & Care Gateway"
            />
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1" />
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center">
        {/* Visual Hero Banner with Image & Key Stats */}
        <div className="max-w-5xl mx-auto w-full mb-6">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-teal-800/30 bg-slate-900 text-white">
            {/* Background Hero Image with Gradient Overlays */}
            <div className="absolute inset-0 z-0">
              <img
                src={ruralHeroImg}
                alt="Rural Public Healthcare Centre Ayushman Arogya Mandir"
                className="w-full h-full object-cover opacity-35 filter contrast-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-teal-950/70"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center space-x-2 bg-teal-500/20 backdrop-blur-md border border-teal-400/40 rounded-full px-3.5 py-1 text-xs font-bold text-teal-200 mb-3 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                  <span>National Health Mission &bull; Ayushman Bharat Digital Mission (ABDM)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Rural Healthcare Continuity &amp; Care Coordination
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed max-w-xl font-normal">
                  Connecting Patients, ASHA workers, ANMs, Medical Officers, and District Administrators through real-time vital sync, teleconsultation, and multilingual AI voice guidance.
                </p>

                {/* Badges of trust */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-[11px] font-semibold text-teal-200 border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>100% ABHA Linked</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-[11px] font-semibold text-emerald-200 border border-white/10">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sub-centre ➔ PHC ➔ District Grid</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-[11px] font-semibold text-amber-200 border border-white/10">
                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                    <span>Voice AI in Hindi, Marathi, English</span>
                  </div>
                </div>
              </div>

              {/* Fast Start Callout */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 w-full lg:w-72 shrink-0">
                <div className="flex items-center space-x-2 text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>Interactive Sandbox</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-snug">
                  Choose any role below or click a demo card to test the live healthcare workflows immediately.
                </p>
                <div className="mt-3 text-[11px] font-bold text-white bg-teal-600/80 rounded-xl px-3 py-1.5 text-center flex items-center justify-center space-x-1.5 shadow-xs">
                  <span>Explore All 5 Portals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP DEMO PROFILES BAR (1-Click Instant Login for all 5 roles) */}
        <div className="max-w-5xl mx-auto w-full mb-6">
          <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-2xl p-4 text-white shadow-md border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-teal-500/30 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-teal-300" />
                </div>
                <span className="font-extrabold text-xs tracking-wide uppercase text-teal-200">
                  ⚡ Quick Demo Launchpad (Auto-OTP &amp; Login)
                </span>
              </div>
              <span className="text-[11px] text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                1-Click Instant Access
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {keyDemoProfiles.map((item, idx) => {
                const Icon = item.icon;
                if (!item.profile) return null;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInstantProfileLogin(item.profile)}
                    className="p-3 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-teal-400/50 rounded-xl text-left transition-all cursor-pointer group flex flex-col justify-between hover:scale-[1.02] shadow-xs"
                    title={`Click to login as ${item.profile.name} (${item.roleLabel})`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                          {item.roleLabel}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-teal-400 group-hover:text-slate-950 transition-colors">
                          <Icon className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="font-extrabold text-xs text-white group-hover:text-teal-200 truncate">
                        {item.profile.name}
                      </div>
                      <div className="text-[10px] text-slate-300 truncate mt-0.5">
                        {item.tag}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-teal-300 group-hover:text-white">
                      <span>Instant Login</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Separate Portal Selector Tabs with Visual Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto w-full mb-6">
          {portalTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activePortal === tab.id;
            const tabImg =
              tab.id === 'patient'
                ? patientFamilyImg
                : tab.id === 'field'
                ? ashaCareImg
                : tab.id === 'doctor'
                ? doctorTeleImg
                : null;

            return (
              <button
                key={tab.id}
                id={`portal-btn-${tab.id}`}
                onClick={() => {
                  setActivePortal(tab.id);
                  setPatientOtpSent(false);
                }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative group ${
                  isActive
                    ? `${tab.borderActive} shadow-md ring-2 ring-teal-500/25 bg-white`
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                }`}
              >
                <div>
                  {/* Visual Image Thumbnail for Portal */}
                  {tabImg ? (
                    <div className="h-20 sm:h-24 w-full rounded-xl overflow-hidden mb-2.5 relative border border-slate-100 bg-slate-100">
                      <img
                        src={tabImg}
                        alt={tab.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[10px] font-bold">
                        <span className="truncate">{tab.title}</span>
                        <div className="w-5 h-5 rounded-full bg-teal-600/90 flex items-center justify-center text-white shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                      )}
                    </div>
                  )}

                  <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {tab.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {tab.sub}
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono font-medium text-slate-500">
                  <span>{tab.badge}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Portal Dedicated Login Window */}
        <div className="max-w-xl mx-auto w-full">
          {/* 1. CITIZEN & PATIENT PORTAL */}
          {activePortal === 'patient' && (
            <div className="bg-white rounded-2xl border border-rose-200/90 shadow-lg shadow-rose-900/5 p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-slate-900">
                      Citizen ABHA &amp; Health Locker Portal
                    </h3>
                    <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-200">
                      Auto-OTP Demo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Access digital prescriptions, vitals chart, teleconsult room, and linked ASHA.
                  </p>
                </div>
              </div>

              {!patientOtpSent ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 block mb-2 flex items-center justify-between">
                      <span>Click Profile for Auto-OTP &amp; Instant Login:</span>
                      <span className="text-emerald-700 font-extrabold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        OTP 4821 Auto-Filled
                      </span>
                    </span>
                    <div className="space-y-2">
                      {citizenUsers.map((pat) => (
                        <button
                          key={pat.id}
                          type="button"
                          onClick={() => handleSendCitizenOtp(pat, true)}
                          className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50/70 text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 font-extrabold text-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                              {pat.name.slice(0, 1)}
                            </div>
                            <div>
                              <div className="font-extrabold text-slate-900 group-hover:text-rose-800 text-xs sm:text-sm">
                                {pat.name} <span className="font-normal text-slate-500">({pat.village})</span>
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono">
                                {pat.designation} &bull; Mobile: {pat.phone}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] font-bold text-white bg-rose-600 group-hover:bg-rose-700 px-3 py-1.5 rounded-lg shadow-2xs flex items-center space-x-1 transition-colors">
                              <span>Auto-Login</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">Auto OTP (4821)</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Or Enter Custom ABHA ID / Mobile Number:
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={patientInput}
                          onChange={(e) => setPatientInput(e.target.value)}
                          placeholder="+91 94231 55678"
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-hidden"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSendCitizenOtp(undefined, true)}
                        className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center space-x-1.5 shadow-sm shrink-0"
                      >
                        <span>Auto-OTP &amp; Login</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleVerifyCitizenOtp} className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Demo OTP <strong>4821</strong> is automatically provided for <strong>{selectedCitizen?.name}</strong>.
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        4-Digit Security OTP (Auto-Filled)
                      </label>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                        Valid Demo OTP: 4821
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={patientOtpCode}
                      onChange={(e) => {
                        setPatientOtpCode(e.target.value);
                        setPatientError('');
                      }}
                      placeholder="4821"
                      className="w-full px-4 py-2.5 border border-emerald-300 bg-emerald-50/30 rounded-xl text-center text-lg tracking-widest font-mono font-bold focus:ring-2 focus:ring-rose-500 outline-hidden text-emerald-950"
                    />
                    {patientError && (
                      <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{patientError}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPatientOtpSent(false);
                      }}
                      className="py-2.5 px-4 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center space-x-1.5"
                    >
                      <span>Verify OTP &amp; Open Patient Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 2. DOCTOR & CLINICAL PORTAL */}
          {activePortal === 'doctor' && (
            <div className="bg-white rounded-2xl border border-indigo-200/90 shadow-lg shadow-indigo-900/5 p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-slate-900">
                      Doctor &amp; Medical Officer Clinical Portal
                    </h3>
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-200">
                      1-Click Login
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Manage OPD inbound triage, teleconsultations, E-Prescriptions, and follow-up loops.
                  </p>
                </div>
              </div>

              <form onSubmit={handleDoctorLogin} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-2">
                    Select Doctor Profile (1-Click Instant Login):
                  </span>
                  <div className="space-y-2">
                    {doctorUsers.map((doc) => (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => {
                          setDoctorHprId(doc.identifier);
                          handleInstantProfileLogin(doc);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/70 text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center group-hover:scale-105 transition-transform">
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 group-hover:text-indigo-800 text-xs sm:text-sm">
                              {doc.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {doc.designation} &bull; {doc.facility.split('(')[0]}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 px-3 py-1.5 rounded-lg shadow-2xs flex items-center space-x-1 transition-colors">
                          <span>Login Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Healthcare Facility Assignment
                    </label>
                    <div className="relative">
                      <Hospital className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={doctorFacility}
                        onChange={(e) => setDoctorFacility(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-hidden bg-white"
                      >
                        <option value="Chandur Primary Health Centre (PHC)">
                          Chandur Primary Health Centre (PHC)
                        </option>
                        <option value="Igatpuri Rural / Community Hospital (CHC)">
                          Igatpuri Rural / Community Hospital (CHC)
                        </option>
                        <option value="Nashik District Civil Hospital">
                          Nashik District Civil Hospital
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        HPR ID
                      </label>
                      <input
                        type="text"
                        value={doctorHprId}
                        onChange={(e) => setDoctorHprId(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Security PIN
                      </label>
                      <input
                        type="password"
                        value={doctorPin}
                        onChange={(e) => setDoctorPin(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <span>Authenticate &amp; Open Doctor OPD Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. DISTRICT ADMIN PORTAL */}
          {activePortal === 'admin' && (
            <div className="bg-white rounded-2xl border border-slate-300 shadow-lg shadow-slate-900/5 p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-slate-900">
                      District Health Command &amp; Surveillance
                    </h3>
                    <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-300">
                      DHO Admin
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Oversight of referral loop closures, disease surveillance, and facility capacity.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-2">
                    District Officers (1-Click Instant Login):
                  </span>
                  <div className="space-y-2">
                    {adminUsers.map((admin) => (
                      <button
                        key={admin.id}
                        type="button"
                        onClick={() => {
                          setAdminGovId(admin.identifier);
                          handleInstantProfileLogin(admin);
                        }}
                        className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center group-hover:scale-105 transition-transform">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                              {admin.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {admin.designation} &bull; {admin.facility}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-white bg-slate-900 group-hover:bg-black px-3 py-1.5 rounded-lg shadow-2xs flex items-center space-x-1 transition-colors">
                          <span>Access HQ</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Government Officer ID
                      </label>
                      <input
                        type="text"
                        value={adminGovId}
                        onChange={(e) => setAdminGovId(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-slate-800 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Admin 2FA PIN
                      </label>
                      <input
                        type="password"
                        value={adminPin}
                        onChange={(e) => setAdminPin(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-slate-800 outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <span>Verify Credentials &amp; Open Command HQ</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 4. ASHA / FIELD HEALTHCARE PORTAL */}
          {activePortal === 'field' && (
            <div className="bg-white rounded-2xl border border-teal-200/90 shadow-lg shadow-teal-900/5 p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 mb-5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-base text-slate-900">
                      ASHA / ANM / CHO Community Field Portal
                    </h3>
                    <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded border border-teal-200">
                      1-Click Login
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Household surveys, vitals screening, high-risk triage, and post-referral home visits.
                  </p>
                </div>
              </div>

              <form onSubmit={handleFieldLogin} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block mb-2">
                    Field Staff (1-Click Instant Login):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ashaUsers.map((asha) => (
                      <button
                        key={asha.id}
                        type="button"
                        onClick={() => {
                          setFieldStaffId(asha.identifier);
                          handleInstantProfileLogin(asha);
                        }}
                        className="p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/70 text-left text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                      >
                        <div>
                          <div className="font-extrabold text-slate-900 group-hover:text-teal-800 text-xs sm:text-sm">
                            {asha.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            ASHA Worker &bull; {asha.village}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-white bg-teal-600 group-hover:bg-teal-700 px-2.5 py-1.5 rounded-lg shadow-2xs transition-colors">
                          Login
                        </span>
                      </button>
                    ))}

                    {anmUsers.map((anm) => (
                      <button
                        key={anm.id}
                        type="button"
                        onClick={() => {
                          setFieldStaffId(anm.identifier);
                          handleInstantProfileLogin(anm);
                        }}
                        className="p-3 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/70 text-left text-xs transition-all flex items-center justify-between cursor-pointer group shadow-2xs"
                      >
                        <div>
                          <div className="font-extrabold text-slate-900 group-hover:text-sky-800 text-xs sm:text-sm">
                            {anm.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-medium">
                            CHO / ANM &bull; {anm.facility.split('(')[0]}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-white bg-sky-600 group-hover:bg-sky-700 px-2.5 py-1.5 rounded-lg shadow-2xs transition-colors">
                          Login
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Health Sub-centre / Ayushman Arogya Mandir
                    </label>
                    <select
                      value={fieldSubcentre}
                      onChange={(e) => setFieldSubcentre(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
                    >
                      <option value="Rampur Health Sub-centre">Rampur Health Sub-centre (Nashik)</option>
                      <option value="Chandur Sub-centre">Chandur Sub-centre (Nashik)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Field Registration ID
                      </label>
                      <input
                        type="text"
                        value={fieldStaffId}
                        onChange={(e) => setFieldStaffId(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-teal-500 outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Field Worker PIN
                      </label>
                      <input
                        type="password"
                        value={fieldStaffPin}
                        onChange={(e) => setFieldStaffPin(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-teal-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <span>Open ASHA / Field Task Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* User-Friendly "How Sanjeevani AI Connects Rural Care" 3-Step Guide */}
        <div className="max-w-5xl mx-auto w-full mt-10 mb-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="text-[11px] font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 uppercase tracking-wider">
                Continuity of Care Workflow
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                How Sanjeevani AI Works for Rural India
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Ensuring no patient is lost between Sub-centre screening, PHC teleconsultation, and home follow-up.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 text-6xl font-black text-slate-200/50 select-none">
                  01
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
                    <Mic className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                    1. Voice Triage &amp; Village Screening
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Patients or ASHA workers use natural voice in Hindi, Marathi, or English to record symptoms, blood pressure, blood glucose, and risk signs.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-teal-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>ABHA linked instantly</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 text-6xl font-black text-slate-200/50 select-none">
                  02
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                    2. Teleconsult &amp; e-Prescription
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Medical Officers at PHC review triage vitals in priority order, initiate encrypted video calls, and issue digital prescriptions and referral slips.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-indigo-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Auto-syncs to patient portal</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-2 -bottom-2 text-6xl font-black text-slate-200/50 select-none">
                  03
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1">
                    3. Closed-Loop ASHA Follow-Up
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Doctor follow-up tasks trigger automated alerts for ASHA workers with door-to-door verification checklists, medicine compliance, and recovery logs.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Care continuity tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-3.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div>
            Sanjeevani AI &bull; National Rural Public Healthcare Continuity Architecture &bull; ABDM Interoperability
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Sub-centre HWC</span>
            <span>➔</span>
            <span>Primary Health Centre</span>
            <span>➔</span>
            <span>District Hospital</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
