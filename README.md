# HealthAI Summarizer — Patient Health Companion

An editorial, non-generic, high-performance patient health companion inspired by the visual language, physics, and typography of [charlesleclerc.com](https://charlesleclerc.com/en/).

---

## Design System: Non-Generic Editorial Luxury (Charles Leclerc Inspired)

- **Color Palette**: Replaces generic AI cyan/purple/blue gradients with **Obsidian Black (`#0A0A0C`)**, **Warm Alabaster White (`#FBFBFA`)**, **Rosso Corsa Crimson (`#E10600`)**, and **Polished Champagne Gold (`#D4AF37`)**.
- **Typography**: High-contrast editorial display serif (`Playfair Display`), grotesque sans (`Syne`, `Plus Jakarta Sans`), and monospaced telemetry data readouts (`JetBrains Mono`).
- **Motion & Audio**: Real-time Web Audio API synthesized tactile acoustic clicks and organ harmonic chimes, paired with smooth inertia scroll physics.
- **3D Interactive WebGL Anatomy**: Real-time Three.js 3D human mannequin (male / female selectable) with pulsing heartbeat vitals, glowing anatomical organs (Brain, Heart, Lungs, Liver, Kidneys, Stomach, Spine, Knees/Joints), and live symptom-to-organ camera auto-orbiting.

---

## 9-Layer Architecture & Feature Matrix

### Layer 1: Report & Document Intake
- **1.1 PDF Report Upload [#1]**: Up to 50MB, digital and scanned lab reports.
- **1.2 Phone Camera Photo Upload [#2]**: PNG/JPG camera shots with multi-page batch stitching.
- **1.3 Multilingual OCR Text Extraction [#3]**: Tolerates glare, blur, and skewed angles gracefully with raw preview.
- **1.4 Automatic 5-Category Classification [#4]**: Blood Test, Scan/X-ray/MRI, Doctor's Prescription, Referral Letter, Other Report (with 1-tap manual re-tagging).
- **Instant Test Presets**: Preloaded sample CBC Blood Work, Lipid Panel photo, and Lumbar Spine MRI.

### Layer 1.5: Research & Discovery Layer
- **RD-5: 3D Interactive Anatomy Model (Flagship Feature)**: Real-time rotatable, zoomable Three.js human body with interactive organ inspection, pulsating vitals, and organ-to-specialist links.
- **RD-4: Specialist Locator**: Surfaces accredited specialists/clinics mapped directly to symptoms and organs. Deliberately avoids "best doctor" rankings or diagnostic referrals.
- **RD-3: Medical Chatbot (Patient Assistant)**: Strictly grounded in patient's stored data, plain-language jargon translation, strict layman safety guardrails, and Web Speech API voice synthesis.
- **RD-2: Multilingual Support (All Indian Languages)**: Instant UI localization across English, Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Punjabi (ਪੰਜਾਬੀ), and Odia (ଓଡ଼ିଆ).
- **RD-1: Doctor Visit Prep Kit**: 4-step guided wizard that generates a laser-focused, printable question checklist for your physician.

### Layer 2: Health Data Snapshot
- **2.1 Automated Parameter Extraction [#6]**: Fasting Glucose, HbA1c, BP, Total Cholesterol, LDL, HDL, Serum Creatinine, Hemoglobin, WBC, etc.
- **2.2 Parameter Validation [#7]**: Calm, non-alarming green/amber/crimson flags with layman explanations.
- **2.3 "My Health" Dashboard [#12]**: Patient's personal command center with live telemetry and quick navigation tiles.
- **2.4 Health History Timeline [#13]**: Expandable document summaries and chronological records.

### Layer 3: Personal Profile & Unified Life Timeline
- **3.1 My Health Profile [#12]**: Demographics, verified allergies, chronic conditions, ongoing medications with schedules and dosages.
- **3.2 Unified Life Timeline [#13 + #18]**: Merges lab reports, home vitals logs, and journal entries into ONE living chronological stream with source filters.

### Layer 4: Home Vitals Tracker & Symptom Journal
- **4.1 Home Vitals Tracker [#15]**: Structured tracking for BP, Blood Glucose (Fasting/PP), Weight, Heart Rate, SpO2, Temperature.
- **4.2 Photo Monitor OCR [#16]**: Simulated camera OCR capture from Omron / Accu-Chek device screens.
- **4.3 Symptom & Wellness Journal [#17]**: 0-10 severity slider, medication adherence tracker, lifestyle context tags (Poor Sleep, Stress, Travel, Diet Change, Exercise).

### Layer 5: Time-Series Health Analysis & Insights
- **Trend Detection [#20] & Anomaly Detection [#22]**: Tracks multi-month trajectories (e.g. HbA1c downward trend from 6.2% to 5.8%, flight stress BP spike).
- **Interactive Multi-Range Visualizations [#24, #25]**: Recharts graphs with healthy target reference bands and cross-metric correlations.

### Layer 6: Gentle Alerts & Notification Center
- **Automatic Alert Generation [#28] & Notification Center [#29]**: Calm, non-alarmist notifications, checkup reminders, and adherence milestones.

### Layer 7: Intelligence Layer & Safety Protocols
- **AI-Generated Health Summary [#33]**: Plain-language narrative synthesis.
- **Key Findings Highlights [#35] & Suggested Next Steps [#36]**.
- **Safety Prompt Engineering [#37]**: Strict non-diagnostic safety boundary and emergency hotline callouts.

### Layer 8: Doctor Visit Packet Export
- **Printable 60-Second Physician Dossier [#45]**: High-density 1-page/multi-page printable layout designed for a physician to digest history, medications, trends, and questions in 60 seconds.

### Layer 9: Platform Health & Foundation
- Composite indexed client data store with sub-50ms query latency, input sanitization, and graceful failure paths.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
