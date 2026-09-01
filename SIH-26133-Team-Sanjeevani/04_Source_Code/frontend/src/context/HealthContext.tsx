import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  Patient,
  Encounter,
  Referral,
  FollowUp,
  Appointment,
  Facility,
  AuditLog,
  TriagePriority,
  Vitals,
  FollowUpType,
  UserProfile
} from '../types';
import {
  initialPatients,
  initialEncounters,
  initialReferrals,
  initialFollowUps,
  initialAppointments,
  initialFacilities,
  initialAuditLogs,
  demoUsers
} from '../data/seedData';
import { translations, TranslationStrings } from '../translations';
import { calculateTriage } from '../utils/triage';

interface HealthContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  switchUserRole: (role: UserRole) => void;
  availableUsers: UserProfile[];
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;

  
  // Data
  patients: Patient[];
  encounters: Encounter[];
  referrals: Referral[];
  followUps: FollowUp[];
  appointments: Appointment[];
  facilities: Facility[];
  auditLogs: AuditLog[];
  
  // Offline Simulation
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  pendingOfflineSyncCount: number;
  syncOfflineQueue: () => void;

  // Selected state for active views
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
  activeTeleconsultPatient: Patient | null;
  setActiveTeleconsultPatient: (pat: Patient | null) => void;
  selectedCasePatient: Patient | null;
  setSelectedCasePatient: (pat: Patient | null) => void;

  // Core Actions for Flow
  addPatient: (data: Omit<Patient, 'id' | 'registeredDate' | 'avatarColor'>) => Patient;
  recordEncounter: (data: {
    patientId: string;
    symptoms: string[];
    symptomNotes: string;
    vitals: Vitals;
    facilityName: string;
    facilityType: 'Sub-centre' | 'PHC' | 'Rural Hospital' | 'District Hospital';
    recordedByName: string;
    actionTaken: string;
  }) => { encounter: Encounter; triagePriority: TriagePriority };
  createReferral: (data: {
    patientId: string;
    fromFacility: string;
    fromFacilityType: string;
    toFacility: string;
    toFacilityType: string;
    reason: string;
    urgency: TriagePriority;
    clinicalSummary: string;
  }) => Referral;
  acceptReferral: (referralId: string, doctorName: string) => void;
  recordConsultationOutcome: (
    referralId: string,
    outcome: {
      doctorName: string;
      diagnosis: string;
      treatmentPlan: string;
      prescribedMedicines: string[];
      advice: string;
    },
    followUp?: {
      type: FollowUpType;
      dueDate: string;
      instructions: string;
      assignedToAshaName: string;
    }
  ) => void;
  assignFollowUp: (data: {
    patientId: string;
    type: FollowUpType;
    dueDate: string;
    assignedToAshaName: string;
    instructions: string;
    referralId?: string;
  }) => FollowUp;
  completeFollowUp: (followUpId: string, completionNotes: string) => void;
  togglePatientConsent: (patientId: string) => void;
  resetDemoData: () => void;

  // Demo helper
  demoStep: number;
  setDemoStep: (step: number) => void;
  notification: { message: string; type: 'success' | 'info' | 'alert' } | null;
  setNotification: (notif: { message: string; type: 'success' | 'info' | 'alert' } | null) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const STORAGE_KEY = 'sanjeevani_app_state_v1';

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_currentUser');
      return saved ? JSON.parse(saved) : demoUsers[3]; // Sunita Bai (ASHA) by default
    } catch {
      return demoUsers[3];
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_isAuth');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    if (currentUser) return currentUser.role;
    return 'asha';
  });

  const [language, setLanguage] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingOfflineSyncCount, setPendingOfflineSyncCount] = useState<number>(3);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'alert' } | null>(null);


  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_patients');
      return saved ? JSON.parse(saved) : initialPatients;
    } catch {
      return initialPatients;
    }
  });

  const [encounters, setEncounters] = useState<Encounter[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_encounters');
      return saved ? JSON.parse(saved) : initialEncounters;
    } catch {
      return initialEncounters;
    }
  });

  const [referrals, setReferrals] = useState<Referral[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_referrals');
      return saved ? JSON.parse(saved) : initialReferrals;
    } catch {
      return initialReferrals;
    }
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_followups');
      return saved ? JSON.parse(saved) : initialFollowUps;
    } catch {
      return initialFollowUps;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_appointments');
      return saved ? JSON.parse(saved) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  });

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_facilities');
      return saved ? JSON.parse(saved) : initialFacilities;
    } catch {
      return initialFacilities;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_auditlogs');
      return saved ? JSON.parse(saved) : initialAuditLogs;
    } catch {
      return initialAuditLogs;
    }
  });

  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-101');
  const [activeTeleconsultPatient, setActiveTeleconsultPatient] = useState<Patient | null>(null);
  const [selectedCasePatient, setSelectedCasePatient] = useState<Patient | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_patients', JSON.stringify(patients));
      localStorage.setItem(STORAGE_KEY + '_encounters', JSON.stringify(encounters));
      localStorage.setItem(STORAGE_KEY + '_referrals', JSON.stringify(referrals));
      localStorage.setItem(STORAGE_KEY + '_followups', JSON.stringify(followUps));
      localStorage.setItem(STORAGE_KEY + '_appointments', JSON.stringify(appointments));
      localStorage.setItem(STORAGE_KEY + '_facilities', JSON.stringify(facilities));
      localStorage.setItem(STORAGE_KEY + '_auditlogs', JSON.stringify(auditLogs));
      localStorage.setItem(STORAGE_KEY + '_currentUser', JSON.stringify(currentUser));
      localStorage.setItem(STORAGE_KEY + '_isAuth', JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error('Failed to sync to local storage', e);
    }
  }, [patients, encounters, referrals, followUps, appointments, facilities, auditLogs, currentUser, isAuthenticated]);

  const login = (user: UserProfile) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setCurrentRole(user.role);

    if (user.role === 'patient' && user.linkedPatientId) {
      setSelectedPatientId(user.linkedPatientId);
    }

    addAudit(
      'User Authentication Success',
      user.role,
      user.name,
      user.facility,
      `Logged in as ${user.designation} (${user.identifier})`
    );

    setNotification({
      message: `Welcome back, ${user.name}! Switched to ${user.designation}`,
      type: 'success'
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setNotification({
      message: 'Logged out. Please select a role or profile to sign in.',
      type: 'info'
    });
  };

  const switchUserRole = (role: UserRole) => {
    // Find the first demo user matching this role
    const matchedUser = demoUsers.find(u => u.role === role);
    if (matchedUser) {
      login(matchedUser);
    } else {
      setCurrentRole(role);
    }
  };


  // Flash notification timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const addAudit = (action: string, actorRole: UserRole, actorName: string, facility: string, details: string, patientId?: string, patientName?: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', ' + new Date().toISOString().split('T')[0],
      actorRole,
      actorName,
      action,
      facility,
      details,
      patientId,
      patientName
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addPatient = (data: Omit<Patient, 'id' | 'registeredDate' | 'avatarColor'>): Patient => {
    const colors = ['bg-teal-600', 'bg-blue-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600'];
    const newPatient: Patient = {
      ...data,
      id: `pat-${Date.now().toString().slice(-4)}`,
      registeredDate: new Date().toISOString().split('T')[0],
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      abhaId: data.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);

    addAudit(
      'New Patient Registered',
      currentRole,
      currentRole === 'asha' ? 'Sunita Bai (ASHA)' : 'Field Staff',
      'Rampur Health Sub-centre',
      `Registered ${newPatient.name}, ${newPatient.age}y ${newPatient.gender} from ${newPatient.village}. ABHA ID: ${newPatient.abhaId}`,
      newPatient.id,
      newPatient.name
    );

    if (isOffline) {
      setPendingOfflineSyncCount(c => c + 1);
    }

    setNotification({
      message: `Patient ${newPatient.name} registered successfully!`,
      type: 'success'
    });

    return newPatient;
  };

  const recordEncounter = (data: {
    patientId: string;
    symptoms: string[];
    symptomNotes: string;
    vitals: Vitals;
    facilityName: string;
    facilityType: 'Sub-centre' | 'PHC' | 'Rural Hospital' | 'District Hospital';
    recordedByName: string;
    actionTaken: string;
  }) => {
    const pat = patients.find(p => p.id === data.patientId);
    const patName = pat ? pat.name : 'Unknown Patient';
    const isPregnant = pat?.chronicConditions?.some(c => c.toLowerCase().includes('anc') || c.toLowerCase().includes('pregnant')) || false;
    
    const triage = calculateTriage(data.vitals, data.symptoms, isPregnant);

    const newEncounter: Encounter = {
      id: `enc-${Date.now().toString().slice(-4)}`,
      patientId: data.patientId,
      patientName: patName,
      recordedByRole: currentRole,
      recordedByName: data.recordedByName || (currentRole === 'asha' ? 'Sunita Bai (ASHA)' : 'Staff'),
      facilityName: data.facilityName,
      facilityType: data.facilityType,
      date: new Date().toISOString().split('T')[0],
      symptoms: data.symptoms,
      symptomNotes: data.symptomNotes,
      vitals: data.vitals,
      triagePriority: triage.priority,
      riskReason: triage.reasons.join('; '),
      actionTaken: data.actionTaken
    };

    setEncounters(prev => [newEncounter, ...prev]);

    // Update patient last vitals
    setPatients(prev =>
      prev.map(p => {
        if (p.id === data.patientId) {
          return {
            ...p,
            lastVitals: data.vitals
          };
        }
        return p;
      })
    );

    addAudit(
      `Vitals & Triage Recorded (${triage.priority.toUpperCase()})`,
      currentRole,
      newEncounter.recordedByName,
      data.facilityName,
      `Recorded vitals for ${patName}. Auto-Triage: ${triage.priority.toUpperCase()} - ${triage.reasons.join(', ')}`,
      data.patientId,
      patName
    );

    if (isOffline) {
      setPendingOfflineSyncCount(c => c + 1);
    }

    setNotification({
      message: `Encounter recorded. Priority flagged as ${triage.priority.toUpperCase()}`,
      type: triage.priority === 'emergency' || triage.priority === 'high' ? 'alert' : 'success'
    });

    return { encounter: newEncounter, triagePriority: triage.priority };
  };

  const createReferral = (data: {
    patientId: string;
    fromFacility: string;
    fromFacilityType: string;
    toFacility: string;
    toFacilityType: string;
    reason: string;
    urgency: TriagePriority;
    clinicalSummary: string;
  }): Referral => {
    const pat = patients.find(p => p.id === data.patientId);
    const newReferral: Referral = {
      id: `ref-${Math.floor(500 + Math.random() * 500)}`,
      patientId: data.patientId,
      patientName: pat?.name || 'Patient',
      patientAge: pat?.age || 30,
      patientGender: pat?.gender || 'Female',
      patientVillage: pat?.village || 'Rampur',
      fromFacility: data.fromFacility,
      fromFacilityType: data.fromFacilityType,
      toFacility: data.toFacility,
      toFacilityType: data.toFacilityType,
      referredByRole: currentRole,
      referredByName: currentRole === 'asha' ? 'Sunita Bai (ASHA)' : currentRole === 'anm' ? 'Priya Sharma (CHO)' : 'Doctor',
      reason: data.reason,
      urgency: data.urgency,
      status: 'Created',
      createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', Today',
      clinicalSummary: data.clinicalSummary
    };

    setReferrals(prev => [newReferral, ...prev]);

    // Also automatically create an appointment record for this referral
    const newApt: Appointment = {
      id: `apt-${Date.now().toString().slice(-4)}`,
      patientId: data.patientId,
      patientName: pat?.name || 'Patient',
      providerName: 'Medical Officer on Duty',
      providerRole: data.toFacilityType === 'District Hospital' ? 'Civil Surgeon / Specialist' : 'Medical Officer (PHC)',
      facilityName: data.toFacility,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '10:30 AM',
      type: 'in-person',
      status: 'Scheduled',
      purpose: `Referral Visit: ${data.reason.slice(0, 50)}...`
    };
    setAppointments(prev => [newApt, ...prev]);

    addAudit(
      `Referral Created (${data.urgency.toUpperCase()})`,
      currentRole,
      newReferral.referredByName,
      data.fromFacility,
      `Referred ${newReferral.patientName} to ${data.toFacility}. Reason: ${data.reason}`,
      data.patientId,
      newReferral.patientName
    );

    if (isOffline) {
      setPendingOfflineSyncCount(c => c + 1);
    }

    setNotification({
      message: `Referral #${newReferral.id} created! Sent to ${data.toFacility}`,
      type: 'success'
    });

    return newReferral;
  };

  const acceptReferral = (referralId: string, doctorName: string) => {
    let updatedPatName = '';
    let updatedPatId = '';
    let toFac = '';

    setReferrals(prev =>
      prev.map(ref => {
        if (ref.id === referralId) {
          updatedPatName = ref.patientName;
          updatedPatId = ref.patientId;
          toFac = ref.toFacility;
          return {
            ...ref,
            status: 'Accepted',
            acceptedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', Today',
            acceptedByName: doctorName || 'Dr. Rajesh Kulkarni (Medical Officer)'
          };
        }
        return ref;
      })
    );

    addAudit(
      'Referral Accepted',
      currentRole,
      doctorName || 'Dr. Rajesh Kulkarni',
      toFac || 'Chandur PHC',
      `Accepted referral #${referralId} for ${updatedPatName}. Patient added to consultation room queue.`,
      updatedPatId,
      updatedPatName
    );

    setNotification({
      message: `Referral #${referralId} accepted by ${doctorName || 'Doctor'}. Case is ready for consultation.`,
      type: 'info'
    });
  };

  const recordConsultationOutcome = (
    referralId: string,
    outcome: {
      doctorName: string;
      diagnosis: string;
      treatmentPlan: string;
      prescribedMedicines: string[];
      advice: string;
    },
    followUp?: {
      type: FollowUpType;
      dueDate: string;
      instructions: string;
      assignedToAshaName: string;
    }
  ) => {
    let patId = '';
    let patName = '';

    setReferrals(prev =>
      prev.map(ref => {
        if (ref.id === referralId) {
          patId = ref.patientId;
          patName = ref.patientName;
          return {
            ...ref,
            status: 'Completed',
            completedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ', Today',
            consultationOutcome: {
              ...outcome,
              consultationDate: new Date().toISOString().split('T')[0]
            }
          };
        }
        return ref;
      })
    );

    // If follow-up provided, assign it to ASHA worker
    if (followUp && patId) {
      const pat = patients.find(p => p.id === patId);
      const newFollowUp: FollowUp = {
        id: `fol-${Date.now().toString().slice(-4)}`,
        patientId: patId,
        patientName: patName || pat?.name || 'Patient',
        patientVillage: pat?.village || 'Rampur',
        patientPhone: pat?.phone || '+91 98000 00000',
        type: followUp.type,
        dueDate: followUp.dueDate,
        assignedToAshaName: followUp.assignedToAshaName || pat?.linkedAshaName || 'Sunita Bai',
        status: 'pending',
        instructions: followUp.instructions,
        createdByName: outcome.doctorName,
        createdByRole: 'doctor',
        createdAt: new Date().toISOString().split('T')[0],
        referralId: referralId
      };
      setFollowUps(prev => [newFollowUp, ...prev]);

      addAudit(
        'Follow-up Task Assigned to ASHA',
        'doctor',
        outcome.doctorName,
        'Chandur PHC',
        `Assigned ${followUp.type.toUpperCase()} follow-up to ASHA ${newFollowUp.assignedToAshaName} for ${patName}. Due: ${followUp.dueDate}`,
        patId,
        patName
      );
    }

    addAudit(
      'Consultation & Rx Completed',
      'doctor',
      outcome.doctorName,
      'Chandur PHC',
      `Diagnosed ${patName}: ${outcome.diagnosis}. Prescribed ${outcome.prescribedMedicines.length} medications. Referral marked Completed.`,
      patId,
      patName
    );

    setNotification({
      message: `Consultation recorded for ${patName}. Referral completed & Follow-up dispatched to ASHA!`,
      type: 'success'
    });
  };

  const assignFollowUp = (data: {
    patientId: string;
    type: FollowUpType;
    dueDate: string;
    assignedToAshaName: string;
    instructions: string;
    referralId?: string;
  }): FollowUp => {
    const pat = patients.find(p => p.id === data.patientId);
    const newFollowUp: FollowUp = {
      id: `fol-${Date.now().toString().slice(-4)}`,
      patientId: data.patientId,
      patientName: pat?.name || 'Patient',
      patientVillage: pat?.village || 'Rampur',
      patientPhone: pat?.phone || '+91 98000 00000',
      type: data.type,
      dueDate: data.dueDate,
      assignedToAshaName: data.assignedToAshaName,
      status: 'pending',
      instructions: data.instructions,
      createdByName: currentRole === 'doctor' ? 'Dr. Rajesh Kulkarni' : currentRole === 'anm' ? 'Priya Sharma (CHO)' : 'Medical Staff',
      createdByRole: currentRole,
      createdAt: new Date().toISOString().split('T')[0],
      referralId: data.referralId
    };

    setFollowUps(prev => [newFollowUp, ...prev]);

    addAudit(
      'Follow-up Assigned',
      currentRole,
      newFollowUp.createdByName,
      'Health Center',
      `Scheduled ${data.type} follow-up for ${newFollowUp.patientName} assigned to ASHA ${data.assignedToAshaName}`,
      data.patientId,
      newFollowUp.patientName
    );

    setNotification({
      message: `Follow-up task assigned to ${data.assignedToAshaName}!`,
      type: 'success'
    });

    return newFollowUp;
  };

  const completeFollowUp = (followUpId: string, completionNotes: string) => {
    let patName = '';
    let patId = '';
    let ashaName = '';

    setFollowUps(prev =>
      prev.map(f => {
        if (f.id === followUpId) {
          patName = f.patientName;
          patId = f.patientId;
          ashaName = f.assignedToAshaName;
          return {
            ...f,
            status: 'completed',
            completedDate: new Date().toISOString().split('T')[0],
            completionNotes: completionNotes || 'Home visit completed. Vitals checked and adherence confirmed.'
          };
        }
        return f;
      })
    );

    addAudit(
      'Follow-up Visit Completed',
      'asha',
      ashaName || 'Sunita Bai (ASHA)',
      'Village Home Outreach',
      `Completed scheduled follow-up for ${patName}. Remarks: ${completionNotes.slice(0, 70)}...`,
      patId,
      patName
    );

    setNotification({
      message: `Follow-up for ${patName} marked as completed! Loop closed.`,
      type: 'success'
    });
  };

  const togglePatientConsent = (patientId: string) => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id === patientId) {
          const nextVal = !p.hasGivenDigitalConsent;
          addAudit(
            nextVal ? 'Digital Health Consent Granted' : 'Digital Health Consent Revoked',
            'patient',
            p.name,
            'Patient ABHA Portal',
            `${p.name} updated ABHA health record sharing consent to: ${nextVal ? 'ACTIVE' : 'INACTIVE'}`,
            p.id,
            p.name
          );
          return {
            ...p,
            hasGivenDigitalConsent: nextVal
          };
        }
        return p;
      })
    );

    setNotification({
      message: 'ABHA digital consent updated.',
      type: 'info'
    });
  };

  const syncOfflineQueue = () => {
    setPendingOfflineSyncCount(0);
    addAudit(
      'Offline Data Synchronized',
      'asha',
      'Sunita Bai (ASHA)',
      'Rampur Health Sub-centre',
      'Synced 3 field patient registrations and vitals encounters to cloud health registry.'
    );
    setNotification({
      message: 'All local field records synchronized with Central Health Registry!',
      type: 'success'
    });
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY + '_patients');
    localStorage.removeItem(STORAGE_KEY + '_encounters');
    localStorage.removeItem(STORAGE_KEY + '_referrals');
    localStorage.removeItem(STORAGE_KEY + '_followups');
    localStorage.removeItem(STORAGE_KEY + '_appointments');
    localStorage.removeItem(STORAGE_KEY + '_facilities');
    localStorage.removeItem(STORAGE_KEY + '_auditlogs');

    setPatients(initialPatients);
    setEncounters(initialEncounters);
    setReferrals(initialReferrals);
    setFollowUps(initialFollowUps);
    setAppointments(initialAppointments);
    setFacilities(initialFacilities);
    setAuditLogs(initialAuditLogs);
    setDemoStep(1);
    setCurrentUser(demoUsers[3]);
    setIsAuthenticated(true);
    setCurrentRole('asha');
    setSelectedPatientId('pat-101');
    setPendingOfflineSyncCount(3);
    setIsOffline(false);

    setNotification({
      message: 'Demo dataset reset to default initial state.',
      type: 'info'
    });
  };

  const t = translations[language] || translations.en;

  return (
    <HealthContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUser,
        isAuthenticated,
        login,
        logout,
        switchUserRole,
        availableUsers: demoUsers,
        language,
        setLanguage,
        t,
        patients,
        encounters,
        referrals,
        followUps,
        appointments,
        facilities,
        auditLogs,
        isOffline,
        setIsOffline,
        pendingOfflineSyncCount,
        syncOfflineQueue,
        selectedPatientId,
        setSelectedPatientId,
        activeTeleconsultPatient,
        setActiveTeleconsultPatient,
        selectedCasePatient,
        setSelectedCasePatient,
        addPatient,
        recordEncounter,
        createReferral,
        acceptReferral,
        recordConsultationOutcome,
        assignFollowUp,
        completeFollowUp,
        togglePatientConsent,
        resetDemoData,
        demoStep,
        setDemoStep,
        notification,
        setNotification
      }}
    >
      {children}
    </HealthContext.Provider>
  );

};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
