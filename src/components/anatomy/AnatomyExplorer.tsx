import React, { useState } from 'react';
import { Anatomy3DCanvas } from './Anatomy3DCanvas';
import { ANATOMY_ORGANS } from '../../services/storage';
import { AnatomyOrgan, IndianLanguage } from '../../types';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  Search, 
  MapPin, 
  ClipboardList, 
  ShieldAlert, 
  Activity, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AnatomyExplorerProps {
  language: IndianLanguage;
  onNavigateToSpecialists: (organId: string) => void;
  onNavigateToPrepKit: (organ: AnatomyOrgan) => void;
}

export const AnatomyExplorer: React.FC<AnatomyExplorerProps> = ({
  language,
  onNavigateToSpecialists,
  onNavigateToPrepKit,
}) => {
  const t = getTranslation(language);
  const [selectedOrgan, setSelectedOrgan] = useState<AnatomyOrgan>(ANATOMY_ORGANS[1]); // Heart default
  const [searchQuery, setSearchQuery] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleSelectOrgan = (organ: AnatomyOrgan) => {
    setSelectedOrgan(organ);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) return;

    const lower = q.toLowerCase();
    const matched = ANATOMY_ORGANS.find(
      (o) =>
        o.name.toLowerCase().includes(lower) ||
        o.specialistType.toLowerCase().includes(lower) ||
        o.commonSymptoms.some((s) => s.toLowerCase().includes(lower))
    );

    if (matched && matched.id !== selectedOrgan.id) {
      sound.playOrganSelect();
      setSelectedOrgan(matched);
    }
  };

  return (
    <section id="anatomy" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// 3D ANATOMY ENGINE [RD-5]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson animate-ping" />
            <span className="text-xs font-mono text-brand-muted">REAL-TIME WEBGL RENDERING</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.anatomyExplorerTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.anatomyExplorerHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.anatomyExplorerSubtitle}
        </p>
      </div>

      {/* Symptom & Region Search HUD */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cyan" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.searchSymptomPlaceholder}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-brand-bone placeholder:text-brand-muted font-mono text-xs md:text-sm focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>

        {/* Quick Organ Selector Chips */}
        <div className="lg:col-span-5 flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {ANATOMY_ORGANS.map((organ) => {
            const isSelected = selectedOrgan.id === organ.id;
            return (
              <button
                key={organ.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedOrgan(organ);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-cyan text-black font-black shadow-lg shadow-brand-cyan/30 scale-105'
                    : 'bg-brand-surface text-brand-sand border border-brand-border hover:border-brand-cyan/50 hover:text-white'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: organ.color }}
                />
                {organ.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: 3D Canvas */}
        <div className="lg:col-span-7">
          <Anatomy3DCanvas
            selectedOrganId={selectedOrgan.id}
            onSelectOrgan={handleSelectOrgan}
            gender={gender}
            onToggleGender={() => setGender(gender === 'male' ? 'female' : 'male')}
          />
        </div>

        {/* Right Column: Selected Organ Information Dossier */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#0C152B] shadow-2xl">
          <div>
            {/* Tagline & Status */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedOrgan.color }} />
                <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan font-bold">
                  {t.regionIdentifier} // {selectedOrgan.id.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 text-brand-bone border border-white/10">
                {selectedOrgan.specialistType.split('/')[0]}
              </span>
            </div>

            {/* Organ Title */}
            <div className="mt-5">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-bone flex items-center gap-2">
                {selectedOrgan.name}
              </h3>
              <p className="mt-3 text-sm text-brand-sand leading-relaxed">
                {selectedOrgan.plainLanguageSummary}
              </p>
            </div>

            {/* Symptoms Associated */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-2.5 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-crimson" />
                {t.commonSymptomsTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedOrgan.commonSymptoms.map((symptom, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-brand-bone"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* Auto-suggested Questions for Doctor Visit */}
            <div className="mt-6 p-4 rounded-xl bg-brand-surface/70 border border-white/5 space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-brand-cyan mb-2 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
                {t.suggestedQuestionsTitle}
              </h4>
              <ul className="space-y-2">
                {selectedOrgan.suggestedQuestions.map((q, i) => (
                  <li key={i} className="text-xs text-brand-sand flex items-start gap-2">
                    <span className="text-brand-cyan mt-0.5">›</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Links into Discovery & Intake Layers */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                sound.playSwoosh();
                onNavigateToSpecialists(selectedOrgan.id);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between group shadow-lg shadow-brand-crimson/30 hover:scale-105 active:scale-95 duration-200"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 fill-white stroke-brand-crimson" />
                {t.findNearbySpecialist}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateToPrepKit(selectedOrgan);
              }}
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-brand-bone font-mono text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-brand-cyan" />
                {t.addQuestionsToPrepKit}
              </span>
              <ArrowRight className="w-4 h-4 text-brand-muted" />
            </button>

            <div className="flex items-center gap-2 text-[11px] text-brand-muted font-mono pt-1">
              <ShieldAlert className="w-3.5 h-3.5 text-brand-amber shrink-0" />
              <span>{t.illustrativeDisclaimer}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
