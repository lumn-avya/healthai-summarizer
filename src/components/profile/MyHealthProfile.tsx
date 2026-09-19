import React, { useState } from 'react';
import { PatientProfile } from '../../types';
import { store } from '../../services/storage';
import { api } from '../../services/api';
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
  AlertCircle,
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

  const handleSave = async () => {
    sound.playOrganSelect();
    try {
      const saved = await api.updateProfile(profile);
      store.updateProfile(saved as PatientProfile);
      onProfileUpdated(saved as PatientProfile);
    } catch (error) {
      console.error('Profile update failed:', error);
      store.updateProfile(profile);
      onProfileUpdated(profile);
    }
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
              <Check className="w-3.5 h-3.5" /> Saved
            </span>
          )}
          <button
            onClick={() => setIsEditing((v) => !v)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-brand-border text-brand-bone text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-all"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-brand-cyan text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-brand-cyan-bright transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2 text-sm">
              <span className="text-brand-muted font-mono text-[11px] uppercase tracking-[0.2em]">Name</span>
              <input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2.5 text-brand-bone focus:outline-none focus:border-brand-cyan"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-brand-muted font-mono text-[11px] uppercase tracking-[0.2em]">Age</span>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                disabled={!isEditing}
                className="w-full bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2.5 text-brand-bone focus:outline-none focus:border-brand-cyan"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-brand-muted font-mono text-[11px] uppercase tracking-[0.2em]">Gender</span>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as PatientProfile['gender'] })}
                disabled={!isEditing}
                className="w-full bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2.5 text-brand-bone focus:outline-none focus:border-brand-cyan"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-brand-muted font-mono text-[11px] uppercase tracking-[0.2em]">Blood Group</span>
              <input
                value={profile.bloodGroup}
                onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2.5 text-brand-bone focus:outline-none focus:border-brand-cyan"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-brand-muted font-mono text-[11px] uppercase tracking-[0.2em]">Location</span>
              <input
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                disabled={!isEditing}
                className="w-full bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2.5 text-brand-bone focus:outline-none focus:border-brand-cyan"
              />
            </label>
            <label className="space-y-2 text-sm md:col-span-2">
              <span className="text-brand-muted font-mono text-[11px] uppercase tracking-[0.2em]">About You</span>
              <textarea
                value={profile.aboutNote}
                onChange={(e) => setProfile({ ...profile, aboutNote: e.target.value })}
                disabled={!isEditing}
                rows={4}
                className="w-full bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2.5 text-brand-bone focus:outline-none focus:border-brand-cyan"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-brand-cyan font-mono text-[11px] uppercase tracking-[0.2em]">
              <ShieldAlert className="w-4 h-4" /> Medical Overview
            </div>
            <div className="mt-4 space-y-3 text-sm text-brand-sand">
              <div className="flex items-center gap-3"><User className="w-4 h-4 text-brand-cyan" /> {profile.name}</div>
              <div className="flex items-center gap-3"><Pill className="w-4 h-4 text-brand-cyan" /> {profile.ongoingMedications.length} active medications</div>
              <div className="flex items-center gap-3"><HeartHandshake className="w-4 h-4 text-brand-cyan" /> Emergency contact: {profile.emergencyContact.name}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-brand-cyan font-mono text-[11px] uppercase tracking-[0.2em]">Allergies</span>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add allergy"
                    className="bg-[#0D1629] border border-brand-border rounded-lg px-2 py-1.5 text-xs text-brand-bone"
                  />
                  <button onClick={handleAddAllergy} className="p-1.5 rounded-lg bg-brand-cyan text-black"><Plus className="w-3.5 h-3.5" /></button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {profile.allergies.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-sand">
                  <span>{item}</span>
                  {isEditing && <button onClick={() => handleRemoveAllergy(idx)} className="text-brand-crimson"><Trash2 className="w-4 h-4" /></button>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-brand-cyan font-mono text-[11px] uppercase tracking-[0.2em]">Chronic Conditions</span>
              {isEditing && (
                <div className="flex items-center gap-2">
                  <input
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add condition"
                    className="bg-[#0D1629] border border-brand-border rounded-lg px-2 py-1.5 text-xs text-brand-bone"
                  />
                  <button onClick={handleAddCondition} className="p-1.5 rounded-lg bg-brand-cyan text-black"><Plus className="w-3.5 h-3.5" /></button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {profile.chronicConditions.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#0D1629] border border-brand-border rounded-xl px-3 py-2 text-sm text-brand-sand">
                  <span>{item}</span>
                  {isEditing && <button onClick={() => handleRemoveCondition(idx)} className="text-brand-crimson"><Trash2 className="w-4 h-4" /></button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
