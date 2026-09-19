import React from 'react';
import { IndianLanguage } from '../../types';
import { LANGUAGE_METADATA } from '../../services/i18n';
import { sound } from '../../services/audio';
import { Globe } from 'lucide-react';

interface MultilingualBarProps {
  currentLanguage: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
}

export const MultilingualBar: React.FC<MultilingualBarProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = Object.keys(LANGUAGE_METADATA) as IndianLanguage[];

  return (
    <div className="py-2.5 px-4 rounded-xl glass-panel border border-brand-border bg-brand-surface/70 flex items-center justify-between overflow-x-auto gap-3 scrollbar-none">
      <div className="flex items-center gap-2 text-xs font-mono text-brand-muted shrink-0">
        <Globe className="w-3.5 h-3.5 text-brand-gold" />
        <span className="hidden sm:inline">INDIAN REGIONAL LANGUAGES:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {languages.map((lang) => {
          const meta = LANGUAGE_METADATA[lang];
          const isSelected = currentLanguage === lang;
          return (
            <button
              key={lang}
              onClick={() => {
                sound.playClick();
                onLanguageChange(lang);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-crimson text-white font-bold shadow-sm shadow-brand-crimson/30'
                  : 'bg-white/5 hover:bg-white/10 text-brand-sand border border-white/5'
              }`}
            >
              <span>{meta.flag}</span>
              <span className="font-sans font-medium">{meta.nativeName}</span>
              <span className="text-[10px] opacity-60">({meta.name})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
