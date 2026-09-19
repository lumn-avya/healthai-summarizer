import React, { useState } from 'react';
import { UnifiedTimelineEvent, TimelineSource, IndianLanguage } from '../../types';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  History, 
  FileText, 
  Heart, 
  BookOpen, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface UnifiedLifeTimelineProps {
  events: UnifiedTimelineEvent[];
  language: IndianLanguage;
  onSelectReport?: (reportId: string) => void;
  onSelectOrganHighlight?: (organId: string) => void;
}

export const UnifiedLifeTimeline: React.FC<UnifiedLifeTimelineProps> = ({
  events,
  language,
  onSelectReport,
  onSelectOrganHighlight,
}) => {
  const t = getTranslation(language);
  const [sourceFilter, setSourceFilter] = useState<TimelineSource | 'all'>('all');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => {
    if (sourceFilter === 'all') return true;
    return e.source === sourceFilter;
  });

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  const getSourceIcon = (source: TimelineSource) => {
    switch (source) {
      case 'report':
        return <FileText className="w-4 h-4 text-brand-cyan" />;
      case 'vital':
        return <Heart className="w-4 h-4 text-brand-crimson" />;
      case 'journal':
        return <BookOpen className="w-4 h-4 text-brand-sage" />;
    }
  };

  const getSourceBadgeColor = (source: TimelineSource) => {
    switch (source) {
      case 'report':
        return 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30';
      case 'vital':
        return 'bg-brand-crimson/15 text-brand-crimson border-brand-crimson/30';
      case 'journal':
        return 'bg-brand-sage/15 text-brand-sage border-brand-sage/30';
    }
  };

  return (
    <section id="timeline" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// UNIFIED LIFE TIMELINE [#13 + #18]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">CHRONOLOGICAL LIFE STREAM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.timelineTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.timelineHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.timelineSubtitle}
        </p>
      </div>

      {/* Source Filter Buttons */}
      <div className="mb-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-brand-muted flex items-center gap-1 mr-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-brand-cyan" /> FILTER:
        </span>
        {[
          { id: 'all', label: t.allEvents },
          { id: 'report', label: t.labReports },
          { id: 'vital', label: t.homeVitals },
          { id: 'journal', label: t.symptomJournal },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => {
              sound.playClick();
              setSourceFilter(btn.id as any);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
              sourceFilter === btn.id
                ? 'bg-brand-cyan text-black font-black shadow-md shadow-brand-cyan/30'
                : 'bg-brand-surface border border-brand-border text-brand-sand hover:text-white'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-brand-cyan before:via-brand-crimson before:to-transparent">
        {filteredEvents.map((ev) => {
          const isExpanded = expandedEventId === ev.id;
          const eventDate = new Date(ev.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
          const eventTime = new Date(ev.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div key={ev.id} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-6 sm:-left-10 top-2 w-7 h-7 sm:w-10 sm:h-10 rounded-full glass-panel border border-brand-border flex items-center justify-center bg-brand-dark group-hover:scale-110 group-hover:border-brand-cyan transition-all z-10 shadow-lg">
                {getSourceIcon(ev.source)}
              </div>

              {/* Event Content Box */}
              <div className="p-6 rounded-2xl glass-panel border border-brand-border hover:border-brand-cyan/40 transition-all bg-[#0D1830] shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[11px] font-mono border font-bold ${getSourceBadgeColor(
                        ev.source
                      )}`}
                    >
                      {ev.badge}
                    </span>
                    <span className="text-xs font-mono text-brand-muted">
                      {eventDate} at {eventTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {ev.status === 'watch' && (
                      <span className="text-[10px] font-mono text-brand-amber bg-brand-amber/15 px-2.5 py-0.5 rounded font-bold">
                        OBSERVE
                      </span>
                    )}
                    <button
                      onClick={() => toggleExpand(ev.id)}
                      className="text-brand-muted hover:text-white p-1"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div
                  className="mt-3 cursor-pointer"
                  onClick={() => toggleExpand(ev.id)}
                >
                  <h3 className="text-lg font-bold font-display text-brand-bone group-hover:text-brand-cyan transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-muted mt-1">
                    {ev.subtitle}
                  </p>
                </div>

                {/* Expandable Details Container */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs font-mono text-brand-sand">
                    {ev.source === 'report' && ev.details && (
                      <div className="space-y-2">
                        <div className="p-4 rounded-xl bg-white/5 text-brand-sand leading-relaxed">
                          {ev.details.summary}
                        </div>
                        {ev.reportId && onSelectReport && (
                          <button
                            onClick={() => onSelectReport(ev.reportId!)}
                            className="inline-flex items-center gap-1.5 text-xs text-brand-cyan underline font-bold"
                          >
                            View Extracted Parameter Breakdown <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {ev.source === 'vital' && ev.details && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {ev.details.systolicBp && (
                          <div className="p-3 rounded-lg bg-white/5">
                            <span className="text-brand-muted text-[10px] block">BP</span>
                            <span className="text-brand-bone font-bold">{ev.details.systolicBp}/{ev.details.diastolicBp} mmHg</span>
                          </div>
                        )}
                        {ev.details.glucose && (
                          <div className="p-3 rounded-lg bg-white/5">
                            <span className="text-brand-muted text-[10px] block">GLUCOSE</span>
                            <span className="text-brand-bone font-bold">{ev.details.glucose} mg/dL</span>
                          </div>
                        )}
                        {ev.details.heartRate && (
                          <div className="p-3 rounded-lg bg-white/5">
                            <span className="text-brand-muted text-[10px] block">PULSE</span>
                            <span className="text-brand-bone font-bold">{ev.details.heartRate} bpm</span>
                          </div>
                        )}
                        {ev.details.weightKg && (
                          <div className="p-3 rounded-lg bg-white/5">
                            <span className="text-brand-muted text-[10px] block">WEIGHT</span>
                            <span className="text-brand-bone font-bold">{ev.details.weightKg} kg</span>
                          </div>
                        )}
                      </div>
                    )}

                    {ev.source === 'journal' && ev.details && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {ev.details.contextTags?.map((tag: string, i: number) => (
                            <span key={i} className="px-2.5 py-0.5 rounded text-[10px] bg-white/10 text-brand-bone font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="p-4 rounded-xl bg-white/5 italic text-brand-bone">
                          "{ev.details.patientNote}"
                        </p>
                        {ev.organHighlight && onSelectOrganHighlight && (
                          <button
                            onClick={() => onSelectOrganHighlight(ev.organHighlight!)}
                            className="inline-flex items-center gap-1.5 text-xs text-brand-cyan underline font-bold"
                          >
                            Inspect Affected Body Region in 3D Anatomy <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
