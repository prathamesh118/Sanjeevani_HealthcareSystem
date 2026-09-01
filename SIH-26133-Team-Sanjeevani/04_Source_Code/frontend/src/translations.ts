export interface TranslationStrings {
  appName: string;
  appTagline: string;
  roles: {
    patient: string;
    asha: string;
    anm: string;
    doctor: string;
    admin: string;
  };
  common: {
    search: string;
    filter: string;
    all: string;
    status: string;
    urgency: string;
    date: string;
    action: string;
    actions: string;
    viewDetails: string;
    cancel: string;
    submit: string;
    save: string;
    back: string;
    loading: string;
    synced: string;
    offline: string;
    syncNow: string;
    emergencyCall: string;
    complete: string;
    completed: string;
    pending: string;
    inProgress: string;
    accepted: string;
    created: string;
    high: string;
    medium: string;
    low: string;
    emergency: string;
    vitalSigns: string;
    bloodPressure: string;
    temperature: string;
    pulseRate: string;
    spO2: string;
    weight: string;
    bloodSugar: string;
  };
  patientPortal: {
    welcome: string;
    digitalConsentTitle: string;
    digitalConsentDesc: string;
    giveConsent: string;
    consentGiven: string;
    myReferralJourney: string;
    activeReferrals: string;
    upcomingAppointments: string;
    followUpTasks: string;
    healthPassport: string;
    linkedAsha: string;
    medicalHistory: string;
    noActiveReferrals: string;
    noAppointments: string;
    emergencyHelp: string;
    stepSubCentre: string;
    stepPhc: string;
    stepHospital: string;
    stepResolved: string;
  };
  ashaPortal: {
    title: string;
    searchPlaceholder: string;
    registerPatient: string;
    newEncounter: string;
    pendingTasks: string;
    createReferral: string;
    markComplete: string;
    triageAlert: string;
    offlineModeActive: string;
    syncPendingRecords: string;
    vitalEntry: string;
    symptomsSelection: string;
    outreachToday: string;
  };
  anmPortal: {
    title: string;
    triageQueue: string;
    startTeleconsult: string;
    patientTimeline: string;
    escalateReferral: string;
    clinicalAssessment: string;
  };
  doctorPortal: {
    title: string;
    referralQueue: string;
    acceptReferral: string;
    recordOutcome: string;
    assignFollowUp: string;
    caseSummary: string;
    diagnosis: string;
    treatmentRx: string;
  };
  adminPortal: {
    title: string;
    kpiOverview: string;
    patientFlow: string;
    referralCompletionRate: string;
    followUpCompliance: string;
    highRiskCases: string;
    facilities: string;
    auditLog: string;
  };
  auth: {
    portalLogin: string;
    selectRolePrompt: string;
    quickDemoLogin: string;
    quickDemoDesc: string;
    abhaMobileLogin: string;
    staffIdLogin: string;
    enterAbhaOrPhone: string;
    getOtp: string;
    enterOtp: string;
    verifyAndLogin: string;
    enterStaffId: string;
    enterPin: string;
    loginAs: string;
    switchUser: string;
    logout: string;
    loggedInAs: string;
    nationalHealthGrid: string;
    hackathonTag: string;
  };
}


export const translations: Record<string, TranslationStrings> = {
  en: {
    appName: 'Sanjeevani AI',
    appTagline: 'Continuity of Care for Rural & Community Health',
    roles: {
      patient: 'Patient / Citizen',
      asha: 'ASHA Frontline Worker',
      anm: 'ANM / CHO (Health Centre)',
      doctor: 'Medical Officer / Doctor',
      admin: 'Health Administrator'
    },
    common: {
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      status: 'Status',
      urgency: 'Urgency',
      date: 'Date',
      action: 'Action',
      actions: 'Actions',
      viewDetails: 'View Details',
      cancel: 'Cancel',
      submit: 'Submit',
      save: 'Save',
      back: 'Back',
      loading: 'Loading...',
      synced: 'Online (Synced)',
      offline: 'Offline Mode (Local Storage)',
      syncNow: 'Sync Now',
      emergencyCall: 'Emergency 108',
      complete: 'Complete',
      completed: 'Completed',
      pending: 'Pending',
      inProgress: 'In Progress',
      accepted: 'Accepted',
      created: 'Created',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      emergency: 'Emergency',
      vitalSigns: 'Vital Signs',
      bloodPressure: 'Blood Pressure',
      temperature: 'Temperature',
      pulseRate: 'Pulse Rate',
      spO2: 'SpO2 Oxygen',
      weight: 'Weight',
      bloodSugar: 'Blood Sugar'
    },
    patientPortal: {
      welcome: 'Namaste',
      digitalConsentTitle: 'ABHA Digital Health Record Consent',
      digitalConsentDesc: 'I authorize healthcare providers (ASHA, PHC & District Hospital) to securely access and link my health records for continuous medical care.',
      giveConsent: 'Grant Digital Consent',
      consentGiven: 'Digital Consent Active (Linked to ABHA)',
      myReferralJourney: 'My Referral Progress Tracker',
      activeReferrals: 'Active Care & Referrals',
      upcomingAppointments: 'Upcoming Visits & Teleconsults',
      followUpTasks: 'Care Reminders & Home Visits',
      healthPassport: 'My Health Summary Card',
      linkedAsha: 'My Village ASHA Worker',
      medicalHistory: 'Recorded Conditions & Allergies',
      noActiveReferrals: 'No active hospital referrals right now.',
      noAppointments: 'No upcoming hospital appointments scheduled.',
      emergencyHelp: 'Emergency Assistance',
      stepSubCentre: 'Sub-centre Initial Check',
      stepPhc: 'PHC Triage / Doctor',
      stepHospital: 'District Specialist',
      stepResolved: 'Care & Follow-up Completed'
    },
    ashaPortal: {
      title: 'ASHA Frontline Care Console',
      searchPlaceholder: 'Search patient by Name, ABHA ID or Village...',
      registerPatient: 'Register New Patient',
      newEncounter: 'Record Vitals & Symptoms',
      pendingTasks: 'Outreach & Follow-up Tasks',
      createReferral: 'Generate Care Referral',
      markComplete: 'Mark Visit Done',
      triageAlert: 'Automated Risk Assessment',
      offlineModeActive: 'Offline Mode: Field entries will automatically sync when online',
      syncPendingRecords: 'Sync 3 Field Records to Server',
      vitalEntry: 'Record Patient Vitals',
      symptomsSelection: 'Reported Symptoms',
      outreachToday: 'Scheduled Home Visits Today'
    },
    anmPortal: {
      title: 'Health & Wellness Centre / ANM Station',
      triageQueue: 'Prioritized Triage Queue',
      startTeleconsult: 'Connect Teleconsultation',
      patientTimeline: 'Longitudinal Patient Journey',
      escalateReferral: 'Escalate to Specialist / DH',
      clinicalAssessment: 'Record Clinical Assessment'
    },
    doctorPortal: {
      title: 'Medical Officer & Specialist Consultation',
      referralQueue: 'Incoming Referral Queue',
      acceptReferral: 'Accept Case & Review',
      recordOutcome: 'Complete Consultation & Rx',
      assignFollowUp: 'Assign ASHA Home Follow-up',
      caseSummary: 'Clinical History & Vitals',
      diagnosis: 'Final Diagnosis',
      treatmentRx: 'Prescribed Medications'
    },
    adminPortal: {
      title: 'District Healthcare Coordination & KPI Oversight',
      kpiOverview: 'Health System Key Performance Indicators',
      patientFlow: 'Continuity of Care Patient Flow',
      referralCompletionRate: 'Referral Completion Rate',
      followUpCompliance: 'Home Follow-up Compliance',
      highRiskCases: 'Active High-Risk Cases',
      facilities: 'Connected Health Facilities',
      auditLog: 'System Audit & Traceability Log'
    },
    auth: {
      portalLogin: 'National Healthcare Portal Login',
      selectRolePrompt: 'Select your role or identity to enter Sanjeevani AI',
      quickDemoLogin: '1-Click Role Login',
      quickDemoDesc: 'Select any profile below to instantly test and evaluate that role.',
      abhaMobileLogin: 'Citizen ABHA / Mobile OTP',
      staffIdLogin: 'Healthcare Staff & Official ID',
      enterAbhaOrPhone: 'Enter 14-Digit ABHA ID or 10-Digit Mobile Number',
      getOtp: 'Get OTP',
      enterOtp: 'Enter 4-digit OTP sent to mobile',
      verifyAndLogin: 'Verify OTP & Enter Portal',
      enterStaffId: 'Enter Worker / Doctor / Admin ID (e.g. ASHA-MH-042)',
      enterPin: 'Enter Security PIN',
      loginAs: 'Sign In As',
      switchUser: 'Switch User / Logout',
      logout: 'Sign Out',
      loggedInAs: 'Signed in as',
      nationalHealthGrid: 'Ayushman Bharat Digital Health Grid &bull; Interoperable Care',
      hackathonTag: 'Smart India Hackathon (SIH PS 26133) Prototype'
    }
  },
  hi: {
    appName: 'संजीवनी AI',
    appTagline: 'ग्रामीण एवं सामुदायिक स्वास्थ्य के लिए निरंतर देखभाल प्रणाली',

    roles: {
      patient: 'मरीज़ / नागरिक',
      asha: 'आशा / स्वास्थ्य कार्यकर्ता',
      anm: 'एएनएम / सीएचओ (आरोग्य केंद्र)',
      doctor: 'चिकित्सा अधिकारी / डॉक्टर',
      admin: 'स्वास्थ्य प्रशासक'
    },
    common: {
      search: 'खोजें...',
      filter: 'फ़िल्टर',
      all: 'सभी',
      status: 'स्थिति',
      urgency: 'प्राथमिकता',
      date: 'तारीख',
      action: 'कार्रवाई',
      actions: 'कार्रवाइयां',
      viewDetails: 'विवरण देखें',
      cancel: 'रद्द करें',
      submit: 'जमा करें',
      save: 'सहेजें',
      back: 'वापस जाएं',
      loading: 'लोड हो रहा है...',
      synced: 'ऑनलाइन (सिंक हुआ)',
      offline: 'ऑफ़लाइन मोड (स्थानीय डेटा)',
      syncNow: 'अभी सिंक करें',
      emergencyCall: 'आपातकालीन 108',
      complete: 'पूरा करें',
      completed: 'पूर्ण',
      pending: 'लंबित',
      inProgress: 'प्रगति पर',
      accepted: 'स्वीकृत',
      created: 'बनाया गया',
      high: 'उच्च (हाई)',
      medium: 'मध्यम',
      low: 'सामान्य (लो)',
      emergency: 'आपातकालीन (इमरजेंसी)',
      vitalSigns: 'शारीरिक माप (वाइटल्स)',
      bloodPressure: 'रक्तचाप (बीपी)',
      temperature: 'तापमान (बुखार)',
      pulseRate: 'नाड़ी गति (पल्स)',
      spO2: 'ऑक्सीजन (SpO2)',
      weight: 'वजन (किलो)',
      bloodSugar: 'ब्लड शुगर'
    },
    patientPortal: {
      welcome: 'नमस्ते',
      digitalConsentTitle: 'आभा डिजिटल स्वास्थ्य रिकॉर्ड सहमति',
      digitalConsentDesc: 'मैं आशा कार्यकर्ता, प्राथमिक स्वास्थ्य केंद्र व जिला अस्पताल को अपनी निरंतर चिकित्सा के लिए स्वास्थ्य रिकॉर्ड देखने की अनुमति देता/देती हूँ।',
      giveConsent: 'डिजिटल सहमति प्रदान करें',
      consentGiven: 'डिजिटल सहमति सक्रिय है (आभा से संबद्ध)',
      myReferralJourney: 'मेरी रेफरल प्रगति स्थिति',
      activeReferrals: 'सक्रिय उपचार एवं रेफरल',
      upcomingAppointments: 'आगामी अस्पताल विज़िट / परामर्श',
      followUpTasks: 'स्वास्थ्य अनुवर्ती (फॉलो-अप) अनुस्मारक',
      healthPassport: 'मेरा स्वास्थ्य सारांश कार्ड',
      linkedAsha: 'मेरी गांव की आशा कार्यकर्ता',
      medicalHistory: 'पूर्व स्वास्थ्य विवरण एवं एलर्जी',
      noActiveReferrals: 'वर्तमान में कोई सक्रिय रेफरल नहीं है।',
      noAppointments: 'कोई आगामी अपॉइंटमेंट निर्धारित नहीं है।',
      emergencyHelp: 'आपातकालीन सहायता',
      stepSubCentre: 'उप-स्वास्थ्य केंद्र जांच',
      stepPhc: 'पीएचसी ट्राइएज / डॉक्टर',
      stepHospital: 'जिला विशेषज्ञ जांच',
      stepResolved: 'उपचार व फॉलो-अप संपन्न'
    },
    ashaPortal: {
      title: 'आशा कार्यकर्ता कार्य कंसोल',
      searchPlaceholder: 'मरीज़ का नाम, आभा आईडी या गांव से खोजें...',
      registerPatient: 'नया मरीज़ पंजीकृत करें',
      newEncounter: 'वाइटल्स एवं लक्षण दर्ज करें',
      pendingTasks: 'गृह भेंट एवं फॉलो-अप कार्य',
      createReferral: 'अस्पताल रेफरल बनाएं',
      markComplete: 'भेंट संपन्न मार्क करें',
      triageAlert: 'स्वचालित जोखिम मूल्यांकन',
      offlineModeActive: 'ऑफ़लाइन मोड सक्रिय: इंटरनेट आने पर डेटा स्वतः सिंक होगा',
      syncPendingRecords: '3 स्थानीय रिकॉर्ड्स सर्वर पर सिंक करें',
      vitalEntry: 'मरीज़ के वाइटल्स दर्ज करें',
      symptomsSelection: 'प्रमुख लक्षण',
      outreachToday: 'आज की निर्धारित गृह भेंट'
    },
    anmPortal: {
      title: 'आरोग्य केंद्र / एएनएम व सीएचओ डेस्क',
      triageQueue: 'प्राथमिकता आधारित ट्राइएज कतार',
      startTeleconsult: 'टेली-परामर्श शुरू करें',
      patientTimeline: 'मरीज़ की निरंतर स्वास्थ्य समय-रेखा',
      escalateReferral: 'विशेषज्ञ / जिला अस्पताल भेजें',
      clinicalAssessment: 'नैदानिक मूल्यांकन दर्ज करें'
    },
    doctorPortal: {
      title: 'चिकित्सा अधिकारी एवं विशेषज्ञ परामर्श',
      referralQueue: 'आगमन रेफरल कतार',
      acceptReferral: 'केस स्वीकार करें और जांचें',
      recordOutcome: 'परामर्श व दवाई (Rx) दर्ज करें',
      assignFollowUp: 'आशा कार्यकर्ता को फॉलो-अप सौंपें',
      caseSummary: 'नैदानिक इतिहास व वाइटल्स',
      diagnosis: 'अंतिम निदान',
      treatmentRx: 'निर्धारित दवाइयां व सलाह'
    },
    adminPortal: {
      title: 'जिला स्वास्थ्य समन्वय एवं सांख्यिकी डैशबोर्ड',
      kpiOverview: 'स्वास्थ्य प्रणाली मुख्य प्रदर्शन संकेतक',
      patientFlow: 'सतत स्वास्थ्य प्रवाह (Sub-centre → PHC → DH)',
      referralCompletionRate: 'रेफरल पूर्णता दर',
      followUpCompliance: 'गृह फॉलो-अप अनुपालन दर',
      highRiskCases: 'सक्रिय उच्च-जोखिम मामले',
      facilities: 'संबद्ध स्वास्थ्य केंद्र',
      auditLog: 'सिस्टम ऑडिट एवं पारदर्शिता लॉग'
    },
    auth: {
      portalLogin: 'राष्ट्रीय स्वास्थ्य समन्वय पोर्टल लॉगिन',
      selectRolePrompt: 'संजीवनी AI में प्रवेश के लिए अपनी भूमिका या पहचान चुनें',
      quickDemoLogin: '१-क्लिक रोल लॉगिन',
      quickDemoDesc: 'किसी भी भूमिका को तुरंत जांचने और मूल्यांकन करने के लिए नीचे दी गई प्रोफ़ाइल चुनें।',
      abhaMobileLogin: 'नागरिक आभा / मोबाइल ओटीपी',
      staffIdLogin: 'स्वास्थ्य कर्मी एवं अधिकारी आईडी',
      enterAbhaOrPhone: '14-अंकों की आभा आईडी या 10-अंकों का मोबाइल नंबर दर्ज करें',
      getOtp: 'ओटीपी प्राप्त करें',
      enterOtp: 'मोबाइल पर भेजा गया 4-अंकों का ओटीपी दर्ज करें',
      verifyAndLogin: 'ओटीपी सत्यापित करें और पोर्टल में प्रवेश करें',
      enterStaffId: 'कार्यकर्ता / डॉक्टर / एडमिन आईडी दर्ज करें (उदा. ASHA-MH-042)',
      enterPin: 'सुरक्षा पिन दर्ज करें',
      loginAs: 'लॉगिन करें',
      switchUser: 'यूज़र बदलें / लॉगआउट',
      logout: 'लॉगआउट',
      loggedInAs: 'सक्रिय खाता',
      nationalHealthGrid: 'आयुष्मान भारत डिजिटल मिशन &bull; निरंतर स्वास्थ्य समन्वय',
      hackathonTag: 'स्मार्ट इंडिया हैकाथॉन (SIH PS 26133) प्रोटोटाइप'
    }
  },
  mr: {

    appName: 'संजीवनी AI',
    appTagline: 'ग्रामीण व समुदाय आरोग्यासाठी अखंड काळजी प्रणाली',
    roles: {
      patient: 'रुग्ण / नागरिक',
      asha: 'आशा / आरोग्य सेविका',
      anm: 'एएनएम / सीएचओ (आरोग्य केंद्र)',
      doctor: 'वैद्यकीय अधिकारी / डॉक्टर',
      admin: 'आरोग्य प्रशासक'
    },
    common: {
      search: 'शोधा...',
      filter: 'फिल्टर',
      all: 'सर्व',
      status: 'स्थिती',
      urgency: 'प्राधान्यता',
      date: 'दिनांक',
      action: 'कृती',
      actions: 'कृती',
      viewDetails: 'तपशील पहा',
      cancel: 'रद्द करा',
      submit: 'सादर करा',
      save: 'जतन करा',
      back: 'मागे जा',
      loading: 'लोड होत आहे...',
      synced: 'ऑनलाइन (सिंक झाले)',
      offline: 'ऑफलाइन मोड (स्थानिक डेटा)',
      syncNow: 'आता सिंक करा',
      emergencyCall: 'आपत्कालीन 108',
      complete: 'पूर्ण करा',
      completed: 'पूर्ण झाले',
      pending: 'प्रलंबित',
      inProgress: 'प्रगतीपथावर',
      accepted: 'स्वीकारले',
      created: 'तयार केले',
      high: 'उच्च (हाय)',
      medium: 'मध्यम',
      low: 'सामान्य (लो)',
      emergency: 'आपत्कालीन (इमर्जन्सी)',
      vitalSigns: 'शारीरिक तपासणी (व्हाइटल्स)',
      bloodPressure: 'रक्तदाब (बीपी)',
      temperature: 'तापमान',
      pulseRate: 'नाडीचे ठोके',
      spO2: 'ऑक्सिजन (SpO2)',
      weight: 'वजन (किग्रॅ)',
      bloodSugar: 'रक्त शर्करा'
    },
    patientPortal: {
      welcome: 'नमस्कार',
      digitalConsentTitle: 'आभा डिजिटल आरोग्य संमती',
      digitalConsentDesc: 'मी आशा सेविका, प्राथमिक आरोग्य केंद्र आणि जिल्हा रुग्णालयाला माझ्या निरंतर उपचारासाठी आरोग्य नोंदी पाहण्याची संमती देतो/देते.',
      giveConsent: 'डिजिटल संमती द्या',
      consentGiven: 'डिजिटल संमती सक्रिय आहे (आभा संलग्न)',
      myReferralJourney: 'माझी रेफरल प्रगती स्थिती',
      activeReferrals: 'सक्रिय उपचार व रेफरल',
      upcomingAppointments: 'पुढील तपासणी व सल्लामसलत',
      followUpTasks: 'आरोग्य तपासणी स्मरणपत्रे',
      healthPassport: 'माझे आरोग्य माहिती पत्रक',
      linkedAsha: 'माझ्या गावातील आशा सेविका',
      medicalHistory: 'मागील आजार व ऍलर्जी',
      noActiveReferrals: 'सध्या कोणतेही सक्रिय रेफरल नाही.',
      noAppointments: 'सध्या कोणतीही पुढील भेट नियोजित नाही.',
      emergencyHelp: 'आपत्कालीन मदत',
      stepSubCentre: 'उप-आरोग्य केंद्र तपासणी',
      stepPhc: 'प्राथमिक आरोग्य केंद्र / डॉक्टर',
      stepHospital: 'जिल्हा तज्ज्ञ तपासणी',
      stepResolved: 'उपचार व पाठपुरावा पूर्ण'
    },
    ashaPortal: {
      title: 'आशा सेविका कार्य प्रणाली',
      searchPlaceholder: 'रुग्णाचे नाव, आभा आयडी किंवा गावाने शोधा...',
      registerPatient: 'नवीन रुग्ण नोंदणी',
      newEncounter: 'व्हाइटल्स व लक्षणे नोंदवा',
      pendingTasks: 'गृहभेटी व पाठपुरावा कामे',
      createReferral: 'रुग्णालय रेफरल तयार करा',
      markComplete: 'भेट पूर्ण नोंदवा',
      triageAlert: 'स्वयंचलित जोखीम मूल्यमापन',
      offlineModeActive: 'ऑफलाइन मोड: इंटरनेट सुरू होताच डेटा आपोआप सिंक होईल',
      syncPendingRecords: '३ नोंदी सर्व्हरवर सिंक करा',
      vitalEntry: 'रुग्णाचे व्हाइटल्स नोंदवा',
      symptomsSelection: 'लक्षणे निवडा',
      outreachToday: 'आजच्या नियोजित गृहभेटी'
    },
    anmPortal: {
      title: 'आरोग्यवर्धिनी केंद्र / एएनएम व सीएचओ डेस्क',
      triageQueue: 'प्राधान्यक्रमानुसार ट्राइएज रांग',
      startTeleconsult: 'टेली-कन्सल्टेशन सुरू करा',
      patientTimeline: 'रुग्णाचा संपूर्ण प्रवास व इतिहास',
      escalateReferral: 'तज्ज्ञ / जिल्हा रुग्णालयाकडे पाठवा',
      clinicalAssessment: 'वैद्यकीय तपासणी नोंदवा'
    },
    doctorPortal: {
      title: 'वैद्यकीय अधिकारी व तज्ज्ञ सल्लामसलत',
      referralQueue: 'येणाऱ्या रेफरलची यादी',
      acceptReferral: 'केस स्वीकारा व तपासा',
      recordOutcome: 'निदान व औषधे (Rx) नोंदवा',
      assignFollowUp: 'आशा सेविकेला पाठपुरावा सोपवा',
      caseSummary: 'रुग्णाचा वैद्यकीय इतिहास व व्हाइटल्स',
      diagnosis: 'अंतिम निदान',
      treatmentRx: 'दिलेली औषधे व पथ्ये'
    },
    adminPortal: {
      title: 'जिल्हा आरोग्य समन्वय व डॅशबोर्ड',
      kpiOverview: 'आरोग्य यंत्रणा मुख्य कामगिरी निर्देशांक',
      patientFlow: 'सलग रुग्ण प्रवाह (उप-केंद्र → प्रा.आ.केंद्र → जि.रुग्णालय)',
      referralCompletionRate: 'रेफरल पूर्णता दर',
      followUpCompliance: 'गृह पाठपुरावा पूर्तता दर',
      highRiskCases: 'सक्रिय उच्च-जोखीम रुग्ण',
      facilities: 'संलग्न आरोग्य केंद्रे',
      auditLog: 'प्रणाली ऑडिट व पारदर्शकता नोंद'
    },
    auth: {
      portalLogin: 'राष्ट्रीय आरोग्य समन्वय पोर्टल लॉगिन',
      selectRolePrompt: 'संजीवनी AI मध्ये प्रवेश करण्यासाठी तुमची भूमिका किंवा ओळख निवडा',
      quickDemoLogin: '१-क्लिक रोल लॉगिन',
      quickDemoDesc: 'कोणत्याही भूमिकेची त्वरित चाचणी आणि मूल्यांकन करण्यासाठी खालील प्रोफाइल निवडा.',
      abhaMobileLogin: 'नागरिक आभा / मोबाइल ओटीपी',
      staffIdLogin: 'आरोग्य कर्मचारी व अधिकारी आयडी',
      enterAbhaOrPhone: '१४-अंकी आभा आयडी किंवा १०-अंकी मोबाइल नंबर टाका',
      getOtp: 'ओटीपी मिळवा',
      enterOtp: 'मोबाईलवर आलेला ४-अंकी ओटीपी टाका',
      verifyAndLogin: 'ओटीपी पडताळणी करा आणि पोर्टल उघडा',
      enterStaffId: 'कर्मचारी / डॉक्टर / प्रशासक आयडी टाका (उदा. ASHA-MH-042)',
      enterPin: 'सुरक्षा पिन टाका',
      loginAs: 'लॉगिन करा',
      switchUser: 'वापरकर्ता बदला / लॉगआउट',
      logout: 'लॉगआउट',
      loggedInAs: 'सक्रिय वापरकर्ता',
      nationalHealthGrid: 'आयुष्मान भारत डिजिटल मिशन &bull; सलग आरोग्य समन्वय',
      hackathonTag: 'स्मार्ट इंडिया हॅकाथॉन (SIH PS 26133) प्रोटोटाइप'
    }
  }
};

