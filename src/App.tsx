import React, { useState } from 'react';
import { store } from './services/storage';
import { PatientProfile, MedicalReport, VitalEntry, NotificationAlert, IndianLanguage, AnatomyOrgan } from './types';

import { EditorialHeader } from './components/layout/EditorialHeader';
import { HeroSection } from './components/layout/HeroSection';
import { MultilingualBar } from './components/discovery/MultilingualBar';
import { MyHealthDashboard } from './components/dashboard/MyHealthDashboard';
import { AnatomyExplorer } from './components/anatomy/AnatomyExplorer';
import { DocumentUploader } from './components/intake/DocumentUploader';
import { UnifiedLifeTimeline } from './components/timeline/UnifiedLifeTimeline';
import { HealthTrendsView } from './components/trends/HealthTrendsView';
import { SpecialistLocator } from './components/discovery/SpecialistLocator';
import { DoctorVisitPrepKit } from './components/discovery/DoctorVisitPrepKit';
import { MedicalChatbot } from './components/discovery/MedicalChatbot';
import { NotificationCenter } from './components/alerts/NotificationCenter';
import { HealthAISummaryCard } from './components/summary/HealthAISummaryCard';
import { MyHealthProfile } from './components/profile/MyHealthProfile';
import { ReportDetailModal } from './components/intake/ReportDetailModal';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<PatientProfile>(store.getProfile());
  const [reports, setReports] = useState<MedicalReport[]>(store.getReports());
  const [vitals] = useState<VitalEntry[]>(store.getVitals());
  const [alerts] = useState<NotificationAlert[]>(store.getAlerts());
  const [language, setLanguage] = useState<IndianLanguage>('en');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedReportModal, setSelectedReportModal] = useState<MedicalReport | null>(null);
  const [specialistOrganFilter, setSpecialistOrganFilter] = useState<string | null>(null);
  const [prepKitOrgan, setPrepKitOrgan] = useState<AnatomyOrgan | null>(null);

  const timelineEvents = store.getUnifiedTimeline();

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  return (
    <div className="min-h-screen bg-brand-dark text-brand-bone selection:bg-brand-cyan selection:text-black flex flex-col font-sans">
      <EditorialHeader currentLanguage={language} onLanguageChange={setLanguage} activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-24">
        <HeroSection language={language} onNavigate={handleNavigate} />
        <div className="pt-2"><MultilingualBar currentLanguage={language} onLanguageChange={setLanguage} /></div>
        <MyHealthDashboard profile={profile} reports={reports} vitals={vitals} language={language} onNavigate={handleNavigate} onOpenReport={setSelectedReportModal} />
        <AnatomyExplorer language={language} onNavigateToSpecialists={handleOrganToSpecialist} onNavigateToPrepKit={handleOrganToPrepKit} />
        <SpecialistLocator filterOrganId={specialistOrganFilter} onClearFilter={() => setSpecialistOrganFilter(null)} language={language} />
        <DocumentUploader language={language} onUploadSuccess={handleReportAdded} />
        <UnifiedLifeTimeline events={timelineEvents} language={language} onSelectReport={(id) => setSelectedReportModal(reports.find((report) => report.id === id) || null)} onSelectOrganHighlight={handleOrganToSpecialist} />
        <HealthTrendsView vitals={vitals} language={language} />
        <DoctorVisitPrepKit initialOrgan={prepKitOrgan} language={language} />
        <MedicalChatbot language={language} onNavigateToAnatomy={() => handleNavigate('anatomy')} onNavigateToSpecialists={() => handleNavigate('specialists')} />
        <NotificationCenter alerts={alerts} onActionClick={handleNavigate} />
        <HealthAISummaryCard />
        <MyHealthProfile initialProfile={profile} onProfileUpdated={setProfile} />
      </main>
      <ReportDetailModal report={selectedReportModal} onClose={() => setSelectedReportModal(null)} />
      <footer className="w-full bg-[#060A14] border-t border-brand-border py-14 px-6 text-xs font-mono text-brand-muted no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div><div className="text-sm font-bold font-display uppercase text-brand-bone flex items-center gap-2"><span className="text-brand-cyan">⚡</span> HEALTHAI SUMMARIZER</div><p className="mt-1 text-brand-sand max-w-md">Patient Health Companion & Discovery Hub. Powered by Three.js WebGL & Clinical GPS Mapping.</p></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6"><div><span className="text-brand-cyan font-bold block mb-1">SAFETY PRINCIPLES</span><p className="text-[11px] text-brand-muted">Non-diagnostic • Grounded data only • Local encrypted state</p></div><div className="text-right text-[11px]"><div>ENGINE: THREE.JS WEBGL // REACT 18 // VITE</div><div className="text-brand-cyan font-bold mt-0.5">LANDO NORRIS KINETIC DESIGN // HEALTHCARE BLUEPRINT</div></div></div>
        </div>
      </footer>
    </div>
  );
};
