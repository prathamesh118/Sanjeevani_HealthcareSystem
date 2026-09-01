# Use Case, Workflow and System Architecture

## SIH Problem Statement ID

26133

---

## Purpose

This document defines the main system use cases, proposed healthcare workflow and high-level system architecture for the rural healthcare coordination platform.

The design is based on the finalized MVP requirements and focuses on supporting one connected patient journey from registration to follow-up.

---

## Main System Use Cases

The proposed system supports the following main use cases.

### 1. User Authentication

Users log in to access the system according to their assigned role.

**Actors:**

- Frontline Healthcare Worker
- Doctor
- Administrator

---

### 2. Patient Registration and Search

The frontline healthcare worker can:

- Register a new patient.
- Search for an existing patient.
- View the patient profile.

---

### 3. Structured Intake and Triage

The frontline healthcare worker can:

- Enter patient symptoms.
- Record basic health information.
- Submit structured intake data.
- View the generated patient priority result.

---

### 4. Consultation

The doctor can:

- View the patient record.
- Review intake and triage information.
- Record consultation details.
- Add care recommendations.
- Create a referral when required.

---

### 5. Referral Management

Authorized healthcare users can:

- Create a referral.
- Select a destination facility or service.
- Track referral status.
- Record referral completion.

---

### 6. Follow-Up Management

The frontline healthcare worker can:

- View pending follow-ups.
- Identify high-risk patients.
- Record follow-up outcomes.
- Update follow-up status.

---

### 7. Facility Monitoring

The administrator can:

- Monitor patient activity.
- View referral status.
- Monitor pending follow-ups.
- Review diagnostic and medicine availability.
- View important workflow indicators.

---


## Proposed Patient Workflow

The proposed system connects the major stages of the patient healthcare journey into one continuous workflow.

### Step 1 – User Login

An authorized healthcare worker, doctor or administrator logs into the system.

The system provides access based on the user's role.

---

### Step 2 – Patient Registration or Search

The frontline healthcare worker searches for an existing patient.

If the patient does not already exist, a new patient record is created.

---

### Step 3 – Structured Intake

The healthcare worker records structured patient information, including:

- Symptoms
- Basic health information
- Relevant patient details

The collected information becomes part of the patient record.

---

### Step 4 – Explainable Triage

The system processes the structured intake information and generates a patient priority level.

The result includes a clear explanation of the important factors influencing the priority.

---

### Step 5 – Appointment or Queue

The patient is added to an appointment or consultation queue based on the workflow.

The patient status can be updated as the patient moves through the healthcare process.

---

### Step 6 – Doctor Consultation

The doctor reviews:

- Patient information
- Previous healthcare history
- Structured intake
- Triage result

The doctor records consultation details and care recommendations.

---

### Step 7 – Referral

If additional or specialized care is required, a referral is created.

The referral includes the destination facility or service and its current status.

---

### Step 8 – Follow-Up

Important and high-risk patients are added to a follow-up workflow.

Healthcare workers can monitor pending follow-ups and record the outcome.

---

## Workflow Goal

The goal of the workflow is to ensure that the patient journey does not end after consultation or referral.

Each major stage is connected to support better continuity of care.

---

## High-Level System Architecture

The proposed system follows a modular architecture that separates the user interface, application logic and data storage.

### 1. Presentation Layer

The presentation layer provides interfaces for different users.

Main users include:

- Frontline Healthcare Worker
- Doctor
- Administrator

The interface supports activities such as patient registration, intake, triage, consultation, referral and follow-up.

---

### 2. Application Layer

The application layer manages the core business logic of the platform.

Main modules include:

- Authentication and role management
- Patient management
- Structured intake
- Explainable triage
- Appointment or queue management
- Consultation management
- Referral management
- Follow-up management
- Resource availability management
- Dashboard and reporting

---

### 3. Data Layer

The data layer stores and manages the information required by the system.

The main data entities include:

- Users
- Roles
- Patients
- Patient visits
- Intake records
- Triage results
- Consultations
- Referrals
- Follow-ups
- Facility resources

---

### 4. AI / Decision Support Layer

The AI or decision support layer supports the explainable triage workflow.

Its role is to:

- Process structured patient information.
- Identify important risk indicators.
- Generate a priority or risk result.
- Provide visible reasons supporting the result.

The AI component is designed to support healthcare decision-making and does not replace professional medical judgment.

---

### 5. Integration and Connectivity Layer

The system architecture supports communication between application modules and future external services.

This layer can support:

- API communication
- Future healthcare system integration
- Diagnostic information integration
- Medicine availability updates
- Synchronization for low-connectivity environments

---

## Architecture Flow

The overall information flow can be represented as:

```text
Users
  ↓
Presentation Layer
  ↓
Application Layer
  ├── Authentication
  ├── Patient Management
  ├── Intake and Triage
  ├── Consultation
  ├── Referral
  └── Follow-Up
  ↓
AI / Decision Support
  ↓
Data Layer
  ↓
Integration and Connectivity Services
