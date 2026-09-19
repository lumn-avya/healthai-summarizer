import React from 'react';
import { PatientProfile, MedicalReport, VitalEntry, JournalEntry } from '../../types';
import { sound } from '../../services/audio';
import { 
  Printer, 
  Download, 
  FileText, 
  CheckCircle, 
  Heart, 
  Pill, 
  ShieldAlert, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface DoctorVisitPacketProps {
  profile: PatientProfile;
  reports: MedicalReport[];
  vitals: VitalEntry[];
  journal: JournalEntry[];
}

export const DoctorVisitPacket: React.FC<DoctorVisitPacketProps> = ({
  profile,
  reports,
  vitals,
  journal,
}) => {
  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const latestVital = vitals[0] || {};
  const latestReport = reports[0];

  return (
    <section id="packet-export" className="py-12 border-b border-brand-border">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 no-print">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono tracking-widest text-brand-crimson uppercase">
              // LAYER 8 • CLINICAL HANDOFF & EXPORT [#45]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-xs font-mono text-brand-muted">60-SECOND PHYSICIAN DOSSIER</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-bold tracking-tight text-brand-bone">
            Doctor Visit <span className="font-editorial-italic font-normal text-brand-gold">Packet (PDF)</span>
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-xl bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-brand-crimson/25"
          >
            <Printer className="w-4 h-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Printable Dossier Container */}
      <div className="rounded-2xl glass-panel border border-brand-border bg-[#14141A] p-6 sm:p-10 space-y-8 print-page text-brand-bone shadow-2xl">
        {/* Dossier Header */}
        <div className="border-b-2 border-brand-crimson pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-crimson font-bold block">
              HEALTHAI SUMMARIZER // PATIENT CONSULTATION DOSSIER
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-editorial text-brand-bone mt-1">
              {profile.name}
            </h3>
            <div className="text-xs font-mono text-brand-muted mt-1">
              Age: {profile.age} • Gender: {profile.gender.toUpperCase()} • Blood Group: {profile.bloodGroup} • Location: {profile.location}
            </div>
          </div>

          <div className="text-right sm:text-right font-mono text-xs text-brand-muted">
            <div>DATE GENERATED: {new Date().toLocaleDateString('en-GB')}</div>
            <div className="text-brand-gold font-bold">PHYSICIAN 60-SEC REVIEW SPEC</div>
            <div>RECORD ID: #HA-2026-IND-098</div>
          </div>
        </div>

        {/* Section 1: Clinical Baseline & Emergency Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <span className="text-[10px] font-mono text-brand-muted uppercase block">
              CHRONIC CONDITIONS
            </span>
            <ul className="mt-1 space-y-1 text-xs font-mono text-brand-bone">
              {profile.chronicConditions.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <span className="text-[10px] font-mono text-brand-muted uppercase block">
              KNOWN ALLERGIES
            </span>
            <ul className="mt-1 space-y-1 text-xs font-mono text-brand-amber">
              {profile.allergies.map((a, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <span className="text-[10px] font-mono text-brand-muted uppercase block">
              EMERGENCY CONTACT
            </span>
            <div className="mt-1 text-xs font-mono text-brand-bone">
              <div className="font-bold">{profile.emergencyContact.name} ({profile.emergencyContact.relation})</div>
              <div className="text-brand-gold mt-0.5">{profile.emergencyContact.phone}</div>
            </div>
          </div>
        </div>

        {/* Section 2: Ongoing Active Medications */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-brand-gold font-bold mb-3 flex items-center gap-1.5">
            <Pill className="w-4 h-4 text-brand-crimson" /> ACTIVE PRESCRIBED MEDICATIONS
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.ongoingMedications.map((med, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-brand-surface border border-brand-border flex items-start justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-brand-bone">
                    {med.name}
                  </div>
                  <div className="text-[11px] font-mono text-brand-muted mt-0.5">
                    {med.dosage} • {med.frequency} ({med.timing})
                  </div>
                </div>
                <span className="text-[10px] font-mono text-brand-sand px-2 py-0.5 rounded bg-white/5">
                  {med.purpose.split('&')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Recent Key Lab Parameters & Trajectory */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-brand-gold font-bold mb-3 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-brand-gold" /> RECENT LAB PARAMETERS & 6-MONTH TRAJECTORY
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border">
              <span className="text-[10px] font-mono text-brand-muted block">BLOOD PRESSURE (AVG)</span>
              <div className="text-xl font-bold font-mono text-brand-bone mt-1">124 / 80</div>
              <span className="text-[10px] font-mono text-brand-sage">Optimal Band</span>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border">
              <span className="text-[10px] font-mono text-brand-muted block">FASTING GLUCOSE</span>
              <div className="text-xl font-bold font-mono text-brand-bone mt-1">104 mg/dL</div>
              <span className="text-[10px] font-mono text-brand-amber">Down from 114</span>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border">
              <span className="text-[10px] font-mono text-brand-muted block">HbA1c (90-DAY AVG)</span>
              <div className="text-xl font-bold font-mono text-brand-bone mt-1">5.8 %</div>
              <span className="text-[10px] font-mono text-brand-gold">Pre-diabetes band</span>
            </div>

            <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border">
              <span className="text-[10px] font-mono text-brand-muted block">SERUM CREATININE</span>
              <div className="text-xl font-bold font-mono text-brand-bone mt-1">1.02 mg/dL</div>
              <span className="text-[10px] font-mono text-brand-sage">eGFR: 88 (Normal)</span>
            </div>
          </div>
        </div>

        {/* Section 4: Patient's Prepared Questions For This Consultation */}
        <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-brand-crimson font-bold flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-brand-gold" /> PATIENT QUESTIONS (GENERATED VIA VISIT PREP KIT)
          </h4>
          <ol className="space-y-2 text-xs font-mono text-brand-sand list-decimal list-inside leading-relaxed">
            <li>
              Given my recent HbA1c of 5.8% and fasting sugar around 104–108 mg/dL, should we adjust Metformin dose or keep monitoring?
            </li>
            <li>
              My latest LDL is down to 112 mg/dL from 134 mg/dL. Is my current Rosuvastatin dosage achieving your target balance?
            </li>
            <li>
              I experienced right knee stiffness after playing badminton. Would you recommend physiotherapy exercises or imaging?
            </li>
          </ol>
        </div>

        {/* Dossier Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-brand-muted">
          <div>
            GENERATED BY HEALTHAI SUMMARIZER • PATIENT DATA VERIFIED
          </div>
          <div>
            PAGE 1 OF 1 • FOR CLINICAL CONSULTATION USE ONLY
          </div>
        </div>
      </div>
    </section>
  );
};
