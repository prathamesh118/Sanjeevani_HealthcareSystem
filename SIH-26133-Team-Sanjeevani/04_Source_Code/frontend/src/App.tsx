import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { PatientView } from './components/PatientView';
import { AshaView } from './components/AshaView';
import { AnmView } from './components/AnmView';
import { DoctorView } from './components/DoctorView';
import { AdminView } from './components/AdminView';
import { TeleconsultModal } from './components/TeleconsultModal';
import { VoiceAssistantButton } from './components/VoiceAssistantButton';
import { SanjeevaniLogo } from './components/SanjeevaniLogo';
import { ShieldCheck, Building2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, isAuthenticated } = useHealth();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col font-sans text-slate-800 relative">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentRole === 'patient' && <PatientView />}
        {currentRole === 'asha' && <AshaView />}
        {currentRole === 'anm' && <AnmView />}
        {currentRole === 'doctor' && <DoctorView />}
        {currentRole === 'admin' && <AdminView />}
      </main>

      <TeleconsultModal />
      <VoiceAssistantButton />

      {/* National Health Service Footer */}
      <footer className="bg-white text-slate-500 text-xs border-t border-slate-200 mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center">
            <SanjeevaniLogo
              size="sm"
              facilitySubtitle="Rural Healthcare Continuity & Care Gateway"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center space-x-1 font-semibold text-teal-700">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Smart India Hackathon (PS 26133)</span>
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="flex items-center space-x-1 text-slate-500">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>4-Tier Public Healthcare Continuum</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <HealthProvider>
      <MainContent />
    </HealthProvider>
  );
}
