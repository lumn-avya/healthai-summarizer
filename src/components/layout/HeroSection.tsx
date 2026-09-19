import React from 'react';
import { IndianLanguage } from '../../types';
import { getTranslation } from '../../services/i18n';
import { sound } from '../../services/audio';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Compass, 
  FileUp, 
  Bot,
  Heart,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  language: IndianLanguage;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language, onNavigate }) => {
  const t = getTranslation(language);

  return (
    <section className="relative pt-12 pb-20 sm:pb-24 border-b border-brand-border/60 overflow-hidden">
      {/* Background Neon Glow Orbs (Healthcare Cyan & Life Crimson) */}
      <div className="absolute -left-20 top-20 w-96 h-96 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-10 w-96 h-96 rounded-full bg-brand-crimson/10 blur-3xl pointer-events-none" />

      {/* Lando Norris Style Kinetic Marquee Ticker */}
      <div className="mb-8 -mx-4 sm:-mx-8 overflow-hidden py-2 bg-gradient-to-r from-brand-cyan/10 via-brand-surface/40 to-brand-cyan/10 border-y border-brand-cyan/20">
        <div className="marquee-track flex items-center gap-8 text-[11px] font-mono tracking-widest text-brand-cyan font-bold uppercase whitespace-nowrap">
          <span>⚡ HEALTHAI VITALITY ENGINE</span>
          <span className="text-white/30">•</span>
          <span>🫀 THREE.JS 3D ANATOMY WEBGL</span>
          <span className="text-white/30">•</span>
          <span>🩺 ZERO MEDICAL JARGON</span>
          <span className="text-white/30">•</span>
          <span>📍 VERIFIED SPECIALIST GPS MAP</span>
          <span className="text-white/30">•</span>
          <span>📋 60-SEC DOCTOR DOSSIER EXPORT</span>
          <span className="text-white/30">•</span>
          <span>⚡ HEALTHAI VITALITY ENGINE</span>
          <span className="text-white/30">•</span>
          <span>🫀 THREE.JS 3D ANATOMY WEBGL</span>
          <span className="text-white/30">•</span>
          <span>🩺 ZERO MEDICAL JARGON</span>
          <span className="text-white/30">•</span>
          <span>📍 VERIFIED SPECIALIST GPS MAP</span>
          <span className="text-white/30">•</span>
          <span>📋 60-SEC DOCTOR DOSSIER EXPORT</span>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl">
        {/* Lando Norris Inspired Angled Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-brand-surface border border-brand-cyan/30 mb-6 ln-badge-skew shadow-lg shadow-brand-cyan/10">
          <span className="w-2 h-2 rounded-full bg-brand-crimson animate-ping" />
          <span className="text-xs font-mono tracking-widest text-brand-cyan font-bold uppercase">
            {t.heroSubtitle}
          </span>
        </div>

        {/* High-Impact Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-brand-bone leading-[1.08]">
          {t.heroTitleStart}{' '}
          <span className="text-brand-cyan italic font-serif font-normal">
            {t.heroTitleHighlight}
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="mt-6 text-base sm:text-xl text-brand-sand font-sans max-w-2xl leading-relaxed font-normal">
          {t.heroDescription}
        </p>

        {/* High-Energy Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              sound.playSwoosh();
              onNavigate('anatomy');
            }}
            className="px-6 py-4 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs uppercase font-black tracking-wider transition-all flex items-center gap-2 shadow-xl shadow-brand-cyan/30 hover:scale-105 active:scale-95 duration-200"
          >
            <Compass className="w-4 h-4" />
            <span>{t.heroLaunch3D}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('intake');
            }}
            className="px-6 py-4 rounded-xl glass-panel border border-brand-border hover:border-brand-cyan text-brand-bone font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 hover:bg-white/10"
          >
            <FileUp className="w-4 h-4 text-brand-cyan" />
            <span>{t.heroUploadReport}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('chatbot');
            }}
            className="px-5 py-4 rounded-xl glass-panel border border-brand-border hover:border-brand-border-strong text-brand-sand hover:text-brand-bone font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-brand-sage" />
            <span>{t.heroGroundedAI}</span>
          </button>
        </div>

        {/* Lando Norris Inspired Numbered Telemetry Blocks */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { num: '01', title: 'REPORT INTAKE', desc: 'PDF & Phone Photo OCR' },
            { num: '02', title: '3D ANATOMY', desc: 'Real-time WebGL Mannequin' },
            { num: '03', title: 'UNIFIED TIMELINE', desc: 'Reports, Vitals & Notes' },
            { num: '04', title: 'SPECIALIST MAP', desc: 'Red GPS Clinic Pinpoints' },
          ].map((item) => (
            <div key={item.num} className="p-3.5 rounded-xl bg-brand-surface/50 border border-white/5 hover:border-brand-cyan/30 transition-all">
              <span className="font-mono text-xs text-brand-cyan font-bold block">
                {item.num} //
              </span>
              <h4 className="text-xs font-mono font-bold text-brand-bone mt-1">
                {item.title}
              </h4>
              <p className="text-[11px] font-mono text-brand-muted mt-0.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
