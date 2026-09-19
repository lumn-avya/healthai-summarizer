import React from 'react';
import { MedicalReport } from '../../types';
import { sound } from '../../services/audio';
import { 
  X, 
  FileText, 
  Sparkles, 
  Tag, 
  Calendar, 
  Building2, 
  User, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface ReportDetailModalProps {
  report: MedicalReport | null;
  onClose: () => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="max-w-3xl w-full rounded-2xl glass-panel border border-brand-border bg-[#121217] p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-brand-gold">
              {report.category} • RECORD ID: {report.id}
            </span>
            <h3 className="text-2xl font-bold font-editorial text-brand-bone mt-1">
              {report.title}
            </h3>
            <div className="text-xs font-mono text-brand-muted mt-1 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Date: {report.documentDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" /> {report.facility}
              </span>
              {report.doctorName && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" /> {report.doctorName}
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Plain-Language Summary */}
        <div className="p-4 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-crimson font-bold uppercase">
            <Sparkles className="w-4 h-4" /> Plain-Language AI Takeaway
          </div>
          <p className="text-sm text-brand-sand leading-relaxed">
            {report.aiSummary}
          </p>
        </div>

        {/* Extracted Parameters */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-3">
            EXTRACTED BIOMARKERS ({report.extractedParameters.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.extractedParameters.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-brand-surface border border-brand-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-brand-muted">{p.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'normal'
                          ? 'bg-brand-sage/20 text-brand-sage'
                          : 'bg-brand-amber/20 text-brand-amber'
                      }`}
                    >
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-2 text-2xl font-bold font-mono text-brand-bone">
                    {p.value} <span className="text-xs font-normal text-brand-muted">{p.unit}</span>
                  </div>
                  <div className="text-[11px] font-mono text-brand-muted mt-0.5">
                    Ref: {p.referenceRange}
                  </div>
                </div>
                <p className="mt-3 text-xs text-brand-sand/80 pt-2 border-t border-white/5">
                  {p.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Raw OCR Preview */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-2">
            RAW DOCUMENT OCR CAPTURE (CONFIDENCE: {report.ocrConfidence}%)
          </h4>
          <pre className="p-4 rounded-xl bg-[#0B0B0E] border border-white/5 text-[11px] font-mono text-brand-muted whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
            {report.rawTextPreview}
          </pre>
        </div>

        {/* Close Button */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs font-bold uppercase tracking-wider"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
