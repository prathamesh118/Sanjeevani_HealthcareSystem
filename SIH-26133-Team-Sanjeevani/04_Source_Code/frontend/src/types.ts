export type UserRole = 'patient' | 'asha' | 'anm' | 'doctor' | 'admin';

export type Language = 'en' | 'hi' | 'mr';

export type TriagePriority = 'emergency' | 'high' | 'medium' | 'low';

export type ReferralStatus = 'Created' | 'Accepted' | 'In Progress' | 'Completed' | 'Rejected';

export type FollowUpType = 'maternal' | 'child' | 'chronic' | 'post-referral' | 'general';

export type FollowUpStatus = 'pending' | 'completed' | 'overdue';

export type AppointmentType = 'in-person' | 'teleconsult';

export interface Vitals {
  bpSystolic?: number;
  bpDiastolic?: number;
  temperature?: number; // in °F
  pulse?: number; // in bpm
  weight?: number; // in kg
  spO2?: number; // in %
  bloodSugar?: number; // in mg/dL
  hemoglobin?: number; // in g/dL
}

export interface Patient {
  id: string;
  abhaId?: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  village: string;
  language: Language;
  linkedAshaName: string;
  linkedAshaPhone: string;
  registeredDate: string;
  bloodGroup?: string;
  allergies?: string[];
  chronicConditions?: string[];
  medicalHistory: string;
  hasGivenDigitalConsent: boolean;
  avatarColor: string;
  lastVitals?: Vitals;
}

export interface Encounter {
  id: string;
  patientId: string;
  patientName: string;
  recordedByRole: UserRole;
  recordedByName: string;
  facilityName: string;
  facilityType: 'Sub-centre' | 'PHC' | 'Rural Hospital' | 'District Hospital';
  date: string;
  symptoms: string[];
  symptomNotes: string;
  vitals: Vitals;
  triagePriority: TriagePriority;
  riskReason: string;
  diagnosisNotes?: string;
  medications?: string[];
  actionTaken: string;
}

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientVillage: string;
  fromFacility: string;
  fromFacilityType: string;
  toFacility: string;
  toFacilityType: string;
  referredByRole: UserRole;
  referredByName: string;
  reason: string;
  urgency: TriagePriority;
  status: ReferralStatus;
  createdAt: string;
  acceptedAt?: string;
  acceptedByName?: string;
  completedAt?: string;
  clinicalSummary?: string;
  consultationOutcome?: {
    doctorName: string;
    diagnosis: string;
    treatmentPlan: string;
    prescribedMedicines: string[];
    advice: string;
    consultationDate: string;
  };
  linkedEncounterId?: string;
}

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  patientVillage: string;
  patientPhone: string;
  type: FollowUpType;
  dueDate: string;
  assignedToAshaName: string;
  status: FollowUpStatus;
  instructions: string;
  createdByName: string;
  createdByRole: UserRole;
  createdAt: string;
  completedDate?: string;
  completionNotes?: string;
  referralId?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  providerName: string;
  providerRole: string;
  facilityName: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  teleconsultLink?: string;
  purpose: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'Sub-centre' | 'PHC' | 'Rural Hospital' | 'District Hospital';
  block: string;
  district: string;
  contactPerson: string;
  phone: string;
  activeStaffCount: number;
  teleconsultAvailable: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorName: string;
  action: string;
  patientId?: string;
  patientName?: string;
  facility: string;
  details: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  identifier: string;
  facility: string;
  village?: string;
  phone?: string;
  designation: string;
  avatarColor?: string;
  linkedPatientId?: string;
}

