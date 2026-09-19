import React, { useState } from 'react';
import { JournalEntry, IndianLanguage } from '../../types';
import { store, ANATOMY_ORGANS } from '../../services/storage';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  BookOpen, 
  CheckCircle, 
  Tag, 
  Pill, 
  Smile, 
  Frown, 
  AlertTriangle, 
  Sparkles,
  Save
} from 'lucide-react';

interface SymptomJournalProps {
  language: IndianLanguage;
  onEntryLogged: (entry: JournalEntry) => void;
}

export const SymptomJournal: React.FC<SymptomJournalProps> = ({ language, onEntryLogged }) => {
  const t = getTranslation(language);
  const [severity, setSeverity] = useState<number>(2);
  const [primarySymptom, setPrimarySymptom] = useState<string>('Mild joint stiffness');
  const [selectedOrganId, setSelectedOrganId] = useState<string>('knees');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Good Sleep', 'Exercise / Badminton']);
  const [adherence, setAdherence] = useState<'all-taken' | 'partially-taken' | 'skipped'>('all-taken');
  const [patientNote, setPatientNote] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const availableTags = [
    'Poor Sleep',
    'Good Sleep',
    'High Stress',
    'Travel / Flight',
    'Diet Change',
    'Late Dinner',
    'Exercise / Badminton',
    'Long Desk Hours',
    'Heavy Weather / Humidity'
  ];

  const handleToggleTag = (tag: string) => {
    sound.playClick();
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSaveEntry = () => {
    sound.playOrganSelect();
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      timestamp: new Date().toISOString(),
      symptomSeverity: severity,
      primarySymptom: primarySymptom || 'General check-in',
      relatedOrganId: selectedOrganId,
      contextTags: selectedTags,
      medicationAdherence: adherence,
      patientNote: patientNote || 'No specific clinical complaint today.',
    };

    store.addJournalEntry(newEntry);
    onEntryLogged(newEntry);
    setSaveSuccess(true);
    setPatientNote('');
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const getSeverityLabel = (val: number) => {
    if (val === 0) return { text: 'Zero Discomfort', color: 'text-brand-sage' };
    if (val <= 3) return { text: 'Mild / Barely Noticeable', color: 'text-brand-sage' };
    if (val <= 6) return { text: 'Moderate / Noticeable Discomfort', color: 'text-brand-amber' };
    return { text: 'Severe / Significant Discomfort', color: 'text-brand-crimson' };
  };

  const severityInfo = getSeverityLabel(severity);

  return (
    <section id="journal" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// SYMPTOM & WELLNESS JOURNAL [#17]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">PATIENT EXPERIENCE LOG</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.journalTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.journalHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.journalSubtitle}
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#0D1830] space-y-8 shadow-2xl">
        {/* 0-10 Severity Slider */}
        <div className="p-6 rounded-xl bg-brand-surface border border-brand-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-muted block font-bold">
                {t.severitySliderTitle}
              </span>
              <div className="text-lg font-bold font-display text-brand-bone flex items-center gap-2 mt-1">
                <span className={`font-mono text-3xl font-black ${severityInfo.color}`}>
                  {severity} / 10
                </span>
                <span className="text-sm font-sans text-brand-sand">— {severityInfo.text}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {severity <= 3 ? (
                <Smile className="w-7 h-7 text-brand-sage" />
              ) : severity <= 6 ? (
                <Smile className="w-7 h-7 text-brand-amber" />
              ) : (
                <Frown className="w-7 h-7 text-brand-crimson animate-bounce" />
              )}
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            value={severity}
            onChange={(e) => {
              sound.playClick();
              setSeverity(Number(e.target.value));
            }}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#1A284D] accent-brand-cyan focus:outline-none"
          />

          <div className="flex justify-between text-[11px] font-mono text-brand-muted">
            <span>0 (No Discomfort)</span>
            <span>3 (Mild)</span>
            <span>5 (Moderate)</span>
            <span>7 (Elevated)</span>
            <span>10 (Severe)</span>
          </div>
        </div>

        {/* Symptom Name & Body Region Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-brand-muted block font-bold">
              Primary Symptom / Sensation
            </label>
            <input
              type="text"
              value={primarySymptom}
              onChange={(e) => setPrimarySymptom(e.target.value)}
              placeholder="e.g. Lower back stiffness, knee clicking, headache..."
              className="w-full px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-brand-muted block font-bold">
              Associated Body Region (3D Model Sync)
            </label>
            <select
              value={selectedOrganId}
              onChange={(e) => setSelectedOrganId(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan cursor-pointer"
            >
              {ANATOMY_ORGANS.map((organ) => (
                <option key={organ.id} value={organ.id} className="bg-brand-card">
                  {organ.name} ({organ.specialistType})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Medication Adherence (Layer 4.3) */}
        <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-muted block flex items-center gap-1.5 font-bold">
            <Pill className="w-4 h-4 text-brand-crimson" /> {t.medAdherenceTitle}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'all-taken', label: 'All Taken As Prescribed', desc: 'Telmisartan + Rosuvastatin' },
              { id: 'partially-taken', label: 'Partially Taken / Delayed', desc: 'Missed morning or evening dose' },
              { id: 'skipped', label: 'Skipped Entirely', desc: 'Did not take meds today' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  sound.playClick();
                  setAdherence(opt.id as any);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  adherence === opt.id
                    ? 'bg-brand-cyan/20 border-brand-cyan text-brand-bone'
                    : 'bg-[#0A1224] border-brand-border text-brand-sand hover:border-brand-cyan/50'
                }`}
              >
                <div className="text-xs font-mono font-bold">{opt.label}</div>
                <div className="text-[10px] font-mono text-brand-muted mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Context Tags */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-muted block flex items-center gap-1.5 font-bold">
            <Tag className="w-4 h-4 text-brand-cyan" /> {t.contextTagsTitle}
          </span>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleToggleTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-brand-cyan text-black font-black shadow-md shadow-brand-cyan/25'
                      : 'bg-brand-surface border border-brand-border text-brand-sand hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Patient Free-Text Note */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-brand-muted block font-bold">
            Note for Doctor / Next Visit Memory
          </label>
          <textarea
            rows={3}
            value={patientNote}
            onChange={(e) => setPatientNote(e.target.value)}
            placeholder="e.g. Felt a little sore in the right knee after playing 3 sets of badminton..."
            className="w-full px-4 py-3 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan resize-none"
          />
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div>
            {saveSuccess && (
              <span className="text-xs font-mono text-brand-sage flex items-center gap-1 font-bold">
                <CheckCircle className="w-4 h-4" /> Journal Entry Added To Timeline
              </span>
            )}
          </div>

          <button
            onClick={handleSaveEntry}
            className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-brand-cyan/30 hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" /> {t.saveJournalEntry}
          </button>
        </div>
      </div>
    </section>
  );
};
