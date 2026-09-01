import { TriagePriority, Vitals } from '../types';

export interface TriageResult {
  priority: TriagePriority;
  reasons: string[];
  recommendedFacility: string;
  recommendedAction: string;
}

export function calculateTriage(vitals: Vitals, symptoms: string[] = [], isPregnant: boolean = false): TriageResult {
  const reasons: string[] = [];
  let priority: TriagePriority = 'low';

  const systolic = vitals.bpSystolic;
  const diastolic = vitals.bpDiastolic;
  const temp = vitals.temperature;
  const spo2 = vitals.spO2;
  const pulse = vitals.pulse;
  const sugar = vitals.bloodSugar;

  // 1. Emergency Thresholds (Red)
  if (spo2 !== undefined && spo2 < 90) {
    priority = 'emergency';
    reasons.push(`Critical Hypoxemia (SpO2 ${spo2}% < 90%)`);
  }
  if (systolic !== undefined && (systolic >= 180 || systolic < 85)) {
    priority = 'emergency';
    reasons.push(`Severe Blood Pressure Emergency (Systolic ${systolic} mmHg)`);
  }
  if (diastolic !== undefined && diastolic >= 110) {
    priority = 'emergency';
    reasons.push(`Severe Diastolic Crisis (Diastolic ${diastolic} mmHg)`);
  }
  if (temp !== undefined && temp >= 104) {
    priority = 'emergency';
    reasons.push(`Hyperpyrexia (Temperature ${temp}°F)`);
  }
  if (pulse !== undefined && (pulse > 130 || pulse < 45)) {
    priority = 'emergency';
    reasons.push(`Critical Heart Rate (Pulse ${pulse} bpm)`);
  }

  // Symptom emergency triggers
  const emergencySymptoms = [
    'Severe Chest Pain / Pressure',
    'Severe Breathlessness / Choking',
    'Unconsciousness / Convulsions',
    'Severe Bleeding / Hemorrhage',
    'Severe Abdominal Pain (Pregnancy)'
  ];

  symptoms.forEach(s => {
    if (emergencySymptoms.some(es => s.toLowerCase().includes(es.toLowerCase().slice(0, 12)))) {
      priority = 'emergency';
      reasons.push(`Red Flag Symptom: ${s}`);
    }
  });

  // 2. High Priority Thresholds (Orange)
  if (priority !== 'emergency') {
    if (spo2 !== undefined && spo2 >= 90 && spo2 < 94) {
      priority = 'high';
      reasons.push(`Moderate Hypoxia (SpO2 ${spo2}%)`);
    }
    if (systolic !== undefined && (systolic >= 160 || systolic < 90)) {
      priority = 'high';
      reasons.push(`Stage 2 Hypertension / Hypotension (Systolic ${systolic} mmHg)`);
    }
    if (diastolic !== undefined && diastolic >= 100) {
      priority = 'high';
      reasons.push(`Elevated Diastolic BP (${diastolic} mmHg)`);
    }
    if (temp !== undefined && temp >= 102 && temp < 104) {
      priority = 'high';
      reasons.push(`High Grade Fever (${temp}°F)`);
    }
    if (pulse !== undefined && (pulse > 115 || pulse < 50)) {
      priority = 'high';
      reasons.push(`Abnormal Pulse (${pulse} bpm)`);
    }
    if (sugar !== undefined && (sugar >= 300 || sugar < 60)) {
      priority = 'high';
      reasons.push(`Severe Glycemic Deregulation (${sugar} mg/dL)`);
    }

    const highSymptoms = [
      'High Fever > 3 Days',
      'Persistent Vomiting',
      'Severe Dizziness / Fainting',
      'Sudden Swelling in Hands/Face (Pregnancy)',
      'Productive Cough with Hemoptysis'
    ];
    symptoms.forEach(s => {
      if (highSymptoms.some(hs => s.toLowerCase().includes(hs.toLowerCase().slice(0, 10)))) {
        priority = 'high';
        reasons.push(`High Concern Symptom: ${s}`);
      }
    });
  }

  // 3. Medium Priority Thresholds (Yellow)
  if (priority === 'low') {
    if (systolic !== undefined && systolic >= 140 && systolic < 160) {
      priority = 'medium';
      reasons.push(`Stage 1 Hypertension (Systolic ${systolic} mmHg)`);
    }
    if (diastolic !== undefined && diastolic >= 90 && diastolic < 100) {
      priority = 'medium';
      reasons.push(`Mild Diastolic Elevation (${diastolic} mmHg)`);
    }
    if (temp !== undefined && temp >= 99.5 && temp < 102) {
      priority = 'medium';
      reasons.push(`Low-to-Moderate Fever (${temp}°F)`);
    }
    if (spo2 !== undefined && spo2 >= 94 && spo2 < 96) {
      priority = 'medium';
      reasons.push(`Borderline SpO2 (${spo2}%)`);
    }
    if (sugar !== undefined && sugar >= 200 && sugar < 300) {
      priority = 'medium';
      reasons.push(`Elevated Random Blood Sugar (${sugar} mg/dL)`);
    }
    if (symptoms.length >= 2) {
      priority = 'medium';
      reasons.push(`Multiple Active Symptoms (${symptoms.length} reported)`);
    }
  }

  if (reasons.length === 0) {
    reasons.push('Vitals within normal baseline ranges.');
  }

  let recommendedFacility = 'Sub-centre / Health & Wellness Centre';
  let recommendedAction = 'Routine counseling, lifestyle guidance, and regular ASHA home follow-up.';

  if (priority === 'emergency') {
    recommendedFacility = 'District Hospital / Tertiary Care';
    recommendedAction = 'Immediate 108 Ambulance dispatch, stabilization, and urgent specialist referral.';
  } else if (priority === 'high') {
    recommendedFacility = 'Primary Health Centre (PHC) / Community Health Centre (CHC)';
    recommendedAction = 'Medical Officer consultation within 24 hours, clinical diagnostics, and prescription review.';
  } else if (priority === 'medium') {
    recommendedFacility = 'Health & Wellness Centre (HWC) / ANM Visit';
    recommendedAction = 'ANM/CHO clinical assessment, teleconsultation with MO, and monitored follow-up in 3-5 days.';
  }

  return {
    priority,
    reasons,
    recommendedFacility,
    recommendedAction
  };
}
