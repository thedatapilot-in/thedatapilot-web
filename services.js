/**
 * THE DATA PILOT - SERVICES PAGE (services.js)
 * VERSION: 1.0.0
 * ARCHITECTURE: Bootloader page — loaded via site-loader.js
 */

const { useState, useEffect } = React;

const InternalEmergencyUI = ({ errorMsg }) => (
    <div style={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'var(--bg-base)', textAlign: 'center'}}>
        <div style={{maxWidth: '448px', width: '100%'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px'}}>
                <div style={{width: '52px', height: '52px', backgroundColor: 'var(--brand-500)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1'}}>
                    <span style={{fontWeight: '800', fontSize: '22px', color: 'var(--text-base)', marginBottom: '4px'}}>The Data Pilot</span>
                    <span style={{fontSize: '13px', fontWeight: '600', color: 'var(--brand-500)'}}>Logic-First. AI-Fast.</span>
                </div>
            </div>
            <button onClick={() => window.location.reload()} style={{width: '100%', backgroundColor: 'var(--brand-500)', color: 'white', padding: '22px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer'}}>Check Connection</button>
        </div>
    </div>
);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleSync = () => {
            if (window.SITE_DATA && (window.SITE_DATA.isLoaded || window.SITE_DATA.error)) {
                if (window.SITE_DATA.error) setError(window.SITE_DATA.error);
                setIsLoaded(true);
            }
        };
        window.addEventListener('siteDataLoaded', handleSync);
        if (window.SITE_DATA && (window.SITE_DATA.isLoaded || window.SITE_DATA.error)) handleSync();
        const timer = setTimeout(() => {
            if (!window.SITE_DATA?.isLoaded) setError("Loading pilot services...");
        }, 6000);
        return () => {
            window.removeEventListener('siteDataLoaded', handleSync);
            clearTimeout(timer);
        };
    }, []);

    if (error) return window.EmergencyUI ? <window.EmergencyUI error={error} /> : <InternalEmergencyUI errorMsg={error} />;
    if (!isLoaded) return null;

    const { services } = window.SITE_DATA;

    return (
        <div className="min-h-screen theme-text-primary animate-in fade-in duration-700">
            <window.Navbar />
            <header className="pt-40 pb-16 px-6 theme-bg-alt border-b theme-border-strong">
                <div className="max-w-4xl mx-auto text-center">
                    <window.ScrollReveal>
                        <span className="theme-mid-text font-bold uppercase text-xs tracking-widest block mb-3">Expert Services</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold theme-text-primary mb-4">Built for Corporate Teams</h1>
                        <p className="text-lg theme-text-muted font-medium leading-relaxed max-w-2xl mx-auto">
                            Professional consulting and training designed for high-level strategy and impact.
                        </p>
                    </window.ScrollReveal>
                </div>
            </header>
            <main className="py-16 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {(services.items || []).map((service, idx) => (
                        <window.ScrollReveal key={service.id} delay={idx * 80}>
                            <window.TiltCard className="h-full">
                                <div className="theme-card border theme-border-strong rounded-[2rem] p-8 flex flex-col h-full hover:shadow-2xl transition-all duration-300">
                                    <div className="inline-block theme-btn-gradient text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-6">
                                        {service.category}
                                    </div>
                                    <h3 className="text-xl font-bold theme-text-primary mb-4">{service.title}</h3>
                                    <p className="theme-text-muted font-medium leading-relaxed mb-8 flex-grow">{service.description}</p>
                                    <button className="w-full theme-btn-gradient text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-colors mt-auto shadow-lg">
                                        {service.cta}
                                    </button>
                                </div>
                            </window.TiltCard>
                        </window.ScrollReveal>
                    ))}
                </div>
            </main>
            <window.Footer />
        </div>
    );
};

if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(<App />);
