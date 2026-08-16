/**
 * THE DATA PILOT - ADVANCED THEME ENGINE v3.0
 * ---------------------------------------------------------
 * Custom-crafted palettes tuned for cyberDark (#0f172a background).
 * The 400–600 band drives dots, buttons, borders, eyebrow text.
 * Each hue is hand-picked — not pulled from Tailwind defaults.
 * ---------------------------------------------------------
 */

const THEMES = {
    // ── UTILITY / LEGACY ──────────────────────────────────────
    crimson:    { 50:"#fff0f2", 100:"#ffdddf", 200:"#ffb0b6", 300:"#ff7480", 400:"#fd3346", 500:"#e10b17", 600:"#c7000e", 700:"#a60009", 800:"#89050e", 900:"#740810" },
    blue:       { 50:"#eff6ff", 100:"#dbeafe", 200:"#bfdbfe", 300:"#93c5fd", 400:"#60a5fa", 500:"#3b82f6", 600:"#2563eb", 700:"#1d4ed8", 800:"#1e40af", 900:"#1e3a8a" },
    slate:      { 50:"#f8fafc", 100:"#f1f5f9", 200:"#e2e8f0", 300:"#cbd5e1", 400:"#94a3b8", 500:"#64748b", 600:"#475569", 700:"#334155", 800:"#1e293b",  900:"#0f172a" },
    gold:       { 50:"#fdfbf7", 100:"#f7f1e2", 200:"#eee1bc", 300:"#e1ca89", 400:"#d2ab56", 500:"#c28e33", 600:"#a87328", 700:"#875721", 800:"#6f461f",  900:"#5c3a1c" },
    oliveGreen: { 50:"#f4f7f2", 100:"#e5ece1", 200:"#ccdcc5", 300:"#a9c59f", 400:"#84aa76", 500:"#658a55", 600:"#4f6d42", 700:"#3e5634", 800:"#33452c",  900:"#2a3925" },

    // ── VIBRANT PREMIUM (hand-crafted for dark backgrounds) ───

    // volt — electric warm-purple. Think: deepspace lightning.
    // Signature tone for The Data Pilot. Hot at 400, electric at 500.
    volt: {
        50:  "#f7f0ff", 100: "#ede0ff", 200: "#dbc5ff",
        300: "#c09aff", 400: "#a468ff", 500: "#8845f0",
        600: "#7030d4", 700: "#5820ac", 800: "#421882", 900: "#30115e"
    },

    // aura — deep electric indigo-blue. Premium AI brand energy.
    // Cooler than volt, heavier gravity, like data flowing in space.
    aura: {
        50:  "#eef0ff", 100: "#dde1ff", 200: "#c0c8ff",
        300: "#929fff", 400: "#6070ff", 500: "#4050f5",
        600: "#2e3ce0", 700: "#222db8", 800: "#1a2394", 900: "#131972"
    },

    // ember — warm electric coral. Approachable, energetic, human.
    // The 400 reads orange-hot on dark; 500 anchors without going red.
    ember: {
        50:  "#fff4f0", 100: "#ffe6dc", 200: "#ffc9b0",
        300: "#ffa07c", 400: "#ff7045", 500: "#f5482a",
        600: "#d6301a", 700: "#b02010", 800: "#8a160a", 900: "#660f05"
    },

    // neonRose — electric hot pink. Bold, creative, unforgettable.
    // Inspired by neon studio signs. 400 nearly glows on dark navy.
    neonRose: {
        50:  "#fff0f7", 100: "#ffd4ed", 200: "#ffaad8",
        300: "#ff75be", 400: "#ff38a4", 500: "#e8178a",
        600: "#c2006e", 700: "#980055", 800: "#73003f", 900: "#53002e"
    },

    // plasma — electric royal blue. Clean, trustworthy, data-forward.
    // The 500 is a bespoke saturated cobalt — not the tired blue-500.
    plasma: {
        50:  "#eef4ff", 100: "#dde9ff", 200: "#bbd3ff",
        300: "#88b2ff", 400: "#4e87ff", 500: "#2262f5",
        600: "#154bd8", 700: "#0e39b5", 800: "#0a2b90", 900: "#071f6a"
    },

    // the7ai — kept, refined 400→ more electric on dark
    the7ai: {
        50:  "#f3f1ff", 100: "#ebe6ff", 200: "#d9cfff",
        300: "#bda8ff", 400: "#9b75ff", 500: "#6345ed",
        600: "#5732db", 700: "#4823bc", 800: "#3d1e9b", 900: "#331a7c"
    },

    // cyan — kept, 400 pushed brighter for dark BG punch
    cyan: {
        50:  "#ecfeff", 100: "#ccfbfe", 200: "#9af5fc",
        300: "#4eebf9", 400: "#0dd8f0", 500: "#06b6d4",
        600: "#0892b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63"
    }
};

// ============================================
// CONFIGURATION: GLOBAL ACTIVE STATE
// ============================================
window.LIVE_THEME = 'volt';    // Choose: volt, aura, ember, neonRose, plasma, the7ai, cyan | legacy: crimson, blue, slate, gold, oliveGreen
window.ACTIVE_VARIANT = 'cyberDark'; // Choose: light, cyberDark, glassmorphism, depth3D, minimal, midnight

const THEME_VARIANTS = {
    light: {
        '--bg-base': '#ffffff',
        '--bg-alt': '#f1f5f9',
        '--text-base': '#334155',
        '--surface-card': '#ffffff',
        '--surface-form': '#ffffff',
        '--nav-bg': 'rgba(255, 255, 255, 0.95)',
        '--border-color': '#e2e8f0',
        '--border-strong': '#cbd5e1',
        '--shadow-token': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        '--blur-token': '0px'
    },
    cyberDark: {
        '--bg-base': '#0f172a',
        '--bg-alt': '#1e293b',
        '--text-base': '#f8fafc',
        '--surface-card': 'rgba(30, 41, 59, 0.4)',
        '--surface-form': 'rgba(15, 23, 42, 0.6)',
        '--nav-bg': 'rgba(15, 23, 42, 0.85)',
        '--border-color': 'rgba(51, 65, 85, 0.5)',
        '--border-strong': 'rgba(71, 85, 105, 0.7)',
        '--shadow-token': '0 0 20px rgba(0, 0, 0, 0.3)',
        '--blur-token': '0px'
    },
    glassmorphism: {
        '--bg-base': '#f1f5f9',
        '--bg-alt': '#e2e8f0',
        '--text-base': '#1e293b',
        '--surface-card': 'rgba(255, 255, 255, 0.4)',
        '--surface-form': 'rgba(255, 255, 255, 0.7)',
        '--nav-bg': 'rgba(255, 255, 255, 0.6)',
        '--border-color': 'rgba(255, 255, 255, 0.5)',
        '--border-strong': 'rgba(203, 213, 225, 0.8)',
        '--shadow-token': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        '--blur-token': '12px'
    },
    depth3D: {
        '--bg-base': '#f3f4f6',
        '--bg-alt': '#e5e7eb',
        '--text-base': '#1f2937',
        '--surface-card': '#f3f4f6',
        '--surface-form': '#ffffff',
        '--nav-bg': '#f3f4f6',
        '--border-color': 'transparent',
        '--border-strong': '#d1d5db',
        '--shadow-token': '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff',
        '--blur-token': '0px'
    },
    minimal: {
        '--bg-base': '#ffffff',
        '--bg-alt': '#f9fafb',
        '--text-base': '#000000',
        '--surface-card': '#ffffff',
        '--surface-form': '#f8fafc',
        '--nav-bg': '#ffffff',
        '--border-color': '#000000',
        '--border-strong': '#000000',
        '--shadow-token': 'none',
        '--blur-token': '0px'
    },
    midnight: {
        '--bg-base': '#020617',
        '--bg-alt': '#0f172a',
        '--text-base': '#cbd5e1',
        '--surface-card': '#0f172a',
        '--surface-form': '#1e293b',
        '--nav-bg': 'rgba(2, 6, 23, 0.9)',
        '--border-color': '#1e293b',
        '--border-strong': '#334155',
        '--shadow-token': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        '--blur-token': '0px'
    }
};

// 1. INJECTION LOGIC
const root = document.documentElement;
const activeColors = THEMES[window.LIVE_THEME] || THEMES.cyan;
const activeVariantVars = THEME_VARIANTS[window.ACTIVE_VARIANT] || THEME_VARIANTS.light;

// Brand Colors
Object.keys(activeColors).forEach(key => {
    root.style.setProperty(`--brand-${key}`, activeColors[key]);
});

// Semantic Variables
Object.keys(activeVariantVars).forEach(key => {
    root.style.setProperty(key, activeVariantVars[key]);
});

// 2. TAILWIND CONFIGURATION EXTENSION
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: (window.ACTIVE_VARIANT === 'cyberDark' || window.ACTIVE_VARIANT === 'midnight') ? 'class' : 'media',
    theme: {
        extend: {
            colors: {
                brand: activeColors,
                secondary: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" },
                semantic: {
                    base: 'var(--bg-base)',
                    card: 'var(--surface-card)',
                    form: 'var(--surface-form)',
                    nav: 'var(--nav-bg)',
                    text: 'var(--text-base)',
                    border: 'var(--border-color)'
                }
            },
            boxShadow: {
                'theme': 'var(--shadow-token)',
                'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                '3d': 'var(--shadow-token)'
            },
            backdropBlur: {
                'theme': 'var(--blur-token)'
            },
            borderRadius: {
                'premium': '2rem',
                'minimal': '0px'
            }
        }
    }
};

// ============================================
// DYNAMIC FAVICON INJECTION
// ============================================
(function() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const theme = window.LIVE_THEME || 'crimson';
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            document.head.appendChild(link);
        }
        link.href = `assets/images/thedatapilot_logo_${theme}.png`;
    }
})();