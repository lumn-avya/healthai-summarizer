import React from 'react';
import { MedicalReport, VitalEntry, PatientProfile, IndianLanguage } from '../../types';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  Activity, 
  Heart, 
  Droplet, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Calendar, 
  ChevronRight,
  PlusCircle,
  Zap
} from 'lucide-react';

interface MyHealthDashboardProps {
  profile: PatientProfile;
  reports: MedicalReport[];
  vitals: VitalEntry[];
  language: IndianLanguage;
  onNavigate: (sectionId: string) => void;
  onOpenReport: (report: MedicalReport) => void;
}

export const MyHealthDashboard: React.FC<MyHealthDashboardProps> = ({
  profile,
  reports,
  vitals,
  language,
  onNavigate,
  onOpenReport,
}) => {
  const t = getTranslation(language);
  const latestVital = vitals[0] || {};

  return (
    <section id="dashboard" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Header & Telemetry Grid */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// {t.patientCommandCenter}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">LAYER 2 SNAPSHOT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.myHealthDashboard} <span className="text-brand-cyan italic font-serif font-normal">{t.dashboard}</span>
          </h2>
        </div>

        {/* Patient Status Pill */}
        <div className="mt-4 lg:mt-0 flex items-center gap-4 text-xs font-mono">
          <div className="px-4 py-2.5 rounded-xl glass-pill flex items-center gap-2 text-brand-bone border border-brand-cyan/30 shadow-md shadow-brand-cyan/10">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-sage animate-pulse" />
            <span>{profile.name} (Age {profile.age})</span>
            <span className="text-brand-muted">•</span>
            <span className="text-brand-cyan font-bold">{profile.bloodGroup}</span>
          </div>
        </div>
      </div>

      {/* Top Key Telemetry Cards (Lando Norris Kinetic Racing & Healthcare Vitals) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {/* Blood Pressure Card */}
        <div className="p-6 rounded-2xl glass-panel border border-brand-border hover:border-brand-crimson transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted">
            <span className="flex items-center gap-1.5 text-brand-bone font-bold">
              <Heart className="w-4 h-4 text-brand-crimson animate-heartbeat" /> {t.bloodPressure}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-brand-sage/20 text-brand-sage font-bold border border-brand-sage/30">
              {t.optimalBand}
            </span>
          </div>
          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-mono font-black text-brand-bone group-hover:text-brand-crimson transition-colors">
              {latestVital.systolicBp || 124} / {latestVital.diastolicBp || 80}{' '}
              <span className="text-xs font-normal text-brand-muted">mmHg</span>
            </div>
            <div className="text-[11px] font-mono text-brand-muted mt-1.5">
              Pulse: {latestVital.heartRate || 71} bpm • Telmisartan 40mg
            </div>
          </div>
          <div className="text-xs text-brand-sand pt-2.5 border-t border-white/5 font-mono">
            Well within physician target (&lt;130/80)
          </div>
        </div>

        {/* Fasting Glucose Card */}
        <div className="p-6 rounded-2xl glass-panel border border-brand-border hover:border-brand-amber transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted">
            <span className="flex items-center gap-1.5 text-brand-bone font-bold">
              <Droplet className="w-4 h-4 text-brand-amber" /> {t.fastingSugar}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-brand-amber/20 text-brand-amber font-bold border border-brand-amber/30">
              {t.preDiabetic}
            </span>
          </div>
          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-mono font-black text-brand-bone group-hover:text-brand-amber transition-colors">
              {latestVital.glucose || 104}{' '}
              <span className="text-xs font-normal text-brand-muted">mg/dL</span>
            </div>
            <div className="text-[11px] font-mono text-brand-muted mt-1.5">
              HbA1c: 5.8% (down from 6.2%)
            </div>
          </div>
          <div className="text-xs text-brand-sand pt-2.5 border-t border-white/5 font-mono">
            Pre-diabetes holding steady with diet
          </div>
        </div>

        {/* LDL Cholesterol Card */}
        <div className="p-6 rounded-2xl glass-panel border border-brand-border hover:border-brand-cyan transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted">
            <span className="flex items-center gap-1.5 text-brand-bone font-bold">
              <Activity className="w-4 h-4 text-brand-cyan" /> {t.ldlCholesterol}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-brand-cyan/20 text-brand-cyan font-bold border border-brand-cyan/30">
              {t.improving}
            </span>
          </div>
          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-mono font-black text-brand-bone group-hover:text-brand-cyan transition-colors">
              112{' '}
              <span className="text-xs font-normal text-brand-muted">mg/dL</span>
            </div>
            <div className="text-[11px] font-mono text-brand-muted mt-1.5">
              Total Cholesterol: 188 mg/dL
            </div>
          </div>
          <div className="text-xs text-brand-sand pt-2.5 border-t border-white/5 font-mono">
            Decreased 16% with Rosuvastatin 10mg
          </div>
        </div>

        {/* Renal & Kidney Card */}
        <div className="p-6 rounded-2xl glass-panel border border-brand-border hover:border-brand-sage transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-brand-muted">
            <span className="flex items-center gap-1.5 text-brand-bone font-bold">
              <ShieldCheck className="w-4 h-4 text-brand-sage" /> {t.kidneyFiltration}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-brand-sage/20 text-brand-sage font-bold border border-brand-sage/30">
              {t.healthy}
            </span>
          </div>
          <div className="my-4">
            <div className="text-3xl sm:text-4xl font-mono font-black text-brand-bone group-hover:text-brand-sage transition-colors">
              1.02{' '}
              <span className="text-xs font-normal text-brand-muted">mg/dL</span>
            </div>
            <div className="text-[11px] font-mono text-brand-muted mt-1.5">
              eGFR: 88 mL/min (Optimal filtration)
            </div>
          </div>
          <div className="text-xs text-brand-sand pt-2.5 border-t border-white/5 font-mono">
            Smooth filtration safely handling blood pressure rx
          </div>
        </div>
      </div>

      {/* Holistic AI Snapshot Banner */}
      <div className="mb-10 p-7 rounded-2xl glass-panel border border-brand-cyan/30 bg-gradient-to-r from-brand-cyan/15 via-[#0F1D38] to-[#0A1224] relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t.aiSummaryBannerTitle}
            </div>
            <p className="text-sm sm:text-base text-brand-bone leading-relaxed max-w-3xl font-normal">
              {t.aiSummaryBannerText}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => {
                sound.playSwoosh();
                onNavigate('prep-kit');
              }}
              className="px-5 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs uppercase font-black tracking-wider transition-all shadow-lg shadow-brand-cyan/30 hover:scale-105"
            >
              {t.prepKit} ›
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Action Matrix (9 Layers Hub) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {[
          { label: t.anatomy3D, id: 'anatomy', icon: '🫀', tag: 'WebGL 3D' },
          { label: t.vitals, id: 'vitals', icon: '🩺', tag: 'BP / Sugar' },
          { label: t.journal, id: 'journal', icon: '📝', tag: '0-10 Scale' },
          { label: t.trends, id: 'trends', icon: '📈', tag: 'Time Series' },
          { label: t.prepKit, id: 'prep-kit', icon: '📋', tag: 'Questions' },
          { label: t.aiChatbot, id: 'chatbot', icon: '💬', tag: 'Grounded' },
        ].map((tile) => (
          <button
            key={tile.id}
            onClick={() => {
              sound.playClick();
              onNavigate(tile.id);
            }}
            className="p-4 rounded-xl glass-panel border border-brand-border hover:border-brand-cyan text-left transition-all hover:-translate-y-1 group duration-200"
          >
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              {tile.icon}
            </div>
            <div className="text-xs font-mono font-bold text-brand-bone group-hover:text-brand-cyan transition-colors">
              {tile.label}
            </div>
            <div className="text-[10px] font-mono text-brand-muted">
              {tile.tag}
            </div>
          </button>
        ))}
      </div>

      {/* Recent Uploaded Reports Table */}
      <div className="rounded-2xl glass-panel border border-brand-border p-6 sm:p-8 bg-[#0D1830] shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-xl font-bold font-display text-brand-bone">
              {t.recentReportsTitle}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('intake');
            }}
            className="text-xs font-mono text-brand-cyan hover:underline flex items-center gap-1 font-bold"
          >
            <PlusCircle className="w-4 h-4" /> {t.uploadNewReport}
          </button>
        </div>

        <div className="space-y-3">
          {reports.slice(0, 3).map((rep) => (
            <div
              key={rep.id}
              onClick={() => onOpenReport(rep)}
              className="p-4 rounded-xl bg-brand-surface hover:bg-[#1A284D] border border-brand-border hover:border-brand-cyan/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-bone group-hover:text-brand-cyan transition-colors">
                    {rep.title}
                  </h4>
                  <div className="text-xs font-mono text-brand-muted mt-0.5">
                    {rep.category} • {rep.facility} • {rep.documentDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 border border-white/10 text-brand-sand">
                  {rep.extractedParameters.length} {t.parametersExtracted}
                </span>
                <ChevronRight className="w-4 h-4 text-brand-muted group-hover:translate-x-1 group-hover:text-brand-cyan transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
