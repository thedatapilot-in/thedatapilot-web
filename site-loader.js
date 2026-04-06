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
    const VERSION = "3.0.4"; 
    const path = window.location.pathname;
    
    // Page Route Detection
    const isLandingPage = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    const isAboutPage = path.endsWith('about-us.html');
    const isPrivacyPage = path.endsWith('privacy-policy.html');
    const isTermsPage = path.endsWith('terms-and-conditions.html');
    const isRefundPage = path.endsWith('refund-policy.html');

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
        `;
        document.head.appendChild(style);

        // 2. Start the Watchdog Timer
        setTimeout(() => {
            const rootNode = document.getElementById('root');
            if (rootNode && rootNode.innerHTML.trim() === '') {
                // If React failed to mount after 10s, inject the Emergency UI
                const emergencyDiv = document.createElement('div');
                emergencyDiv.id = 'emergency-ui';
                emergencyDiv.style.cssText = 'display: flex; height: 100vh; width: 100vw; flex-direction: column; align-items: center; justify-content: center; padding: 24px; background-color: #f8fafc; text-align: center; position: fixed; top: 0; left: 0; z-index: 9999;';
                emergencyDiv.innerHTML = `
                    <div style="max-width: 448px; width: 100%;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 28px;">
                            <div style="width: 52px; height: 52px; background-color: #e10b17; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.2);">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                            </div>
                            <div style="display: flex; flex-direction: column; text-align: left; line-height: 1;">
                                <span style="font-weight: 800; font-size: 22px; color: #0f172a; margin-bottom: 4px;">The Data Pilot</span>
                                <span style="font-size: 13px; font-weight: 600; color: #e10b17;">Logic-First. AI-Fast.</span>
                            </div>
                        </div>
                        <div style="background-color: white; padding: 30px; border-radius: 40px; border: 1px solid #e2e8f0; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);">
                            <div style="width: 100px; height: 80px; margin: 0 auto 32px auto; position: relative;">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e10b17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; top: 0; left: 0;" class="gear-large">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                                </svg>
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#e10b17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; bottom: 0; right: 0;" class="gear-small">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                                </svg>
                            </div>
                            <h2 style="font-weight: 800; font-size: 24px; margin: 0 0 12px 0; color: #0f172a;">System is temporarily down</h2>
                            <p style="color: #64748b; font-weight: 500; margin-bottom: 36px; line-height: 1.6; font-size: 15px;">We are working on it and will be back online shortly.</p>
                            <button onclick="window.location.reload(true)" style="width: 100%; background-color: #e10b17; color: white; padding: 22px; border-radius: 16px; font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.1em; border: none; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.3);">Check Connection</button>
                        </div>
                        <p style="margin-top: 18px; font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 0.05em;">Commitment to world-class data services and mentorship</p>
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