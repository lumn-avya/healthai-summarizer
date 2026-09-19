import React, { useState } from 'react';
import { INITIAL_SPECIALISTS, ANATOMY_ORGANS } from '../../services/storage';
import { SpecialistDoctor, IndianLanguage } from '../../types';
import { sound } from '../../services/audio';
import { getTranslation } from '../../services/i18n';
import { 
  MapPin, 
  Phone, 
  Calendar, 
  Video, 
  Star, 
  Clock, 
  CheckCircle2, 
  Search,
  Filter,
  AlertCircle,
  Compass,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface SpecialistLocatorProps {
  filterOrganId?: string | null;
  onClearFilter?: () => void;
  language: IndianLanguage;
}

// Map coordinates simulation for the 5 clinics across the city
const CLINIC_MAP_COORDINATES: Record<string, { x: number; y: number; zone: string }> = {
  'doc-1': { x: 68, y: 44, zone: 'Indiranagar / Old Airport Rd' },
  'doc-2': { x: 54, y: 68, zone: 'Koramangala 5th Block' },
  'doc-3': { x: 42, y: 32, zone: 'Cunningham Rd / Vasanth Nagar' },
  'doc-4': { x: 38, y: 16, zone: 'Hebbal / Bellary Rd' },
  'doc-5': { x: 62, y: 82, zone: 'HSR Layout Sector 3' },
};

export const SpecialistLocator: React.FC<SpecialistLocatorProps> = ({
  filterOrganId,
  onClearFilter,
  language,
}) => {
  const t = getTranslation(language);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxDistance, setMaxDistance] = useState<number>(20);
  const [teleconsultOnly, setTeleconsultOnly] = useState<boolean>(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('doc-1');
  const [bookingSuccessDoctor, setBookingSuccessDoctor] = useState<SpecialistDoctor | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(1);

  const activeOrgan = filterOrganId 
    ? ANATOMY_ORGANS.find(o => o.id === filterOrganId)
    : null;

  const filteredDoctors = INITIAL_SPECIALISTS.filter((doc) => {
    if (filterOrganId && !doc.matchingOrgans.includes(filterOrganId)) {
      return false;
    }
    if (searchTerm.trim()) {
      const matchSearch =
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
    }
    if (doc.distanceKm > maxDistance) return false;
    if (teleconsultOnly && !doc.teleconsultAvailable) return false;

    return true;
  });

  const selectedDoctor = INITIAL_SPECIALISTS.find(d => d.id === selectedDoctorId) || filteredDoctors[0] || INITIAL_SPECIALISTS[0];

  const handleSelectPin = (doc: SpecialistDoctor) => {
    sound.playOrganSelect();
    setSelectedDoctorId(doc.id);
  };

  const handleBookSlot = (doc: SpecialistDoctor) => {
    sound.playClick();
    setBookingSuccessDoctor(doc);
  };

  return (
    <section id="specialists" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// {t.mapPinTitle} [RD-4]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson animate-ping" />
            <span className="text-xs font-mono text-brand-muted">GPS CLINICAL TRIANGULATION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.specialistLocatorTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.specialistLocatorHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.specialistLocatorSubtitle}
        </p>
      </div>

      {/* Active Organ Filter Banner */}
      {activeOrgan && (
        <div className="mb-8 p-5 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/40 flex items-center justify-between shadow-lg shadow-brand-cyan/10">
          <div className="flex items-center gap-3.5">
            <span className="w-3.5 h-3.5 rounded-full bg-brand-crimson animate-ping" />
            <div>
              <div className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-bold">
                MAPPED FROM 3D ANATOMY: {activeOrgan.name.toUpperCase()}
              </div>
              <div className="text-xs text-brand-bone">
                Pinpointing verified specialists for: <strong className="text-brand-cyan">{activeOrgan.specialistType}</strong>
              </div>
            </div>
          </div>
          {onClearFilter && (
            <button
              onClick={() => {
                sound.playClick();
                onClearFilter();
              }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-brand-bone transition-colors"
            >
              Show All Specialists
            </button>
          )}
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-cyan" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchDoctorPlaceholder}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-brand-bone placeholder:text-brand-muted font-mono text-xs focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>

        <div className="md:col-span-3 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone">
          <Filter className="w-4 h-4 text-brand-cyan shrink-0" />
          <div className="flex-1 flex items-center justify-between">
            <span className="text-brand-muted">{t.maxRadius}:</span>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="bg-transparent text-brand-cyan font-bold focus:outline-none cursor-pointer"
            >
              <option value={5} className="bg-brand-card">Within 5 km</option>
              <option value={10} className="bg-brand-card">Within 10 km</option>
              <option value={20} className="bg-brand-card">Within 20 km</option>
              <option value={50} className="bg-brand-card">All Metro</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-3 flex items-center justify-between px-4 py-3.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone">
          <span className="flex items-center gap-2">
            <Video className="w-4 h-4 text-brand-sage" />
            {t.teleconsultation}
          </span>
          <button
            onClick={() => {
              sound.playClick();
              setTeleconsultOnly(!teleconsultOnly);
            }}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              teleconsultOnly ? 'bg-brand-cyan' : 'bg-white/15'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                teleconsultOnly ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Dual Grid: Interactive Clinical Map with Red Pins + Specialist Directory Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Interactive Visual City Map with Red Location Pins */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl glass-panel border border-brand-border bg-[#0B1326] p-4 sm:p-6 overflow-hidden relative shadow-2xl">
          {/* Map Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 z-10">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-sand">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-pulse" />
              <span className="font-bold text-brand-bone">{t.mapPinTitle}</span>
              <span className="text-white/20">|</span>
              <span className="text-brand-cyan">GPS GRID: 12.9716° N, 77.5946° E</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMapZoom(Math.min(1.4, mapZoom + 0.15))}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-brand-bone"
                title="Zoom in map"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMapZoom(Math.max(0.85, mapZoom - 0.15))}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-brand-bone"
                title="Zoom out map"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map Canvas Area */}
          <div className="relative w-full h-[380px] sm:h-[460px] my-4 rounded-xl overflow-hidden bg-[#0A1224] border border-white/5 transition-transform duration-300 select-none">
            {/* High-tech vector street grids */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#0A1224" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <rect width="100%" height="100%" fill="url(#mapGlow)" />
              
              {/* Major Highway / Ring Road vector paths */}
              <path d="M 20 180 Q 200 120 400 240 T 700 200" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeOpacity="0.4" />
              <path d="M 80 40 Q 260 220 380 440" fill="none" stroke="#38BDF8" strokeWidth="2" strokeOpacity="0.35" />
              <path d="M 280 20 Q 320 240 650 400" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.3" />
              
              {/* Concentric radar range rings from patient location */}
              <circle cx="50%" cy="50%" r="80" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />
              <circle cx="50%" cy="50%" r="160" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" />
            </svg>

            {/* Patient Location Center Marker (Indiranagar) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center animate-ping" />
              <div className="absolute w-3 h-3 rounded-full bg-brand-cyan border border-white" />
              <span className="mt-4 px-2 py-0.5 rounded bg-brand-dark/90 border border-brand-cyan/40 text-[10px] font-mono text-brand-cyan font-bold whitespace-nowrap shadow-lg">
                YOU ARE HERE (PATIENT)
              </span>
            </div>

            {/* RED LOCATION SYMBOL PINPOINTS FOR ALL DOCTORS */}
            {filteredDoctors.map((doc) => {
              const coords = CLINIC_MAP_COORDINATES[doc.id] || { x: 50, y: 50, zone: 'Central' };
              const isSelected = selectedDoctor.id === doc.id;

              return (
                <div
                  key={doc.id}
                  style={{
                    left: `${coords.x}%`,
                    top: `${coords.y}%`,
                  }}
                  onClick={() => handleSelectPin(doc)}
                  className="absolute -translate-x-1/2 -translate-y-full z-30 cursor-pointer group transition-all duration-300"
                >
                  {/* Radar pulse ring around red pin */}
                  <div className={`absolute -inset-3 rounded-full bg-brand-crimson/30 animate-ping ${isSelected ? 'opacity-100' : 'opacity-40'}`} />

                  {/* Bright Red Location Pin Icon */}
                  <div className={`relative flex flex-col items-center transition-transform duration-200 ${isSelected ? 'scale-125 z-40' : 'group-hover:scale-110'}`}>
                    <div className="w-9 h-9 rounded-full bg-brand-crimson border-2 border-white shadow-xl shadow-brand-crimson/60 flex items-center justify-center text-white">
                      <MapPin className="w-5 h-5 fill-white stroke-brand-crimson" />
                    </div>
                    {/* Pin tail point */}
                    <div className="w-2 h-2.5 bg-brand-crimson rotate-45 -mt-1 shadow-md border-r border-b border-white" />

                    {/* Pin Tag Label */}
                    <div className={`mt-1 px-2 py-1 rounded-md text-[10px] font-mono font-bold whitespace-nowrap border shadow-2xl transition-all ${
                      isSelected
                        ? 'bg-brand-crimson text-white border-white scale-105'
                        : 'bg-brand-surface/90 text-brand-bone border-white/10 group-hover:border-brand-crimson'
                    }`}>
                      {doc.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Map Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-brand-sand pt-3 border-t border-white/10 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-brand-crimson inline-block border border-white" />
                <span className="text-white font-bold">{t.mapPinSubtitle}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan inline-block" />
                <span>Patient Home Base</span>
              </span>
            </div>
            <div className="text-brand-cyan">CLICK ANY PIN TO INSPECT CLINIC</div>
          </div>
        </div>

        {/* Right: Selected Doctor Dossier & Quick Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#0E172B] shadow-2xl">
          <div>
            {/* Header Tag */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase text-brand-cyan tracking-wider">
                  SELECTED CLINIC DOSSIER
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-amber/15 text-brand-amber text-xs font-mono font-bold border border-brand-amber/30">
                <Star className="w-3 h-3 fill-brand-amber" />
                <span>{selectedDoctor.rating}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="mt-5">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-cyan font-bold">
                {selectedDoctor.specialty}
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-bone mt-1">
                {selectedDoctor.name}
              </h3>
              <p className="text-xs font-mono text-brand-muted mt-1">
                {selectedDoctor.degree} • {selectedDoctor.experienceYears} Years Clinical Experience
              </p>
            </div>

            {/* Hospital & Location */}
            <div className="mt-6 p-4 rounded-xl bg-brand-surface/70 border border-white/5 space-y-3">
              <div className="flex items-start gap-2 text-xs text-brand-sand">
                <MapPin className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-brand-bone text-sm">{selectedDoctor.hospital}</div>
                  <div className="text-brand-muted text-xs mt-0.5">{selectedDoctor.address}</div>
                  <div className="text-brand-cyan font-mono text-xs mt-1">
                    📍 {selectedDoctor.distanceKm} km from your registered residence
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-brand-sand pt-2 border-t border-white/5">
                <Clock className="w-3.5 h-3.5 text-brand-amber" />
                <span>{t.nextAvailable}: <strong>{selectedDoctor.nextSlot}</strong></span>
              </div>

              {selectedDoctor.teleconsultAvailable && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono text-brand-sage bg-brand-sage/10 border border-brand-sage/30">
                  <Video className="w-3.5 h-3.5" />
                  <span>Eligible for Instant Teleconsultation</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-brand-muted uppercase block">
                {t.consultationFee}
              </span>
              <span className="text-lg font-mono font-bold text-brand-bone">
                {selectedDoctor.consultationFee}
              </span>
            </div>

            <button
              onClick={() => handleBookSlot(selectedDoctor)}
              className="px-6 py-3 rounded-xl bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-lg shadow-brand-crimson/30 hover:scale-105 active:scale-95"
            >
              {t.bookSlot}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Dialog Modal */}
      {bookingSuccessDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl glass-panel p-6 border border-brand-cyan/50 bg-[#0E172B] shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-brand-sage/20 text-brand-sage flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-brand-bone">
              Consultation Slot Reserved
            </h3>
            <p className="text-sm text-brand-sand mt-2">
              Appointment request with <strong className="text-brand-bone">{bookingSuccessDoctor.name}</strong> at <strong className="text-brand-bone">{bookingSuccessDoctor.hospital}</strong> for {bookingSuccessDoctor.nextSlot} has been logged.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-white/5 text-left text-xs font-mono text-brand-muted space-y-1">
              <div>// CONFIRMATION CODE: APPT-HA-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>// PINPOINT VERIFIED: {CLINIC_MAP_COORDINATES[bookingSuccessDoctor.id]?.zone}</div>
            </div>
            <button
              onClick={() => setBookingSuccessDoctor(null)}
              className="mt-6 w-full py-3 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright text-black font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-lg shadow-brand-cyan/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
