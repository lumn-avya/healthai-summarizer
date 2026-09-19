import React, { useState } from 'react';
import { NotificationAlert } from '../../types';
import { store } from '../../services/storage';
import { api } from '../../services/api';
import { sound } from '../../services/audio';
import {
  Bell,
  Check,
  Calendar,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface NotificationCenterProps {
  alerts: NotificationAlert[];
  onActionClick: (target: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  alerts,
  onActionClick,
}) => {
  const [localAlerts, setLocalAlerts] = useState<NotificationAlert[]>(alerts);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkRead = async (id: string) => {
    sound.playClick();
    try {
      await api.markAlertRead(id);
    } catch (error) {
      console.error('Alert read update failed:', error);
      store.markAlertRead(id);
    }
    setLocalAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const filteredAlerts = localAlerts.filter((a) => {
    if (filter === 'unread') return !a.read;
    return true;
  });

  const unreadCount = localAlerts.filter((a) => !a.read).length;

  return (
    <section id="alerts" className="py-12 border-b border-brand-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono tracking-widest text-brand-crimson uppercase">
              // LAYER 6 • GENTLE ALERTS & NOTIFICATIONS [#28, #29]
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <span className="text-xs font-mono text-brand-muted">CALM PATIENT-FIRST GUIDANCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-bold tracking-tight text-brand-bone">
            Alerts & <span className="font-editorial-italic font-normal text-brand-gold">Gentle Notifications</span>
          </h2>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
              filter === 'all'
                ? 'bg-brand-crimson text-white font-bold'
                : 'bg-brand-surface border border-brand-border text-brand-sand'
            }`}
          >
            All ({localAlerts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-brand-crimson text-white font-bold'
                : 'bg-brand-surface border border-brand-border text-brand-sand'
            }`}
          >
            Unread {unreadCount > 0 && <span className="px-1.5 py-0.2 rounded-full bg-brand-gold text-black text-[10px] font-bold">{unreadCount}</span>}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              alert.read
                ? 'bg-[#101015] border-white/5 opacity-80'
                : 'bg-[#14141B] border-brand-crimson/30 shadow-lg shadow-brand-crimson/10'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.type === 'insight'
                    ? 'bg-brand-gold/15 text-brand-gold border border-brand-gold/30'
                    : alert.type === 'reminder'
                    ? 'bg-brand-crimson/15 text-brand-crimson border border-brand-crimson/30'
                    : 'bg-brand-sage/15 text-brand-sage border border-brand-sage/30'
                }`}
              >
                {alert.type === 'insight' && <Sparkles className="w-4 h-4" />}
                {alert.type === 'reminder' && <Calendar className="w-4 h-4" />}
                {alert.type === 'gentle-alert' && <ShieldCheck className="w-4 h-4" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold font-display text-brand-bone">{alert.title}</h4>
                  {!alert.read && <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse" />}
                </div>
                <p className="text-xs sm:text-sm text-brand-sand/90 mt-1 max-w-2xl leading-relaxed">{alert.message}</p>
                <div className="text-[11px] font-mono text-brand-muted mt-1.5">
                  {new Date(alert.timestamp).toLocaleDateString()} at{' '}
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              {alert.actionLabel && alert.actionTarget && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onActionClick(alert.actionTarget!);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-crimson hover:bg-brand-crimson-bright text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <span>{alert.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {!alert.read && (
                <button
                  onClick={() => handleMarkRead(alert.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-brand-muted hover:text-brand-sage transition-colors"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
