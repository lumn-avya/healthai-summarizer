import React, { useState, useEffect } from 'react';
import { IndianLanguage } from '../../types';
import { getTranslation, LANGUAGE_METADATA } from '../../services/i18n';
import { sound } from '../../services/audio';
import { 
  Volume2, 
  VolumeX, 
  Globe, 
  Menu, 
  X, 
  Activity, 
  ChevronRight,
  Heart
} from 'lucide-react';

interface EditorialHeaderProps {
  currentLanguage: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeSection,
  onNavigate,
}) => {
  const t = getTranslation(currentLanguage);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundEnabled(sound.enabled);
    if (sound.enabled) {
      sound.playClick();
    }
  };

  const navItems = [
    { id: 'dashboard', label: t.dashboard },
    { id: 'anatomy', label: t.anatomy3D },
    { id: 'intake', label: t.documents },
    { id: 'vitals', label: t.vitals },
    { id: 'journal', label: t.journal },
    { id: 'trends', label: t.trends },
    { id: 'specialists', label: t.specialists },
    { id: 'prep-kit', label: t.prepKit },
    { id: 'chatbot', label: t.aiChatbot },
    { id: 'packet-export', label: t.packetExport },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080E1A]/90 backdrop-blur-xl border-b border-brand-border/60 no-print">
      {/* Topmost telemetry micro-bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 border-b border-white/5 text-[11px] font-mono text-brand-muted">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
            <span className="text-brand-bone font-bold">HEALTHAI MATRIX</span>
          </div>
          <span className="text-white/20">|</span>
          <span>SYS_STATUS: ONLINE (9 LAYERS LOADED)</span>
          <span className="text-white/20">|</span>
          <span className="text-brand-sage font-bold">ALL SENSORS NOMINAL</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-brand-cyan font-bold">LOCAL CLOCK: {currentTime}</span>
          <span className="text-white/20">|</span>
          <span className="text-brand-bone">PATIENT: AARAV SHARMA (IND-098)</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo with Lando Norris Racing / Healthcare Energy */}
        <div 
          onClick={() => {
            sound.playClick();
            onNavigate('dashboard');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center text-black shadow-lg shadow-brand-cyan/25 group-hover:scale-105 transition-transform font-black">
            <Heart className="w-5 h-5 fill-black stroke-black" />
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tight text-brand-bone uppercase group-hover:text-brand-cyan transition-colors block leading-tight">
              HealthAI <span className="font-serif italic font-normal text-brand-cyan">Summarizer</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-brand-muted uppercase block">
              PATIENT HEALTH COMPANION
            </span>
          </div>
        </div>

        {/* Desktop Nav Items (Translated) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all relative ${
                  isActive
                    ? 'text-brand-cyan font-bold bg-brand-cyan/15 border border-brand-cyan/30'
                    : 'text-brand-sand hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className={`p-2.5 rounded-xl border text-xs transition-all ${
              soundEnabled
                ? 'bg-white/5 border-white/10 text-brand-cyan hover:border-brand-cyan'
                : 'bg-white/5 border-white/10 text-brand-muted'
            }`}
            title={soundEnabled ? 'Mute tactile UI sound' : 'Enable tactile UI sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Doctor Packet CTA */}
          <button
            onClick={() => {
              sound.playSwoosh();
              onNavigate('packet-export');
            }}
            className="hidden sm:flex px-4 py-2.5 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs font-black uppercase tracking-wider transition-all items-center gap-1.5 shadow-md shadow-brand-cyan/30 hover:scale-105"
          >
            <span>{t.packetExport}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl glass-panel text-brand-bone hover:text-brand-cyan transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1224] border-b border-brand-border p-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-xs font-mono text-left font-bold ${
                  activeSection === item.id
                    ? 'bg-brand-cyan text-black'
                    : 'bg-brand-surface text-brand-sand hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                sound.playSwoosh();
                onNavigate('packet-export');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-brand-cyan text-black font-mono text-xs uppercase font-black text-center tracking-wider"
            >
              {t.packetExport}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
