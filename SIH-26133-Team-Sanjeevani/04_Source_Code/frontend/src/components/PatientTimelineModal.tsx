import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Patient } from '../types';
import {
  X,
  Calendar,
  HeartPulse,
  Share2,
  FileCheck2,
  Stethoscope,
  Activity,
  User,
  ShieldCheck,
  Clock,
  Pill,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PatientTimelineModalProps {
  patient: Patient | null;
  onClose: () => void;
}

export const PatientTimelineModal: React.FC<PatientTimelineModalProps> = ({ patient, onClose }) => {
  const { encounters, referrals, followUps } = useHealth();

  if (!patient) return null;

  const patientEncounters = encounters.filter(e => e.patientId === patient.id);
  const patientReferrals = referrals.filter(r => r.patientId === patient.id);
  const patientFollowUps = followUps.filter(f => f.patientId === patient.id);

  // Combine and sort events
  const timelineEvents: Array<{
    id: string;
    date: string;
    type: 'encounter' | 'referral' | 'followup';
    title: string;
    facility: string;
    provider: string;
    badgeColor: string;
    priority?: string;
    details: React.ReactNode;
  }> = [];

  patientEncounters.forEach(enc => {
    timelineEvents.push({
      id: enc.id,
      date: enc.date,
      type: 'encounter',
      title: `Clinical Encounter & Vitals (${enc.triagePriority.toUpperCase()})`,
      facility: enc.facilityName,
      provider: `${enc.recordedByName} (${enc.recordedByRole.toUpperCase()})`,
      badgeColor: enc.triagePriority === 'emergency' ? 'bg-rose-100 text-rose-800 border-rose-300' : enc.triagePriority === 'high' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-teal-100 text-teal-800 border-teal-300',
      priority: enc.triagePriority,
      details: (
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex flex-wrap gap-1">
            {enc.symptoms.map((s, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                {s}
              </span>
            ))}
          </div>
          {enc.symptomNotes && (
            <p className="italic text-slate-600 bg-slate-50 p-2 rounded-md border border-slate-200">
              "{enc.symptomNotes}"
            </p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-md border border-slate-200 text-[11px]">
            {enc.vitals.bpSystolic && <div><span className="text-slate-500">BP:</span> <span className="font-bold">{enc.vitals.bpSystolic}/{enc.vitals.bpDiastolic}</span></div>}
            {enc.vitals.temperature && <div><span className="text-slate-500">Temp:</span> <span className="font-bold">{enc.vitals.temperature}°F</span></div>}
            {enc.vitals.spO2 && <div><span className="text-slate-500">SpO2:</span> <span className="font-bold">{enc.vitals.spO2}%</span></div>}
            {enc.vitals.pulse && <div><span className="text-slate-500">Pulse:</span> <span className="font-bold">{enc.vitals.pulse} bpm</span></div>}
          </div>
          <div className="text-[11px] text-teal-800 font-medium">
            <span className="font-bold">Action:</span> {enc.actionTaken}
          </div>
        </div>
      )
    });
  });

  patientReferrals.forEach(ref => {
    timelineEvents.push({
      id: ref.id,
      date: ref.createdAt.split(',')[1]?.trim() || 'Recent',
      type: 'referral',
      title: `Referral: ${ref.fromFacilityType} → ${ref.toFacilityType} [${ref.status}]`,
      facility: `${ref.fromFacility} ➔ ${ref.toFacility}`,
      provider: `Referred by ${ref.referredByName}`,
      badgeColor: ref.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-indigo-100 text-indigo-800 border-indigo-300',
      details: (
        <div className="space-y-2 text-xs text-slate-700">
          <p className="font-semibold text-slate-900">{ref.reason}</p>
          {ref.clinicalSummary && (
            <p className="text-slate-600 bg-indigo-50/50 p-2 rounded-md border border-indigo-100">
              {ref.clinicalSummary}
            </p>
          )}
          {ref.consultationOutcome && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 space-y-1.5 mt-2">
              <div className="flex items-center space-x-1.5 text-emerald-900 font-bold text-xs">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctor Diagnosis & Prescription ({ref.consultationOutcome.doctorName})</span>
              </div>
              <div className="text-xs text-emerald-950 font-semibold">
                Diagnosis: {ref.consultationOutcome.diagnosis}
              </div>
              <div className="text-xs text-slate-700">
                Plan: {ref.consultationOutcome.treatmentPlan}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {ref.consultationOutcome.prescribedMedicines.map((m, i) => (
                  <span key={i} className="bg-white text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded text-[11px] font-medium flex items-center space-x-1">
                    <Pill className="w-2.5 h-2.5" />
                    <span>{m}</span>
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-emerald-800 italic">
                Advice: {ref.consultationOutcome.advice}
              </div>
            </div>
          )}
        </div>
      )
    });
  });

  patientFollowUps.forEach(fol => {
    timelineEvents.push({
      id: fol.id,
      date: fol.completedDate || fol.dueDate,
      type: 'followup',
      title: `Home Follow-up Visit (${fol.type.toUpperCase()}) [${fol.status.toUpperCase()}]`,
      facility: `Assigned to ASHA: ${fol.assignedToAshaName}`,
      provider: `Created by ${fol.createdByName}`,
      badgeColor: fol.status === 'completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300',
      details: (
        <div className="space-y-1.5 text-xs text-slate-700">
          <div className="font-medium text-slate-800">
            <span className="font-bold">Instructions:</span> {fol.instructions}
          </div>
          {fol.completionNotes && (
            <div className="bg-emerald-50 text-emerald-900 p-2 rounded-md border border-emerald-200 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">ASHA Visit Outcome ({fol.completedDate}):</span> {fol.completionNotes}
              </div>
            </div>
          )}
        </div>
      )
    });
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center text-teal-200 font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{patient.name}</h3>
                <span className="text-xs bg-teal-700/60 px-2 py-0.5 rounded-full text-teal-100">
                  {patient.age}y &bull; {patient.gender}
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center space-x-2">
                <span>ABHA: {patient.abhaId || '91-XXXX-XXXX'}</span>
                <span>&bull;</span>
                <span>Village: {patient.village}</span>
                <span>&bull;</span>
                <span>ASHA: {patient.linkedAshaName}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Longitudinal History Banner */}
        <div className="bg-teal-50 border-b border-teal-100 px-6 py-3 flex items-center justify-between text-xs text-teal-900">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span className="font-semibold">
              Longitudinal Electronic Health Record &bull; Continuous Care Chain
            </span>
          </div>
          <span className="bg-teal-200 text-teal-900 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
            {timelineEvents.length} Clinical Milestones
          </span>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {timelineEvents.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              No historical events recorded yet.
            </div>
          ) : (
            <div className="relative pl-6 border-l-2 border-teal-600/30 space-y-6">
              {timelineEvents.map((evt, idx) => (
                <div key={evt.id + idx} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-teal-600 border-2 border-white shadow-xs group-hover:scale-125 transition-transform"></div>

                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-teal-300 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${evt.badgeColor}`}>
                          {evt.title}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{evt.date}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 mb-2 flex items-center space-x-3">
                      <span className="font-semibold text-slate-800">{evt.facility}</span>
                      <span>&bull;</span>
                      <span>{evt.provider}</span>
                    </div>

                    {evt.details}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            Close Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
