# MVP Features and Backlog

## SIH Problem Statement ID

26133

---

## Purpose

This document defines the Minimum Viable Product (MVP) for the proposed rural healthcare coordination platform.

The goal is to identify the most important features required for a complete and reliable SIH prototype while separating optional and future features.

---

## Feature Prioritization

The proposed features are prioritized to ensure that the MVP demonstrates one complete and reliable patient journey.

| Feature | Priority | Reason |
|---|---|---|
| Role-based login | MUST | Required to demonstrate different user workflows |
| Patient registration and search | MUST | Starting point of the patient journey |
| Longitudinal patient record | MUST | Supports continuity of patient information |
| Structured intake | MUST | Captures symptoms and basic patient information |
| Explainable digital triage | MUST | Helps identify patient priority with visible reasoning |
| Appointment or queue management | MUST | Connects patients to consultation |
| Consultation workflow | MUST | Core healthcare interaction |
| Referral tracking | MUST | Supports continuity across healthcare facilities |
| High-risk follow-up | MUST | Ensures important cases are not lost after consultation |
| Diagnostic availability | SHOULD | Improves care coordination |
| Medicine availability | SHOULD | Helps identify available treatment resources |
| Facility/admin dashboard | SHOULD | Supports monitoring and demonstration of impact |
| Offline support | SHOULD | Important for rural low-connectivity environments |
| Multilingual support | SHOULD | Improves accessibility |
| Advanced AI/ML prediction | COULD | Can be added if time and validated data are available |
| Real external healthcare integration | LATER | Not required for the prototype |
| Full production-scale deployment | LATER | Beyond the SIH prototype scope |

---

## Final MVP Scope

The MVP will focus on demonstrating one complete end-to-end patient journey.

### Core MVP Workflow

Patient Registration  
→ Structured Intake  
→ Explainable Triage  
→ Appointment / Queue  
→ Consultation  
→ Referral  
→ Follow-up

### Must-Have MVP Features

1. Role-based login
2. Patient registration and search
3. Longitudinal patient record
4. Structured symptom and vital information intake
5. Explainable digital triage
6. Appointment or queue management
7. Consultation workflow
8. Referral creation and tracking
9. High-risk follow-up management

### Supporting Features

The following features will be included if development time allows:

- Diagnostic availability
- Medicine availability
- Facility/admin dashboard
- Offline workflow demonstration
- Multilingual support

---

## Features Excluded from the Initial MVP

The following features are outside the initial prototype scope:

- Full production-scale healthcare deployment
- Direct integration with real government healthcare systems
- Advanced clinical AI prediction without validated data
- Complete hospital management functionality
- Real-time integration with all healthcare facilities

---

## Development Backlog

The development backlog is organized according to implementation priority.

### Phase 1 – Core Foundation

1. Set up frontend, backend and database.
2. Implement role-based authentication.
3. Create basic database structure.

### Phase 2 – Core Patient Workflow

4. Build patient registration and search.
5. Create the longitudinal patient record.
6. Build structured intake forms.
7. Implement explainable digital triage.
8. Build appointment or queue management.
9. Create the consultation workflow.

### Phase 3 – Care Continuity

10. Implement referral creation and tracking.
11. Build high-risk follow-up management.
12. Connect all modules into one patient journey.

### Phase 4 – Supporting Features

13. Add diagnostic availability.
14. Add medicine availability.
15. Create the facility/admin dashboard.
16. Add offline workflow support.
17. Add multilingual support.

### Phase 5 – Final Preparation

18. Test the complete patient journey.
19. Fix critical issues.
20. Prepare demo data and screenshots.
21. Deploy the stable prototype.

## MVP Freeze Decision

The MVP is now focused on one complete and reliable patient journey.

### Final Demonstration Flow

Patient Login  
→ Patient Registration / Search  
→ Structured Intake  
→ Explainable Triage  
→ Appointment / Queue  
→ Consultation  
→ Referral  
→ Follow-up

Features marked as **MUST** will receive the highest development priority.

Features marked as **SHOULD** will be implemented after the core workflow is stable.

Features marked as **COULD** or **LATER** will not delay the completion of the core MVP.

---

## Conclusion

The project scope is frozen around a connected rural healthcare coordination workflow.

The main goal of the prototype is not to build a complete hospital management system, but to demonstrate how digital coordination can improve continuity of care across the patient journey.