/**
 * THE DATA PILOT - LANDING PAGE COMPONENT (landing-page.js)
 * ---------------------------------------------------------
 * VERSION: 2.0.66
 * UI FIX: Remodeled the Projects section to fit nicely on a single screen.
 * ARCHITECTURE: Swapped bulky `aspect-video` for sleeker fixed heights (`h-32/h-40`),
 * tightened grid gaps, and reduced padding to prevent the content from 
 * outgrowing the viewport and getting "cut off" at the bottom.
 * ---------------------------------------------------------
 */

const { useState, useEffect } = React;

/**
 * InternalEmergencyUI
 * Fallback UI used if data fetching or React mounting fails.
 */
const InternalEmergencyUI = ({ errorMsg }) => (
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
                <p style={{color: '#64748b', fontWeight: '500', marginBottom: '36px', lineHeight: '1.6', fontSize: '15px'}}>{errorMsg || "Connecting to logic engine..."}</p>
                <button onClick={() => window.location.reload()} style={{width: '100%', backgroundColor: '#06b6d4', color: 'white', padding: '22px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.2)'}}>Check Connection</button>
            </div>
            <p style={{marginTop: '18px', fontSize: '12px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.05em'}}>Commitment to world-class data services and mentorship</p>
        </div>
    </div>
);

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [activeProgramId, setActiveProgramId] = useState('ada');
    const [activeModuleIdx, setActiveModuleIdx] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({ 
        full_name: '', 
        email: '', 
        phone: '', 
        couponCode: '', 
        discountApplied: false, 
        discountAmount: 0,
        finalPrice: 0 
    });
    
    const [feedback, setFeedback] = useState({ show: false, status: '', message: '' });

    const triggerFeedback = (status, message) => {
        setFeedback({ show: true, status, message });
        setTimeout(() => setFeedback({ show: false, status: '', message: '' }), 5000);
    };

    useEffect(() => {
        let isMounted = true;
        let syncInterval;

        const attemptSync = () => {
            if (window.SITE_DATA?.isLoaded && window.Navbar && window.Footer) {
                if (isMounted) {
                    if (window.SITE_DATA.error) setError(window.SITE_DATA.error);
                    setIsLoaded(true);
                }
                clearInterval(syncInterval);
            }
        };

        window.addEventListener('siteDataLoaded', attemptSync);
        syncInterval = setInterval(attemptSync, 100);
        attemptSync();

        const handleGlobalToast = (e) => {
            if (isMounted) {
                const { status, message } = e.detail;
                triggerFeedback(status, message);
            }
        };

        window.addEventListener('siteToast', handleGlobalToast);

        return () => {
            isMounted = false;
            clearInterval(syncInterval);
            window.removeEventListener('siteDataLoaded', attemptSync);
            window.removeEventListener('siteToast', handleGlobalToast);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const data = new FormData();
        const urlParams = new URLSearchParams(window.location.search);

        // 1. Core Lead Data
        data.append('full_name', formData.full_name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        
        // 2. Program Context (Auto-detected)
        data.append('program_id', currentProgram.id);
        data.append('program_name', currentProgram.title);
        
        // 3. Digital Attribution (Where they came from)
        data.append('source_url', window.location.href);
        data.append('referrer', document.referrer || 'direct');
        data.append('landing_page', window.location.pathname);
        
        // 4. UTM Marketing Parameters (For Ads Tracking)
        data.append('utm_source', urlParams.get('utm_source') || 'organic');
        data.append('utm_medium', urlParams.get('utm_medium') || 'none');
        data.append('utm_campaign', urlParams.get('utm_campaign') || 'none');
        data.append('utm_term', urlParams.get('utm_term') || '');
        data.append('utm_content', urlParams.get('utm_content') || '');

        // 5. Technical & Device Insights
        data.append('device_type', window.innerWidth < 768 ? 'Mobile' : 'Desktop');
        data.append('browser', navigator.userAgent);
        data.append('screen_resolution', `${window.screen.width}x${window.screen.height}`);
        data.append('submission_time', new Date().toISOString());
        data.append('timezone', IntP.DateTimeFormat().resolvedOptions().timeZone);
        
        try {
            const res = await fetch('submit.php', { method: 'POST', body: data });
            const result = await res.json();
            if(result.status === 'success') {
                triggerFeedback('success', "Application Received! Check your email.");
                setFormData({ ...formData, full_name: '', email: '', phone: '' });
            } else { 
                triggerFeedback('error', result.message || "Submission failed."); 
            }
        } catch (err) { 
            triggerFeedback('error', "Connection error."); 
        }
        finally { setIsSubmitting(false); }
    };

    const applyCoupon = () => {
        const currentPrice = window.SITE_DATA?.programs?.[activeProgramId]?.price || 0;
        const validCoupons = { 'PILOT10': 0.10, 'LAUNCH20': 0.20 };
        const code = formData.couponCode?.toUpperCase();

        if (validCoupons[code]) {
            const discount = currentPrice * validCoupons[code];
            setFormData({
                ...formData,
                discountApplied: true,
                discountAmount: discount,
                finalPrice: currentPrice - discount
            });
            triggerFeedback('success', `Coupon Applied! ₹${discount.toLocaleString()} saved.`);
        } else {
            triggerFeedback('error', 'Invalid Coupon Code');
        }
    };

    if (error) return <InternalEmergencyUI errorMsg={error} />;
    if (!isLoaded) return null;

    const { settings, programs, media } = window.SITE_DATA;
    const currentProgram = (programs && programs[activeProgramId]) ? programs[activeProgramId] : { title: 'Loading...', syllabus: [], eligibility: [], highlights: [], price: 0 };
    const { Navbar, Footer, Icon } = window;

    const tools = [
        { name: 'Excel', icon: 'file-spreadsheet', color: 'bg-green-50', iconColor: 'text-green-600' },
        { name: 'SQL Server', icon: 'database', color: 'bg-cyan-50', iconColor: 'text-cyan-600' },
        { name: 'Python', icon: 'terminal', color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
        { name: 'Power BI', icon: 'bar-chart-3', color: 'bg-amber-50', iconColor: 'text-amber-600' },
        { name: 'Tableau', icon: 'layout', color: 'bg-cyan-50', iconColor: 'text-cyan-600' },
        { name: 'AI Ready (LLMs)', icon: 'cpu', color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
        { name: 'Warehousing', icon: 'layers', color: 'bg-slate-50', iconColor: 'text-slate-600' },
        { name: 'Statistics', icon: 'microscope', color: 'bg-rose-50', iconColor: 'text-rose-600' }
    ];

    // CENTRALIZED RULE FOR PERFECT ALIGNMENT: 
    // Calculates exact remaining screen space (100svh - 132px navbar) so Flexbox geometric center perfectly matches visual center.
    const sectionClass = "min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center scroll-mt-[80px] md:scroll-mt-[132px] py-16 md:py-20 px-6 border-b border-slate-200";

    const handleModuleToggle = (idx) => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
            setActiveModuleIdx(activeModuleIdx === idx ? -1 : idx);
        } else {
            setActiveModuleIdx(idx);
        }
    };

    return (
        <div className="min-h-screen text-slate-800 animate-in fade-in duration-700 overflow-x-hidden bg-white text-left">
            <Navbar activeProgramId={activeProgramId} onProgramChange={(id) => { setActiveProgramId(id); setActiveModuleIdx(0); setFormData({...formData, discountApplied: false, couponCode: ''}); }} />

            {feedback.show && (
                <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 ${feedback.status === 'success' ? 'bg-slate-900 border-l-4 border-cyan-500' : 'bg-rose-900 border-l-4 border-rose-400'}`}>
                    <Icon name={feedback.status === 'success' ? 'check-circle' : 'alert-circle'} size={20} className={feedback.status === 'success' ? 'text-cyan-400' : 'text-rose-300'} />
                    <span className="text-white font-bold text-sm tracking-tight">{feedback.message}</span>
                    <button onClick={() => setFeedback({ ...feedback, show: false })} className="ml-4 text-white/50 hover:text-white"><Icon name="x" size={16} /></button>
                </div>
            )}

            <div className="fixed top-20 w-full z-40 bg-slate-50 border-b border-slate-200 hidden md:block text-slate-500 font-bold">
                <div className="max-w-5xl mx-auto flex justify-between px-4">
                    {['About', 'Syllabus', 'Tools', 'Projects', 'Videos', 'Eligibility', 'Fees'].map((tab) => (
                        <a key={tab} href={`#${tab.toLowerCase()}`} className="py-4 text-sm hover:text-cyan-500 border-b-2 border-transparent hover:border-cyan-500 transition-all font-bold">
                            {tab}
                        </a>
                    ))}
                </div>
            </div>

            {/* About header stays 100svh because it sits visually AT the top of the page under the transparent nav */}
            <header id="about" className="min-h-[100svh] flex flex-col justify-center pt-28 md:pt-48 pb-16 md:pb-24 px-6 bg-slate-50/50 scroll-mt-[80px] md:scroll-mt-[132px]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center w-full">
                    <div className="space-y-6 md:space-y-8 text-left">
                        <div className="inline-block bg-cyan-50 text-cyan-600 px-4 py-1 rounded text-xs font-bold uppercase tracking-wider">{settings?.brand?.tagline || "Logic-First. AI-Fast."}</div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 tracking-tight">Certification in <br/><span className="text-cyan-500">{currentProgram.title}</span></h1>
                        <p className="text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed mb-6">
                            {currentProgram.description ||settings?.seo?.metaDescription}
                        </p>
                        <div className="space-y-3 md:space-y-4 text-sm font-semibold text-slate-700 text-left">
                            <div className="flex items-center space-x-3"><Icon name="calendar" size={18} className="text-cyan-500 flex-shrink-0" /><span>4-Month Intensive Zero-to-Job Career Program</span></div>
                            <div className="flex items-center space-x-3"><Icon name="video" size={18} className="text-cyan-500 flex-shrink-0" /><span>100% Live Instructor-Led Virtual Classrooms</span></div>
                            <div className="flex items-center space-x-3"><Icon name="check-circle" size={18} className="text-cyan-500 flex-shrink-0" /><span>Placement Assistance for All Eligible Candidates</span></div>
                            <div className="flex items-center space-x-3"><Icon name="award" size={18} className="text-cyan-500 flex-shrink-0" /><span>12+ Industry-Grade Projects and Case Studies</span></div>
                        </div>
                        <div className="pt-2 md:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                            <a href="#syllabus" className="bg-slate-100 text-slate-900 px-8 py-3.5 md:py-4 rounded font-bold hover:bg-slate-200 transition-all text-sm uppercase tracking-widest text-center">Explore Curriculum</a>
                            <a href="assets/ai-powered-data-analytics-brochure.pdf" download className="text-cyan-600 font-bold underline underline-offset-4 decoration-2 uppercase tracking-widest text-sm py-2 text-center hover:text-cyan-700 transition-colors">Download Brochure</a>                        </div>
                    </div>
                    
                    <div className="bg-white p-8 border border-slate-100 rounded-lg max-w-md ml-auto w-full shadow-lg text-left mt-8 lg:mt-0">
                        <h3 className="text-xl font-bold mb-2 text-slate-900">{settings?.ui?.modalTitle || "Begin Your Journey"}</h3>
                        <p className="text-sm text-slate-400 mb-6 font-medium">{settings?.ui?.modalSubText}</p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Full Name" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full p-4 border border-slate-100 bg-slate-50 rounded text-sm focus:border-cyan-500 outline-none font-medium transition-all" />
                            <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 border border-slate-100 bg-slate-50 rounded text-sm focus:border-cyan-500 outline-none font-medium transition-all" />
                            <input type="tel" placeholder="Mobile Number" required maxLength="10" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 border border-slate-100 bg-slate-50 rounded text-sm focus:border-cyan-500 outline-none font-medium transition-all" />
                            <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 text-white py-4 rounded font-bold text-sm uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                {isSubmitting ? 'Processing...' : (settings?.labels?.applyButton || 'Apply Now')}
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <section id="syllabus" className={`${sectionClass} bg-white`}>
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-left mb-16 text-slate-900 tracking-tight">Job-Ready Data Analytics Curriculum</h2>
                    
                    <div className="flex flex-col lg:flex-row gap-6 min-h-[400px]">
                        <div className="lg:w-1/3 flex flex-col space-y-3">
                            {(currentProgram.syllabus || []).map((mod, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <button 
                                        onClick={() => handleModuleToggle(idx)} 
                                        className={`p-6 text-left rounded-xl transition-all border font-semibold flex items-center justify-between group ${activeModuleIdx === idx ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-600 hover:border-cyan-200'}`}
                                    >
                                        <span className="text-md font-bold">{idx + 1}. {mod.title}</span>
                                        <svg 
                                            width="16" 
                                            height="16" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className={`transition-all duration-300 transform ${activeModuleIdx === idx ? 'rotate-90 opacity-100' : 'rotate-0 opacity-40 group-hover:opacity-70'}`}
                                        >
                                            <path d="m9 18 6-6-6-6"/>
                                        </svg>
                                    </button>

                                    {/* MOBILE ACCORDION CONTENT */}
                                    <div className={`lg:hidden overflow-hidden transition-all duration-300 ${activeModuleIdx === idx ? 'max-h-[1200px] opacity-100 py-6' : 'max-h-0 opacity-0'}`}>
                                        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-6">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-cyan-600 font-bold uppercase text-[10px] tracking-widest">Module 0{idx + 1} Details</span>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Icon name="play-circle" size={16} className="text-cyan-500" />
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase">Live: {mod.lectures} • {mod.hours} Hours</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                {(mod.content || []).map((bullet, i) => (
                                                    <div key={i} className="flex items-start space-x-3 text-left">
                                                        <Icon name="check-circle" size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                                                        <span className="text-sm font-medium text-slate-600 leading-snug">{bullet}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full flex items-center justify-center space-x-2 bg-cyan-500 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md">
                                                <Icon name="download" size={14} /><span>{settings?.labels?.brochureButton || "Brochure"}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* DESKTOP DETAIL VIEW */}
                        <div className="hidden lg:flex lg:w-2/3 bg-white p-10 rounded-2xl border border-slate-200 flex-col shadow-sm">
                            {currentProgram.syllabus && currentProgram.syllabus[activeModuleIdx] ? (
                                <>
                                    <div className="mb-8 pb-6 border-b border-slate-50 flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="space-y-1 text-left">
                                            <span className="text-cyan-500 font-bold uppercase text-[11px] tracking-widest">Module 0{activeModuleIdx + 1}</span>
                                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{currentProgram.syllabus[activeModuleIdx].title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Icon name="play-circle" size={18} className="text-cyan-500" />
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Live Lectures: {currentProgram.syllabus[activeModuleIdx].lectures} • Total: {currentProgram.syllabus[activeModuleIdx].hours} Hours</span>
                                            </div>
                                        </div>
                                        <button className="flex items-center space-x-2 bg-cyan-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest self-start hover:bg-cyan-600 transition-all shadow-md">
                                            <Icon name="download" size={14} /><span>{settings?.labels?.brochureButton || "Brochure"}</span>
                                        </button>
                                        <p className="mt-4 text-[10px] text-slate-400 text-center leading-tight">
                                            By clicking "Apply", you agree to our <a href="/privacy-policy" className="underline hover:text-cyan-600">Privacy Policy</a>. We value your data security and will only contact you regarding your professional consultation.
                                        </p>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-left">
                                        {(currentProgram.syllabus[activeModuleIdx].content || []).map((bullet, i) => (
                                            <div key={i} className="flex items-start space-x-3 group">
                                                <Icon name="check-circle" size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                                                <span className="text-[14px] font-medium text-slate-500 leading-tight group-hover:text-slate-900 transition-colors">{bullet}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400 font-bold">Please select a module to view curriculum details.</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section id="tools" className={`${sectionClass} bg-white`}>
                <div className="w-full max-w-7xl mx-auto text-left">
                    <h2 className="text-3xl font-bold mb-16 text-slate-900 tracking-tight">Modern Industry Tool Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {tools.map((tool, i) => (
                            <div key={i} className={`${tool.color} tool-card p-12 flex flex-col items-center justify-center space-y-5 border border-slate-50 shadow-sm rounded-lg transition-transform hover:-translate-y-1`}>
                                <Icon name={tool.icon} size={56} className={tool.iconColor} />
                                <span className="font-bold text-slate-700">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROJECTS SECTION - UI FIX: Shrunk images and gaps so they fit beautifully on one screen */}
            <section id="projects" className={`${sectionClass} bg-slate-50`}>
                <div className="w-full max-w-7xl mx-auto text-left">
                    <h2 className="text-3xl font-bold mb-8 md:mb-12 text-slate-900 tracking-tight">6+ Real-Time Industry Projects</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {(media.projects || []).map((proj) => (
                            <div key={proj.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 group shadow-sm hover:shadow-md transition-all">
                                <div className="h-32 md:h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                    <img src={proj.img} alt={proj.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e => e.target.style.display='none'} />
                                    <Icon name="image" size={32} className="opacity-20 absolute" />
                                </div>
                                <div className="p-4"><h4 className="font-bold text-slate-800 text-[13px] md:text-sm tracking-tight line-clamp-2">{proj.title}</h4></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="videos" className={`${sectionClass} bg-white`}>
                 <div className="w-full max-w-7xl mx-auto text-left">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-12">Program Overview & Demos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {(media.videos || []).map((vid, i) => (
                            <div key={i} className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center group cursor-pointer relative overflow-hidden border border-slate-200 shadow-sm">
                                <Icon name="play" size={40} className="text-cyan-500 opacity-80 group-hover:scale-110 transition-all z-10" />
                                <div className="absolute bottom-4 left-4 text-slate-900 font-bold text-[10px] uppercase tracking-wider z-10">{vid.title}</div>
                            </div>
                        ))}
                    </div>
                 </div>
            </section>

            <section id="eligibility" className={`${sectionClass} bg-white`}>
                <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center text-left">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Check Your Eligibility</h2>
                        <p className="text-slate-500 font-medium leading-relaxed">This program is designed for ambitious learners ready to pivot into data.</p>
                        <div className="space-y-4 font-bold text-slate-700">
                            {["Final year students or graduates from any discipline.", "Working professionals looking for career acceleration.", "A basic understanding of logical reasoning.", "Commitment to 10-12 hours of weekly learning."].map((criteria, i) => (
                                <div key={i} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm">
                                    <Icon name="check" size={20} className="text-cyan-500 flex-shrink-0" />
                                    <span className="font-bold leading-snug">{criteria}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300">
                        <Icon name="user-check" size={64} className="opacity-10" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-4 text-center">Program Alignment Graphic</span>
                    </div>
                </div>
            </section>

            {/* FEES SECTION */}
            <section id="fees" className="min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center py-16 md:py-20 px-6 bg-slate-50 scroll-mt-[80px] md:scroll-mt-[132px]">
                <div className="w-full max-w-5xl mx-auto bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl grid md:grid-cols-2">
                    <div className="p-8 md:p-14 space-y-8 text-left">
                        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Program Package</h3>
                        <div className="space-y-5">
                            {(currentProgram.highlights || []).map((t, i) => (
                                <div key={i} className="flex items-center space-x-4">
                                    <Icon name="check-circle" size={20} className="text-cyan-500 flex-shrink-0" />
                                    <span className="text-md font-bold text-slate-600">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 md:p-14 bg-slate-900 text-white flex flex-col justify-center space-y-8 text-left">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Total Program Investment</span>
                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{currentProgram.title} Fee</h3>
                        </div>

                        <div className="space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 flex-wrap overflow-hidden">
                                <span className="text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
                                    ₹{(formData.discountApplied ? formData.finalPrice : currentProgram.price)?.toLocaleString()} /-
                                </span>
                                
                                {formData.discountApplied && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-slate-500 line-through text-xs md:text-sm font-medium whitespace-nowrap">
                                            ₹{currentProgram.price?.toLocaleString()} /-
                                        </span>
                                        <span className="text-cyan-400 text-xs md:text-sm font-bold whitespace-nowrap">
                                            - ₹{formData.discountAmount?.toLocaleString()} /-
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className="text-slate-400 text-[10px] md:text-xs font-medium uppercase tracking-widest mt-1">Inclusive of all taxes</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl focus-within:border-cyan-500 transition-all">
                                <input 
                                    type="text" 
                                    placeholder="Enter Coupon Code" 
                                    className="bg-transparent flex-1 px-3 py-2 text-xs md:text-sm outline-none font-bold uppercase tracking-widest placeholder:text-slate-600 text-cyan-400 min-w-0"
                                    value={formData.couponCode}
                                    onChange={(e) => setFormData({...formData, couponCode: e.target.value})}
                                />
                                <button 
                                    onClick={applyCoupon}
                                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 md:px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex-shrink-0"
                                >
                                    Apply
                                </button>
                            </div>
                            {formData.discountApplied && (
                                <p className="text-[10px] text-cyan-400 font-bold px-2 flex items-center gap-1 uppercase tracking-widest animate-pulse">
                                    <Icon name="tag" size={10} /> Discount Applied Successfully
                                </p>
                            )}
                        </div>

                        <button className="w-full bg-white text-slate-900 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-sm shadow-xl hover:bg-cyan-500 hover:text-white active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3">
                            <Icon name="credit-card" size={18} className="flex-shrink-0" />
                            <span className="text-center">Make Payment ₹{(formData.discountApplied ? formData.finalPrice : currentProgram.price)?.toLocaleString()} /-</span>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);