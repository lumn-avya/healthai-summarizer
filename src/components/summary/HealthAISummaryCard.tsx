import React, { useState } from 'react';
import { speakText, stopSpeaking } from '../../services/i18n';
import { sound } from '../../services/audio';
import { Sparkles, Volume2, VolumeX, CheckCircle2, ShieldCheck, ClipboardList, PhoneCall } from 'lucide-react';

interface HealthAISummaryCardProps {
  onNavigateToPrepKit?: () => void;
}

export const HealthAISummaryCard: React.FC<HealthAISummaryCardProps> = ({
  onNavigateToPrepKit,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const fullSummaryText = `HealthAI Holistic Summary for Aarav Sharma: Your overall health profile remains stable and well-managed. Blood pressure averages 124 over 80 millimeters of mercury, indicating steady and effective control with current medications. Recent clinical readings show consistent cardiovascular stability, improved fasting glucose trends, and reassuring renal function. Continue to manage your day-to-day rhythm, monitor changes, and discuss any symptoms with your physician at follow-up.`;

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

      <div className="rounded-2xl glass-panel border border-brand-border bg-[#121217] p-6 sm:p-8 space-y-8 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-crimson font-bold uppercase mb-2">
            <Sparkles className="w-4 h-4" /> COMPREHENSIVE PATIENT COMPANION SYNTHESIS
          </div>
          <p className="text-base sm:text-lg text-brand-bone font-serif leading-relaxed italic">
            "Your overall health profile remains stable and reassuringly well-managed. Blood pressure averages 124/80 mmHg, showing optimal response to your current medication plan. Recent clinical readings point to consistent cardiovascular stability, improving metabolic markers, and reassuring kidney function. Continued self-monitoring and follow-up discussions remain the right way to sustain this progress."
          </p>
        </div>

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
                Recent readings confirm resting systolic pressures consistently between 121 and 128 mmHg, with no concerning rhythm or dizziness reported.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-gold font-bold uppercase mb-1">
                <CheckCircle2 className="w-4 h-4" /> PRE-DIABETES IMPROVEMENT
              </div>
              <p className="text-xs text-brand-sand leading-relaxed">
                HbA1c lowered from 6.2% in February to 5.8% in August. Fasting glucose remains comfortable near 104–108 mg/dL.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-sand font-bold uppercase mb-1">
                <CheckCircle2 className="w-4 h-4" /> MUSCULOSKELETAL BASELINE
              </div>
              <p className="text-xs text-brand-sand leading-relaxed">
                The current imaging review reflects stable lower-back findings without significant nerve compression or acute worsening.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-brand-surface border border-white/5 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-brand-gold font-bold flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> SUGGESTED NEXT STEPS FOR YOUR NEXT CLINICAL VISIT [#36]
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-brand-sand">
            <li className="flex items-start gap-2">
              <span className="text-brand-gold mt-1">›</span>
              <span>Review your 90-day HbA1c drop with your doctor to confirm ongoing dietary targets.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-gold mt-1">›</span>
              <span>Discuss low-impact exercise and recovery planning before resuming more intense activity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-gold mt-1">›</span>
              <span>Bring your recent labs and symptom notes to the next visit so the conversation stays organized and focused.</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-brand-crimson/10 border border-brand-crimson/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
            <div className="text-brand-sand leading-relaxed">
              <strong>Layman Safety Protocol (Rule 7.4):</strong> HealthAI Summarizer never provides diagnostic determinations, never prescribes dosages, and advises consulting your verified physician for any treatment decisions.
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
