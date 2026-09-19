/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          // Lando Norris + Healthcare Colors (Deep Slate, Clinical Cyan, Heartbeat Red, Vital Mint)
          dark: '#080E1A',
          obsidian: '#0B132B',
          surface: '#111D38',
          card: '#152244',
          hover: '#1B2C56',
          border: 'rgba(56, 189, 248, 0.12)',
          'border-strong': 'rgba(56, 189, 248, 0.35)',
          // Healthcare Primary & Accents
          cyan: '#06B6D4',
          'cyan-bright': '#22D3EE',
          'cyan-glow': 'rgba(6, 182, 212, 0.35)',
          teal: '#0D9488',
          blue: '#0284C7',
          crimson: '#EF4444', // Heartbeat Vital Red
          'crimson-bright': '#F87171',
          'crimson-glow': 'rgba(239, 68, 68, 0.35)',
          gold: '#F59E0B',
          bone: '#F8FAFC',
          sand: '#CBD5E1',
          muted: '#94A3B8',
          sage: '#10B981', // Vital Mint
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        editorial: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Cabinet Grotesk"', '"Syne"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.3s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'marquee': 'marquee 22s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.12)' },
          '28%': { transform: 'scale(1.02)' },
          '42%': { transform: 'scale(1.16)' },
          '70%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
