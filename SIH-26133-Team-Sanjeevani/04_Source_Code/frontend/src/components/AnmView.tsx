import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { Patient, Encounter, TriagePriority } from '../types';
import { calculateTriage } from '../utils/triage';
import {
  Activity,
  Video,
  AlertCircle,
  AlertTriangle,
  Clock,
  CheckCircle,
  Stethoscope,
  Send,
  Search,
  User,
  Heart,
  Thermometer,
  Wind,
  FileText,
  Calendar,
  Building2
} from 'lucide-react';
import { PatientTimelineModal } from './PatientTimelineModal';

export const AnmView: React.FC = () => {
  const {
    patients,
    encounters,
    recordEncounter,
    createReferral,
    setActiveTeleconsultPatient,
    t
  } = useHealth();

  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientForAssessment, setSelectedPatientForAssessment] = useState<Patient | null>(null);
  const [showTimelinePatient, setShowTimelinePatient] = useState<Patient | null>(null);

  // Clinical Assessment form state
  const [assessmentVitals, setAssessmentVitals] = useState({
    bpSystolic: 155,
    bpDiastolic: 98,
    temperature: 99.0,
    pulse: 82,
    spO2: 97,
    bloodSugar: 180,
    weight: 60
  });
  const [clinicalNotes, setClinicalNotes] = useState('Patient attended Sub-centre clinic following ASHA referral. Persistent borderline systolic BP.');
  const [actionChoice, setActionChoice] = useState<'prescribe' | 'refer'>('refer');
  const [referralTarget, setReferralTarget] = useState('Chandur Primary Health Centre (PHC)');

  // Build triage queue by combining patients with their latest encounter priority
  const queueItems = encounters.map(enc => {
    const pat = patients.find(p => p.id === enc.patientId);
    return {
      encounter: enc,
      patient: pat || {
        id: enc.patientId,
        name: enc.patientName,
        age: 30,
        gender: 'Female',
        village: 'Rampur',
        language: 'hi',
        linkedAshaName: 'Sunita Bai',
        linkedAshaPhone: '',
        registeredDate: enc.date,
        medicalHistory: '',
        hasGivenDigitalConsent: true,
        avatarColor: 'bg-teal-600'
      } as Patient
    };
  });

  const filteredQueue = queueItems.filter(item => {
    const matchesPriority = filterPriority === 'all' || item.encounter.triagePriority === filterPriority;
    const matchesSearch =
      item.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.encounter.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.patient.village.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const getPriorityBadge = (priority: TriagePriority) => {
    switch (priority) {
      case 'emergency':
        return (
          <span className="flex items-center space-x-1.5 bg-rose-100 text-rose-800 border-2 border-rose-400 text-xs font-black px-3 py-1 rounded-full uppercase shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Emergency (Immediate Action)</span>
          </span>
        );
      case 'high':
        return (
          <span className="flex items-center space-x-1.5 bg-amber-100 text-amber-900 border-2 border-amber-400 text-xs font-black px-3 py-1 rounded-full uppercase shadow-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>High Priority (Within 24h)</span>
          </span>
        );
      case 'medium':
        return (
          <span className="flex items-center space-x-1.5 bg-yellow-100 text-yellow-900 border border-yellow-300 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
            <Clock className="w-3.5 h-3.5 text-yellow-600" />
            <span>Moderate Concern</span>
          </span>
        );
      case 'low':
      default:
        return (
          <span className="flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Routine / Baseline</span>
          </span>
        );
    }
  };

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientForAssessment) return;

    const triage = calculateTriage(assessmentVitals);

    recordEncounter({
      patientId: selectedPatientForAssessment.id,
      symptoms: ['Follow-up clinic visit evaluation'],
      symptomNotes: clinicalNotes,
      vitals: assessmentVitals,
      facilityName: 'Rampur Health & Wellness Centre',
      facilityType: 'Sub-centre',
      recordedByName: 'Priya Sharma (CHO)',
      actionTaken: actionChoice === 'refer' ? `Escalated referral to ${referralTarget}` : 'Prescribed routine supportive care & lifestyle guidance.'
    });

    if (actionChoice === 'refer') {
      createReferral({
        patientId: selectedPatientForAssessment.id,
        fromFacility: 'Rampur Health & Wellness Centre',
        fromFacilityType: 'Sub-centre',
        toFacility: referralTarget,
        toFacilityType: referralTarget.includes('District') ? 'District Hospital' : 'PHC',
        reason: `CHO Assessment: ${clinicalNotes}`,
        urgency: triage.priority,
        clinicalSummary: `Vitals at HWC: BP ${assessmentVitals.bpSystolic}/${assessmentVitals.bpDiastolic}, Sugar ${assessmentVitals.bloodSugar} mg/dL. Triage: ${triage.priority.toUpperCase()}`
      });
    }

    setSelectedPatientForAssessment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-xl shadow-md">
            PS
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Priya Sharma &bull; Community Health Officer (CHO)
              </h2>
              <span className="bg-teal-100 text-teal-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Ayushman Arogya Mandir
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Facility: <strong>Rampur Health &amp; Wellness Sub-centre (Chandur Block)</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <span className="text-slate-500 font-semibold block">Triage Queue Count</span>
            <span className="text-base font-extrabold text-slate-900">{filteredQueue.length} Patients Active</span>
          </div>
        </div>
      </div>

      {/* Main Triage Queue Board */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        {/* Controls and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-teal-700" />
              <span>Prioritized Clinical Triage Queue</span>
            </h3>
            <p className="text-xs text-slate-500">
              Ranked with explicit priority badges (Icon + Text + Color code).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Priority Filters */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['all', 'emergency', 'high', 'medium'].map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer capitalize ${
                    filterPriority === p ? 'bg-teal-700 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search triage queue..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:border-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Triage Cards List */}
        <div className="space-y-3">
          {filteredQueue.map(({ encounter, patient }, idx) => (
            <div
              key={encounter.id + idx}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                encounter.triagePriority === 'emergency' ? 'bg-rose-50/70 border-rose-400 shadow-xs' :
                encounter.triagePriority === 'high' ? 'bg-amber-50/70 border-amber-300 shadow-xs' :
                'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Left Patient & Symptoms Info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getPriorityBadge(encounter.triagePriority)}
                  <span className="font-bold text-slate-900 text-base">{patient.name}</span>
                  <span className="text-xs text-slate-600 font-medium">
                    ({patient.age}y &bull; {patient.gender} &bull; Village: {patient.village})
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border">
                    ABHA: {patient.abhaId || '91-XXXX-XXXX'}
                  </span>
                </div>

                <div className="text-xs text-slate-700 font-medium flex items-center space-x-2">
                  <span className="font-bold text-slate-900">Reported Symptoms:</span>
                  <div className="flex flex-wrap gap-1">
                    {encounter.symptoms.map((s, sIdx) => (
                      <span key={sIdx} className="bg-white border border-slate-300 text-slate-800 px-2 py-0.5 rounded text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vitals Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white/90 p-2.5 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block font-semibold">Blood Pressure</span>
                    <strong className="text-slate-900 text-sm">
                      {encounter.vitals.bpSystolic ? `${encounter.vitals.bpSystolic}/${encounter.vitals.bpDiastolic} mmHg` : 'N/A'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-semibold">SpO2 Oxygen</span>
                    <strong className="text-slate-900 text-sm">{encounter.vitals.spO2 || 98}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-semibold">Temperature</span>
                    <strong className="text-slate-900 text-sm">{encounter.vitals.temperature || 98.6}°F</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block font-semibold">Pulse Rate</span>
                    <strong className="text-slate-900 text-sm">{encounter.vitals.pulse || 80} bpm</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-600 italic">
                  <strong>Risk Assessment:</strong> {encounter.riskReason}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-row lg:flex-col gap-2 shrink-0 justify-end">
                <button
                  onClick={() => setActiveTeleconsultPatient(patient)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Start Teleconsult</span>
                </button>

                <button
                  onClick={() => setShowTimelinePatient(patient)}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Activity className="w-3.5 h-3.5 text-teal-700" />
                  <span>Visit Timeline</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedPatientForAssessment(patient);
                    if (patient.lastVitals) {
                      setAssessmentVitals({
                        bpSystolic: patient.lastVitals.bpSystolic || 140,
                        bpDiastolic: patient.lastVitals.bpDiastolic || 90,
                        temperature: patient.lastVitals.temperature || 98.6,
                        pulse: patient.lastVitals.pulse || 80,
                        spO2: patient.lastVitals.spO2 || 98,
                        bloodSugar: patient.lastVitals.bloodSugar || 160,
                        weight: patient.lastVitals.weight || 60
                      });
                    }
                  }}
                  className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Clinical Assessment</span>
                </button>
              </div>
            </div>
          ))}

          {filteredQueue.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-xs">
              No triage queue records match your filter criteria.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Record Clinical Assessment & Book Referral */}
      {selectedPatientForAssessment && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-teal-800 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Record Clinical Assessment &bull; HWC Desk</h3>
                <p className="text-xs text-teal-200">Patient: {selectedPatientForAssessment.name} ({selectedPatientForAssessment.village})</p>
              </div>
              <button onClick={() => setSelectedPatientForAssessment(null)} className="text-teal-200 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAssessmentSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Update Clinic Measured Vitals
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block">Systolic BP</span>
                    <input
                      type="number"
                      value={assessmentVitals.bpSystolic}
                      onChange={e => setAssessmentVitals({ ...assessmentVitals, bpSystolic: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block">Diastolic BP</span>
                    <input
                      type="number"
                      value={assessmentVitals.bpDiastolic}
                      onChange={e => setAssessmentVitals({ ...assessmentVitals, bpDiastolic: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-600 block">Blood Sugar (mg/dL)</span>
                    <input
                      type="number"
                      value={assessmentVitals.bloodSugar}
                      onChange={e => setAssessmentVitals({ ...assessmentVitals, bloodSugar: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Assessment Notes</label>
                <textarea
                  value={clinicalNotes}
                  onChange={e => setClinicalNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="font-bold text-slate-800 block">Clinical Disposition Decision:</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="disposition"
                      checked={actionChoice === 'refer'}
                      onChange={() => setActionChoice('refer')}
                    />
                    <span>Book / Escalate Referral to Doctor</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="disposition"
                      checked={actionChoice === 'prescribe'}
                      onChange={() => setActionChoice('prescribe')}
                    />
                    <span>Manage at Sub-centre</span>
                  </label>
                </div>

                {actionChoice === 'refer' && (
                  <div className="pt-2">
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Referral Destination Facility:</label>
                    <select
                      value={referralTarget}
                      onChange={e => setReferralTarget(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs font-semibold"
                    >
                      <option value="Chandur Primary Health Centre (PHC)">Chandur Primary Health Centre (PHC)</option>
                      <option value="Igatpuri Rural / Community Hospital (CHC)">Igatpuri Rural / Community Hospital (CHC)</option>
                      <option value="Nashik District Civil Hospital">Nashik District Civil Hospital</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedPatientForAssessment(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold cursor-pointer"
                >
                  Save Assessment &amp; Update Record
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
