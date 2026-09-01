import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Referral, Patient, FollowUpType } from '../types';
import {
  Stethoscope,
  CheckCircle,
  Clock,
  AlertCircle,
  AlertTriangle,
  FileText,
  Pill,
  Video,
  User,
  Heart,
  Thermometer,
  Wind,
  Activity,
  ArrowUpDown,
  Send,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  ChevronRight,
  Hospital,
  ShieldCheck,
  Zap,
  PhoneCall
} from 'lucide-react';
import { PatientTimelineModal } from './PatientTimelineModal';
import doctorTeleImg from '../assets/images/doctor_teleconsult_1788025790089.jpg';
import ashaCareImg from '../assets/images/asha_worker_care_1788025776530.jpg';

export const DoctorView: React.FC = () => {
  const {
    referrals,
    patients,
    acceptReferral,
    recordConsultationOutcome,
    setActiveTeleconsultPatient,
    setDemoStep,
    t
  } = useHealth();

  const [sortByUrgency, setSortByUrgency] = useState<boolean>(true);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(() => {
    return referrals.find(r => r.status === 'Created' || r.status === 'Accepted') || referrals[0] || null;
  });
  const [showOutcomeModal, setShowOutcomeModal] = useState<boolean>(false);
  const [showTimelinePatient, setShowTimelinePatient] = useState<Patient | null>(null);

  // Consultation Outcome Form State
  const [doctorDiagnosis, setDoctorDiagnosis] = useState('Gestational Hypertension at 28 Weeks (High Risk ANC)');
  const [doctorTreatmentPlan, setDoctorTreatmentPlan] = useState('Initiate oral antihypertensives, strict bed rest, daily kick counts, urine albumin monitoring.');
  const [prescribedMeds, setPrescribedMeds] = useState<string[]>([
    'Tab Labetalol 100mg BD (Post Meals)',
    'Tab Calcium 500mg OD',
    'Tab Folic Acid + Iron 100mg OD'
  ]);
  const [newMedInput, setNewMedInput] = useState('');
  const [doctorAdvice, setDoctorAdvice] = useState('Immediate emergency visit if severe headache, blurred vision, or epigastric pain occurs.');
  
  // Follow-up Assignment State
  const [assignFollowUpChecked, setAssignFollowUpChecked] = useState<boolean>(true);
  const [followUpType, setFollowUpType] = useState<FollowUpType>('maternal');
  const [followUpDueDate, setFollowUpDueDate] = useState<string>(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [followUpInstructions, setFollowUpInstructions] = useState(
    'Check Blood Pressure with digital cuff. Verify patient is taking Labetalol 100mg BD regularly. Inspect for worsening pedal edema.'
  );

  // Sort referrals by urgency
  const urgencyWeight = { emergency: 4, high: 3, medium: 2, low: 1 };
  const sortedReferrals = [...referrals].sort((a, b) => {
    if (sortByUrgency) {
      return (urgencyWeight[b.urgency] || 0) - (urgencyWeight[a.urgency] || 0);
    }
    return 0;
  });

  const currentPatient = selectedReferral
    ? patients.find(p => p.id === selectedReferral.patientId)
    : null;

  const handleAddMed = () => {
    if (!newMedInput.trim()) return;
    setPrescribedMeds(prev => [...prev, newMedInput.trim()]);
    setNewMedInput('');
  };

  const handleRemoveMed = (idx: number) => {
    setPrescribedMeds(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAcceptCase = () => {
    if (!selectedReferral) return;
    acceptReferral(selectedReferral.id, 'Dr. Rajesh Kulkarni (Medical Officer)');
  };

  const handleSaveConsultationOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReferral) return;

    recordConsultationOutcome(
      selectedReferral.id,
      {
        doctorName: 'Dr. Rajesh Kulkarni (Medical Officer)',
        diagnosis: doctorDiagnosis,
        treatmentPlan: doctorTreatmentPlan,
        prescribedMedicines: prescribedMeds,
        advice: doctorAdvice
      },
      assignFollowUpChecked
        ? {
            type: followUpType,
            dueDate: followUpDueDate,
            instructions: followUpInstructions,
            assignedToAshaName: currentPatient?.linkedAshaName || 'Sunita Bai'
          }
        : undefined
    );

    setShowOutcomeModal(false);
    // Advances to step 3 in SIH continuity of care demo
    setDemoStep(3);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Doctor Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-800 text-teal-100 flex items-center justify-center font-bold text-xl shadow-md">
            RK
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Dr. Rajesh Kulkarni &bull; Medical Officer
              </h2>
              <span className="bg-teal-100 text-teal-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                MBBS, DNB
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Facility: <strong>Chandur Primary Health Centre (PHC) &bull; Specialist Teleconsult Desk</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSortByUrgency(!sortByUrgency)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
              sortByUrgency
                ? 'bg-teal-50 border-teal-300 text-teal-900'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by Urgency {sortByUrgency ? '(High → Low)' : '(Normal)'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Referral Queue (Left) & Deep Patient Case View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Referral Queue List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Hospital className="w-4 h-4 text-teal-700" />
              <span>Incoming Sub-centre Referrals</span>
            </h3>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {referrals.length} Cases
            </span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {sortedReferrals.map(ref => {
              const isSelected = selectedReferral?.id === ref.id;
              return (
                <div
                  key={ref.id}
                  onClick={() => setSelectedReferral(ref)}
                  className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-teal-50/90 border-teal-600 ring-1 ring-teal-600/40 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                        ref.urgency === 'emergency' ? 'bg-rose-600 text-white' :
                        ref.urgency === 'high' ? 'bg-amber-500 text-slate-950' : 'bg-teal-600 text-white'
                      }`}>
                        {ref.urgency}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{ref.patientName}</span>
                      <span className="text-xs text-slate-500 font-medium">({ref.patientAge}y, {ref.patientGender})</span>
                    </div>

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      ref.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      ref.status === 'Accepted' ? 'bg-teal-100 text-teal-800' :
                      ref.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ref.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2 font-medium">
                    {ref.reason}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-200/80">
                    <span>From: <strong>{ref.fromFacility.split('(')[0]}</strong></span>
                    <span>By: {ref.referredByName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Case Details & Clinical Action Panel (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedReferral ? (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
              {/* Top Case Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold bg-teal-800 text-teal-100 px-2 py-0.5 rounded">
                      #{selectedReferral.id}
                    </span>
                    <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${
                      selectedReferral.urgency === 'emergency' ? 'bg-rose-600 text-white' :
                      selectedReferral.urgency === 'high' ? 'bg-amber-500 text-slate-950' : 'bg-teal-600 text-white'
                    }`}>
                      {selectedReferral.urgency} Urgency
                    </span>
                    <span className="text-xs text-slate-300">Status: <strong>{selectedReferral.status}</strong></span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {selectedReferral.patientName} ({selectedReferral.patientAge}y, {selectedReferral.patientGender})
                  </h3>
                  <div className="text-xs text-slate-300">
                    Village: {selectedReferral.patientVillage} &bull; Referred From: {selectedReferral.fromFacility}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentPatient && (
                    <button
                      onClick={() => setActiveTeleconsultPatient(currentPatient)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Teleconsult</span>
                    </button>
                  )}

                  {currentPatient && (
                    <button
                      onClick={() => setShowTimelinePatient(currentPatient)}
                      className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <Activity className="w-3.5 h-3.5 text-teal-400" />
                      <span>Timeline</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Referral Reason & Clinical Summary */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-amber-950 uppercase tracking-wide flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Referral Trigger &amp; Frontline Triage Summary</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedReferral.reason}
                </p>
                {selectedReferral.clinicalSummary && (
                  <p className="text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-amber-200/60">
                    {selectedReferral.clinicalSummary}
                  </p>
                )}
                <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1">
                  <span>Referred by: <strong>{selectedReferral.referredByName} ({selectedReferral.referredByRole.toUpperCase()})</strong></span>
                  <span>Date: {selectedReferral.createdAt}</span>
                </div>
              </div>

              {/* Patient Vitals & Medical History Card */}
              {currentPatient && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Recorded Baseline Vitals &amp; Medical History
                  </div>

                  {currentPatient.lastVitals && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-500 text-[10px] block">BP (mmHg)</span>
                        <strong className="text-rose-700 text-sm font-extrabold">
                          {currentPatient.lastVitals.bpSystolic}/{currentPatient.lastVitals.bpDiastolic}
                        </strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-500 text-[10px] block">Oxygen (SpO2)</span>
                        <strong className="text-emerald-700 text-sm font-extrabold">
                          {currentPatient.lastVitals.spO2 || 98}%
                        </strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-500 text-[10px] block">Temperature</span>
                        <strong className="text-slate-900 text-sm font-extrabold">
                          {currentPatient.lastVitals.temperature || 98.6}°F
                        </strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-500 text-[10px] block">Pulse</span>
                        <strong className="text-slate-900 text-sm font-extrabold">
                          {currentPatient.lastVitals.pulse || 80} bpm
                        </strong>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900">Past History &amp; Comorbidities: </span>
                    {currentPatient.medicalHistory || 'No prior chronic history on record.'}
                  </div>
                </div>
              )}

              {/* Teleconsultation Video Launch Banner with Real Photo */}
              <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-4 text-white border border-teal-800/40 shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-md">
                    <img
                      src={doctorTeleImg}
                      alt="Doctor Teleconsultation"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                    <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border border-slate-900 animate-pulse"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold bg-teal-500/30 text-teal-300 px-2 py-0.5 rounded-full uppercase tracking-wider border border-teal-400/30">
                        eSanjeevani / ABDM Telemedicine
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Sub-centre Online
                      </span>
                    </div>
                    <h4 className="font-extrabold text-sm text-white mt-1">
                      Start Video Teleconsultation with {selectedReferral.patientName}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Live connection assisted by ASHA {selectedReferral.referredByName} with real-time HUD vitals
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (currentPatient) {
                      setActiveTeleconsultPatient(currentPatient);
                    }
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md shrink-0 hover:scale-105 active:scale-95"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch Teleconsult</span>
                </button>
              </div>

              {/* Action Buttons: Accept Referral & Record Outcome */}
              <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                {selectedReferral.status === 'Created' && (
                  <button
                    onClick={handleAcceptCase}
                    className="flex-1 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
                  >
                    <CheckCircle className="w-4 h-4 text-teal-200" />
                    <span>Accept Referral Case</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (selectedReferral.status === 'Created') {
                      handleAcceptCase();
                    }
                    setShowOutcomeModal(true);
                  }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-md"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>
                    {selectedReferral.status === 'Completed' ? 'View/Update Consultation Rx' : 'Record Consultation Outcome & Rx'}
                  </span>
                </button>
              </div>

              {/* If Completed, show previous outcome */}
              {selectedReferral.consultationOutcome && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                    <span>Consultation Outcome Recorded ({selectedReferral.consultationOutcome.doctorName})</span>
                    <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">Completed</span>
                  </div>
                  <div className="text-xs text-emerald-900">
                    <strong>Diagnosis:</strong> {selectedReferral.consultationOutcome.diagnosis}
                  </div>
                  <div className="text-xs text-slate-700">
                    <strong>Treatment:</strong> {selectedReferral.consultationOutcome.treatmentPlan}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedReferral.consultationOutcome.prescribedMedicines.map((m, i) => (
                      <span key={i} className="bg-white border border-emerald-300 text-emerald-800 text-[11px] font-medium px-2 py-0.5 rounded flex items-center space-x-1">
                        <Pill className="w-2.5 h-2.5" />
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-emerald-800 italic">
                    <strong>Advice:</strong> {selectedReferral.consultationOutcome.advice}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
              Select a referral from the list on the left to review case details.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Record Consultation Outcome, Rx, and Assign ASHA Follow-up */}
      {showOutcomeModal && selectedReferral && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
            <div className="bg-teal-900 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Medical Officer Consultation &amp; Prescription (Rx)</h3>
                <p className="text-xs text-teal-200">Patient: {selectedReferral.patientName} &bull; Ref #{selectedReferral.id}</p>
              </div>
              <button onClick={() => setShowOutcomeModal(false)} className="text-teal-300 hover:text-white text-lg">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveConsultationOutcome} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Clinical Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={doctorDiagnosis}
                  onChange={e => setDoctorDiagnosis(e.target.value)}
                  placeholder="e.g. Gestational Hypertension 28wks ANC"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-bold text-slate-900 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Treatment Plan &amp; Clinical Impression</label>
                <textarea
                  value={doctorTreatmentPlan}
                  onChange={e => setDoctorTreatmentPlan(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              {/* Prescribed Medicines Builder */}
              <div>
                <label className="font-bold text-slate-800 block mb-1">Prescribed Medicines (Rx)</label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newMedInput}
                    onChange={e => setNewMedInput(e.target.value)}
                    placeholder="Add medicine (e.g. Tab Labetalol 100mg BD)..."
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddMed}
                    className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {prescribedMeds.map((med, idx) => (
                    <span key={idx} className="bg-teal-50 border border-teal-300 text-teal-900 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center space-x-1.5">
                      <Pill className="w-3 h-3 text-teal-600" />
                      <span>{med}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMed(idx)}
                        className="text-slate-400 hover:text-rose-600 ml-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Doctor Advice &amp; Warning Signs</label>
                <input
                  type="text"
                  value={doctorAdvice}
                  onChange={e => setDoctorAdvice(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              {/* Crucial Section: Assign Home Follow-Up to Village ASHA */}
              <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="followupCheck"
                    checked={assignFollowUpChecked}
                    onChange={e => setAssignFollowUpChecked(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="followupCheck" className="font-bold text-amber-950 text-xs cursor-pointer flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Assign Home Follow-up Task to Village ASHA ({currentPatient?.linkedAshaName || 'Sunita Bai'})</span>
                  </label>
                </div>

                {assignFollowUpChecked && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Follow-up Category</label>
                      <select
                        value={followUpType}
                        onChange={e => setFollowUpType(e.target.value as FollowUpType)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold"
                      >
                        <option value="maternal">Maternal (ANC/PNC)</option>
                        <option value="chronic">Chronic NCD (Diabetes/HTN)</option>
                        <option value="child">Child / Pediatric</option>
                        <option value="post-referral">Post-Referral Check</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                      <input
                        type="date"
                        value={followUpDueDate}
                        onChange={e => setFollowUpDueDate(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="font-bold text-slate-700 block mb-1">Instructions for ASHA Worker:</label>
                      <textarea
                        value={followUpInstructions}
                        onChange={e => setFollowUpInstructions(e.target.value)}
                        rows={2}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowOutcomeModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center space-x-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-teal-200" />
                  <span>Finalize Consultation &amp; Dispatch Task</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTimelinePatient && (
        <PatientTimelineModal
          patient={showTimelinePatient}
          onClose={() => setShowTimelinePatient(null)}
        />
      )}
    </div>
  );
};
