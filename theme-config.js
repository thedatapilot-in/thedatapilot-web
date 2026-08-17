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

    // sapphire — deep authoritative blue. IBM / enterprise analytics.
    // More serious and navy-anchored than plasma (royal cobalt).
    sapphire: {
        50:  "#eff2ff", 100: "#dce3ff", 200: "#c0ccff",
        300: "#94a8ff", 400: "#5e78ff", 500: "#3852f0",
        600: "#2640d8", 700: "#1e32b5", 800: "#182891", 900: "#131f6e"
    },

    // copper — premium warm bronze. Datadog / Grafana instrumentation.
    // Rich amber-copper; warmer and more metallic than ember's coral.
    copper: {
        50:  "#fff8f0", 100: "#ffedda", 200: "#ffd7ad",
        300: "#ffb870", 400: "#ff922e", 500: "#f07010",
        600: "#d45a06", 700: "#b04606", 800: "#8c3808", 900: "#6e2d0a"
    },

    // ── BLUE · WHITE · VIOLET PREMIUM PALETTE ───────────────────

    // iris — electric periwinkle. Blue and violet fused at equal weight.
    // Sits between aura and volt — uniquely both at once. Crisp on dark.
    iris: {
        50:  "#f3f1ff", 100: "#e8e5ff", 200: "#d4cfff",
        300: "#b8b0ff", 400: "#9a88ff", 500: "#8070ff",
        600: "#6858e8", 700: "#5242cc", 800: "#3e30a8", 900: "#2c2284"
    },

    // frost — soft lavender mist. Light violet, low-saturation, airy.
    // Premium and gentle — glows like frosted glass on a dark surface.
    frost: {
        50:  "#fdf8ff", 100: "#f7eeff", 200: "#eeddff",
        300: "#e0c8ff", 400: "#ceb0ff", 500: "#b48af5",
        600: "#9a6ae0", 700: "#7e4ec8", 800: "#6438a8", 900: "#4e2a88"
    },

    // cobalt — prussian enterprise blue. Deep and authoritative.
    // More navy-anchored than plasma; reads as premium, serious, trusted.
    cobalt: {
        50:  "#eff4ff", 100: "#dce9ff", 200: "#b8d0ff",
        300: "#86acff", 400: "#3878f8", 500: "#1855d8",
        600: "#1242bc", 700: "#0e32a0", 800: "#0a2580", 900: "#071a62"
    },

    // lilac — warm light violet. Soft premium purple, approachable luxury.
    // Warmer hue than frost; 400 reads as a glowing warm violet on dark.
    lilac: {
        50:  "#faf4ff", 100: "#f3e6ff", 200: "#e8d0ff",
        300: "#d8b0ff", 400: "#c080ff", 500: "#a455e8",
        600: "#8838d0", 700: "#6e28b8", 800: "#561e98", 900: "#40167a"
    },

    // ── COBALT FAMILY — 6 variations around deep premium blue ────

    // navy — deep prussian authority. IBM-grade trust, serious enterprise.
    // Darker and heavier than cobalt — premium suit energy.
    navy: {
        50:  "#eef2ff", 100: "#dce7ff", 200: "#b8d0ff",
        300: "#88a8ff", 400: "#3068e8", 500: "#1a4dc8",
        600: "#103eb0", 700: "#0b2e90", 800: "#072270", 900: "#051855"
    },

    // ocean — cobalt with teal undertone. Analytics depth, data current.
    // Has movement — the blue you feel in ocean data dashboards.
    ocean: {
        50:  "#edf5ff", 100: "#d8eeff", 200: "#b0d8ff",
        300: "#78bcff", 400: "#1880e0", 500: "#0c65c0",
        600: "#0950a8", 700: "#073c88", 800: "#052c6a", 900: "#041f4e"
    },

    // azure — bright crisp cloud blue. Microsoft / Snowflake tech clarity.
    // The lightest and most electric of the cobalt family — open-sky energy.
    azure: {
        50:  "#edf8ff", 100: "#d8f0ff", 200: "#b0dfff",
        300: "#72c8ff", 400: "#2896ff", 500: "#1278e8",
        600: "#0c62cc", 700: "#094ab0", 800: "#073690", 900: "#052870"
    },

    // midnight — ultra-deep cobalt-navy. Near indigo. Mysterious premium.
    // Use when the brand needs to feel like deep space intelligence.
    midnight: {
        50:  "#eef0ff", 100: "#dde2ff", 200: "#bbc6ff",
        300: "#8898ff", 400: "#2050e8", 500: "#0f35b0",
        600: "#0a2898", 700: "#071e80", 800: "#051668", 900: "#040f52"
    },

    // steel — muted blue-grey. Understated, premium, corporate restraint.
    // Lower saturation; reads as sophisticated rather than vibrant.
    steel: {
        50:  "#f0f4fa", 100: "#dde8f5", 200: "#bed0ee",
        300: "#92aede", 400: "#5078b8", 500: "#3460a0",
        600: "#284e8a", 700: "#1e3c72", 800: "#152c5a", 900: "#0e2046"
    },

    // royal — classic vibrant royal blue. Rich, saturated, slight violet lean.
    // More regal and confident than cobalt — a proper brand statement color.
    royal: {
        50:  "#eef1ff", 100: "#dde4ff", 200: "#bbc8ff",
        300: "#8ca0ff", 400: "#4068f8", 500: "#2248e0",
        600: "#1836c8", 700: "#1228aa", 800: "#0e1e8a", 900: "#0a1668"
    },

    // ── WARM SPECTRUM ADDITIONS ──────────────────────────────────

    // amber — electric warm amber. Radiant sun energy, data insight.
    // Richer and more vibrant than legacy gold — pops vividly on dark navy.
    amber: {
        50:  "#fffbeb", 100: "#fef0c0", 200: "#fed880",
        300: "#fcb830", 400: "#f99800", 500: "#e07c00",
        600: "#c26000", 700: "#9e4c00", 800: "#7c3a02", 900: "#5e2c04"
    },

    // orange — electric vivid orange. Cloudflare / Figma brand energy.
    // Pure vibrant orange — bold and unmistakable on dark backgrounds.
    orange: {
        50:  "#fff6f0", 100: "#ffe8d8", 200: "#ffccac",
        300: "#ffa870", 400: "#ff7c30", 500: "#f05c00",
        600: "#d04600", 700: "#a83600", 800: "#862800", 900: "#661e00"
    },

    // ruby — bright vivid scarlet. Energetic, striking, data-alert red.
    // More electric than crimson — reads as urgency and precision on dark.
    ruby: {
        50:  "#fff0ef", 100: "#ffe0de", 200: "#ffb8b4",
        300: "#ff8078", 400: "#ff3c34", 500: "#e81c18",
        600: "#cc0808", 700: "#a80000", 800: "#880000", 900: "#6c0000"
    },

    // rose — vivid cool pink. Stripe / Loom-grade elegance on dark.
    // Different from neonRose (neon magenta) — a true warm rose-red.
    rose: {
        50:  "#fff0f4", 100: "#ffd8e4", 200: "#ffb0c8",
        300: "#ff78a4", 400: "#ff3068", 500: "#e8154e",
        600: "#cc0038", 700: "#a8002c", 800: "#840020", 900: "#640018"
    },

    // fuchsia — electric magenta. Between neonRose and violet — vivid luxury.
    // The loudest brand signal in the palette. Confident and unforgettable.
    fuchsia: {
        50:  "#fdf0ff", 100: "#fad0ff", 200: "#f5a0ff",
        300: "#ec60ff", 400: "#e020ff", 500: "#cc00ef",
        600: "#ac00cc", 700: "#8800a8", 800: "#680084", 900: "#4c0062"
    },

    // violet — rich deep violet. More serious and darker than volt's warm-electric.
    // Conveys creativity, intelligence, and premium brand identity.
    violet: {
        50:  "#f4f0ff", 100: "#ebe0ff", 200: "#d8c4ff",
        300: "#bc98ff", 400: "#9a60ff", 500: "#7c3aed",
        600: "#6828d4", 700: "#5018b0", 800: "#3c1090", 900: "#2c0870"
    },

    // teal — electric blue-green. dbt / Metabase analytics clarity.
    // Bridges cyan's brightness with nova's green — clean data energy.
    teal: {
        50:  "#edfcfa", 100: "#ccf8f2", 200: "#98f0e4",
        300: "#54e0cc", 400: "#10cbb0", 500: "#00aa90",
        600: "#008870", 700: "#006c58", 800: "#005244", 900: "#003c32"
    },

    // lime — electric yellow-green. Vercel / Next.js growth-tech energy.
    // Vivid acid green — signals innovation, speed, and new capability.
    lime: {
        50:  "#f6ffe8", 100: "#e8ffc4", 200: "#d0ff88",
        300: "#b2f840", 400: "#92e000", 500: "#72c000",
        600: "#56a000", 700: "#408200", 800: "#306800", 900: "#225000"
    },

    // mint — fresh aquamarine. Clean, modern, refreshing on dark.
    // Lighter and softer than teal — like a breath of data clarity.
    mint: {
        50:  "#edfff8", 100: "#d0ffee", 200: "#9fffd4",
        300: "#5cf5b4", 400: "#1cdea8", 500: "#08c490",
        600: "#04a474", 700: "#028460", 800: "#026048", 900: "#014836"
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

    // aurora — teal → violet gradient. Northern-lights intelligence.
    // Teal primary conveys precision; violet accent adds mystique and depth.
    aurora: {
        50:  "#edfcfa", 100: "#ccf4ee", 200: "#9aeadc",
        300: "#58d8c4", 400: "#14c0a8", 500: "#00a08c",
        600: "#008072", 700: "#00645a", 800: "#004c44", 900: "#003830"
    },

    // neonGrid — lime → fuchsia gradient. Cyberpunk data terminal energy.
    // High-voltage contrast: lime signals speed, fuchsia accent shocks.
    neonGrid: {
        50:  "#f4ffe8", 100: "#e6ffc0", 200: "#ccff80",
        300: "#aaff30", 400: "#88e000", 500: "#68c000",
        600: "#50a000", 700: "#3c8000", 800: "#2c6200", 900: "#1e4c00"
    }
};

// ============================================
// ACCENT COLORS — secondary gradient end-stops
// for multi-color and dual-tone themes.
// Consumed as var(--brand-accent) in CSS utilities.
// ============================================
const THEME_ACCENTS = {
    // Multi-accent showcase (dramatic dual-hue gradients)
    sunset:   '#f43f5e',   // rose-red   — warm orange → cool pink
    aurora:   '#8b5cf6',   // violet     — teal → mystical depth
    neonGrid: '#d946ef',   // fuchsia    — lime → electric shock
    // Single-hue hints (shifted hue for subtle gradients)
    amber:    '#ff8000',
    orange:   '#ff3c00',
    fuchsia:  '#c026d3',
    violet:   '#a855f7',
    neonRose: '#c026d3',
    lime:     '#a3e635',
    teal:     '#2dd4bf',
    mint:     '#34d399',
};

// ============================================
// CONFIGURATION: GLOBAL ACTIVE STATE
// ============================================
window.LIVE_THEME = 'amber';    // Start at first new theme (27/39). Cycler rotates through all 39: amber→…→neonGrid→crimson→…→royal→amber
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
const activeColors = THEMES[window.LIVE_THEME] || THEMES.cyan;
const activeVariantVars = THEME_VARIANTS[window.ACTIVE_VARIANT] || THEME_VARIANTS.light;

// Brand Colors
Object.keys(activeColors).forEach(key => {
    root.style.setProperty(`--brand-${key}`, activeColors[key]);
});

// Accent color for gradient utilities
const accent = THEME_ACCENTS[window.LIVE_THEME] || activeColors['400'];
root.style.setProperty('--brand-accent', accent);

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

        // Update accent for gradient utilities
        const cycleAccent = THEME_ACCENTS[next] || colors['400'];
        r.style.setProperty('--brand-accent', cycleAccent);

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