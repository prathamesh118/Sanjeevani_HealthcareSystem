import { Patient, Encounter, Referral, FollowUp, Appointment, Facility, AuditLog, UserProfile } from '../types';


export const initialFacilities: Facility[] = [
  {
    id: 'fac-1',
    name: 'Rampur Health Sub-centre',
    type: 'Sub-centre',
    block: 'Chandur Block',
    district: 'Nashik',
    contactPerson: 'Sunita Bai (ASHA) / Anita ANM',
    phone: '+91 98230 11223',
    activeStaffCount: 3,
    teleconsultAvailable: true
  },
  {
    id: 'fac-2',
    name: 'Chandur Primary Health Centre (PHC)',
    type: 'PHC',
    block: 'Chandur Block',
    district: 'Nashik',
    contactPerson: 'Dr. Rajesh Kulkarni (Medical Officer)',
    phone: '+91 98230 44556',
    activeStaffCount: 12,
    teleconsultAvailable: true
  },
  {
    id: 'fac-3',
    name: 'Igatpuri Rural / Community Hospital (CHC)',
    type: 'Rural Hospital',
    block: 'Igatpuri Block',
    district: 'Nashik',
    contactPerson: 'Dr. Meena Deshmukh (Surgeon/OBGYN)',
    phone: '+91 98230 77889',
    activeStaffCount: 28,
    teleconsultAvailable: true
  },
  {
    id: 'fac-4',
    name: 'Nashik District Civil Hospital',
    type: 'District Hospital',
    block: 'Nashik Central',
    district: 'Nashik',
    contactPerson: 'Dr. Vivek Joshi (Civil Surgeon)',
    phone: '+91 98230 99001',
    activeStaffCount: 85,
    teleconsultAvailable: true
  }
];

export const initialPatients: Patient[] = [
  {
    id: 'pat-101',
    abhaId: '91-4829-1029-3321',
    name: 'Savita Devi',
    age: 26,
    gender: 'Female',
    phone: '+91 94231 55678',
    village: 'Rampur',
    language: 'hi',
    linkedAshaName: 'Sunita Bai',
    linkedAshaPhone: '+91 98230 11223',
    registeredDate: '2026-08-10',
    bloodGroup: 'B+',
    allergies: ['Penicillin'],
    chronicConditions: ['Gestational Hypertension (28 weeks ANC)'],
    medicalHistory: 'Gravida 2 Para 1. Presented with persistent morning headaches and pedal edema at 28 weeks.',
    hasGivenDigitalConsent: true,
    avatarColor: 'bg-rose-500',
    lastVitals: {
      bpSystolic: 165,
      bpDiastolic: 102,
      temperature: 98.6,
      pulse: 88,
      weight: 58,
      spO2: 98,
      hemoglobin: 10.2
    }
  },
  {
    id: 'pat-102',
    abhaId: '91-8841-3920-1194',
    name: 'Ramesh Patil',
    age: 58,
    gender: 'Male',
    phone: '+91 98224 88392',
    village: 'Shivrajpur',
    language: 'mr',
    linkedAshaName: 'Sunita Bai',
    linkedAshaPhone: '+91 98230 11223',
    registeredDate: '2026-07-15',
    bloodGroup: 'O+',
    allergies: ['None'],
    chronicConditions: ['Type-2 Diabetes Mellitus', 'Essential Hypertension'],
    medicalHistory: 'Diagnosed with Type-2 DM in 2021. Takes Metformin 500mg and Amlodipine 5mg regularly.',
    hasGivenDigitalConsent: true,
    avatarColor: 'bg-emerald-600',
    lastVitals: {
      bpSystolic: 148,
      bpDiastolic: 92,
      temperature: 98.4,
      pulse: 74,
      weight: 66,
      spO2: 97,
      bloodSugar: 210
    }
  },
  {
    id: 'pat-103',
    abhaId: '91-1124-9023-8832',
    name: 'Aarav Jadhav',
    age: 4,
    gender: 'Male',
    phone: '+91 97654 33210',
    village: 'Belapur',
    language: 'mr',
    linkedAshaName: 'Manju Gavit',
    linkedAshaPhone: '+91 98230 55667',
    registeredDate: '2026-08-01',
    bloodGroup: 'A+',
    allergies: ['Sulfa drugs'],
    chronicConditions: ['Childhood Bronchial Sensitivity'],
    medicalHistory: 'Immunization up to date (MCP Card verified). Episode of acute febrile diarrhea successfully resolved.',
    hasGivenDigitalConsent: true,
    avatarColor: 'bg-amber-500',
    lastVitals: {
      bpSystolic: 96,
      bpDiastolic: 62,
      temperature: 99.1,
      pulse: 105,
      weight: 14.5,
      spO2: 99
    }
  },
  {
    id: 'pat-104',
    abhaId: '91-7732-4411-9002',
    name: 'Kavita Shinde',
    age: 34,
    gender: 'Female',
    phone: '+91 94220 99881',
    village: 'Rampur',
    language: 'mr',
    linkedAshaName: 'Sunita Bai',
    linkedAshaPhone: '+91 98230 11223',
    registeredDate: '2026-08-20',
    bloodGroup: 'AB+',
    allergies: ['Aspirin'],
    chronicConditions: ['Severe Bronchial Asthma'],
    medicalHistory: 'Recurrent seasonal wheezing and dyspnea. Under regular inhaler maintenance.',
    hasGivenDigitalConsent: false,
    avatarColor: 'bg-purple-600',
    lastVitals: {
      bpSystolic: 130,
      bpDiastolic: 84,
      temperature: 100.4,
      pulse: 112,
      weight: 52,
      spO2: 92
    }
  },
  {
    id: 'pat-105',
    abhaId: '91-3342-9901-5511',
    name: 'Mohammad Ansari',
    age: 62,
    gender: 'Male',
    phone: '+91 98211 44552',
    village: 'Chandur',
    language: 'hi',
    linkedAshaName: 'Sunita Bai',
    linkedAshaPhone: '+91 98230 11223',
    registeredDate: '2026-06-12',
    bloodGroup: 'O-',
    allergies: ['None'],
    chronicConditions: ['Ischemic Heart Disease', 'Mild Renal Impairment'],
    medicalHistory: 'Underwent stent placement in 2024. Routine quarterly follow-up with District Cardiologist.',
    hasGivenDigitalConsent: true,
    avatarColor: 'bg-teal-600',
    lastVitals: {
      bpSystolic: 138,
      bpDiastolic: 86,
      temperature: 98.2,
      pulse: 68,
      weight: 71,
      spO2: 96
    }
  }
];

export const initialEncounters: Encounter[] = [
  {
    id: 'enc-001',
    patientId: 'pat-101',
    patientName: 'Savita Devi',
    recordedByRole: 'asha',
    recordedByName: 'Sunita Bai (ASHA)',
    facilityName: 'Rampur Health Sub-centre',
    facilityType: 'Sub-centre',
    date: '2026-08-27',
    symptoms: ['High BP in Pregnancy', 'Morning Headaches', 'Swelling in Feet / Edema'],
    symptomNotes: 'Patient is 28 weeks pregnant. Complaining of throbbing headache and blurred vision for 2 days. Both ankles have pitting edema.',
    vitals: {
      bpSystolic: 165,
      bpDiastolic: 102,
      temperature: 98.6,
      pulse: 88,
      weight: 58,
      spO2: 98,
      hemoglobin: 10.2
    },
    triagePriority: 'high',
    riskReason: 'Stage 2 Hypertension in 3rd trimester pregnancy (Preeclampsia danger sign: BP 165/102 mmHg)',
    actionTaken: 'Administered oral fluids, counseled on complete rest, initiated electronic urgent referral to Chandur PHC for Medical Officer examination.'
  },
  {
    id: 'enc-002',
    patientId: 'pat-102',
    patientName: 'Ramesh Patil',
    recordedByRole: 'anm',
    recordedByName: 'Priya Sharma (CHO)',
    facilityName: 'Chandur Primary Health Centre (PHC)',
    facilityType: 'PHC',
    date: '2026-08-25',
    symptoms: ['Increased Thirst & Fatigue', 'Mild Numbness in Toes'],
    symptomNotes: 'Random blood sugar 210 mg/dL. Reports missing 3 doses of oral hypoglycemics last week.',
    vitals: {
      bpSystolic: 148,
      bpDiastolic: 92,
      temperature: 98.4,
      pulse: 74,
      weight: 66,
      spO2: 97,
      bloodSugar: 210
    },
    triagePriority: 'medium',
    riskReason: 'Uncontrolled fasting/postprandial hyperglycemia with peripheral neuropathy warning signs',
    diagnosisNotes: 'Non-compliant Type-2 DM with stage 1 hypertension',
    medications: ['Tab Metformin 500mg BD', 'Tab Amlodipine 5mg OD', 'Tab Neurobion Forte OD'],
    actionTaken: 'Medication adherence counseling, dietary modification plan provided, assigned ASHA Sunita Bai for bi-weekly blood sugar tracking.'
  },
  {
    id: 'enc-003',
    patientId: 'pat-104',
    patientName: 'Kavita Shinde',
    recordedByRole: 'asha',
    recordedByName: 'Sunita Bai (ASHA)',
    facilityName: 'Rampur Health Sub-centre',
    facilityType: 'Sub-centre',
    date: '2026-08-28',
    symptoms: ['Severe Breathlessness / Choking', 'Chest Tightness', 'High Fever > 3 Days'],
    symptomNotes: 'Sudden onset acute asthma attack after seasonal dust storm. Pulse oxymeter showing drop in oxygen saturation to 92%.',
    vitals: {
      bpSystolic: 130,
      bpDiastolic: 84,
      temperature: 100.4,
      pulse: 112,
      weight: 52,
      spO2: 92
    },
    triagePriority: 'high',
    riskReason: 'Hypoxia (SpO2 92%) with severe tachypnea and respiratory distress',
    actionTaken: 'Salbutamol nebulization arranged via portable kit, created urgent referral to Chandur PHC/District Hospital.'
  }
];

export const initialReferrals: Referral[] = [
  {
    id: 'ref-501',
    patientId: 'pat-101',
    patientName: 'Savita Devi',
    patientAge: 26,
    patientGender: 'Female',
    patientVillage: 'Rampur',
    fromFacility: 'Rampur Health Sub-centre',
    fromFacilityType: 'Sub-centre',
    toFacility: 'Chandur Primary Health Centre (PHC)',
    toFacilityType: 'PHC',
    referredByRole: 'asha',
    referredByName: 'Sunita Bai (ASHA)',
    reason: 'ANC 28 Weeks: Severe gestational hypertension (165/102 mmHg), recurrent headaches, and pedal edema. Triage High Risk.',
    urgency: 'high',
    status: 'Created',
    createdAt: '2026-08-27 10:30 AM',
    clinicalSummary: '28 weeks pregnant Gravida 2 Para 1. Blood Pressure critically elevated. Requires MO evaluation, urine albumin check, and antihypertensive initiation.'
  },
  {
    id: 'ref-502',
    patientId: 'pat-104',
    patientName: 'Kavita Shinde',
    patientAge: 34,
    patientGender: 'Female',
    patientVillage: 'Rampur',
    fromFacility: 'Rampur Health Sub-centre',
    fromFacilityType: 'Sub-centre',
    toFacility: 'Nashik District Civil Hospital',
    toFacilityType: 'District Hospital',
    referredByRole: 'anm',
    referredByName: 'Priya Sharma (CHO)',
    reason: 'Acute exacerbation of bronchial asthma with persistent hypoxemia (SpO2 92%) despite bronchodilator nebulization.',
    urgency: 'high',
    status: 'In Progress',
    createdAt: '2026-08-28 07:15 AM',
    acceptedAt: '2026-08-28 07:45 AM',
    acceptedByName: 'Dr. Vivek Joshi (Civil Surgeon)',
    clinicalSummary: 'Needs high-flow oxygen support, IV corticosteroids, and pulmonology evaluation.'
  },
  {
    id: 'ref-503',
    patientId: 'pat-102',
    patientName: 'Ramesh Patil',
    patientAge: 58,
    patientGender: 'Male',
    patientVillage: 'Shivrajpur',
    fromFacility: 'Rampur Health Sub-centre',
    fromFacilityType: 'Sub-centre',
    toFacility: 'Chandur Primary Health Centre (PHC)',
    toFacilityType: 'PHC',
    referredByRole: 'asha',
    referredByName: 'Sunita Bai (ASHA)',
    reason: 'Routine quarterly diabetic evaluation & refractory BP management',
    urgency: 'medium',
    status: 'Completed',
    createdAt: '2026-08-20 09:00 AM',
    acceptedAt: '2026-08-20 11:30 AM',
    acceptedByName: 'Dr. Rajesh Kulkarni (Medical Officer)',
    completedAt: '2026-08-25 01:15 PM',
    clinicalSummary: 'Patient attended PHC clinic. Comprehensive blood and urine workup completed.',
    consultationOutcome: {
      doctorName: 'Dr. Rajesh Kulkarni (Medical Officer)',
      diagnosis: 'Type-2 DM with microalbuminuria & Grade 1 HTN',
      treatmentPlan: 'Adjusted oral hypoglycemic regimen, added Telmisartan 40mg, advised low sodium diet.',
      prescribedMedicines: ['Tab Metformin 500mg + Glimepiride 1mg BD', 'Tab Telmisartan 40mg OD (Morning)', 'Tab Atorvastatin 10mg OD (Night)'],
      advice: 'Daily 30-min brisk walk. Bi-weekly blood glucose checks by ASHA Sunita Bai.',
      consultationDate: '2026-08-25'
    }
  },
  {
    id: 'ref-504',
    patientId: 'pat-103',
    patientName: 'Aarav Jadhav',
    patientAge: 4,
    patientGender: 'Male',
    patientVillage: 'Belapur',
    fromFacility: 'Belapur Sub-centre',
    fromFacilityType: 'Sub-centre',
    toFacility: 'Chandur Primary Health Centre (PHC)',
    toFacilityType: 'PHC',
    referredByRole: 'asha',
    referredByName: 'Manju Gavit',
    reason: 'Pediatric high fever with acute gastroenteritis & moderate dehydration.',
    urgency: 'high',
    status: 'Completed',
    createdAt: '2026-08-15 08:30 AM',
    acceptedAt: '2026-08-15 09:10 AM',
    acceptedByName: 'Dr. Rajesh Kulkarni (Medical Officer)',
    completedAt: '2026-08-16 04:00 PM',
    clinicalSummary: 'Child admitted for 24h ORS + Zinc therapy and pediatric observation.',
    consultationOutcome: {
      doctorName: 'Dr. Rajesh Kulkarni (Medical Officer)',
      diagnosis: 'Acute Viral Gastroenteritis with Dehydration (Resolved)',
      treatmentPlan: 'Full rehydration course completed. Tolerating oral feeds well.',
      prescribedMedicines: ['Syp Zinc 20mg OD x 14 days', 'Syp Paracetamol 250mg SOS', 'ORS packets (WHO formula)'],
      advice: 'Maintain boiled clean drinking water and hand hygiene.',
      consultationDate: '2026-08-16'
    }
  }
];

export const initialFollowUps: FollowUp[] = [
  {
    id: 'fol-801',
    patientId: 'pat-101',
    patientName: 'Savita Devi',
    patientVillage: 'Rampur',
    patientPhone: '+91 94231 55678',
    type: 'maternal',
    dueDate: '2026-08-29',
    assignedToAshaName: 'Sunita Bai',
    status: 'pending',
    instructions: 'Check Blood Pressure at home with digital cuff. Verify if patient is taking prescribed Labetalol. Check for headache or vision spots.',
    createdByName: 'Dr. Rajesh Kulkarni',
    createdByRole: 'doctor',
    createdAt: '2026-08-27',
    referralId: 'ref-501'
  },
  {
    id: 'fol-802',
    patientId: 'pat-102',
    patientName: 'Ramesh Patil',
    patientVillage: 'Shivrajpur',
    patientPhone: '+91 98224 88392',
    type: 'chronic',
    dueDate: '2026-08-30',
    assignedToAshaName: 'Sunita Bai',
    status: 'pending',
    instructions: 'Perform fasting fingerprick blood glucose test. Verify medication compliance with new Telmisartan tablet.',
    createdByName: 'Dr. Rajesh Kulkarni',
    createdByRole: 'doctor',
    createdAt: '2026-08-25',
    referralId: 'ref-503'
  },
  {
    id: 'fol-803',
    patientId: 'pat-103',
    patientName: 'Aarav Jadhav',
    patientVillage: 'Belapur',
    patientPhone: '+91 97654 33210',
    type: 'child',
    dueDate: '2026-08-18',
    assignedToAshaName: 'Sunita Bai',
    status: 'completed',
    instructions: 'Verify child is taking Zinc syrup daily and has normal appetite with no fever.',
    createdByName: 'Dr. Rajesh Kulkarni',
    createdByRole: 'doctor',
    createdAt: '2026-08-16',
    completedDate: '2026-08-18',
    completionNotes: 'Visited home. Child is playful, afebrile, taking Zinc syrup and home cooked food. Mother counseled on water sanitation.',
    referralId: 'ref-504'
  },
  {
    id: 'fol-804',
    patientId: 'pat-105',
    patientName: 'Mohammad Ansari',
    patientVillage: 'Chandur',
    patientPhone: '+91 98211 44552',
    type: 'post-referral',
    dueDate: '2026-08-22',
    assignedToAshaName: 'Sunita Bai',
    status: 'completed',
    instructions: 'Post-cardiac medication refill verification and resting pulse check.',
    createdByName: 'Dr. Vivek Joshi',
    createdByRole: 'doctor',
    createdAt: '2026-08-15',
    completedDate: '2026-08-21',
    completionNotes: 'All heart medications present in dosage box. Pulse 68 bpm regular, BP 138/86 mmHg. No chest pain.',
    referralId: undefined
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-301',
    patientId: 'pat-101',
    patientName: 'Savita Devi',
    providerName: 'Dr. Rajesh Kulkarni',
    providerRole: 'Medical Officer (PHC)',
    facilityName: 'Chandur Primary Health Centre',
    date: '2026-08-28',
    time: '11:00 AM',
    type: 'in-person',
    status: 'Scheduled',
    purpose: 'Urgent High-Risk ANC Assessment & Ultrasound Review'
  },
  {
    id: 'apt-302',
    patientId: 'pat-104',
    patientName: 'Kavita Shinde',
    providerName: 'Dr. Vivek Joshi',
    providerRole: 'Civil Surgeon / Specialist',
    facilityName: 'Nashik District Civil Hospital',
    date: '2026-08-28',
    time: '02:30 PM',
    type: 'teleconsult',
    status: 'Scheduled',
    teleconsultLink: 'https://demo.sanjeevani.local/teleconsult/room-901',
    purpose: 'Tele-Pulmonology Review for Severe Bronchial Spasm'
  },
  {
    id: 'apt-303',
    patientId: 'pat-102',
    patientName: 'Ramesh Patil',
    providerName: 'Priya Sharma',
    providerRole: 'Community Health Officer',
    facilityName: 'Rampur Health Sub-centre',
    date: '2026-09-05',
    time: '10:00 AM',
    type: 'in-person',
    status: 'Scheduled',
    purpose: 'Monthly NCD (Diabetes/HTN) Refill & Blood Sugar Review'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-08-28 08:00 AM',
    actorRole: 'admin',
    actorName: 'District Nodal Officer (Nashik)',
    action: 'Facility Capacity Synchronized',
    facility: 'District Health Command Center',
    details: 'Auto-synced teleconsult bandwidth and medicine buffer across 4 connected facilities.'
  },
  {
    id: 'log-2',
    timestamp: '2026-08-28 07:45 AM',
    actorRole: 'doctor',
    actorName: 'Dr. Vivek Joshi',
    action: 'Referral Accepted',
    patientId: 'pat-104',
    patientName: 'Kavita Shinde',
    facility: 'Nashik District Civil Hospital',
    details: 'Accepted urgent referral #ref-502 for acute asthma exacerbation with SpO2 92%.'
  },
  {
    id: 'log-3',
    timestamp: '2026-08-27 10:30 AM',
    actorRole: 'asha',
    actorName: 'Sunita Bai',
    action: 'High-Risk Referral Created',
    patientId: 'pat-101',
    patientName: 'Savita Devi',
    facility: 'Rampur Health Sub-centre',
    details: 'Generated High-Risk Referral #ref-501 due to Stage 2 Gestational Hypertension (165/102 mmHg).'
  },
  {
    id: 'log-4',
    timestamp: '2026-08-25 01:15 PM',
    actorRole: 'doctor',
    actorName: 'Dr. Rajesh Kulkarni',
    action: 'Consultation & Rx Finalized',
    patientId: 'pat-102',
    patientName: 'Ramesh Patil',
    facility: 'Chandur Primary Health Centre (PHC)',
    details: 'Recorded consultation outcome, prescribed Telmisartan + Metformin, and assigned ASHA home follow-up task.'
  },
  {
    id: 'log-5',
    timestamp: '2026-08-21 11:30 AM',
    actorRole: 'asha',
    actorName: 'Sunita Bai',
    action: 'Follow-up Completed',
    patientId: 'pat-105',
    patientName: 'Mohammad Ansari',
    facility: 'Rampur Village Home Visit',
    details: 'Completed post-cardiac home visit #fol-804 with stable vitals.'
  }
];

export const demoUsers: UserProfile[] = [
  {
    id: 'user-pat-1',
    name: 'Savita Devi',
    role: 'patient',
    identifier: '91-4829-1029-3321',
    facility: 'Rampur Sub-centre / Chandur PHC',
    village: 'Rampur',
    phone: '+91 94231 55678',
    designation: 'Citizen / Registered Patient (High-Risk ANC)',
    avatarColor: 'bg-rose-500',
    linkedPatientId: 'pat-101'
  },
  {
    id: 'user-pat-2',
    name: 'Ramesh Patil',
    role: 'patient',
    identifier: '91-8841-3920-1194',
    facility: 'Chandur PHC',
    village: 'Shivrajpur',
    phone: '+91 98224 88392',
    designation: 'Citizen / Chronic Care Patient (NCD/Diabetes)',
    avatarColor: 'bg-emerald-600',
    linkedPatientId: 'pat-102'
  },
  {
    id: 'user-pat-3',
    name: 'Anita Shinde',
    role: 'patient',
    identifier: '91-2309-8812-4091',
    facility: 'Igatpuri Rural Hospital',
    village: 'Navpada',
    phone: '+91 98111 22334',
    designation: 'Mother & Caregiver (Aarav Shinde, 4y)',
    avatarColor: 'bg-amber-600',
    linkedPatientId: 'pat-103'
  },
  {
    id: 'user-asha-1',
    name: 'Sunita Bai',
    role: 'asha',
    identifier: 'ASHA-MH-NSK-042',
    facility: 'Rampur Health Sub-centre',
    village: 'Rampur & Shivrajpur',
    phone: '+91 98230 11223',
    designation: 'Accredited Social Health Activist (ASHA)',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'user-asha-2',
    name: 'Kavita Gaikwad',
    role: 'asha',
    identifier: 'ASHA-MH-NSK-089',
    facility: 'Navpada Sub-centre',
    village: 'Navpada Sector',
    phone: '+91 98230 11224',
    designation: 'Frontline Community Health Worker (ASHA)',
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'user-anm-1',
    name: 'Priya Sharma',
    role: 'anm',
    identifier: 'CHO-MH-2023-882',
    facility: 'Rampur Health & Wellness Sub-centre',
    village: 'Chandur Sector Cluster',
    phone: '+91 98230 33445',
    designation: 'Community Health Officer (CHO) / Staff Nurse',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'user-anm-2',
    name: 'Anita Sonawane',
    role: 'anm',
    identifier: 'ANM-MH-2019-142',
    facility: 'Chandur Health & Wellness Centre',
    village: 'Chandur West',
    phone: '+91 98230 33446',
    designation: 'Auxiliary Nurse Midwife (Senior ANM)',
    avatarColor: 'bg-cyan-700'
  },
  {
    id: 'user-doc-1',
    name: 'Dr. Rajesh Kulkarni',
    role: 'doctor',
    identifier: 'HPR-MH-DOC-4019',
    facility: 'Chandur Primary Health Centre (PHC)',
    village: 'Chandur Block',
    phone: '+91 98230 44556',
    designation: 'Medical Officer (MBBS) & Teleconsult Lead',
    avatarColor: 'bg-blue-700'
  },
  {
    id: 'user-doc-2',
    name: 'Dr. Meena Deshmukh',
    role: 'doctor',
    identifier: 'HPR-MH-DOC-5182',
    facility: 'Igatpuri Rural / Community Hospital (CHC)',
    village: 'Igatpuri Block',
    phone: '+91 98230 77889',
    designation: 'Specialist Medical Officer (MS OBGYN)',
    avatarColor: 'bg-purple-700'
  },
  {
    id: 'user-doc-3',
    name: 'Dr. Vivek Joshi',
    role: 'doctor',
    identifier: 'HPR-MH-DOC-1029',
    facility: 'Nashik District Civil Hospital',
    village: 'Nashik HQ',
    phone: '+91 98230 99001',
    designation: 'Civil Surgeon & Senior Consultant (MD)',
    avatarColor: 'bg-slate-800'
  },
  {
    id: 'user-admin-1',
    name: 'Dr. Arvind Patil',
    role: 'admin',
    identifier: 'GOV-MH-DHO-001',
    facility: 'Nashik District Health Command & Control HQ',
    village: 'District Directorate',
    phone: '+91 98230 00100',
    designation: 'District Health Officer (DHO) & NHM Nodal Officer',
    avatarColor: 'bg-slate-900'
  }
];

