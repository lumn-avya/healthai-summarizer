import React, { useState } from 'react';
import { PatientProfile } from '../../types';
import { store } from '../../services/storage';
import { sound } from '../../services/audio';
import { 
  User, 
  Pill, 
  ShieldAlert, 
  Save, 
  Plus, 
  Trash2, 
  HeartHandshake, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface MyHealthProfileProps {
  initialProfile: PatientProfile;
  onProfileUpdated: (profile: PatientProfile) => void;
}

export const MyHealthProfile: React.FC<MyHealthProfileProps> = ({
  initialProfile,
  onProfileUpdated,
}) => {
  const [profile, setProfile] = useState<PatientProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');

  const handleSave = () => {
    sound.playOrganSelect();
    store.updateProfile(profile);
    onProfileUpdated(profile);
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      sound.playClick();
      setProfile({
        ...profile,
        allergies: [...profile.allergies, newAllergy.trim()],
      });
      setNewAllergy('');
    }
  };

  const handleRemoveAllergy = (idx: number) => {
    sound.playClick();
    setProfile({
      ...profile,
      allergies: profile.allergies.filter((_, i) => i !== idx),
    });
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      sound.playClick();
      setProfile({
        ...profile,
        chronicConditions: [...profile.chronicConditions, newCondition.trim()],
      });
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (idx: number) => {
    sound.playClick();
    setProfile({
      ...profile,
      chronicConditions: profile.chronicConditions.filter((_, i) => i !== idx),
    });
  };

  return (
    <section id="profile" className="py-12 border-b border-brand-border">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono tracking-widest text-brand-crimson uppercase">
              // LAYER 3.1 • PERSONAL PROFILE & BASELINE [#12]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-xs font-mono text-brand-muted">PATIENT PROFILE & MEDICAL ID</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-bold tracking-tight text-brand-bone">
            My Health <span className="font-editorial-italic font-normal text-brand-gold">Profile</span>
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          {savedToast && (
            <span className="text-xs font-mono text-brand-sage flex items-center gap-1">
              <Check className="w-4 h-4" /> Profile Updated
            </span>
          )}
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                sound.playClick();
                setIsEditing(true);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-crimson hover:bg-brand-crimson-bright text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-brand-crimson/25"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" /> Save Profile
              </>
            ) : (
              'Edit Profile & Meds'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Demographics & About */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-[#121217]">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="w-12 h-12 rounded-full bg-brand-crimson/20 border border-brand-crimson flex items-center justify-center text-brand-crimson">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-brand-bone">
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-brand-muted">
                  DOB: {profile.dob} • Age {profile.age} • {profile.bloodGroup}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[10px] font-mono text-brand-muted uppercase block">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone"
                  />
                ) : (
                  <p className="text-xs font-mono text-brand-bone">{profile.location}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-mono text-brand-muted uppercase block">
                  About My Health (Free Text Note)
                </label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={profile.aboutNote}
                    onChange={(e) => setProfile({ ...profile, aboutNote: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone resize-none"
                  />
                ) : (
                  <p className="text-xs text-brand-sand leading-relaxed mt-1">
                    {profile.aboutNote}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/5">
                <label className="text-[10px] font-mono text-brand-muted uppercase block">
                  Emergency Contact
                </label>
                <div className="text-xs font-mono text-brand-bone mt-0.5">
                  {profile.emergencyContact.name} ({profile.emergencyContact.relation}) —{' '}
                  <span className="text-brand-gold">{profile.emergencyContact.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Allergies & Conditions */}
          <div className="p-6 rounded-2xl glass-panel border border-brand-border bg-[#121217] space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-amber font-bold uppercase mb-2">
                <ShieldAlert className="w-4 h-4" /> Known Allergies & Sensitivities
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.allergies.map((allergy, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-brand-amber/15 border border-brand-amber/30 text-brand-bone flex items-center gap-1.5"
                  >
                    {allergy}
                    {isEditing && (
                      <button onClick={() => handleRemoveAllergy(idx)}>×</button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add allergy..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone"
                  />
                  <button
                    onClick={handleAddAllergy}
                    className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-gold font-bold uppercase mb-2">
                <HeartHandshake className="w-4 h-4" /> Chronic Conditions Managed
              </div>
              <div className="space-y-1.5">
                {profile.chronicConditions.map((cond, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-brand-sand flex items-center justify-between"
                  >
                    <span>{cond}</span>
                    {isEditing && (
                      <button onClick={() => handleRemoveCondition(idx)}>×</button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add condition..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs font-mono text-brand-bone"
                  />
                  <button
                    onClick={handleAddCondition}
                    className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-mono"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Ongoing Medications */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-brand-border bg-[#121217] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-brand-crimson" />
                  <h3 className="text-xl font-bold font-display text-brand-bone">
                    Ongoing Prescribed Medications
                  </h3>
                </div>
                <span className="text-xs font-mono text-brand-muted">
                  {profile.ongoingMedications.length} ACTIVE
                </span>
              </div>

              <div className="space-y-3">
                {profile.ongoingMedications.map((med, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-border-strong transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-mono text-brand-bone">
                          {med.name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-brand-gold">
                          {med.timing}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-brand-muted mt-1">
                        {med.dosage} • {med.frequency}
                      </div>
                      <p className="text-xs text-brand-sand/80 mt-1">
                        Purpose: {med.purpose}
                      </p>
                    </div>

                    <div className="text-right sm:text-left">
                      <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono bg-brand-sage/10 text-brand-sage border border-brand-sage/20">
                        Physician Prescribed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] font-mono text-brand-muted flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>
                Medications are referenced during AI report summarization and exported into the 60-second Doctor Visit Packet for clinical safety check.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
