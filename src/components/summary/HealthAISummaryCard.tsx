import React, { useState } from 'react';
import { speakText, stopSpeaking } from '../../services/i18n';
import { sound } from '../../services/audio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  PhoneCall
} from 'lucide-react';

interface HealthAISummaryCardProps {
  onNavigateToPrepKit?: () => void;
}

export const HealthAISummaryCard: React.FC<HealthAISummaryCardProps> = ({
  onNavigateToPrepKit,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fullSummaryText = `HealthAI Holistic Summary for Aarav Sharma: Your overall health profile remains stable and well-managed. Blood pressure averages 124 over 80 millimeters of mercury, indicating effective daily response to Telmisartan. Your three-month blood sugar average, HbA1c, is currently 5.8 percent, demonstrating a positive downward trend from 6.2 percent earlier this year. LDL cholesterol has reduced significantly to 112 milligrams per deciliter with Rosuvastatin. Kidney filtration markers confirm safe renal function. Your lumbar spine MRI shows expected mild cushion dehydration at L4-L5 without nerve compression. Suggested next steps: continue moderate physical activity like badminton, maintain current morning medications, and bring your prepared question checklist to your upcoming cardiology review.`;

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      sound.playClick();
      setIsSpeaking(true);
      speakText(fullSummaryText);
      setTimeout(() => setIsSpeaking(false), 24000);
    }
  };

  return (
    <section id="summary" className="py-12 border-b border-brand-border">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono tracking-widest text-brand-crimson uppercase">
              // LAYER 7 • INTELLIGENCE & SAFETY LAYER [#33, #35, #36, #37, #38]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-xs font-mono text-brand-muted">SAFETY-GUARDED AI SYNTHESIS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-bold tracking-tight text-brand-bone">
            AI-Generated <span className="font-editorial-italic font-normal text-brand-gold">Health Summary</span>
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={handleToggleSpeak}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
              isSpeaking
                ? 'bg-brand-crimson text-white border-brand-crimson animate-pulse'
                : 'bg-white/5 border-white/10 text-brand-sand hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-gold" />}
            <span>{isSpeaking ? 'Mute Audio' : 'Listen To Summary'}</span>
          </button>
        </div>
      </div>

      {/* Main Narrative Card */}
      <div className="rounded-2xl glass-panel border border-brand-border bg-[#121217] p-6 sm:p-8 space-y-8 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-crimson font-bold uppercase mb-2">
            <Sparkles className="w-4 h-4" /> COMPREHENSIVE PATIENT COMPANION SYNTHESIS
          </div>
          <p className="text-base sm:text-lg text-brand-bone font-serif leading-relaxed italic">
            "Your overall health profile remains stable and reassuringly well-managed. Blood pressure averages 124/80 mmHg, showing optimal response to your morning Telmisartan. Your 3-month blood sugar average (HbA1c 5.8%) continues its favorable downward slope from 6.2%, confirming pre-diabetes control. Your lipid profile shows significant LDL reduction to 112 mg/dL on Rosuvastatin, while kidney filtration markers remain within safe normal limits."
          </p>
        </div>

        {/* 7.2 Key Findings Highlights Cards */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-4">
            KEY CLINICAL FINDINGS (LAYMAN HIGHLIGHTS) [#35]
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sage font-bold uppercase mb-1">
                <CheckCircle2 className="w-4 h-4" /> CARDIOVASCULAR STABILITY
              </div>
              <p className="text-xs text-brand-sand leading-relaxed">
                Home vitals confirm resting systolic pressures consistently between 121 and 128 mmHg. No concerning arrhythmias or dizziness reported.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-gold font-bold uppercase mb-1">
                <CheckCircle2 className="w-4 h-4" /> PRE-DIABETES IMPROVEMENT
              </div>
              <p className="text-xs text-brand-sand leading-relaxed">
                HbA1c lowered from 6.2% in February to 5.8% in August. Fasting glucose is comfortably holding near 104–108 mg/dL.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sand font-bold uppercase mb-1">
                <CheckCircle2 className="w-4 h-4" /> MUSCULOSKELETAL BASELINE
              </div>
              <p className="text-xs text-brand-sand leading-relaxed">
                L4-L5 lumbar scan reflects natural wear-and-tear cushion hydration changes without nerve compression. Safe for core exercises.
              </p>
            </div>
          </div>
        </div>

        {/* 7.3 Suggested Next Steps */}
        <div className="p-5 rounded-xl bg-brand-surface border border-white/5 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-brand-gold font-bold flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> SUGGESTED NEXT STEPS FOR YOUR NEXT CLINICAL VISIT [#36]
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-brand-sand">
            <li className="flex items-start gap-2">
              <span className="text-brand-gold mt-1">›</span>
              <span>Review your 90-day HbA1c drop with Dr. Raghavan to confirm ongoing dietary targets.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-gold mt-1">›</span>
              <span>Discuss low-impact knee exercises or quad strengthening before resuming competitive badminton.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-gold mt-1">›</span>
              <span>Export your complete 60-Second Doctor Visit Packet to bring as a hard copy or PDF to your clinic appointment.</span>
            </li>
          </ul>
        </div>

        {/* 7.4 Safety Guardrail Banner */}
        <div className="p-4 rounded-xl bg-brand-crimson/10 border border-brand-crimson/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
            <div className="text-brand-sand leading-relaxed">
              <strong>Layman Safety Protocol (Rule 7.4):</strong> HealthAI Summarizer never provides diagnostic determinations, never prescribes dosages, and advises consulting your verified physician for any medication changes.
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-brand-crimson font-bold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency: Dial 112 / 108</span>
          </div>
        </div>
      </div>
    </section>
  );
};
