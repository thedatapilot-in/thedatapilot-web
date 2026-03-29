/**
 * THE DATA PILOT - PRIVACY POLICY COMPONENT (privacy-policy.js)
 * ---------------------------------------------------------
 * Logic for the Privacy Policy page.
 * DATA INTEGRITY: Content strictly pulled from settings.json.
 * BUGS FIXED: Uses locked fallback UI and safe timeout logic.
 * ---------------------------------------------------------
 */

const { useState, useEffect } = React;

/**
 * Navigation-Friendly Emergency UI (LOCKED DESIGN & WORDING)
 */
const InternalEmergencyUI = () => (
    <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: '#f8fafc', textAlign: 'center'}}>
        <div style={{maxWidth: '448px', width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px'}}>
                <div style={{width: '52px', height: '52px', backgroundColor: '#06b6d4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.2)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1'}}>
                    <span style={{fontWeight: '800', fontSize: '22px', color: '#0f172a', marginBottom: '4px'}}>The Data Pilot</span>
                    <span style={{fontSize: '13px', fontWeight: '600', color: '#06b6d4'}}>Logic-First. AI-Fast.</span>
                </div>
            </div>
            <div style={{backgroundColor: 'white', padding: '30px', borderRadius: '40px', border: '1px solid #e2e8f0', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'}}>
                <div style={{width: '100px', height: '80px', margin: '0 auto 32px auto', position: 'relative'}}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{position: 'absolute', top: 0, left: 0}} className="gear-large">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{position: 'absolute', bottom: 0, right: 0}} className="gear-small">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                </div>
                <h2 style={{fontWeight: '800', fontSize: '24px', margin: '0 0 12px 0', color: '#0f172a'}}>System is temporarily down</h2>
                <p style={{color: '#64748b', fontWeight: '500', marginBottom: '36px', lineHeight: '1.6', fontSize: '15px'}}>
                    We are working on it and will be back online shortly.
                </p>
                <button onClick={() => window.location.reload(true)} style={{width: '100%', backgroundColor: '#06b6d4', color: 'white', padding: '22px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.3)'}}>Check Connection</button>
            </div>
            <p style={{marginTop: '18px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em'}}>Commitment to world-class data services and mentorship</p>
        </div>
    </div>
);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const checkDataSync = () => {
            if (window.SITE_DATA && window.SITE_DATA.isLoaded && window.Navbar && window.Footer) {
                setIsLoaded(true);
                setHasError(false);
            } else if (window.SITE_DATA && window.SITE_DATA.error) {
                setHasError(true);
            }
        };

        // Listen for the Master Engine's completion signal
        window.addEventListener('siteDataLoaded', checkDataSync);
        
        // Immediate check in case the event fired before React mounted
        checkDataSync();

        // Safe timeout: If nothing loads after 8 seconds, show the consistent fallback
        const timer = setTimeout(() => {
            if (!window.SITE_DATA?.isLoaded) {
                setHasError(true);
            }
        }, 8000);

        return () => {
            window.removeEventListener('siteDataLoaded', checkDataSync);
            clearTimeout(timer);
        };
    }, []);

    if (hasError) return <InternalEmergencyUI />;
    if (!isLoaded) return null;

    const { Navbar, Footer, Icon } = window;
    
    // SAFE FETCHING DYNAMIC CONTENT FROM DATA VAULT
    const privacyData = window.SITE_DATA?.settings?.privacyPolicy || {};
    const contactEmail = window.SITE_DATA?.settings?.contact?.admissionsEmail || "info@thedatapilot.in";
    
    // Fallback headers
    const safeHeader = privacyData.header || { 
        title: "Privacy Policy", 
        subtitle: "How we handle, protect, and use your data to provide world-class educational services at The Data Pilot." 
    };
    const safeSections = privacyData.sections || [];

    return (
        <div className="min-h-screen text-slate-800 bg-white animate-in fade-in duration-700">
            <Navbar />

            {/* Tightened Header Section */}
            <header className="pt-36 pb-10 px-6 bg-slate-50/50 border-b border-slate-200">
                <div className="max-w-4xl mx-auto text-left">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{safeHeader.title}</h1>
                    <p className="text-slate-400 font-medium italic text-sm">{safeHeader.subtitle}</p>
                </div>
            </header>

            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto space-y-10 text-slate-600 font-medium leading-relaxed text-left">
                    {safeSections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
                            <p>{section.content}</p>
                            
                            {/* Dynamically append the contact email if the section is the 'Contact Us' block */}
                            {section.title.toLowerCase().includes('contact') && (
                                <ul className="space-y-3 pt-2">
                                    <li className="flex items-center gap-3 font-semibold text-slate-800">
                                        <Icon name="mail" size={18} className="text-cyan-500" /> 
                                        <a href={`mailto:${contactEmail}`} className="text-cyan-600 font-bold hover:underline transition-all">
                                            {contactEmail}
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);