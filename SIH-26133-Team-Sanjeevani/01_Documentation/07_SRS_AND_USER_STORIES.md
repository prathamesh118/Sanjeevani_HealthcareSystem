# Software Requirements Specification (SRS) and User Stories

## SIH Problem Statement ID

26133

---

## Purpose

This document defines the functional and non-functional requirements for the Minimum Viable Product (MVP) of the rural healthcare coordination platform.

It also defines the main user stories and acceptance criteria for the core system workflows.

The requirements are based on the finalized MVP scope and are intended to guide system design and development.

---

## System Users

The MVP supports the following main user roles:

### 1. Patient

The patient receives healthcare services and moves through the care journey.

Main interactions:

- Registration
- Consultation
- Referral
- Follow-up

---

### 2. Frontline Healthcare Worker

The frontline healthcare worker assists patients and manages early stages of the healthcare workflow.

Main interactions:

- Patient registration
- Patient information collection
- Structured intake
- Basic triage support
- Follow-up coordination

---

### 3. Doctor

The doctor reviews patient information and provides consultation.

Main interactions:

- View patient record
- Review intake and triage information
- Record consultation details
- Provide care recommendations
- Create referrals when required

---

### 4. Healthcare Facility / Administrator

The administrator monitors healthcare workflow and facility-level information.

Main interactions:

- Monitor patient activity
- View referral status
- Monitor follow-ups
- View diagnostic availability
- View medicine availability
- Review important workflow indicators

---

## Functional Requirements

### FR1 – Authentication and Role-Based Access

The system shall allow users to log in based on their assigned role.

The system shall provide role-based access to relevant features.

---

### FR2 – Patient Registration and Search

The system shall allow authorized users to:

- Register a new patient.
- Search for an existing patient.
- View patient details.
- Avoid duplicate patient records where possible.

---

### FR3 – Longitudinal Patient Record

The system shall maintain a connected patient record containing relevant information from different stages of the patient journey.

The record may include:

- Basic patient information.
- Previous visits.
- Intake information.
- Consultation details.
- Referrals.
- Follow-up information.

---

### FR4 – Structured Intake

The system shall allow healthcare workers to collect structured patient information, including symptoms and basic health details.

---

### FR5 – Explainable Digital Triage

The system shall provide a patient priority or risk result based on the collected information.

The system shall also display the main reason or factors supporting the result.

---

### FR6 – Appointment and Queue Management

The system shall allow patients to be added to an appointment or consultation queue.

The system shall support patient status updates during the workflow.

---

### FR7 – Consultation Workflow

The system shall allow doctors to:

- View the patient record.
- Review intake and triage information.
- Record consultation details.
- Add care recommendations.
- Initiate a referral when required.

---

### FR8 – Referral Tracking

The system shall allow authorized users to:

- Create a referral.
- Select the destination facility or service.
- Track referral status.
- Record referral completion.

---

### FR9 – High-Risk Follow-Up

The system shall support follow-up management for important or high-risk patients.

The system shall allow users to:

- Create follow-up tasks.
- View pending or overdue follow-ups.
- Record follow-up completion.

---

### FR10 – Diagnostic and Medicine Availability

The system should provide visibility into:

- Diagnostic availability.
- Medicine availability.
- Facility-level resource status.

---

### FR11 – Facility and Administrative Monitoring

The system should provide a dashboard showing important workflow information, such as:

- Patient activity.
- Referral status.
- Follow-up status.
- Important pending cases.
- Resource availability.

---

## Non-Functional Requirements

### NFR1 – Usability

The system should provide a simple and easy-to-understand interface suitable for users with different levels of digital literacy.

---

### NFR2 – Performance

Core system operations should respond within a reasonable time under normal usage conditions.

---

### NFR3 – Security

The system should protect user accounts and restrict access based on authorized roles.

Sensitive information should only be accessible to authorized users.

---

### NFR4 – Privacy

The system should collect and display only the information required for the intended healthcare workflow.

Patient information should be handled responsibly within the prototype.

---

### NFR5 – Reliability

The core patient journey should work consistently without breaking the workflow.

---

### NFR6 – Low-Connectivity Support

The system should support important workflows in environments with limited or unstable internet connectivity where feasible.

---

### NFR7 – Accessibility

The interface should use clear language, readable text and simple interactions.

Multilingual support may be provided for important screens.

---

## User Stories and Acceptance Criteria

### US1 – Patient Registration

**As a frontline healthcare worker, I want to register or search for a patient so that the patient can continue through the healthcare workflow.**

**Acceptance Criteria:**

- A new patient can be registered.
- An existing patient can be searched.
- Patient details can be viewed after registration or search.

---

### US2 – Structured Intake and Triage

**As a frontline healthcare worker, I want to collect patient symptoms and basic information so that the patient can receive an appropriate priority level.**

**Acceptance Criteria:**

- Symptoms and basic information can be entered.
- A priority or risk result is generated.
- The reason for the result is visible.

---

### US3 – Doctor Consultation

**As a doctor, I want to view the patient record and record consultation details so that appropriate care can be provided.**

**Acceptance Criteria:**

- The doctor can view relevant patient information.
- Intake and triage information is visible.
- Consultation details can be recorded.
- Care recommendations can be added.

---

### US4 – Referral Tracking

**As a healthcare provider, I want to create and track referrals so that patients do not get lost between healthcare facilities.**

**Acceptance Criteria:**

- A referral can be created.
- Referral status is visible.
- Referral completion can be recorded.

---

### US5 – High-Risk Follow-Up

**As a frontline healthcare worker, I want to view pending high-risk follow-ups so that important patients receive continued care.**

**Acceptance Criteria:**

- Pending follow-ups are visible.
- Follow-up status can be updated.
- Completed follow-ups are recorded.

---

## Scope Summary

The SRS defines the requirements for the MVP of the rural healthcare coordination platform.

The primary focus is to demonstrate the following connected workflow:

Patient Registration  
→ Structured Intake  
→ Explainable Triage  
→ Appointment / Queue  
→ Consultation  
→ Referral  
→ Follow-up

Supporting features such as diagnostic availability, medicine availability, dashboards, offline support and multilingual support will be implemented based on development time and prototype requirements.

---

## Conclusion

This SRS and user story document provides the functional direction for designing and developing the SIH prototype.

The requirements focus on creating a practical and connected healthcare coordination workflow rather than a complete hospital management system.

The document will be used as a reference for system architecture, database design, UI/UX design and application development.