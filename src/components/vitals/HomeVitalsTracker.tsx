import React, { useState } from 'react';
import { VitalEntry, IndianLanguage } from '../../types';
import { store } from '../../services/storage';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  Heart, 
  Droplet, 
  Camera, 
  Plus, 
  CheckCircle, 
  Sparkles, 
  Scale, 
  Thermometer, 
  Wind,
  Info
} from 'lucide-react';

interface HomeVitalsTrackerProps {
  language: IndianLanguage;
  onVitalLogged: (vital: VitalEntry) => void;
}

export const HomeVitalsTracker: React.FC<HomeVitalsTrackerProps> = ({ language, onVitalLogged }) => {
  const t = getTranslation(language);
  const [systolic, setSystolic] = useState<number>(124);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [glucose, setGlucose] = useState<number>(104);
  const [glucoseContext, setGlucoseContext] = useState<'fasting' | 'post-prandial' | 'random'>('fasting');
  const [heartRate, setHeartRate] = useState<number>(72);
  const [spO2, setSpO2] = useState<number>(99);
  const [weightKg, setWeightKg] = useState<number>(74.8);
  const [notes, setNotes] = useState<string>('');
  const [isPhotoScanning, setIsPhotoScanning] = useState<boolean>(false);
  const [photoScanSuccess, setPhotoScanSuccess] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const handleSaveManual = () => {
    sound.playOrganSelect();
    const newVital: VitalEntry = {
      id: `v-${Date.now()}`,
      timestamp: new Date().toISOString(),
      systolicBp: systolic,
      diastolicBp: diastolic,
      glucose: glucose,
      glucoseContext: glucoseContext,
      heartRate: heartRate,
      spO2: spO2,
      weightKg: weightKg,
      source: 'manual',
      notes: notes || 'Routine morning reading',
    };

    store.addVital(newVital);
    onVitalLogged(newVital);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSimulatePhotoScan = () => {
    sound.playSwoosh();
    setIsPhotoScanning(true);

    setTimeout(() => {
      sound.playOrganSelect();
      setIsPhotoScanning(false);
      setSystolic(126);
      setDiastolic(82);
      setHeartRate(70);
      setPhotoScanSuccess(true);
      setTimeout(() => setPhotoScanSuccess(false), 4000);
    }, 1500);
  };

  return (
    <section id="vitals" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// HOME VITALS TRACKER [#15, #16]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">DEVICE PHOTO OCR + TOUCH ENTRY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.vitalsTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.vitalsHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.vitalsSubtitle}
        </p>
      </div>

      {/* Photo Monitor OCR Banner (Layer 4.2) */}
      <div className="mb-10 p-6 rounded-2xl glass-panel border border-brand-cyan/30 bg-[#0E1B38] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shrink-0">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold font-display text-brand-bone">
              {t.photoOcrBannerTitle}
            </h4>
            <p className="text-xs text-brand-sand font-mono mt-0.5">
              {t.photoOcrBannerDesc}
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulatePhotoScan}
          disabled={isPhotoScanning}
          className="px-5 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs uppercase font-black tracking-wider transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-brand-cyan/25"
        >
          {isPhotoScanning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin rounded-full" />
              Scanning Monitor Screen...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              {t.simulatePhotoCapture}
            </>
          )}
        </button>
      </div>

      {photoScanSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-brand-sage/20 border border-brand-sage/40 text-xs font-mono text-brand-sage flex items-center gap-2 font-bold animate-bounce">
          <CheckCircle className="w-4 h-4" />
          Monitor Screen OCR Success: Extracted SYS: 126, DIA: 82, PULSE: 70 bpm. Values populated below.
        </div>
      )}

      {/* Touch-Friendly Vitals Form */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#0D1830] space-y-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blood Pressure Input */}
          <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-bone flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-brand-crimson animate-heartbeat" /> BLOOD PRESSURE (mmHg)
              </span>
              <span className="text-[10px] font-mono text-brand-sage px-2 py-0.5 rounded bg-brand-sage/15 font-bold">
                Target: &lt;130/80
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-brand-muted block mb-1">
                  Systolic (Upper)
                </label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(Number(e.target.value))}
                  className="w-full text-center text-2xl font-bold font-mono py-2 rounded-lg bg-[#0A1224] border border-brand-border text-brand-bone focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-brand-muted block mb-1">
                  Diastolic (Lower)
                </label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(Number(e.target.value))}
                  className="w-full text-center text-2xl font-bold font-mono py-2 rounded-lg bg-[#0A1224] border border-brand-border text-brand-bone focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>
          </div>

          {/* Blood Glucose Input */}
          <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-bone flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-brand-amber" /> BLOOD GLUCOSE (mg/dL)
              </span>
              <select
                value={glucoseContext}
                onChange={(e) => setGlucoseContext(e.target.value as any)}
                className="text-[10px] font-mono bg-white/5 border border-white/10 text-brand-bone rounded px-2 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="fasting" className="bg-brand-card">Fasting</option>
                <option value="post-prandial" className="bg-brand-card">Post-Meal (PP)</option>
                <option value="random" className="bg-brand-card">Random</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-brand-muted block mb-1">
                Glucose Reading
              </label>
              <input
                type="number"
                value={glucose}
                onChange={(e) => setGlucose(Number(e.target.value))}
                className="w-full text-center text-2xl font-bold font-mono py-2 rounded-lg bg-[#0A1224] border border-brand-border text-brand-bone focus:outline-none focus:border-brand-amber"
              />
            </div>
          </div>

          {/* Heart Rate & Pulse */}
          <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-bone flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-brand-cyan" /> HEART RATE & SpO2
              </span>
              <span className="text-[10px] font-mono text-brand-muted">
                Resting Pulse
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-brand-muted block mb-1">
                  Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full text-center text-2xl font-bold font-mono py-2 rounded-lg bg-[#0A1224] border border-brand-border text-brand-bone focus:outline-none focus:border-brand-cyan"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-brand-muted block mb-1">
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  value={spO2}
                  onChange={(e) => setSpO2(Number(e.target.value))}
                  className="w-full text-center text-2xl font-bold font-mono py-2 rounded-lg bg-[#0A1224] border border-brand-border text-brand-bone focus:outline-none focus:border-brand-sage"
                />
              </div>
            </div>
          </div>

          {/* Weight */}
          <div className="p-5 rounded-xl bg-brand-surface border border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-brand-bone flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-brand-muted" /> BODY WEIGHT (KG)
              </span>
              <span className="text-[10px] font-mono text-brand-muted">
                Weekly Target
              </span>
            </div>
            <div>
              <label className="text-[10px] font-mono text-brand-muted block mb-1">
                Weight in Kilograms
              </label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full text-center text-2xl font-bold font-mono py-2 rounded-lg bg-[#0A1224] border border-brand-border text-brand-bone focus:outline-none focus:border-brand-cyan"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="md:col-span-2 p-5 rounded-xl bg-brand-surface border border-brand-border space-y-2">
            <label className="text-xs font-mono font-bold text-brand-bone block">
              Context Notes (e.g. sleep quality, coffee, stress)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 7 hours of deep sleep, taken 30 mins before breakfast..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#0A1224] border border-brand-border text-xs font-mono text-brand-bone focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
            <Info className="w-4 h-4 text-brand-cyan" />
            <span>Values instantly update trends, timeline, and doctor visit dossier.</span>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs font-mono text-brand-sage flex items-center gap-1 font-bold">
                <CheckCircle className="w-4 h-4" /> Vitals Logged
              </span>
            )}
            <button
              onClick={handleSaveManual}
              className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-brand-cyan/30 hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" /> {t.logMeasurement}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
