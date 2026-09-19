import React, { useState } from 'react';
import { AnatomyOrgan, IndianLanguage } from '../../types';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  ClipboardCheck, 
  Sparkles, 
  Printer, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Check, 
  HelpCircle,
  Stethoscope,
  Share2
} from 'lucide-react';

interface DoctorVisitPrepKitProps {
  initialOrgan?: AnatomyOrgan | null;
  language: IndianLanguage;
  onNavigateToPrint?: () => void;
}

export const DoctorVisitPrepKit: React.FC<DoctorVisitPrepKitProps> = ({
  initialOrgan,
  language,
  onNavigateToPrint,
}) => {
  const t = getTranslation(language);
  const [step, setStep] = useState<number>(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    initialOrgan ? initialOrgan.commonSymptoms.slice(0, 2) : ['Mild afternoon fatigue', 'Right knee stiffness']
  );
  const [customSymptom, setCustomSymptom] = useState('');
  const [duration, setDuration] = useState('About 2 to 3 weeks');
  const [progression, setProgression] = useState('Happens mostly after badminton or long desk sitting');
  const [changesObserved, setChangesObserved] = useState('Fasting sugar dropped slightly to 108 mg/dL; BP steady at 124/80');
  const [medConcerns, setMedConcerns] = useState('Taking Telmisartan 40mg and Rosuvastatin 10mg. No noticeable dizzy spells.');

  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([
    'Given my recent HbA1c of 5.8% and fasting sugar around 108 mg/dL, should we adjust my Metformin dose or keep monitoring?',
    'My latest LDL is down to 112 mg/dL from 134 mg/dL. Is my current Rosuvastatin dosage achieving your target balance?',
    'I experienced right knee stiffness after playing badminton. Would you recommend physiotherapy exercises or imaging?',
    'Are there any specific side effects or annual lab checks I should keep in mind with long-term Telmisartan?'
  ]);

  const [customQuestion, setCustomQuestion] = useState('');

  const handleAddSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      sound.playClick();
      setSelectedSymptoms([...selectedSymptoms, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    sound.playClick();
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
  };

  const handleAddQuestion = () => {
    if (customQuestion.trim()) {
      sound.playClick();
      setGeneratedQuestions([...generatedQuestions, customQuestion.trim()]);
      setCustomQuestion('');
    }
  };

  const handleRemoveQuestion = (idx: number) => {
    sound.playClick();
    setGeneratedQuestions(generatedQuestions.filter((_, i) => i !== idx));
  };

  const handleGenerateQuestions = () => {
    sound.playOrganSelect();
    const newQs: string[] = [];

    if (selectedSymptoms.some((s) => s.toLowerCase().includes('knee') || s.toLowerCase().includes('back') || s.toLowerCase().includes('joint'))) {
      newQs.push('What specific stretches or low-impact activities are safest for my joints right now?');
    }
    if (selectedSymptoms.some((s) => s.toLowerCase().includes('chest') || s.toLowerCase().includes('bp') || s.toLowerCase().includes('breath'))) {
      newQs.push('My home blood pressure averages 124/80. Is this within your comfort target for my age profile?');
    }
    newQs.push('Based on my full recent lab panel, what single preventive priority should I focus on for the next 3 months?');

    setGeneratedQuestions(Array.from(new Set([...generatedQuestions, ...newQs])));
    setStep(4);
  };

  return (
    <section id="prep-kit" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// DOCTOR VISIT PREP KIT [RD-1]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">PATIENT EMPOWERMENT WIZARD</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.prepKitTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.prepKitHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.prepKitSubtitle}
        </p>
      </div>

      {/* 4-Step Progress Navigation */}
      <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { num: 1, label: t.step1Title },
          { num: 2, label: t.step2Title },
          { num: 3, label: t.step3Title },
          { num: 4, label: t.step4Title },
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => {
              sound.playClick();
              setStep(s.num);
            }}
            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
              step === s.num
                ? 'bg-brand-cyan/20 border-brand-cyan text-brand-bone'
                : step > s.num
                ? 'bg-brand-surface border-brand-sage/40 text-brand-sand'
                : 'bg-brand-surface border-brand-border text-brand-muted'
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                step === s.num
                  ? 'bg-brand-cyan text-black'
                  : step > s.num
                  ? 'bg-brand-sage text-black'
                  : 'bg-white/10 text-brand-muted'
              }`}
            >
              {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider">
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Main Form Container */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#0D1830] shadow-2xl">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-brand-bone flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-brand-cyan" />
                Step 1: What symptoms or areas would you like to discuss?
              </h3>
              <p className="text-sm text-brand-muted mt-1">
                Select from common logged symptoms or add custom observations.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-brand-cyan/20 border border-brand-cyan/40 text-brand-bone flex items-center gap-2 font-bold"
                >
                  {symptom}
                  <button
                    onClick={() => handleRemoveSymptom(symptom)}
                    className="hover:text-brand-crimson text-brand-cyan ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSymptom()}
                placeholder="Add another symptom (e.g., knee stiffness, morning cough)..."
                className="flex-1 px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan"
              />
              <button
                onClick={handleAddSymptom}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-brand-cyan hover:text-black font-bold text-brand-bone font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  sound.playClick();
                  setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-cyan/25"
              >
                Continue to Duration <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-brand-bone">
                Step 2: How long have you noticed this and what triggers it?
              </h3>
              <p className="text-sm text-brand-muted mt-1">
                Helps your physician quickly gauge progression and frequency.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-1.5 font-bold">
                  Approximate Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-1.5 font-bold">
                  When is it most noticeable or what makes it better/worse?
                </label>
                <textarea
                  rows={3}
                  value={progression}
                  onChange={(e) => setProgression(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-brand-muted font-mono text-xs hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setStep(3);
                }}
                className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-cyan/25"
              >
                Continue to Medications <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-display text-brand-bone">
                Step 3: What has changed since your last visit?
              </h3>
              <p className="text-sm text-brand-muted mt-1">
                Any missed doses, dietary changes, or lab variations to highlight.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-1.5 font-bold">
                  Recent Changes (Vitals, Lab Trends, Diet)
                </label>
                <input
                  type="text"
                  value={changesObserved}
                  onChange={(e) => setChangesObserved(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-muted mb-1.5 font-bold">
                  Medication Adherence & Questions
                </label>
                <textarea
                  rows={3}
                  value={medConcerns}
                  onChange={(e) => setMedConcerns(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan resize-none"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-brand-muted font-mono text-xs hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleGenerateQuestions}
                className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-cyan/25"
              >
                <Sparkles className="w-4 h-4" />
                {t.synthesizeQuestionList}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold font-display text-brand-bone flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-brand-cyan" />
                  Your Tailored Doctor Question Checklist
                </h3>
                <p className="text-xs text-brand-sand mt-1">
                  Share these directly with your physician or print them out for your appointment folder.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    window.print();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-cyan text-xs font-mono text-brand-bone flex items-center gap-1.5 transition-all font-bold"
                >
                  <Printer className="w-4 h-4 text-brand-cyan" />
                  {t.printChecklist}
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {generatedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-brand-surface border border-brand-border flex items-start justify-between gap-4 group hover:border-brand-cyan/50 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-cyan/15 text-brand-cyan flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-brand-bone leading-relaxed">
                      {q}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(idx)}
                    className="text-brand-muted hover:text-brand-crimson transition-colors p-1"
                    title="Remove question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Question */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
                placeholder="Type your own question for the doctor..."
                className="flex-1 px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan"
              />
              <button
                onClick={handleAddQuestion}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-brand-cyan hover:text-black font-bold text-brand-bone font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-brand-muted flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>
                <strong>Note:</strong> These questions are intended strictly to organize your personal talking points during your clinical appointment.
              </span>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-white/5 text-brand-muted font-mono text-xs hover:text-white"
              >
                Edit Answers
              </button>
              {onNavigateToPrint && (
                <button
                  onClick={() => {
                    sound.playSwoosh();
                    onNavigateToPrint();
                  }}
                  className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-cyan/30"
                >
                  View Full 60-Sec Doctor Packet (PDF) <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
