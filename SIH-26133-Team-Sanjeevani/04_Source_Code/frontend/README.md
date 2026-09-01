# Sanjeevani – Connected Rural Healthcare Coordination Platform

## Overview
Sanjeevani is a role-based healthcare coordination prototype designed to improve continuity of care in rural settings. It connects patients, frontline healthcare workers, doctors and administrators through one coordinated workflow.

## Implemented Prototype Features
- Patient, ASHA, ANM, Doctor and Administrator role-based interfaces
- Patient registration and health record management
- Symptom and vital recording
- Triage and priority support
- Consultation and teleconsultation workflow
- Referral creation and status tracking
- Follow-up reminders and outcome tracking
- Voice-assisted interaction
- English, Hindi and Marathi interface support
- Local demo data and browser-based state persistence

## Technology Used in the Prototype
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons
- Browser speech features for voice interaction
- Local browser storage for prototype data

## Run Locally
### Prerequisites
- Node.js (recommended: current LTS version)
- npm

### Steps
```bash
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Environment Variables
Copy `.env.example` to `.env.local` if AI API features are configured for your environment. Do not commit real API keys.

## Important Prototype Scope Note
This source code is an MVP/prototype. Its current demo state is primarily maintained through seed data and browser storage. The proposed production architecture may include dedicated backend APIs, databases, secure authentication, offline synchronization and healthcare-system integrations; those components should not be considered implemented unless explicitly added to the source code.

## Project Identity
- **Project Name:** Sanjeevani
- **Team Name:** Sanjeevani
- **SIH Problem Code:** 26133

## Folder Structure
```text
src/
├── components/       # Role portals and UI components
├── context/          # Application state
├── data/             # Demo seed data
├── utils/            # Triage utilities
├── translations.ts   # Multilingual text
├── types.ts          # Shared TypeScript types
└── App.tsx           # Application entry flow
```
