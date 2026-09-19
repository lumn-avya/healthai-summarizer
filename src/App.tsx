import React, { useState } from 'react';
import { store } from './services/storage';
import { 
  PatientProfile, 
  MedicalReport, 
  VitalEntry, 
  JournalEntry, 
  NotificationAlert, 
  IndianLanguage, 
  AnatomyOrgan 
} from './types';

// Layout & Core
import { EditorialHeader } from './components/layout/EditorialHeader';
import { HeroSection } from './components/layout/HeroSection';
import { MultilingualBar } from './components/discovery/MultilingualBar';

// Layers
import { MyHealthDashboard } from './components/dashboard/MyHealthDashboard';
import { AnatomyExplorer } from './components/anatomy/AnatomyExplorer';
import { DocumentUploader } from './components/intake/DocumentUploader';
import { UnifiedLifeTimeline } from './components/timeline/UnifiedLifeTimeline';
import { HomeVitalsTracker } from './components/vitals/HomeVitalsTracker';
import { SymptomJournal } from './components/journal/SymptomJournal';
import { HealthTrendsView } from './components/trends/HealthTrendsView';
import { SpecialistLocator } from './components/discovery/SpecialistLocator';
import { DoctorVisitPrepKit } from './components/discovery/DoctorVisitPrepKit';
import { MedicalChatbot } from './components/discovery/MedicalChatbot';
import { NotificationCenter } from './components/alerts/NotificationCenter';
import { HealthAISummaryCard } from './components/summary/HealthAISummaryCard';
import { MyHealthProfile } from './components/profile/MyHealthProfile';
import { DoctorVisitPacket } from './components/export/DoctorVisitPacket';
import { ReportDetailModal } from './components/intake/ReportDetailModal';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfile>(store.getProfile());
  const [reports, setReports] = useState<MedicalReport[]>(store.getReports());
  const [vitals, setVitals] = useState<VitalEntry[]>(store.getVitals());
  const [journal, setJournal] = useState<JournalEntry[]>(store.getJournal());
  const [alerts, setAlerts] = useState<NotificationAlert[]>(store.getAlerts());
  const [language, setLanguage] = useState<IndianLanguage>('en');
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Interactive cross-layer triggers
  const [selectedReportModal, setSelectedReportModal] = useState<MedicalReport | null>(null);
  const [specialistOrganFilter, setSpecialistOrganFilter] = useState<string | null>(null);
  const [prepKitOrgan, setPrepKitOrgan] = useState<AnatomyOrgan | null>(null);

  const timelineEvents = store.getUnifiedTimeline();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOrganToSpecialist = (organId: string) => {
    setSpecialistOrganFilter(organId);
    handleNavigate('specialists');
  };

  const handleOrganToPrepKit = (organ: AnatomyOrgan) => {
    setPrepKitOrgan(organ);
    handleNavigate('prep-kit');
  };

  const handleReportAdded = (newReport: MedicalReport) => {
    setReports(store.getReports());
    setSelectedReportModal(newReport);
  };

  const handleVitalLogged = (newVital: VitalEntry) => {
    setVitals(store.getVitals());
  };

  const handleJournalLogged = (newEntry: JournalEntry) => {
    setJournal(store.getJournal());
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-bone selection:bg-brand-cyan selection:text-black flex flex-col font-sans">
      {/* Top Editorial Floating HUD */}
      <EditorialHeader
        currentLanguage={language}
        onLanguageChange={setLanguage}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-24">
        {/* Hero Banner with Lando Norris Kinetic Racing Energy & Healthcare Colors */}
        <HeroSection
          language={language}
          onNavigate={handleNavigate}
        />

        {/* Indian Regional Languages Quick HUD (RD-2) */}
        <div className="pt-2">
          <MultilingualBar
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Layer 2: My Health Dashboard [#12] */}
        <MyHealthDashboard
          profile={profile}
          reports={reports}
          vitals={vitals}
          language={language}
          onNavigate={handleNavigate}
          onOpenReport={(rep) => setSelectedReportModal(rep)}
        />

        {/* Layer 1.5: 3D Interactive Anatomy Model [RD-5] */}
        <AnatomyExplorer
          language={language}
          onNavigateToSpecialists={handleOrganToSpecialist}
          onNavigateToPrepKit={handleOrganToPrepKit}
        />

        {/* Layer 1.5: Specialist Locator & Interactive Clinical Map with Red Pinpoints [RD-4] */}
        <SpecialistLocator
          filterOrganId={specialistOrganFilter}
          onClearFilter={() => setSpecialistOrganFilter(null)}
          language={language}
        />

        {/* Layer 1: Report & Document Intake + Multi-Page OCR [#1, #2, #3, #4] */}
        <DocumentUploader
          language={language}
          onUploadSuccess={handleReportAdded}
        />

        {/* Layer 3.2: Unified Life Timeline [#13 + #18] */}
        <UnifiedLifeTimeline
          events={timelineEvents}
          language={language}
          onSelectReport={(reportId) => {
            const matched = reports.find((r) => r.id === reportId);
            if (matched) setSelectedReportModal(matched);
          }}
          onSelectOrganHighlight={handleOrganToSpecialist}
        />

        {/* Layer 4: Home Vitals Tracker [#15, #16] */}
        <HomeVitalsTracker
          language={language}
          onVitalLogged={handleVitalLogged}
        />

        {/* Layer 4.3: Symptom & Wellness Journal [#17] */}
        <SymptomJournal
          language={language}
          onEntryLogged={handleJournalLogged}
        />

        {/* Layer 5: Time-Series Trends & Visualizations [#19, #20, #22, #24, #25] */}
        <HealthTrendsView
          vitals={vitals}
          language={language}
        />

        {/* Layer 1.5: Doctor Visit Prep Kit [RD-1] */}
        <DoctorVisitPrepKit
          initialOrgan={prepKitOrgan}
          language={language}
          onNavigateToPrint={() => handleNavigate('packet-export')}
        />

        {/* Layer 1.5: Medical Chatbot [RD-3] */}
        <MedicalChatbot
          language={language}
          onNavigateToAnatomy={() => handleNavigate('anatomy')}
          onNavigateToSpecialists={() => handleNavigate('specialists')}
        />

        {/* Layer 6: Gentle Alerts & Notification Center [#28, #29] */}
        <NotificationCenter
          alerts={alerts}
          onActionClick={handleNavigate}
        />

        {/* Layer 7: AI-Generated Health Summary & Safety [#33, #35, #36, #37, #38] */}
        <HealthAISummaryCard
          onNavigateToPrepKit={() => handleNavigate('prep-kit')}
        />

        {/* Layer 3.1: My Health Profile [#12] */}
        <MyHealthProfile
          initialProfile={profile}
          onProfileUpdated={setProfile}
        />

        {/* Layer 8: Doctor Visit Packet Export [#45] */}
        <DoctorVisitPacket
          profile={profile}
          reports={reports}
          vitals={vitals}
          journal={journal}
        />
      </main>

      {/* Modal for Report Detail Inspection */}
      <ReportDetailModal
        report={selectedReportModal}
        onClose={() => setSelectedReportModal(null)}
      />

      {/* Luxury Editorial Footer */}
      <footer className="w-full bg-[#060A14] border-t border-brand-border py-14 px-6 text-xs font-mono text-brand-muted no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-sm font-bold font-display uppercase text-brand-bone flex items-center gap-2">
              <span className="text-brand-cyan">⚡</span> HEALTHAI SUMMARIZER
            </div>
            <p className="mt-1 text-brand-sand max-w-md">
              Patient Health Companion & Discovery Hub. Powered by Three.js WebGL & Clinical GPS Mapping.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <span className="text-brand-cyan font-bold block mb-1">SAFETY PRINCIPLES</span>
              <p className="text-[11px] text-brand-muted">
                Non-diagnostic • Grounded data only • Local encrypted state
              </p>
            </div>
            <div className="text-right sm:text-right text-[11px]">
              <div>ENGINE: THREE.JS WEBGL // REACT 18 // VITE</div>
              <div className="text-brand-cyan font-bold mt-0.5">LANDO NORRIS KINETIC DESIGN // HEALTHCARE BLUEPRINT</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
