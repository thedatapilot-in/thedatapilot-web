/**
 * THE DATA PILOT - ADVANCED THEME ENGINE v2.5
 * ---------------------------------------------------------
 * This engine manages global design tokens and Tailwind extensions.
 * Added: Premium Gold, Modern Violet, Minimal Slate, Attention Amber.
 * Added: Glassmorphism, 3D Depth, Minimal, and Midnight variants.
 * ---------------------------------------------------------
 */

const THEMES = {
    // EXISTING THEMES (Preserved)
    crimson: { 50: "#fff0f2", 100: "#ffdddf", 200: "#ffb0b6", 300: "#ff7480", 400: "#fd3346", 500: "#e10b17", 600: "#c7000e", 700: "#a60009", 800: "#89050e", 900: "#740810" },
    cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63" },
    blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" },
    emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b" },
    indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81" },
    
    // NEW PROFESSIONAL & DYNAMIC THEMES
    crimsonRed: { 50: "#f8e6e9", 100: "#f1cdd3", 200: "#e49ba6", 300: "#d76a7a", 400: "#ca384d", 500: "#9b0021", 600: "#84001c", 700: "#6c0017", 800: "#550012", 900: "#3d000d" }, // Custom Crimson Red
    gold: { 50: "#fdfbf7", 100: "#f7f1e2", 200: "#eee1bc", 300: "#e1ca89", 400: "#d2ab56", 500: "#c28e33", 600: "#a87328", 700: "#875721", 800: "#6f461f", 900: "#5c3a1c" }, // Premium/Executive
    violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95" }, // Modern Tech
    slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" }, // Minimalist
    amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f" },  // Attention Grabbing
    the7ai: { 50: "#f3f1ff", 100: "#ebe6ff", 200: "#d9cfff", 300: "#bda8ff", 400: "#9b75ff", 500: "#6345ed", 600: "#5732db", 700: "#4823bc", 800: "#3d1e9b", 900: "#331a7c" },
    oliveGreen: { 50: "#f4f7f2", 100: "#e5ece1", 200: "#ccdcc5", 300: "#a9c59f", 400: "#84aa76", 500: "#658a55", 600: "#4f6d42", 700: "#3e5634", 800: "#33452c", 900: "#2a3925" } // Olive Green
};

// ============================================
// CONFIGURATION: GLOBAL ACTIVE STATE
// ============================================
window.LIVE_THEME = 'oliveGreen';    // Choose: crimson, crimsonRed, cyan, blue, emerald, indigo, gold, violet, slate, amber, the7ai, oliveGreen
window.ACTIVE_VARIANT = 'cyberDark'; // Choose: light, cyberDark, glassmorphism, depth3D, minimal, midnight

const THEME_VARIANTS = {
    light: {
        '--bg-base': '#ffffff',
        '--text-base': '#334155',
        '--surface-card': '#ffffff',
        '--surface-form': '#ffffff',
        '--nav-bg': 'rgba(255, 255, 255, 0.95)',
        '--border-color': '#e2e8f0',
        '--shadow-token': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        '--blur-token': '0px'
    },
    cyberDark: {
        '--bg-base': '#0f172a',
        '--text-base': '#f8fafc',
        '--surface-card': 'rgba(30, 41, 59, 0.4)',
        '--surface-form': 'rgba(15, 23, 42, 0.6)',
        '--nav-bg': 'rgba(15, 23, 42, 0.85)',
        '--border-color': 'rgba(51, 65, 85, 0.5)',
        '--shadow-token': '0 0 20px rgba(0, 0, 0, 0.3)',
        '--blur-token': '0px'
    },
    glassmorphism: {
        '--bg-base': '#f1f5f9',
        '--text-base': '#1e293b',
        '--surface-card': 'rgba(255, 255, 255, 0.4)',
        '--surface-form': 'rgba(255, 255, 255, 0.7)',
        '--nav-bg': 'rgba(255, 255, 255, 0.6)',
        '--border-color': 'rgba(255, 255, 255, 0.5)',
        '--shadow-token': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        '--blur-token': '12px'
    },
    depth3D: {
        '--bg-base': '#f3f4f6',
        '--text-base': '#1f2937',
        '--surface-card': '#f3f4f6',
        '--surface-form': '#ffffff',
        '--nav-bg': '#f3f4f6',
        '--border-color': 'transparent',
        '--shadow-token': '20px 20px 60px #cfd0d3, -20px -20px 60px #ffffff', // Soft Neumorphic depth
        '--blur-token': '0px'
    },
    minimal: {
        '--bg-base': '#ffffff',
        '--text-base': '#000000',
        '--surface-card': '#ffffff',
        '--surface-form': '#f8fafc',
        '--nav-bg': '#ffffff',
        '--border-color': '#000000',
        '--shadow-token': 'none',
        '--blur-token': '0px'
    },
    midnight: {
        '--bg-base': '#020617', // Blacker than CyberDark
        '--text-base': '#cbd5e1',
        '--surface-card': '#0f172a',
        '--surface-form': '#1e293b',
        '--nav-bg': 'rgba(2, 6, 23, 0.9)',
        '--border-color': '#1e293b',
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