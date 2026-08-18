/**
 * THE DATA PILOT - ABOUT US COMPONENT (about-us.js)
 * ---------------------------------------------------------
 * Logic for the About Us page.
 * DATA INTEGRITY: Content strictly pulled from settings.json.
 * BUGS FIXED: Resolved synchronization race conditions and locked fallback text.
 * ---------------------------------------------------------
 */

const { useState, useEffect } = React;

/**
 * Navigation-Friendly Emergency UI (LOCKED DESIGN & WORDING)
 */
const InternalEmergencyUI = () => (
    <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'var(--bg-base)', textAlign: 'center'}}>
        <div style={{maxWidth: '448px', width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px'}}>
                <div style={{width: '52px', height: '52px', backgroundColor: 'var(--brand-500)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--brand-500) 20%, transparent)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1'}}>
                    <span style={{fontWeight: '800', fontSize: '22px', color: 'var(--text-base)', marginBottom: '4px'}}>The Data Pilot</span>
                    <span style={{fontSize: '13px', fontWeight: '600', color: 'var(--brand-500)'}}>Logic-First. AI-Fast.</span>
                </div>
            </div>
            <div style={{backgroundColor: 'var(--surface-card)', padding: '30px', borderRadius: '40px', border: '1px solid var(--border-color)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'}}>
                <div style={{width: '100px', height: '80px', margin: '0 auto 32px auto', position: 'relative'}}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{position: 'absolute', top: 0, left: 0}} className="gear-large">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="var(--brand-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{position: 'absolute', bottom: 0, right: 0}} className="gear-small">
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                </div>
                <h2 style={{fontWeight: '800', fontSize: '24px', margin: '0 0 12px 0', color: 'var(--text-base)'}}>System is temporarily down</h2>
                <p style={{color: 'color-mix(in srgb, var(--text-base) 75%, transparent)', fontWeight: '500', marginBottom: '36px', lineHeight: '1.6', fontSize: '15px'}}>
                    We are working on it and will be back online shortly.
                </p>
                <button onClick={() => window.location.reload(true)} style={{width: '100%', backgroundColor: 'var(--brand-500)', color: 'white', padding: '22px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--brand-500) 30%, transparent)'}}>Check Connection</button>
            </div>
            <p style={{marginTop: '18px', fontSize: '12px', fontWeight: '700', color: 'color-mix(in srgb, var(--text-base) 50%, transparent)', letterSpacing: '0.05em'}}>Commitment to world-class data services and mentorship</p>
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
    const aboutData = window.SITE_DATA?.settings?.aboutUs || {};
    
    // Create safe fallback objects to prevent crashes if JSON nodes are missing
    const safeHeader = aboutData.header || { title: "About The Data Pilot", subtitle: "Empowering the next generation of analysts", intro: "The Data Pilot is a specialized education hub designed to train the next generation of Augmented Data Analysts." };
    const safeMission = aboutData.mission || { title: "Our Mission", description: "" };
    const safeMethodology = aboutData.methodology || { title: "The Pilot Methodology", points: [] };
    const safeWhoWeAre = aboutData.whoWeAre || { title: "Who We Are", description: "" };
    const safeCta = aboutData.cta || { title: "Join the Cohort", description: "", buttonText: "Explore Our Curriculum", buttonLink: "index.html#about" };

    return (
        <div className="min-h-screen theme-text-primary theme-bg animate-in fade-in duration-700">
            <Navbar />
            
            <header className="pt-40 pb-16 px-6 theme-bg-alt border-b theme-border-strong">
                <div className="max-w-4xl mx-auto text-left">
                    <window.ScrollReveal>
                        <window.SectionEyebrow>About Us</window.SectionEyebrow>
                        <h1 className="text-4xl md:text-5xl font-extrabold theme-text-primary mb-3">{safeHeader.title}</h1>
                        <p className="theme-text-muted font-medium text-base">{safeHeader.subtitle}</p>
                    </window.ScrollReveal>
                </div>
            </header>

            <main className="flex-grow py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6 theme-text-secondary text-left">
                        {/* Intro Paragraph */}
                        <window.ScrollReveal>
                            <p className="text-xl font-medium theme-text-primary leading-relaxed mb-10">
                                {safeHeader.intro.split('Augmented Data Analysts').map((part, i, arr) =>
                                    i === arr.length - 1 ? part : <span key={i}>{part}<strong>Augmented Data Analysts</strong></span>
                                )}
                            </p>
                        </window.ScrollReveal>

                        <div className="space-y-12">
                            {/* Mission Section */}
                            <window.ScrollReveal>
                                <section>
                                    <h2 className="text-2xl font-bold theme-text-primary mb-5 tracking-tight">{safeMission.title}</h2>
                                    <p className="text-lg leading-relaxed">{safeMission.description}</p>
                                </section>
                            </window.ScrollReveal>

                            {/* Methodology Section */}
                            {safeMethodology.points.length > 0 && (
                                <window.ScrollReveal>
                                    <section>
                                        <h2 className="text-2xl font-bold theme-text-primary mb-5 tracking-tight">{safeMethodology.title}</h2>
                                        <ul className="space-y-4">
                                            {safeMethodology.points.map((point, idx) => (
                                                <window.ScrollReveal key={idx} delay={idx * 60}>
                                                    <li className="flex items-start gap-3">
                                                        <Icon name="check-circle" size={18} className="theme-mid-text mt-1 flex-shrink-0" />
                                                        <span className="text-lg leading-snug"><strong>{point.title}:</strong> {point.description}</span>
                                                    </li>
                                                </window.ScrollReveal>
                                            ))}
                                        </ul>
                                    </section>
                                </window.ScrollReveal>
                            )}

                            {/* Who We Are Section */}
                            <window.ScrollReveal>
                                <section>
                                    <h2 className="text-2xl font-bold theme-text-primary mb-5 tracking-tight">{safeWhoWeAre.title}</h2>
                                    <p className="text-lg leading-relaxed">{safeWhoWeAre.description}</p>
                                </section>
                            </window.ScrollReveal>
                        </div>

                        {/* Call to Action Block */}
                        <window.ScrollReveal>
                            <div className="theme-card border theme-border-strong p-10 rounded-[2.5rem] mt-16 shadow-xl">
                                <window.SectionEyebrow>{safeCta.title}</window.SectionEyebrow>
                                <p className="theme-text-primary font-semibold text-xl mb-6">{safeCta.description}</p>
                                <window.GradientButton as="a" href={safeCta.buttonLink} className="inline-block px-10 py-4 rounded-xl">
                                    {safeCta.buttonText}
                                </window.GradientButton>
                            </div>
                        </window.ScrollReveal>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(<App />);