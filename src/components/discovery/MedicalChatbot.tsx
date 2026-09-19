import React, { useState, useRef, useEffect } from 'react';
import { store } from '../../services/storage';
import { sound } from '../../services/audio';
import { speakText, stopSpeaking, getTranslation } from '../../services/i18n';
import { IndianLanguage } from '../../types';
import { 
  Bot, 
  Send, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Sparkles, 
  MapPin, 
  Activity,
  User,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundedSource?: string;
  linksToOrgan?: string;
}

interface MedicalChatbotProps {
  language: IndianLanguage;
  onNavigateToAnatomy?: () => void;
  onNavigateToSpecialists?: () => void;
}

export const MedicalChatbot: React.FC<MedicalChatbotProps> = ({
  language,
  onNavigateToAnatomy,
  onNavigateToSpecialists,
}) => {
  const t = getTranslation(language);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Hello Aarav. I am your grounded HealthAI companion. I can help explain medical terms from your uploaded reports, summarize your vitals history, and organize questions for your physician.\n\n*Reminder: I do not diagnose conditions or prescribe medications. For clinical advice, always consult a licensed doctor.*',
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    'Explain my HbA1c (5.8%) in simple terms',
    'Are my kidneys functioning well according to tests?',
    'Summarize my L4-L5 MRI scan in plain words',
    'How is my blood pressure trending this month?',
    'What should I ask my cardiologist at the next visit?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      sound.playSwoosh();
      const reply = generateGroundedReply(text.trim());
      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  const generateGroundedReply = (query: string): ChatMessage => {
    const q = query.toLowerCase();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('hba1c') || q.includes('sugar') || q.includes('glucose')) {
      return {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'Your August 14 lab test reported a Fasting Blood Sugar of 108 mg/dL (slightly above the 70–99 normal band) and an HbA1c of 5.8%. In everyday language, HbA1c reflects your average blood sugar over the last 90 days. A value of 5.8% sits in the "pre-diabetes" range (5.7% to 6.4%). Positively, your 6-month trend shows improvement from 6.2% in February.',
        groundedSource: 'Source: Anand Labs Metabolic Panel (14-Aug-2026)',
        timestamp: now,
        linksToOrgan: 'liver',
      };
    }

    if (q.includes('kidney') || q.includes('creatinine') || q.includes('renal')) {
      return {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'Your Serum Creatinine was measured at 1.02 mg/dL on August 14 (standard reference: 0.70 to 1.20 mg/dL), and your Estimated GFR is 88 mL/min/1.73m² (well above the >60 benchmark). This confirms that your kidneys are filtering waste cleanly and handling your daily Telmisartan smoothly.',
        groundedSource: 'Source: Renal Profile (14-Aug-2026)',
        timestamp: now,
        linksToOrgan: 'kidneys',
      };
    }

    if (q.includes('mri') || q.includes('spine') || q.includes('back') || q.includes('l4-l5')) {
      return {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'Your July 19 MRI of the Lumbar Spine reported mild "disc desiccation" (natural moisture loss in the disc cushion) at the L4-L5 level with a mild broad-based bulge. Crucially, the radiologist observed NO significant spinal cord pinching or nerve root compression. It is consistent with mechanical strain rather than surgical concern.',
        groundedSource: 'Source: Aarthi Scans MRI Lumbar Spine (19-Jul-2026)',
        timestamp: now,
        linksToOrgan: 'spine',
      };
    }

    if (q.includes('blood pressure') || q.includes('bp') || q.includes('heart') || q.includes('telmisartan')) {
      return {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: 'Looking across your 6 home vitals logs this month, your Blood Pressure is averaging 124 / 80 mmHg (ranging from 121/78 to 130/84). This demonstrates steady control with your morning Telmisartan 40mg. Resting heart rate is also calm, averaging 71 bpm.',
        groundedSource: 'Source: Home Vitals Log (Sept 2026)',
        timestamp: now,
        linksToOrgan: 'heart',
      };
    }

    return {
      id: `a-${Date.now()}`,
      sender: 'assistant',
      text: 'I can provide information based strictly on your uploaded medical reports, logged vitals, and journal. If you are feeling discomfort, please explore the 3D Anatomy Explorer to map the body area, or connect directly with an accredited specialist on the Interactive Map. For any acute discomfort, seek immediate medical care.',
      groundedSource: 'Safety Policy: Layman Non-Diagnostic Rule 7.4',
      timestamp: now,
    };
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, language);
      setTimeout(() => setIsSpeaking(false), 8000);
    }
  };

  return (
    <section id="chatbot" className="py-20 sm:py-24 border-b border-brand-border/60">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded bg-brand-cyan/15 text-brand-cyan text-xs font-mono font-bold tracking-widest uppercase border border-brand-cyan/30 ln-badge-skew">
              <span>// MEDICAL AI ASSISTANT [RD-3]</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson" />
            <span className="text-xs font-mono text-brand-muted">DATA-GROUNDED COMPANION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-bone">
            {t.chatbotTitle} <span className="text-brand-cyan italic font-serif font-normal">{t.chatbotHighlight}</span>
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm text-brand-sand max-w-md leading-relaxed">
          {t.chatbotSubtitle}
        </p>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl glass-panel border border-brand-border bg-[#0D1830] overflow-hidden flex flex-col h-[600px] shadow-2xl">
        {/* Chat Top Banner */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#111F3D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center">
              <Bot className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-brand-bone flex items-center gap-2">
                <span>HEALTHAI GROUNDED ASSISTANT</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-brand-sage/20 text-brand-sage border border-brand-sage/30 font-bold">
                  SAFETY PROTOCOLS ON
                </span>
              </div>
              <div className="text-[11px] font-mono text-brand-muted">
                GROUNDED IN: 4 REPORTS • 6 VITALS • 3 JOURNAL LOGS
              </div>
            </div>
          </div>

          <button
            onClick={() => handleSpeak(messages[messages.length - 1]?.text || '')}
            className={`p-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
              isSpeaking
                ? 'bg-brand-cyan text-black border-brand-cyan font-bold animate-pulse'
                : 'bg-white/5 border-white/10 text-brand-sand hover:text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-cyan" />}
            <span className="hidden sm:inline font-bold">{isSpeaking ? 'Mute' : 'Voice Read'}</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-brand-cyan" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-cyan text-black font-medium rounded-tr-none shadow-lg shadow-brand-cyan/20'
                    : 'bg-brand-surface border border-brand-border text-brand-bone rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {m.groundedSource && (
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-brand-cyan flex items-center justify-between">
                    <span>{m.groundedSource}</span>
                    {m.linksToOrgan && onNavigateToAnatomy && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onNavigateToAnatomy();
                        }}
                        className="underline hover:text-white flex items-center gap-1 font-bold"
                      >
                        Inspect in 3D Anatomy <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[10px] font-mono text-right ${
                    m.sender === 'user' ? 'text-black/60' : 'text-brand-muted'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-brand-bone" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div className="px-4 py-2.5 border-t border-white/5 bg-[#0B152B] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono text-brand-cyan shrink-0 flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3" /> Suggested:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap bg-white/5 hover:bg-brand-cyan hover:text-black font-medium text-brand-sand border border-white/10 hover:border-brand-cyan transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 bg-brand-surface">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.chatPlaceholder}
              className="flex-1 px-4 py-3.5 rounded-xl bg-[#080E1C] border border-brand-border text-xs sm:text-sm font-mono text-brand-bone placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="px-6 py-3.5 rounded-xl bg-brand-cyan hover:bg-brand-cyan-bright disabled:opacity-40 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-brand-cyan/25"
            >
              <Send className="w-4 h-4" />
              <span>{t.send}</span>
            </button>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-brand-muted">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-brand-amber" />
              <span>{t.safetyNotice}</span>
            </div>
            <div className="hidden sm:block">
              PRESS ENTER TO SEND
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
