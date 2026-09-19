import React, { useState } from 'react';
import { VitalEntry, IndianLanguage } from '../../types';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Area, 
  AreaChart 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Heart, 
  Droplet, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface HealthTrendsViewProps {
  vitals: VitalEntry[];
  language: IndianLanguage;
}

export const HealthTrendsView: React.FC<HealthTrendsViewProps> = ({ vitals, language }) => {
  const t = getTranslation(language);
  const [activeMetric, setActiveMetric] = useState<'bp' | 'glucose' | 'lipid' | 'comparison'>('bp');

  const bpData = [
    { date: '01 Sep', systolic: 125, diastolic: 81, pulse: 70 },
    { date: '08 Sep', systolic: 121, diastolic: 78, pulse: 68 },
    { date: '11 Sep', systolic: 130, diastolic: 84, pulse: 76, note: 'Travel stress' },
    { date: '14 Sep', systolic: 122, diastolic: 79, pulse: 69 },
    { date: '16 Sep', systolic: 128, diastolic: 82, pulse: 74 },
    { date: '18 Sep', systolic: 124, diastolic: 80, pulse: 71 },
  ];

  const glucoseData = [
    { date: 'Feb 2026', fasting: 114, hba1c: 6.2 },
    { date: 'May 2026', fasting: 111, hba1c: 6.0 },
    { date: 'Aug 2026', fasting: 108, hba1c: 5.8 },
    { date: 'Sep 2026 (Avg)', fasting: 104, hba1c: 5.8 },
  ];

  const lipidData = [
    { date: 'Feb 2026', ldl: 134, total: 215 },
    { date: 'May 2026', ldl: 122, total: 198 },
    { date: 'Aug 2026', ldl: 112, total: 188 },
  ];

  const comparisonData = [
    { date: 'Week 1', bp: 125, adherence: 100, stress: 2 },
    { date: 'Week 2', bp: 121, adherence: 100, stress: 1 },
    { date: 'Week 3', bp: 130, adherence: 80, stress: 4 },
    { date: 'Week 4', bp: 123, adherence: 100, stress: 2 },
  ];

  return (
    <section id="trends" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// TIME-SERIES HEALTH ANALYSIS [#19, #20, #22, #24, #25]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">STATISTICAL HEALTH MODELLING</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.trendsTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.trendsHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.trendsSubtitle}
        </p>
      </div>

      {/* Metric Selector Tabs */}
      <div className="mb-10 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'bp', label: 'Blood Pressure Trend', icon: Heart, color: 'text-brand-crimson' },
          { id: 'glucose', label: 'HbA1c & Fasting Glucose', icon: Droplet, color: 'text-brand-amber' },
          { id: 'lipid', label: 'Lipid & Cholesterol Drop', icon: Activity, color: 'text-brand-cyan' },
          { id: 'comparison', label: 'BP vs Adherence Correlation', icon: TrendingUp, color: 'text-brand-sage' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeMetric === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveMetric(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-brand-cyan text-black font-black shadow-md shadow-brand-cyan/30'
                  : 'bg-brand-surface border border-brand-border text-brand-sand hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Chart Card */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#0D1830] space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
          <div>
            <h3 className="text-xl font-bold font-display text-brand-bone">
              {activeMetric === 'bp' && 'Blood Pressure Tracking (Home Readings)'}
              {activeMetric === 'glucose' && 'Fasting Blood Sugar & 90-Day HbA1c'}
              {activeMetric === 'lipid' && 'Cholesterol & LDL Reduction Trajectory'}
              {activeMetric === 'comparison' && 'Cross-Metric Correlation: Blood Pressure vs Med Adherence'}
            </h3>
            <p className="text-xs font-mono text-brand-muted mt-0.5">
              Target Reference Bounds Shaded For Clinical Safety
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-brand-sage/20 text-brand-sage border border-brand-sage/30 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              POSITIVE PROGRESSION
            </span>
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="h-[360px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetric === 'bp' ? (
              <LineChart data={bpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 150]} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1224', borderColor: 'rgba(56,189,248,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}
                />
                <ReferenceLine y={130} stroke="#EF4444" strokeDasharray="4 4" label={{ value: 'Target Max (130)', fill: '#EF4444', fontSize: 10 }} />
                <ReferenceLine y={80} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'Diastolic Target (80)', fill: '#10B981', fontSize: 10 }} />
                <Line type="monotone" dataKey="systolic" name="Systolic (Upper)" stroke="#EF4444" strokeWidth={3} dot={{ r: 5, fill: '#EF4444' }} />
                <Line type="monotone" dataKey="diastolic" name="Diastolic (Lower)" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4, fill: '#06B6D4' }} />
              </LineChart>
            ) : activeMetric === 'glucose' ? (
              <AreaChart data={glucoseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis domain={[70, 130]} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1224', borderColor: 'rgba(56,189,248,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}
                />
                <ReferenceLine y={100} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'Normal Fasting Benchmark (100 mg/dL)', fill: '#10B981', fontSize: 10 }} />
                <Area type="monotone" dataKey="fasting" name="Fasting Glucose (mg/dL)" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} strokeWidth={3} dot={{ r: 5 }} />
              </AreaChart>
            ) : activeMetric === 'lipid' ? (
              <LineChart data={lipidData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis domain={[90, 240]} stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1224', borderColor: 'rgba(56,189,248,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}
                />
                <ReferenceLine y={100} stroke="#10B981" strokeDasharray="3 3" label={{ value: 'Ideal LDL (<100)', fill: '#10B981', fontSize: 10 }} />
                <Line type="monotone" dataKey="total" name="Total Cholesterol (mg/dL)" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="ldl" name="LDL Cholesterol (mg/dL)" stroke="#EF4444" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            ) : (
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="date" stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94A3B8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A1224', borderColor: 'rgba(56,189,248,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F8FAFC', fontFamily: 'JetBrains Mono' }}
                />
                <Line type="monotone" dataKey="bp" name="Systolic BP" stroke="#EF4444" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="adherence" name="Med Adherence %" stroke="#10B981" strokeWidth={2.5} dot={{ r: 5 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Statistical AI Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 border-t border-white/10">
          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <div className="flex items-center gap-1.5 text-xs font-mono text-brand-cyan mb-1.5 font-bold">
              <Sparkles className="w-4 h-4" /> {t.trendDetection}
            </div>
            <p className="text-xs text-brand-sand leading-relaxed">
              HbA1c decreased by <strong>0.4%</strong> over the past two quarters. Fasting sugar is trending consistently downward toward target normal.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <div className="flex items-center gap-1.5 text-xs font-mono text-brand-crimson mb-1.5 font-bold">
              <AlertCircle className="w-4 h-4" /> {t.anomalyDetection}
            </div>
            <p className="text-xs text-brand-sand leading-relaxed">
              A brief systolic elevation to <strong>130 mmHg</strong> was detected on Sept 11, correlated directly with logged flight travel and delayed sleep. Settled to 122 mmHg by Sept 14.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <div className="flex items-center gap-1.5 text-xs font-mono text-brand-sage mb-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" /> {t.doctorVisitReadout}
            </div>
            <p className="text-xs text-brand-sand leading-relaxed">
              Overall 30-day control score is <strong>92/100</strong>. Ideal baseline data ready for automatic inclusion in the printable Doctor Visit Packet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
