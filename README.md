# 🏥 Sanjeevani

### Connected • Accessible • Intelligent Healthcare

<p align="center">
  <b>
    A healthcare coordination and patient care support solution that connects
    patients, frontline healthcare workers, doctors and health administrators
    throughout the patient care journey.
  </b>
</p>

<p align="center">

![Domain](https://img.shields.io/badge/Domain-Healthcare-blue)
![SIH](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange)
![Project](https://img.shields.io/badge/Project-Sanjeevani-success)
![Status](https://img.shields.io/badge/Status-Prototype-purple)

</p>

---

# 📌 Table of Contents

- [About Sanjeevani](#about-sanjeevani)
- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [How Sanjeevani Works](#how-sanjeevani-works)
- [Users of the System](#users-of-the-system)
- [AI-Assisted Care Support](#ai-assisted-care-support)
- [Offline and Voice Accessibility](#offline-and-voice-accessibility)
- [Impact](#impact)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Future Scope](#future-scope)
- [Team Sanjeevani](#team-sanjeevani)

---

# 🩺 About Sanjeevani

**Sanjeevani** is a healthcare coordination and patient care support solution designed to improve the continuity of care from the first patient interaction to the final treatment outcome.

The system connects different stages of the healthcare journey:

> **Registration → Symptoms & Vitals → AI Priority Support → Professional Review → Treatment / Referral → Follow-up → Outcome**

Sanjeevani is designed around the challenges faced when healthcare information, referrals and follow-ups are disconnected.

The solution provides a structured workflow for healthcare coordination while ensuring that **healthcare professionals remain responsible for final clinical decisions**.

---

# ⚠️ The Problem

Healthcare delivery can face several challenges that affect patient access and continuity of care.

## 📄 Scattered Patient Records

Patient information may be distributed across different records or facilities, making it difficult for authorized healthcare providers to understand the complete patient journey.

## 🔄 Lost or Untracked Referrals

Patients referred for specialist care may face delays or referrals may not be properly tracked until the final outcome.

## 🌐 Connectivity Challenges

Poor or unstable internet connectivity can interrupt access to digital healthcare services, particularly in low-connectivity areas.

## 🗣️ Language and Accessibility Barriers

Different languages, accents and levels of digital literacy can make digital healthcare systems difficult for some users to access.

## 📅 Missed Follow-ups

Patients may miss follow-up appointments or fail to receive timely outreach after consultation or treatment.

## 🧠 Limited Decision Support

Healthcare workers may need support in identifying and prioritizing patients based on symptoms and available health information.

---

# 💡 Our Solution

Sanjeevani provides a connected healthcare workflow that helps manage the patient journey from registration to outcome.

The solution supports:

- 👤 Patient registration and information management
- ❤️ Recording symptoms and vitals
- 🌐 Offline data handling
- 🔄 Secure synchronization when connectivity returns
- 🤖 AI-assisted priority suggestions
- 🩺 Healthcare professional review
- ⚠️ Emergency identification and escalation
- 💊 Local treatment support
- 🏥 Specialist referral management
- 🔄 Referral tracking
- 📅 Follow-up scheduling
- 🔔 Patient reminders and outreach
- 🎙️ Voice-assisted interaction
- 🗣️ Multilingual accessibility
- 📋 Connected patient care history

---

# ✨ Key Features

## 👤 Patient Registration

Healthcare workers can register patients and create a structured starting point for the patient's care journey.

The system supports the recording of relevant patient information required for further healthcare coordination.

---

## ❤️ Symptoms and Vitals Recording

Healthcare workers can record important patient information such as:

- Symptoms
- Basic health details
- Vitals
- Relevant observations

This information supports further review and patient prioritization.

---

## 🌐 Offline-First Support

Sanjeevani is designed to support workflows in areas with limited connectivity.

When internet connectivity is unavailable:

> **Data can be stored locally and synchronized when connectivity is restored.**

This helps reduce interruptions during important healthcare activities.

---

## 🤖 AI-Assisted Priority Support

The system uses AI as a **decision-support mechanism**.

Available patient information can be analyzed to provide:

- Priority suggestions
- Risk-related indications
- Triage support
- Explainable assistance

However:

> **AI does not make the final clinical decision. Healthcare professionals review the information and make the final decision.**

---

## ⚠️ Emergency Identification

When emergency warning signs are identified, the workflow supports:

- Emergency escalation
- Immediate referral or emergency care
- Recording of the emergency outcome
- Follow-up scheduling when required

---

## 🩺 Healthcare Professional Review

Doctors and healthcare professionals can review:

- Patient information
- Symptoms
- Vitals
- Available patient history
- AI-supported priority suggestions

The final treatment and clinical decision remains under the responsibility of the healthcare professional.

---

## 🏥 Referral Management

If specialist care is required, Sanjeevani supports the referral process.

The workflow can include:

> **Create Referral → Specialist Consultation → Return Care Plan**

This helps maintain continuity between healthcare providers.

---

## 🔄 Referral Tracking

Sanjeevani focuses on tracking referrals throughout the healthcare journey.

The system supports visibility from:

> **Referral Creation → Assignment → Consultation → Outcome**

This helps reduce the possibility of referrals being lost or forgotten.

---

## 📅 Follow-up Management

After treatment or referral, the system supports:

- Follow-up scheduling
- Follow-up tracking
- Pending follow-up identification
- Outcome recording

If follow-up is incomplete, the system can support:

- Reminders
- Healthcare worker outreach

---

## 🎙️ Voice Assistance

Voice assistance is included to make the system easier to use.

It can support:

- Voice-guided interaction
- Easier navigation
- Improved accessibility
- Support for users with limited digital literacy

The feature is particularly useful for making healthcare interaction simpler and more inclusive.

---

## 🗣️ Multilingual Accessibility

Sanjeevani is designed with accessibility in mind.

The solution aims to support:

- Simple interaction
- Voice guidance
- Regional language accessibility
- Easier digital healthcare interaction

---

# 🔄 How Sanjeevani Works

```text
PATIENT
   │
   ▼
REGISTRATION
   │
   ▼
SYMPTOMS & VITALS
   │
   ▼
CONNECTIVITY CHECK
   │
   ├── No Internet
   │       │
   │       ▼
   │   STORE OFFLINE
   │       │
   │       ▼
   │   SYNC WHEN ONLINE
   │
   ▼
AI TRIAGE & PRIORITY
   │
   ▼
HEALTHCARE PROFESSIONAL REVIEW
   │
   ▼
┌───────────────────────┐
│ Clinical Decision     │
└───────────┬───────────┘
            │
     ┌──────┴──────┐
     ▼             ▼
LOCAL CARE      REFERRAL
     │             │
     └──────┬──────┘
            ▼
       FOLLOW-UP
            │
            ▼
     RECORD OUTCOME
            │
            ▼
           END
