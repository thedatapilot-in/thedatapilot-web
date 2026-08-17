/**
 * THE DATA PILOT - BOOTLOADER v2.0.24
 * ---------------------------------------------------------
 * UI FIX: Reverted all experimental scroll-snapping hacks.
 * UI FIX: Restored native, smooth browser scrolling and default layout behavior.
 * ARCHITECTURE: Favicon is set via static <link rel="icon"> in each HTML page.
 * Ensures a "white blank page" is maintained during legitimate loading.
 * ---------------------------------------------------------
 */

(function() {
    const VERSION = "3.2.0";
    const path = window.location.pathname;
    
    // Page Route Detection
    const isLandingPage = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    const isAboutPage = path.endsWith('about-us.html');
    const isPrivacyPage = path.endsWith('privacy-policy.html');
    const isTermsPage = path.endsWith('terms-and-conditions.html');
    const isRefundPage = path.endsWith('refund-policy.html');
    const isProductsPage = path.endsWith('products.html');
    const isServicesPage = path.endsWith('services.html');

    // --- CENTRALIZED WATCHDOG & EMERGENCY UI ---
    // Increased from 3000 to 10000 to handle slower 4G/mobile latencies
    const WATCHDOG_TIMEOUT = 10000; 

    function setupGlobalWatchdogAndStyles() {
        // 1. Inject Global Styles (Fonts & Animations) for ALL pages
        const style = document.createElement('style');
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
            body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; color: #334155; margin: 0; padding: 0; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes spin-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
            .gear-large { animation: spin 8s linear infinite; transform-origin: center; }
            .gear-small { animation: spin-reverse 4s linear infinite; transform-origin: center; }
            #root:not(:empty) ~ #emergency-ui { display: none !important; }
            .theme-bg { background-color: var(--bg-base); transition: background-color 0.5s, color 0.5s; }
            .theme-bg-alt { background-color: var(--bg-alt); transition: background-color 0.5s, color 0.5s; }
            .theme-card { background-color: var(--surface-card); transition: background-color 0.5s; }
            .theme-text-primary { color: var(--text-base); }
            .theme-text-secondary { color: var(--text-base); opacity: 0.8; }
            .theme-text-muted { color: var(--text-base); opacity: 0.6; }
            .theme-border { border-color: var(--border-color); }
            .theme-border-strong { border-color: var(--border-strong); }
            section { scroll-margin-top: 150px; }
            .tool-card { border-radius: 8px; transition: transform 0.2s; }
            .tool-card:hover { transform: translateY(-4px); }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--brand-500); border-radius: 10px; }
            .bg-brand-500 { background-color: var(--brand-500) !important; transition: all 0.2s ease-in-out; }
            .hover\\:bg-brand-600:hover { background-color: var(--brand-600) !important; }
            html { background-color: var(--bg-base); }
            body.theme-bg { background-color: transparent !important; }
            #root > div:first-child { background-color: transparent !important; }
            @keyframes aurora-a {
                0%,100% { transform: translate(0,0) scale(1); }
                33% { transform: translate(8vw,-6vh) scale(1.08); }
                66% { transform: translate(-5vw,10vh) scale(0.94); }
            }
            @keyframes aurora-b {
                0%,100% { transform: translate(0,0) scale(1); }
                40% { transform: translate(-10vw,5vh) scale(1.12); }
                70% { transform: translate(7vw,-8vh) scale(0.9); }
            }
            @keyframes card-glow {
                0%   { box-shadow: 0 0 0 1px color-mix(in srgb,var(--brand-500) 12%,transparent), 0 8px 24px -6px color-mix(in srgb,var(--brand-500) 18%,transparent); }
                33%  { box-shadow: 0 0 0 1px color-mix(in srgb,var(--brand-accent,var(--brand-400)) 12%,transparent), 0 8px 24px -6px color-mix(in srgb,var(--brand-accent,var(--brand-400)) 18%,transparent); }
                66%  { box-shadow: 0 0 0 1px color-mix(in srgb,var(--glow-c,var(--brand-300)) 12%,transparent), 0 8px 24px -6px color-mix(in srgb,var(--glow-c,var(--brand-300)) 18%,transparent); }
                100% { box-shadow: 0 0 0 1px color-mix(in srgb,var(--brand-500) 12%,transparent), 0 8px 24px -6px color-mix(in srgb,var(--brand-500) 18%,transparent); }
            }
            .theme-card:hover { animation: card-glow 3s ease-in-out infinite; }
            .theme-gradient-text { background: linear-gradient(120deg, var(--brand-500) 0%, var(--brand-500) 45%, var(--brand-accent, var(--brand-400)) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .theme-accent-text { color: var(--brand-accent, var(--brand-400)); }
            .theme-tertiary-text { color: var(--glow-c, var(--brand-300)); }
            .theme-mid-text { color: var(--brand-mid, var(--brand-500)); }
            .theme-accent-pill { background: color-mix(in srgb, var(--brand-mid, var(--brand-400)) 12%, transparent); color: var(--brand-mid, var(--brand-400)); border: 1px solid color-mix(in srgb, var(--brand-mid, var(--brand-400)) 28%, transparent); }
            .theme-btn-gradient { background: linear-gradient(120deg, var(--brand-600) 0%, var(--brand-600) 45%, var(--brand-accent, var(--brand-500)) 100%); }
            .theme-btn-gradient:hover { filter: brightness(1.12); }
            @keyframes chart-bar-grow {
                0%, 100% { transform: scaleY(0.3); }
                50% { transform: scaleY(1); }
            }
            @keyframes chart-line-draw {
                0% { stroke-dashoffset: 240; }
                60%, 100% { stroke-dashoffset: 0; }
            }
            @keyframes chart-chip-float {
                0%, 100% { transform: translateY(0); opacity: 0.6; }
                50% { transform: translateY(-10px); opacity: 1; }
            }
            .hero-chart-bar { transform-origin: bottom; animation: chart-bar-grow 6.5s ease-in-out infinite; }
            .hero-chart-line { stroke-dasharray: 240; animation: chart-line-draw 6s ease-in-out infinite; }
            .hero-chart-chip { animation: chart-chip-float 7s ease-in-out infinite; }
        `;
        document.head.appendChild(style);

        // 2. Start the Watchdog Timer
        setTimeout(() => {
            const rootNode = document.getElementById('root');
            if (rootNode && rootNode.innerHTML.trim() === '') {
                // If React failed to mount after 10s, inject the Emergency UI
                const emergencyDiv = document.createElement('div');
                emergencyDiv.id = 'emergency-ui';
                emergencyDiv.style.cssText = 'display: flex; height: 100vh; width: 100vw; flex-direction: column; align-items: center; justify-content: center; padding: 24px; background-color: var(--bg-base); text-align: center; position: fixed; top: 0; left: 0; z-index: 9999;';
                emergencyDiv.innerHTML = `
                    <div style="max-width: 448px; width: 100%;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 28px;">
                            <div style="width: 52px; height: 52px; background-color: var(--brand-500); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--brand-500) 20%, transparent);">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                            </div>
                            <div style="display: flex; flex-direction: column; text-align: left; line-height: 1;">
                                <span style="font-weight: 800; font-size: 22px; color: var(--text-base); margin-bottom: 4px;">The Data Pilot</span>
                                <span style="font-size: 13px; font-weight: 600; color: var(--brand-500);">Logic-First. AI-Fast.</span>
                            </div>
                        </div>
                        <div style="background-color: var(--surface-card); padding: 30px; border-radius: 40px; border: 1px solid var(--border-color); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);">
                            <div style="width: 100px; height: 80px; margin: 0 auto 32px auto; position: relative;">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; top: 0; left: 0; stroke: var(--brand-500);" class="gear-large">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                                </svg>
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; bottom: 0; right: 0; stroke: var(--brand-500);" class="gear-small">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                                </svg>
                            </div>
                            <h2 style="font-weight: 800; font-size: 24px; margin: 0 0 12px 0; color: var(--text-base);">System is temporarily down</h2>
                            <p style="color: color-mix(in srgb, var(--text-base) 75%, transparent); font-weight: 500; margin-bottom: 36px; line-height: 1.6; font-size: 15px;">We are working on it and will be back online shortly.</p>
                            <button onclick="window.location.reload(true)" style="width: 100%; background-color: var(--brand-500); color: white; padding: 22px; border-radius: 16px; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; border: none; cursor: pointer; box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--brand-500) 30%, transparent);">Check Connection</button>
                        </div>
                        <p style="margin-top: 18px; font-size: 12px; font-weight: 700; color: color-mix(in srgb, var(--text-base) 50%, transparent); letter-spacing: 0.05em;">Commitment to world-class data services and mentorship</p>
                    </div>
                `;
                document.body.appendChild(emergencyDiv);
            }
        }, WATCHDOG_TIMEOUT);
    }

    // STEP 1: Standard JS libraries 
    const coreLibs = [
                { src: "https://unpkg.com/react@18/umd/react.production.min.js", id: "lib-react" },
        { src: "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js", id: "lib-react-dom" },
        { src: "https://unpkg.com/@babel/standalone/babel.min.js", id: "lib-babel" },
        { src: "https://unpkg.com/lucide@latest", id: "lib-lucide" }
    ];

    async function injectLibraries(list) {

        for (const scriptInfo of list) {
            await new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = scriptInfo.src;
                s.id = scriptInfo.id;
                s.async = false; 
                s.onload = () => resolve();
                s.onerror = () => reject(new Error(`Failed to load library: ${scriptInfo.src}`));
                document.head.appendChild(s);
            });
        }
    }

    // STEP 2: Let Babel handle the custom React files
    function injectReactApps() {
        // Always load the core engine first
        const engine = document.createElement('script');
        engine.type = "text/babel";
        engine.src = `core-layout.js?v=${VERSION}`;
        document.head.appendChild(engine);

        // Determine which specific page logic to load
        let pageSrc = '';
        if (isLandingPage) pageSrc = `landing-page.js?v=${VERSION}`;
        else if (isAboutPage) pageSrc = `about-us.js?v=${VERSION}`; 
        else if (isPrivacyPage) pageSrc = `privacy-policy.js?v=${VERSION}`;
        else if (isTermsPage) pageSrc = `terms-and-conditions.js?v=${VERSION}`;
        else if (isRefundPage) pageSrc = `refund-policy.js?v=${VERSION}`;
        else if (isProductsPage) pageSrc = `products.js?v=${VERSION}`;
        else if (isServicesPage) pageSrc = `services.js?v=${VERSION}`;

        // Inject the page logic if a valid route was found
        if (pageSrc) {
            const page = document.createElement('script');
            page.type = "text/babel";
            page.src = pageSrc;
            document.head.appendChild(page);
        }

        // Force Babel Standalone to scan the DOM and compile
        if (window.Babel) {
            window.Babel.transformScriptTags();
        }
    }

    // Initialize Boot Sequence
    setupGlobalWatchdogAndStyles();
    injectLibraries(coreLibs)
        .then(() => {
            injectReactApps();
        })
        .catch(err => {
            console.error("[Bootloader Error]", err);
        });
})();