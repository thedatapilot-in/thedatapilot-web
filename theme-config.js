/**
 * THE DATA PILOT - CENTRAL THEME ENGINE
 * This file manages the Tailwind configuration and the global theming variables.
 * It is built to accommodate standard themes and future complex themes (like Cyber-Dark).
 */

const THEMES = {
    crimson: { 50: "#fff0f2", 100: "#ffdddf", 200: "#ffb0b6", 300: "#ff7480", 400: "#fd3346", 500: "#e10b17", 600: "#c7000e", 700: "#a60009", 800: "#89050e", 900: "#740810" },
    cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63" },
    blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" },
    emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b" },
    indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81" }
};

// ============================================
// ACTIVE GLOBAL THEME
// Change this value to switch the primary brand color globally
// ============================================
window.LIVE_THEME = 'crimson';

// Global Semantic Variants (Prepared for Future Cyber-Dark Implementations)
const THEME_VARIANTS = {
    light: {
        '--bg-base': '#ffffff',
        '--text-base': '#334155',
        '--surface-card': '#ffffff',
        '--surface-form': '#ffffff',
        '--nav-bg': 'rgba(255, 255, 255, 0.95)',
        '--border-glow': 'transparent',
        '--text-gradient-start': 'inherit',
        '--text-gradient-end': 'inherit',
    },
    cyberDark: {
        '--bg-base': '#0f172a', /* Deep navy/slate-900 */
        '--text-base': '#f8fafc',
        '--surface-card': 'rgba(15, 23, 42, 0.4)',
        '--surface-form': 'rgba(15, 23, 42, 0.6)',
        '--nav-bg': 'rgba(15, 23, 42, 0.8)',
        '--border-glow': 'rgba(6, 182, 212, 0.5)', /* Cyan glow ready */
        '--text-gradient-start': '#06b6d4', /* Cyan */
        '--text-gradient-end': '#10b981', /* Emerald */
    }
};

window.ACTIVE_VARIANT = 'light';

// 1. Inject CSS Variables into the root so standard CSS/Tailwind arbitrary variants can use them
const root = document.documentElement;
const activeColors = THEMES[window.LIVE_THEME];

// Inject brand colors
Object.keys(activeColors).forEach(key => {
    root.style.setProperty(`--brand-${key}`, activeColors[key]);
});

// Inject semantic variant layout colors (for Glassmorphism, Neon, etc.)
const activeVariantVars = THEME_VARIANTS[window.ACTIVE_VARIANT];
Object.keys(activeVariantVars).forEach(key => {
    root.style.setProperty(key, activeVariantVars[key]);
});

// 2. Setup standard Tailwind Configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: window.ACTIVE_VARIANT === 'cyberDark' ? 'class' : 'media',
    theme: {
        extend: {
            colors: {
                brand: activeColors,
                secondary: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" },
                surface: { 50: "#f8fafc", 100: "#f1f5f9" },
                semantic: {
                    base: 'var(--bg-base)',
                    card: 'var(--surface-card)',
                    form: 'var(--surface-form)',
                    nav: 'var(--nav-bg)'
                }
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            boxShadow: {
                'neon': '0 0 10px var(--border-glow), 0 0 20px var(--border-glow)'
            }
        }
    }
};
