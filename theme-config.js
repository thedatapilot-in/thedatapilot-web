/**
 * THE DATA PILOT - ADVANCED THEME ENGINE v3.0
 * ---------------------------------------------------------
 * Custom-crafted palettes tuned for cyberDark (#0f172a background).
 * The 400–600 band drives dots, buttons, borders, eyebrow text.
 * Each hue is hand-picked — not pulled from Tailwind defaults.
 * ---------------------------------------------------------
 */

const THEMES = {
    // ── VIBRANT PREMIUM (hand-crafted for dark backgrounds) ───
    crimson:    { 50:"#fff0f2", 100:"#ffdddf", 200:"#ffb0b6", 300:"#ff7480", 400:"#fd3346", 500:"#e10b17", 600:"#c7000e", 700:"#a60009", 800:"#89050e", 900:"#740810" },

    // volt — electric warm-purple. Think: deepspace lightning.
    // Signature tone for The Data Pilot. Hot at 400, electric at 500.
    volt: {
        50:  "#f7f0ff", 100: "#ede0ff", 200: "#dbc5ff",
        300: "#c09aff", 400: "#a468ff", 500: "#8845f0",
        600: "#7030d4", 700: "#5820ac", 800: "#421882", 900: "#30115e"
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

    // ── PREMIUM DATA PLATFORM PALETTE ───────────────────────────

    // nova — electric emerald. New Relic / Databricks growth-green.
    // Distinctive on dark; signals precision, health metrics, success.
    nova: {
        50:  "#edfff6", 100: "#d1ffea", 200: "#a3f5d2",
        300: "#5ee8b0", 400: "#1dd68a", 500: "#0eba72",
        600: "#089659", 700: "#077545", 800: "#065c37", 900: "#054a2d"
    },

    // arctic — ice-sapphire blue. Snowflake / cloud analytics DNA.
    // Cleaner, brighter, and airier than cyan — conveys data clarity.
    arctic: {
        50:  "#f0f9ff", 100: "#e0f2fe", 200: "#b9e6fe",
        300: "#7cd4fd", 400: "#36bbf7", 500: "#0ba4e8",
        600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e"
    },

    // ── BLUE · WHITE · VIOLET PREMIUM PALETTE ───────────────────

    // cobalt — prussian enterprise blue. Deep and authoritative.
    // More navy-anchored than plasma; reads as premium, serious, trusted.
    cobalt: {
        50:  "#eff4ff", 100: "#dce9ff", 200: "#b8d0ff",
        300: "#86acff", 400: "#3878f8", 500: "#1855d8",
        600: "#1242bc", 700: "#0e32a0", 800: "#0a2580", 900: "#071a62"
    },

    // ── COBALT FAMILY — midnight only ────────────────────────────

    // midnight — ultra-deep cobalt-navy. Near indigo. Mysterious premium.
    // Use when the brand needs to feel like deep space intelligence.
    midnight: {
        50:  "#eef0ff", 100: "#dde2ff", 200: "#bbc6ff",
        300: "#8898ff", 400: "#2050e8", 500: "#0f35b0",
        600: "#0a2898", 700: "#071e80", 800: "#051668", 900: "#040f52"
    },

    // ── WARM SPECTRUM ADDITIONS ──────────────────────────────────

    // amber — electric warm amber. Radiant sun energy, data insight.
    // Richer and more vibrant than legacy gold — pops vividly on dark navy.
    amber: {
        50:  "#fffbeb", 100: "#fef0c0", 200: "#fed880",
        300: "#fcb830", 400: "#f99800", 500: "#e07c00",
        600: "#c26000", 700: "#9e4c00", 800: "#7c3a02", 900: "#5e2c04"
    },

    // fuchsia — electric magenta. Between neonRose and violet — vivid luxury.
    // The loudest brand signal in the palette. Confident and unforgettable.
    fuchsia: {
        50:  "#fdf0ff", 100: "#fad0ff", 200: "#f5a0ff",
        300: "#ec60ff", 400: "#e020ff", 500: "#cc00ef",
        600: "#ac00cc", 700: "#8800a8", 800: "#680084", 900: "#4c0062"
    },

    // teal — electric blue-green. dbt / Metabase analytics clarity.
    // Bridges cyan's brightness with nova's green — clean data energy.
    teal: {
        50:  "#edfcfa", 100: "#ccf8f2", 200: "#98f0e4",
        300: "#54e0cc", 400: "#10cbb0", 500: "#00aa90",
        600: "#008870", 700: "#006c58", 800: "#005244", 900: "#003c32"
    },

    // indigo — electric deep indigo. Between aura's blue and volt's purple.
    // A bespoke cool-to-violet hybrid — not the tired Tailwind indigo.
    indigo: {
        50:  "#eef0ff", 100: "#dde0ff", 200: "#bbc2ff",
        300: "#8890ff", 400: "#4458ff", 500: "#2230e8",
        600: "#1820cc", 700: "#1018a8", 800: "#0c1288", 900: "#080e68"
    },

    // ── MULTI-ACCENT SHOWCASE THEMES ────────────────────────────

    // sunset — warm orange → rose gradient. Cinematic twilight energy.
    // Primary brand in amber-orange, accent glows rose-red — pure drama.
    sunset: {
        50:  "#fff7f0", 100: "#ffecd8", 200: "#ffd4b0",
        300: "#ffb070", 400: "#ff8030", 500: "#f06010",
        600: "#d04800", 700: "#a83600", 800: "#862a00", 900: "#661e00"
    },

    // neonGrid — lime → fuchsia gradient. Cyberpunk data terminal energy.
    // High-voltage contrast: lime signals speed, fuchsia accent shocks.
    neonGrid: {
        50:  "#f4ffe8", 100: "#e6ffc0", 200: "#ccff80",
        300: "#aaff30", 400: "#88e000", 500: "#68c000",
        600: "#50a000", 700: "#3c8000", 800: "#2c6200", 900: "#1e4c00"
    },
    // ── Multi-Glow Themes — 3 distinct colors per hover glow ──────────────
    prismatic: {
        50:  "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff",
        300: "#d8b4fe", 400: "#c084fc", 500: "#9333ea",
        600: "#7e22ce", 700: "#6b21a8", 800: "#4c1d95", 900: "#2e1065"
    },
    inferno: {
        50:  "#fff7ed", 100: "#ffedd5", 200: "#fed7aa",
        300: "#fdba74", 400: "#fb923c", 500: "#ea580c",
        600: "#c2410c", 700: "#9a3412", 800: "#7c2d12", 900: "#431407"
    },
    northern: {
        50:  "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0",
        300: "#6ee7b7", 400: "#34d399", 500: "#10b981",
        600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b"
    },
    cosmic: {
        50:  "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe",
        300: "#a5b4fc", 400: "#818cf8", 500: "#4f46e5",
        600: "#4338ca", 700: "#3730a3", 800: "#312e81", 900: "#1e1b4b"
    },
    toxicDream: {
        50:  "#f7fee7", 100: "#ecfccb", 200: "#d9f99d",
        300: "#bef264", 400: "#a3e635", 500: "#84cc16",
        600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314"
    }
};

// ============================================
// ACCENT COLORS — secondary gradient end-stops
// for multi-color and dual-tone themes.
// Consumed as var(--brand-accent) in CSS utilities.
// ============================================
const THEME_ACCENTS = {
    // Dramatic dual-hue (primary → contrasting accent)
    sunset:     '#f43f5e',   // rose-red   — orange → rose
    neonGrid:   '#d946ef',   // fuchsia    — lime → electric shock
    // Cross-tone accents — visible contrast per theme
    volt:       '#06b6d4',   // cyan       — purple → electric cyan
    crimson:    '#fbbf24',   // gold       — red → warm gold
    ember:      '#818cf8',   // periwinkle — orange → cool violet
    neonRose:   '#fbbf24',   // gold       — hot pink → warm gold
    fuchsia:    '#00d4e8',   // cyan       — magenta → electric cyan
    amber:      '#0ea5e9',   // sky blue   — amber → cool sky
    teal:       '#a855f7',   // violet     — teal → deep violet
    nova:       '#8b5cf6',   // violet     — emerald → deep violet
    cobalt:     '#22c55e',   // green      — MasterStudy-style blue+green pairing (pinned light theme)
    midnight:   '#10b981',   // emerald    — deep navy → vivid green
    plasma:     '#a855f7',   // violet     — royal blue → violet
    arctic:     '#f43f5e',   // rose       — ice blue → warm rose
    indigo:     '#ec4899',   // hot pink   — deep indigo → pink
    // Multi-color glow themes — 3-color cycle via card-glow animation
    prismatic:  '#00e5ff',   // electric cyan  — violet → cyan → magenta
    inferno:    '#fbbf24',   // gold           — orange → gold → red
    northern:   '#7c3aed',   // violet         — emerald → violet → sky
    cosmic:     '#ec4899',   // hot pink       — blue → pink → purple
    toxicDream: '#eab308',   // yellow         — lime → yellow → fuchsia
};

// ============================================
// GLOW-C — third accent color for multi-glow hover animation
// Consumed as var(--glow-c) in card-glow keyframes.
// Themes without an entry fall back to --brand-300.
// ============================================
const THEME_GLOW_C = {
    prismatic:  '#ff0099',  // hot magenta
    inferno:    '#dc2626',  // fire red
    northern:   '#0ea5e9',  // sky blue
    cosmic:     '#a855f7',  // deep purple
    toxicDream: '#d946ef',  // fuchsia
};

// ============================================
// CONFIGURATION: GLOBAL ACTIVE STATE
// ============================================
window.LIVE_THEME = 'cobalt'; // Pinned — closest existing brand-500 to the MasterStudy reference blue
window.ACTIVE_VARIANT = 'light'; // Choose: light, cyberDark, glassmorphism, depth3D, minimal, midnight
window.THEME_CYCLE_ENABLED = false; // Light-theme pivot: one fixed brand color, no auto-rotation

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
        '--bg-alt': '#132240',
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
const activeColors = THEMES[window.LIVE_THEME] || THEMES.cobalt;
const activeVariantVars = THEME_VARIANTS[window.ACTIVE_VARIANT] || THEME_VARIANTS.light;

// Brand Colors
Object.keys(activeColors).forEach(key => {
    root.style.setProperty(`--brand-${key}`, activeColors[key]);
});

// Accent color for gradient utilities
const accent = THEME_ACCENTS[window.LIVE_THEME] || activeColors['400'];
root.style.setProperty('--brand-accent', accent);

// Fixed solid middle blue-green tone — for small elements (pills, icons, badges)
// where a gradient clip doesn't read well at small sizes. Gradients stay
// reserved for large display text and buttons.
root.style.setProperty('--brand-mid', '#0891B2');

// Third glow color for multi-color hover animation
const glowC = THEME_GLOW_C[window.LIVE_THEME] || activeColors['300'];
root.style.setProperty('--glow-c', glowC);

// Semantic Variables
Object.keys(activeVariantVars).forEach(key => {
    root.style.setProperty(key, activeVariantVars[key]);
});

// 1b. CSS-VAR OVERRIDES FOR TAILWIND BRAND CLASSES
// Tailwind CDN injects CSS via MutationObserver as React renders new
// class names, pushing our override earlier in cascade order.
// Solution: keep our <style> pinned as the last child of <head> so it
// always wins the cascade without needing !important fights.
(function() {
    const shades = [50,100,200,300,400,500,600,700,800,900];
    const rules = [
        ['text','color'],
        ['bg','background-color'],
        ['border','border-color'],
        ['ring','--tw-ring-color'],
        ['fill','fill'],
        ['from','--tw-gradient-from'],
        ['to','--tw-gradient-to'],
        ['via','--tw-gradient-stops'],
    ];
    let css = '';
    shades.forEach(s => {
        rules.forEach(([pfx, prop]) => {
            css += `.${pfx}-brand-${s}{${prop}:var(--brand-${s})!important}`;
            css += `.hover\\:${pfx}-brand-${s}:hover{${prop}:var(--brand-${s})!important}`;
            css += `.focus\\:${pfx}-brand-${s}:focus{${prop}:var(--brand-${s})!important}`;
        });
    });
    // Gradient utilities powered by --brand-accent
    css += '.gradient-brand{background:linear-gradient(135deg,var(--brand-500),var(--brand-accent,var(--brand-400)))!important}';
    css += '.gradient-brand-h{background:linear-gradient(90deg,var(--brand-500),var(--brand-accent,var(--brand-400)))!important}';
    css += '.text-gradient-brand{background:linear-gradient(135deg,var(--brand-400),var(--brand-accent,var(--brand-300)));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}';
    css += '.shadow-brand-accent{box-shadow:0 10px 24px -4px var(--brand-accent,var(--brand-500))!important}';
    const el = document.createElement('style');
    el.id = 'brand-var-overrides';
    el.textContent = css;
    document.head.appendChild(el);

    // Pin override to last position whenever Tailwind CDN injects new styles.
    new MutationObserver(function() {
        const ov = document.getElementById('brand-var-overrides');
        if (ov && ov !== document.head.lastElementChild) {
            document.head.appendChild(ov);
        }
    }).observe(document.head, { childList: true });
})();

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
        const themed = `assets/images/thedatapilot_logo_${theme}.png`;
        const probe = new Image();
        probe.onload = () => { link.href = themed; };
        probe.onerror = () => { link.href = 'assets/images/thedatapilot_logo.png'; };
        probe.src = themed;
    }
})();

// ============================================
// AUTO THEME CYCLER — rotates every 10s
// ============================================
(function() {
    if (window.THEME_CYCLE_ENABLED === false) return; // pinned theme — no auto-rotation, no debug badge

    const CYCLE_KEYS = Object.keys(THEMES);
    let idx = CYCLE_KEYS.indexOf(window.LIVE_THEME);
    if (idx === -1) idx = 0;

    // Theme debug badge
    function ensureBadge() {
        let badge = document.getElementById('theme-debug-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.id = 'theme-debug-badge';
            badge.style.cssText = [
                'position:fixed', 'bottom:16px', 'right:16px', 'z-index:99999',
                'background:rgba(0,0,0,0.8)', 'color:#fff', 'padding:7px 13px',
                'border-radius:8px', 'font:700 13px/1.4 monospace',
                'pointer-events:none', 'letter-spacing:0.03em',
                'border:1px solid rgba(255,255,255,0.15)',
                'backdrop-filter:blur(6px)'
            ].join(';');
            document.body.appendChild(badge);
        }
        return badge;
    }

    function updateBadge(name, num, total) {
        const badge = ensureBadge();
        badge.textContent = `Theme ${num}/${total}: ${name}`;
        badge.style.borderColor = `var(--brand-400)`;
        badge.style.boxShadow = `0 0 0 1px var(--brand-500),0 4px 12px rgba(0,0,0,0.4)`;
    }

    // Show initial badge after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        updateBadge(CYCLE_KEYS[idx], idx + 1, CYCLE_KEYS.length);
    });

    setInterval(function() {
        idx = (idx + 1) % CYCLE_KEYS.length;
        const next = CYCLE_KEYS[idx];
        window.LIVE_THEME = next;

        const colors = THEMES[next];
        const r = document.documentElement;
        Object.keys(colors).forEach(k => r.style.setProperty(`--brand-${k}`, colors[k]));

        // Update accent and third glow color per theme rotation
        const cycleAccent = THEME_ACCENTS[next] || colors['400'];
        r.style.setProperty('--brand-accent', cycleAccent);
        const cycleGlowC = THEME_GLOW_C[next] || colors['300'];
        r.style.setProperty('--glow-c', cycleGlowC);

        updateBadge(next, idx + 1, CYCLE_KEYS.length);

        const logoSrc = `assets/images/thedatapilot_logo_${next}.png`;
        const fallback = 'assets/images/thedatapilot_logo.png';
        const p = new Image();
        p.onload = () => {
            const link = document.querySelector("link[rel~='icon']");
            if (link) link.href = logoSrc;
            const navLogo = document.querySelector('nav img');
            if (navLogo) navLogo.src = logoSrc;
        };
        p.onerror = () => {
            const link = document.querySelector("link[rel~='icon']");
            if (link) link.href = fallback;
            const navLogo = document.querySelector('nav img');
            if (navLogo) navLogo.src = fallback;
        };
        p.src = logoSrc;
    }, 10000);
})();