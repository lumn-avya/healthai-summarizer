import React, { useState } from 'react';
import { MedicalReport, HealthCategory, ExtractedParameter, IndianLanguage } from '../../types';
import { store } from '../../services/storage';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  RotateCw, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Tag, 
  Layers,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface DocumentUploaderProps {
  language: IndianLanguage;
  onUploadSuccess: (report: MedicalReport) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ language, onUploadSuccess }) => {
  const t = getTranslation(language);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'pdf' | 'photo'>('pdf');
  const [pageCount, setPageCount] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [extractedReport, setExtractedReport] = useState<MedicalReport | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<HealthCategory>('Blood Test');
  const [previewText, setPreviewText] = useState<string>('');

  const categories: HealthCategory[] = [
    'Blood Test',
    'Scan / X-ray / MRI',
    'Doctor\'s Prescription',
    'Referral Letter',
    'Other Report'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    sound.playClick();
    setSelectedFile(file);
    const isImage = file.type.startsWith('image/');
    setFileType(isImage ? 'photo' : 'pdf');
    simulateOcrExtraction(file.name, isImage ? 'photo' : 'pdf');
  };

  const simulateOcrExtraction = (fileName: string, type: 'pdf' | 'photo') => {
    setIsProcessing(true);
    sound.playSwoosh();

    setTimeout(() => {
      let detectedCat: HealthCategory = 'Blood Test';
      let params: ExtractedParameter[] = [];
      let summary = '';
      let rawText = '';

      if (fileName.toLowerCase().includes('mri') || fileName.toLowerCase().includes('scan') || fileName.toLowerCase().includes('xray')) {
        detectedCat = 'Scan / X-ray / MRI';
        params = [
          {
            id: `p-${Date.now()}-1`,
            name: 'Spinal Alignment & Disc Height',
            value: 'Mild L4-L5 Bulge',
            unit: 'Grade 1',
            referenceRange: 'Intact / Normal',
            status: 'watch',
            category: 'General',
            explanation: 'Slight cushion dehydration at lower back. No spinal cord impingement.'
          }
        ];
        summary = 'Imaging reveals mild disc desiccation at L4-L5 without neurological compromise. Suitable for gentle physical therapy.';
        rawText = `AARTHI IMAGING REPORT\nPatient: Aarav Sharma\nRegion: Lumbar Spine\nFinding: Mild L4-L5 disc desiccation with broad-based posterior bulge. No cord stenosis.`;
      } else if (fileName.toLowerCase().includes('prescription') || fileName.toLowerCase().includes('rx')) {
        detectedCat = 'Doctor\'s Prescription';
        params = [
          {
            id: `p-${Date.now()}-1`,
            name: 'Prescribed BP Target',
            value: '120/80',
            unit: 'mmHg',
            referenceRange: '< 130/80',
            status: 'normal',
            category: 'Cardiovascular',
            explanation: 'Maintain morning dose with low sodium diet.'
          }
        ];
        summary = 'Prescription notes blood pressure well controlled. Continue daily medications and schedule regular lab checks.';
        rawText = `CLINIC RX NOTE\nRx: Telmisartan 40mg (1-0-0) after breakfast.\nRosuvastatin 10mg (0-0-1) at night.`;
      } else {
        detectedCat = 'Blood Test';
        params = [
          {
            id: `p-${Date.now()}-1`,
            name: 'Fasting Blood Sugar',
            value: 106,
            unit: 'mg/dL',
            referenceRange: '70 - 99 mg/dL',
            status: 'watch',
            category: 'Metabolic',
            explanation: 'Slightly above standard 99 mg/dL baseline, reflecting mild insulin resistance.'
          },
          {
            id: `p-${Date.now()}-2`,
            name: 'Total Cholesterol',
            value: 185,
            unit: 'mg/dL',
            referenceRange: '< 200 mg/dL',
            status: 'normal',
            category: 'Cardiovascular',
            explanation: 'Healthy target zone, down from historical highs.'
          },
          {
            id: `p-${Date.now()}-3`,
            name: 'Serum Creatinine',
            value: 1.01,
            unit: 'mg/dL',
            referenceRange: '0.70 - 1.20 mg/dL',
            status: 'normal',
            category: 'Renal',
            explanation: 'Optimal kidney filtration markers.'
          }
        ];
        summary = 'Blood panel shows stable fasting glucose (106 mg/dL) and excellent kidney function. Total cholesterol is well within safe limits.';
        rawText = `DIAGNOSTIC LAB RESULTS\nFasting Blood Sugar: 106 mg/dL\nTotal Cholesterol: 185 mg/dL\nSerum Creatinine: 1.01 mg/dL`;
      }

      setSelectedCategory(detectedCat);
      setPreviewText(rawText);

      const newReport: MedicalReport = {
        id: `rep-up-${Date.now()}`,
        patientId: 'p-01',
        title: fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
        category: detectedCat,
        uploadDate: new Date().toISOString().split('T')[0],
        documentDate: new Date().toISOString().split('T')[0],
        facility: 'Metropolis Health Lab, Indiranagar',
        fileType: type,
        pageCount: pageCount,
        fileName: fileName,
        ocrConfidence: type === 'photo' ? 94.2 : 98.7,
        aiSummary: summary,
        flaggedCount: params.filter((p) => p.status !== 'normal').length,
        extractedParameters: params,
        rawTextPreview: rawText,
      };

      setExtractedReport(newReport);
      setIsProcessing(false);
    }, 1200);
  };

  const handleSaveToRecord = () => {
    if (!extractedReport) return;
    sound.playOrganSelect();
    const finalized = { ...extractedReport, category: selectedCategory };
    store.addReport(finalized);
    onUploadSuccess(finalized);
    setExtractedReport(null);
    setSelectedFile(null);
  };

  const loadSample = (sampleType: 'cbc' | 'lipid' | 'mri') => {
    sound.playClick();
    if (sampleType === 'cbc') {
      simulateOcrExtraction('CBC_Hemogram_Report_Demo.pdf', 'pdf');
    } else if (sampleType === 'lipid') {
      simulateOcrExtraction('Metabolic_Lipid_Panel_Demo.jpg', 'photo');
    } else {
      simulateOcrExtraction('MRI_Lumbar_Spine_Findings.pdf', 'pdf');
    }
  };

  return (
    <section id="intake" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// LAYER 1 INTAKE & OCR [#1, #2, #3, #4]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">PDF + PHOTO BATCH OCR</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.intakeTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.intakeHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.intakeSubtitle}
        </p>
      </div>

      {/* Demo One-Click Test Presets */}
      <div className="mb-8 p-5 rounded-2xl glass-panel border border-brand-cyan/30 bg-brand-cyan/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-brand-cyan" />
          <span className="text-xs font-mono font-bold text-brand-bone">
            {t.quickTestPresets}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadSample('cbc')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/10 hover:bg-brand-cyan hover:text-black font-bold text-brand-bone border border-white/10 transition-all"
          >
            Sample Blood CBC (PDF)
          </button>
          <button
            onClick={() => loadSample('lipid')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/10 hover:bg-brand-cyan hover:text-black font-bold text-brand-bone border border-white/10 transition-all"
          >
            Sample Lipid Panel (Photo)
          </button>
          <button
            onClick={() => loadSample('mri')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/10 hover:bg-brand-cyan hover:text-black font-bold text-brand-bone border border-white/10 transition-all"
          >
            Sample Spine MRI (PDF)
          </button>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      {!extractedReport && !isProcessing && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`p-12 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center relative cursor-pointer group ${
            dragActive
              ? 'border-brand-cyan bg-brand-cyan/15 scale-[1.01]'
              : 'border-brand-border bg-[#0D1830] hover:border-brand-cyan/60 hover:bg-[#111F3D]'
          }`}
        >
          <input
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg"
            onChange={handleFileInput}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />

          <div className="w-20 h-20 rounded-2xl bg-brand-surface border border-brand-cyan/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform mb-5 shadow-2xl">
            <UploadCloud className="w-10 h-10" />
          </div>

          <h3 className="text-2xl font-bold font-display text-brand-bone">
            {t.dragDropTitle}
          </h3>
          <p className="text-xs sm:text-sm text-brand-sand mt-2 max-w-md font-normal">
            {t.dragDropSubtitle}
          </p>

          <div className="mt-8 flex items-center gap-6 text-xs font-mono text-brand-muted">
            <span className="flex items-center gap-1.5 text-brand-sand">
              <FileText className="w-4 h-4 text-brand-cyan" /> Scanned PDFs
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-brand-sand">
              <ImageIcon className="w-4 h-4 text-brand-crimson" /> Phone Photos
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-brand-sand">
              <Layers className="w-4 h-4 text-brand-sage" /> Multi-Page Stitching
            </span>
          </div>
        </div>
      )}

      {/* OCR Processing State */}
      {isProcessing && (
        <div className="p-16 rounded-2xl glass-panel border border-brand-cyan/40 bg-[#0D1830] text-center flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full border-3 border-brand-cyan border-t-transparent animate-spin mb-5" />
          <h3 className="text-2xl font-bold font-display text-brand-bone">
            {t.runningOcr}
          </h3>
          <p className="text-xs font-mono text-brand-muted mt-2">
            Auto-correcting skew angle • Tolerating glare • Mapping to clinical normal ranges
          </p>
        </div>
      )}

      {/* Extracted Report Verification Card */}
      {extractedReport && (
        <div className="rounded-2xl glass-panel border border-brand-cyan/40 bg-[#0E1B38] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-sage animate-pulse" />
                <span className="text-xs font-mono text-brand-sage uppercase tracking-wider font-bold">
                  OCR EXTRACTION COMPLETE (CONFIDENCE: {extractedReport.ocrConfidence}%)
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-brand-bone">
                {extractedReport.title}
              </h3>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-3">
              <Tag className="w-4 h-4 text-brand-cyan" />
              <div className="text-xs font-mono">
                <span className="text-brand-muted block text-[10px]">CATEGORY TAG:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as HealthCategory)}
                  className="bg-brand-surface border border-brand-border text-brand-bone px-3 py-1.5 rounded-lg focus:outline-none focus:border-brand-cyan text-xs font-mono cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-brand-card">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* AI Layman Summary */}
          <div className="p-5 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan font-bold uppercase mb-1.5">
              <Sparkles className="w-4 h-4" /> Plain-Language Takeaway
            </div>
            <p className="text-sm text-brand-bone leading-relaxed">
              {extractedReport.aiSummary}
            </p>
          </div>

          {/* Extracted Parameters Grid */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-3 font-bold">
              EXTRACTED HEALTH PARAMETERS ({extractedReport.extractedParameters.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {extractedReport.extractedParameters.map((param) => (
                <div
                  key={param.id}
                  className="p-5 rounded-xl bg-brand-surface border border-brand-border flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-brand-muted">{param.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          param.status === 'normal'
                            ? 'bg-brand-sage/20 text-brand-sage'
                            : 'bg-brand-amber/20 text-brand-amber'
                        }`}
                      >
                        {param.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2 text-2xl font-bold font-mono text-brand-bone">
                      {param.value}{' '}
                      <span className="text-xs text-brand-muted font-normal">
                        {param.unit}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-brand-muted mt-1">
                      Ref: {param.referenceRange}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-brand-sand pt-2 border-t border-white/5">
                    {param.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-5 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setExtractedReport(null);
                setSelectedFile(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-white/5 text-brand-muted hover:text-white font-mono text-xs"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveToRecord}
              className="px-6 py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-cyan/30"
            >
              <CheckCircle className="w-4 h-4" /> {t.saveToPatientRecord}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
