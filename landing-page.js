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

const PROJECT_COUNT = 6;

/**
 * InternalEmergencyUI
 * Fallback UI used if data fetching or React mounting fails.
 */
const InternalEmergencyUI = ({ errorMsg }) => (
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
                <p style={{color: 'color-mix(in srgb, var(--text-base) 75%, transparent)', fontWeight: '500', marginBottom: '36px', lineHeight: '1.6', fontSize: '15px'}}>{errorMsg || "We are working on it and will be back online shortly."}</p>
                <button onClick={() => window.location.reload()} style={{width: '100%', backgroundColor: 'var(--brand-500)', color: 'white', padding: '22px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--brand-500) 20%, transparent)'}}>Check Connection</button>
            </div>
            <p style={{marginTop: '18px', fontSize: '12px', fontWeight: '700', color: 'color-mix(in srgb, var(--text-base) 50%, transparent)', letterSpacing: '0.05em'}}>Commitment to world-class data services and mentorship</p>
        </div>
    </div>
);

const TypewriterText = ({ text }) => {
    const { useState, useEffect } = React;
    const [displayedLength, setDisplayedLength] = useState(0);

    useEffect(() => {
        setDisplayedLength(0);
        
        const timer = setInterval(() => {
            setDisplayedLength(prev => {
                if (prev >= text.length) {
                    clearInterval(timer);
                    return prev;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [text]);

    const isDone = displayedLength >= text.length;

    return (
        <span className="inline-block relative">
            {text.substring(0, displayedLength)}
            {!isDone && <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-[3px] h-[70%] bg-brand-500 animate-pulse"></span>}
        </span>
    );
};

const useIntersectionObserver = (options) => {
    const { useState, useEffect, useRef } = React;
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [options]);

    return [ref, isIntersecting];
};

const ScrollReveal = ({ children, className = "", delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const TiltCard = ({ children, className = "" }) => {
    const { useRef, useState } = React;
    const cardRef = useRef(null);
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transition: 'transform 0.1s ease-out',
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: 'transform 0.5s ease-out',
            boxShadow: 'none'
        });
    };

    return (
        <div 
            ref={cardRef} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            className={`transition-all will-change-transform ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

const CountDownStat = ({ from = 100, to, label }) => {
    const [count, setCount] = useState(from);
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const started = React.useRef(false);

    useEffect(() => {
        if (!isVisible || started.current) return;
        started.current = true;
        const steps = 35;
        const decrement = (from - to) / steps;
        let current = from;
        const timer = setInterval(() => {
            current -= decrement;
            if (current <= to) {
                setCount(to);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(current));
            }
        }, 1400 / steps);
        return () => clearInterval(timer);
    }, [isVisible, from, to]);

    return (
        <div ref={ref} className="text-center px-2 py-3">
            <div className="flex items-center justify-center gap-2 mb-1">
                <Icon name="users" size={14} className="theme-accent-text opacity-70" />
                <div className="text-xl md:text-3xl font-extrabold theme-gradient-text tabular-nums whitespace-nowrap">
                    <span className="text-sm md:text-base align-top mr-0.5 opacity-60">&lt;</span>{count}
                </div>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest theme-text-muted">
                {label}
            </div>
        </div>
    );
};

const CountUpStat = ({ target, suffix = '', label, icon = 'trending-up' }) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const started = React.useRef(false);

    useEffect(() => {
        if (!isVisible || started.current) return;
        started.current = true;
        const steps = 35;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 1400 / steps);
        return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
        <div ref={ref} className="text-center px-2 py-3">
            <div className="flex items-center justify-center gap-2 mb-1">
                <Icon name={icon} size={14} className="theme-accent-text opacity-70" />
                <div className="text-xl md:text-3xl font-extrabold theme-gradient-text tabular-nums whitespace-nowrap">
                    {count}{suffix}
                </div>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest theme-text-muted mt-1">
                {label}
            </div>
        </div>
    );
};

const SHOW_TESTIMONIALS = false; // fabricated names/quotes — kept disabled, do not enable
const SHOW_TRUST_STRIP = true; // honest, no-name credibility strip — real stat only

const DUMMY_TESTIMONIALS = [
    {
        name: "Priya S.",
        role: "Data Analyst, Mid-size MNC",
        before: "Commerce Graduate — 0 coding background",
        quote: "I had zero coding background. After 4 months I landed my first analyst role with a 280% salary jump. The SQL and Power BI modules were the game-changers for me.",
        initials: "PS",
    },
    {
        name: "Rahul M.",
        role: "Business Analyst, Early-stage Startup",
        before: "Sales Executive — 3 years experience",
        quote: "Switched from a dead-end sales role to data. The live projects gave me a portfolio that actually got me shortlisted. Worth every rupee, genuinely.",
        initials: "RM",
    },
    {
        name: "Anjali K.",
        role: "BI Developer, IT Services Firm",
        before: "BCA Graduate — Fresh Talent profile",
        quote: "The eligibility checker said I was a fresh talent. The program delivered exactly what it promised — from zero to job-ready in 16 weeks. No filler content.",
        initials: "AK",
    }
];

const EligibilityChecker = () => {
    const { useState } = React;
    const { Icon } = window;

    const TOTAL_STEPS = 4;
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        education: '', experience: '', field: '',
        tools: [], analyticalScore: 5,
        targetRole: '', timeline: '', motivation: ''
    });

    const toolOptions = [
        'Excel', 'Google Sheets', 'SQL', 'Python',
        'Power BI', 'Tableau', 'Gemini / AI Tools', 'None yet'
    ];

    const handleToolToggle = (e, tool) => {
        e.preventDefault();
        setFormData(prev => {
            if (tool === 'None yet') return { ...prev, tools: ['None yet'] };
            const without = prev.tools.filter(t => t !== 'None yet');
            return {
                ...prev,
                tools: without.includes(tool)
                    ? without.filter(t => t !== tool)
                    : [...without, tool]
            };
        });
    };

    const buildProfile = (e) => {
        e.preventDefault();
        const { field, experience, tools, analyticalScore, targetRole, timeline } = formData;
        const hasNoTools  = tools.length === 0 || tools.includes('None yet');
        const toolCount   = tools.filter(t => t !== 'None yet').length;
        const isFresher   = ['Fresher', '1-2 Years'].includes(experience);
        const isSenior    = experience === '5+ Years';
        const isTech      = field === 'Tech / Engineering';
        const isFinance   = field === 'Finance / Accounting';
        const isMkt       = field === 'Marketing / Sales';
        const hasAdvanced = toolCount >= 3 || analyticalScore >= 7;

        let key;
        if (isFresher && hasNoTools)                    key = 'zero';
        else if (!isTech && !hasAdvanced && !isSenior)  key = 'switcher';
        else if (isTech && toolCount >= 1)              key = 'tech';
        else if (isSenior || hasAdvanced)               key = 'senior';
        else                                            key = 'accelerator';

        const fieldLabel = field || 'your current domain';
        const roleLabel  = targetRole || 'Data Analyst';
        const toolList   = toolCount > 0
            ? tools.filter(t => t !== 'None yet').join(', ')
            : 'no tools yet';

        const PROFILES = {
            zero: {
                title: 'Zero-to-Analyst Track',
                badge: 'High-Impact Starting Point',
                icon: 'rocket',
                strength: `Starting from scratch is your biggest advantage — no bad habits, no technical debt to unlearn. Students with zero tool experience who commit fully consistently land their first data role within 5-6 months. Your profile is exactly what this curriculum was designed for.`,
                gap: `Your priority path is clear: Mathematics and logical thinking first, then SQL (the language every analyst needs), Python for automation, and Power BI to turn numbers into decisions that stakeholders act on.`,
                modules: ['Math Compass', 'SQL Engine', 'Python', 'Power BI'],
                outcome: `A ${roleLabel} role is well within reach. Graduates from a similar zero-experience starting point have landed roles at companies like Deloitte, KPMG, and Razorpay within 4-5 months of focused work.`
            },
            switcher: {
                title: 'Domain-to-Data Career Switcher',
                badge: 'Strategic Career Pivot',
                icon: 'git-branch',
                strength: `You bring ${experience} of real-world experience from ${fieldLabel}. That context is worth more than you think — every SQL query you write and every dashboard you build will immediately make sense, because you already understand the business behind the numbers.`,
                gap: `You currently know ${toolList}. This program closes the technical gap systematically: SQL and Python give you the data engineering layer, Power BI converts analysis into executive storytelling, and Gemini AI gives you a serious productivity edge.`,
                modules: ['SQL Engine', 'Python', 'Power BI', 'Gemini AI'],
                outcome: `With your domain background, a ${roleLabel} role in ${isFinance ? 'BFSI, fintech, or corporate analytics' : isMkt ? 'marketing analytics or growth analytics' : 'your industry vertical'} is highly achievable within 4-5 months of structured commitment.`
            },
            tech: {
                title: 'Tech-to-Analytics Fast Track',
                badge: 'Accelerated Candidate',
                icon: 'zap',
                strength: `Your engineering background means you already think in systems and logic. You've worked with ${toolList} — which means SQL and Python will click within weeks, not months. Technically-grounded candidates are among the fastest-progressing profiles in this program.`,
                gap: `The gap isn't technical — it's analytical storytelling. Power BI, DAX, and data visualisation are where engineers typically plateau. This program turns your coding fluency into dashboard intelligence that business stakeholders actually act on.`,
                modules: ['SQL Engine', 'Power BI', 'Gemini AI', 'Career Launch'],
                outcome: `You are a strong fit for a ${roleLabel} or BI Developer role. Engineers who speak data fluently command 30-40% higher compensation than peers in pure coding tracks.`
            },
            senior: {
                title: 'Strategic Analyst Upgrade',
                badge: 'Senior-Track Candidate',
                icon: 'trending-up',
                strength: `With ${experience} of professional experience and hands-on use of ${toolList}, you are not here to learn basics — you're here to close precision gaps and position for senior roles. Your analytical self-rating of ${analyticalScore}/10 confirms you already operate at a high level.`,
                gap: `The modules that will unlock the most value for you are the Gemini AI Ecosystem — prompt engineering for real data workflows — advanced DAX in Power BI, and the Career Acceleration module for positioning yourself in senior, lead, or consulting roles.`,
                modules: ['SQL Engine', 'Power BI', 'Gemini AI', 'Career Launch'],
                outcome: `Targeting a Senior ${roleLabel}, Analytics Lead, or Data Manager role is realistic on your profile. Graduates on the senior track have moved into ₹18-25 LPA roles within 3-4 months of completion.`
            },
            accelerator: {
                title: 'Career Accelerator Profile',
                badge: 'Ready to Launch',
                icon: 'award',
                strength: `You come in with ${experience} of professional experience from ${fieldLabel} and have already worked with ${toolList}. That combination — real-world business exposure plus some technical familiarity — is exactly what employers look for in a data analyst hire.`,
                gap: `This program will systematically fill the remaining gaps: structured SQL querying on real industry datasets, Python-based data manipulation, Power BI executive storytelling, and AI-augmented workflows with Gemini that most analysts in the market do not have yet.`,
                modules: ['SQL Engine', 'Python', 'Power BI', 'Gemini AI'],
                outcome: `A ${roleLabel} role is well within your reach. Your profile is among the most employer-ready that we see, and our graduates in this category have consistently secured offers before the program even ends.`
            }
        };

        setProfile({ key, data: PROFILES[key] });
    };

    const reset = () => {
        setProfile(null);
        setStep(1);
        setFormData({ education: '', experience: '', field: '', tools: [], analyticalScore: 5, targetRole: '', timeline: '', motivation: '' });
    };

    const inputClass = "w-full p-3.5 border theme-border theme-card rounded-lg text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none font-medium transition-all theme-text-secondary";
    const btnClass   = "theme-btn-gradient text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2";

    const step1Valid = formData.education && formData.experience && formData.field;
    const step2Valid = formData.tools.length > 0;
    const step3Valid = formData.targetRole;

    if (profile) {
        const { data } = profile;
        return (
            <div className="theme-card border theme-border-strong rounded-3xl p-6 md:p-8 relative overflow-hidden self-center w-full animate-in zoom-in duration-500"
                style={{boxShadow: '0 0 0 1px color-mix(in srgb, var(--brand-500) 40%, transparent), 0 24px 48px -8px rgba(0,0,0,0.25)'}}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-brand-500"></div>
                <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 bg-brand-500/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-brand-500/20">
                        <Icon name={data.icon} size={22} className="theme-mid-text" />
                    </div>
                    <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-0.5">{data.badge}</span>
                        <h2 className="text-lg font-extrabold theme-text-primary leading-tight">{data.title}</h2>
                    </div>
                </div>
                <div className="mb-3 p-4 rounded-xl bg-brand-500/5 border border-brand-500/15">
                    <span className="text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-1.5">What you bring</span>
                    <p className="text-[13px] theme-text-secondary leading-relaxed">{data.strength}</p>
                </div>
                <div className="mb-3 p-4 rounded-xl theme-card border theme-border">
                    <span className="text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-1.5">Where this program closes your gap</span>
                    <p className="text-[13px] theme-text-secondary leading-relaxed">{data.gap}</p>
                </div>
                <div className="mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest theme-text-muted block mb-2">Your critical modules</span>
                    <div className="flex flex-wrap gap-1.5">
                        {data.modules.map((m, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-wider theme-accent-pill px-2.5 py-1 rounded-full">{m}</span>
                        ))}
                    </div>
                </div>
                <div className="mb-5 p-4 rounded-xl bg-brand-500/5 border border-brand-500/15">
                    <span className="text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-1.5">Projected outcome</span>
                    <p className="text-[13px] theme-text-secondary leading-relaxed">{data.outcome}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t theme-border">
                    <button type="button" onClick={reset}
                        className="px-4 py-2.5 text-xs font-bold theme-text-muted hover:text-[var(--text-base)] uppercase tracking-widest border theme-border rounded-lg transition-all flex items-center justify-center gap-2">
                        <Icon name="rotate-ccw" size={13} /> Retake
                    </button>
                    <a href="#about"
                        className="flex-1 theme-btn-gradient text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg text-center">
                        Start Your Journey
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="theme-card border theme-border-strong rounded-3xl p-5 md:p-7 relative overflow-hidden self-center w-full"
            style={{boxShadow: '0 0 0 1px color-mix(in srgb, var(--brand-500) 35%, transparent), 0 20px 40px -8px rgba(0,0,0,0.15)'}}>
            <div className="absolute top-0 left-0 w-full h-1 theme-border-strong" style={{backgroundColor: 'var(--border-strong)'}}>
                <div className="h-full theme-btn-gradient transition-all duration-500"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}></div>
            </div>
            <div className="mb-5 mt-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="theme-mid-text font-bold uppercase tracking-widest text-[10px]">Step {step} of {TOTAL_STEPS}</span>
                    <span className="text-[10px] theme-text-muted font-medium">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
                </div>
                <h3 className="text-lg font-bold theme-text-primary">
                    {step === 1 && "Your Background"}
                    {step === 2 && "Your Current Skills"}
                    {step === 3 && "Your Career Goal"}
                    {step === 4 && "Your Timeline"}
                </h3>
                <p className="text-xs theme-text-muted mt-0.5">
                    {step === 1 && "Tell us where you're coming from — your education, experience, and domain."}
                    {step === 2 && "Be honest. This shapes the gap analysis in your profile."}
                    {step === 3 && "Where do you want to land? This personalises your outcome forecast."}
                    {step === 4 && "How fast do you want to get there?"}
                </p>
            </div>
            <div className="min-h-[240px]">
                {step === 1 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 duration-300">
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2">Highest Education</label>
                            <select value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className={inputClass}>
                                <option value="" disabled>Select your degree...</option>
                                <option>High School / Diploma</option>
                                <option>Bachelor's Degree</option>
                                <option>Master's Degree</option>
                                <option>PhD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2">Work Experience</label>
                            <select value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className={inputClass}>
                                <option value="" disabled>Select experience level...</option>
                                <option>Fresher</option>
                                <option>1-2 Years</option>
                                <option>3-5 Years</option>
                                <option>5+ Years</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2">Current / Previous Domain</label>
                            <select value={formData.field} onChange={e => setFormData({...formData, field: e.target.value})} className={inputClass}>
                                <option value="" disabled>Select your domain...</option>
                                <option>Tech / Engineering</option>
                                <option>Finance / Accounting</option>
                                <option>Marketing / Sales</option>
                                <option>Healthcare / Pharma</option>
                                <option>Operations / Supply Chain</option>
                                <option>Fresher — No Domain Yet</option>
                            </select>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3">Tools You Have Worked With <span className="theme-mid-text normal-case font-medium">(pick all that apply)</span></label>
                            <div className="flex flex-wrap gap-2">
                                {toolOptions.map(tool => (
                                    <button key={tool} type="button" onClick={(e) => handleToolToggle(e, tool)}
                                        className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                                            formData.tools.includes(tool)
                                                ? 'theme-btn-gradient text-white shadow-md'
                                                : 'theme-card border theme-border theme-text-secondary hover:border-brand-500/40'
                                        }`}>
                                        {tool}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3 flex justify-between">
                                <span>Honest Self-Rating — Data & Analytics</span>
                                <span className="theme-mid-text font-black">{formData.analyticalScore} / 10</span>
                            </label>
                            <input type="range" min="1" max="10" value={formData.analyticalScore}
                                onChange={e => setFormData({...formData, analyticalScore: parseInt(e.target.value)})}
                                className="w-full accent-brand-500 cursor-pointer" />
                            <div className="flex justify-between text-[9px] theme-text-muted font-bold uppercase mt-1.5">
                                <span>Complete Beginner</span><span>Advanced</span>
                            </div>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 duration-300">
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2">Target Role After the Program</label>
                            <select value={formData.targetRole} onChange={e => setFormData({...formData, targetRole: e.target.value})} className={inputClass}>
                                <option value="" disabled>Select your target role...</option>
                                <option>Data Analyst</option>
                                <option>Business Analyst</option>
                                <option>BI / Reporting Analyst</option>
                                <option>Data Engineer</option>
                                <option>SQL / Database Developer</option>
                                <option>Marketing Analyst</option>
                                <option>Financial Analyst</option>
                                <option>Not Sure Yet</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3">What is driving this decision?</label>
                            <div className="grid grid-cols-1 gap-2">
                                {[
                                    'Switch careers into data',
                                    'Get promoted in my current company',
                                    'Increase my salary significantly',
                                    'Build skills for freelancing or consulting'
                                ].map(m => (
                                    <button key={m} type="button"
                                        onClick={(e) => { e.preventDefault(); setFormData({...formData, motivation: m}); }}
                                        className={`text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                                            formData.motivation === m
                                                ? 'theme-accent-pill border-[var(--brand-mid)]'
                                                : 'theme-card theme-border theme-text-secondary hover:border-brand-500/30'
                                        }`}>
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {step === 4 && (
                    <div className="space-y-4 animate-in slide-in-from-right-8 duration-300">
                        <div>
                            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3">When do you want to land your target role?</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    ['Within 3 months', 'Urgent — I need to move fast'],
                                    ['3-6 months', 'Focused — I have a clear timeline'],
                                    ['6-12 months', 'Steady — building while working'],
                                    ['Just exploring', "I'm in research mode right now"]
                                ].map(([val, desc]) => (
                                    <button key={val} type="button"
                                        onClick={(e) => { e.preventDefault(); setFormData({...formData, timeline: val}); }}
                                        className={`text-left px-3 py-3 rounded-xl text-xs font-bold transition-all border ${
                                            formData.timeline === val
                                                ? 'theme-accent-pill border-[var(--brand-mid)]'
                                                : 'theme-card theme-border theme-text-secondary hover:border-brand-500/30'
                                        }`}>
                                        <span className="block font-black text-[11px] mb-0.5">{val}</span>
                                        <span className="text-[10px] opacity-70 font-medium">{desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-6 flex justify-between pt-5 border-t theme-border">
                {step > 1
                    ? <button type="button" onClick={(e) => { e.preventDefault(); setStep(step - 1); }}
                        className="px-4 py-2.5 text-sm font-bold theme-text-muted hover:text-[var(--text-base)] transition-colors flex items-center gap-2">
                        <Icon name="arrow-left" size={15} /> Back
                      </button>
                    : <div></div>
                }
                {step < TOTAL_STEPS
                    ? <button type="button"
                        onClick={(e) => { e.preventDefault(); setStep(step + 1); }}
                        disabled={(step === 1 && !step1Valid) || (step === 2 && !step2Valid) || (step === 3 && !step3Valid)}
                        className={`${btnClass} disabled:opacity-40 disabled:cursor-not-allowed`}>
                        Continue <Icon name="arrow-right" size={15} />
                      </button>
                    : <button type="button" onClick={buildProfile}
                        disabled={!formData.timeline}
                        className={`${btnClass} disabled:opacity-40 disabled:cursor-not-allowed`}>
                        See My Profile <Icon name="sparkles" size={15} />
                      </button>
                }
            </div>
        </div>
    );
};
const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [activeProgramId, setActiveProgramId] = useState('ada');
    const [activeModuleIdx, setActiveModuleIdx] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    console.log("App component render. isLoaded:", isLoaded, "error:", error, "SITE_DATA.isLoaded:", window.SITE_DATA?.isLoaded, window.Navbar ? "Navbar ready" : "Navbar MISSING");

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
    const [activeTab, setActiveTab] = useState('about');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['about', 'syllabus', 'tools', 'projects', 'videos',
                ...(SHOW_TRUST_STRIP ? ['trust'] : []),
                'eligibility', 'fees'];
            let current = 'about';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // Determine which section is currently closest to the top of the viewport
                    if (rect.top <= window.innerHeight * 0.4) {
                        current = id;
                    }
                }
            }
            setActiveTab(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once to set the initial state
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const triggerFeedback = (status, message) => {
        setFeedback({ show: true, status, message });
        setTimeout(() => setFeedback({ show: false, status: '', message: '' }), 5000);
    };

    useEffect(() => {
        let isMounted = true;
        let syncInterval;

        const attemptSync = () => {
            if ((window.SITE_DATA?.isLoaded || window.SITE_DATA?.error) && window.Navbar && window.Footer) {
                if (isMounted) {
                    if (window.SITE_DATA.error) setError(window.SITE_DATA.error);
                    setIsLoaded(true);
                    
                    const emergencyUI = document.getElementById('emergency-ui');
                    if (emergencyUI) emergencyUI.remove();
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
        data.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
        
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
        { 
            name: 'PostgreSQL', 
            img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 
            color: 'theme-card' 
        },
        { 
            name: 'Power BI', 
            img: 'https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg', 
            color: 'theme-card' 
        },
        { 
            name: 'Python', 
            img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 
            color: 'theme-card' 
        },
        { 
            name: 'Spreadsheets', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg', 
            color: 'theme-card' 
        },
        { 
            name: 'Jupyter', 
            img: 'https://www.vectorlogo.zone/logos/jupyter/jupyter-icon.svg', 
            color: 'theme-card' 
        },
        { 
            name: 'Data Warehousing', 
            img: 'https://api.iconify.design/vscode-icons:file-type-sql.svg?width=144&height=144', 
            color: 'theme-card' 
        },
        { 
            name: 'Gemini AI', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', 
            color: 'theme-card' 
        },
        { 
            name: 'Soft Skills', 
            img: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png', 
            color: 'theme-card' 
        }
    ];

    // CENTRALIZED RULE FOR PERFECT ALIGNMENT: 
    const sectionClass = "snap-start min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center scroll-mt-[80px] md:scroll-mt-[132px] py-16 md:py-20 px-6 border-b theme-border-strong";

    const handleModuleToggle = (idx) => {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
            setActiveModuleIdx(activeModuleIdx === idx ? -1 : idx);
        } else {
            setActiveModuleIdx(idx);
        }
    };

    return (
        <div className="min-h-screen theme-text-primary animate-in fade-in duration-700 text-left">
            <Navbar activeProgramId={activeProgramId} onProgramChange={(id) => { setActiveProgramId(id); setActiveModuleIdx(0); setFormData({...formData, discountApplied: false, couponCode: ''}); }} />

            {feedback.show && (
                <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 ${feedback.status === 'success' ? 'bg-secondary-900 border-l-4 border-brand-500' : 'bg-rose-900 border-l-4 border-rose-400'}`}>
                    <Icon name={feedback.status === 'success' ? 'check-circle' : 'alert-circle'} size={20} className={feedback.status === 'success' ? 'theme-mid-text' : 'text-rose-300'} />
                    <span className="text-white font-bold text-sm tracking-tight">{feedback.message}</span>
                    <button onClick={() => setFeedback({ ...feedback, show: false })} className="ml-4 text-white/50 hover:text-white"><Icon name="x" size={16} /></button>
                </div>
            )}

            <div className="fixed top-20 left-0 right-0 w-full z-40 backdrop-blur-xl border-b theme-border-strong shadow-md hidden md:block py-2.5" style={{background: 'var(--nav-bg)'}}>
                <div className="max-w-5xl mx-auto flex items-center justify-between px-4">
                    {[
                        { label: 'About', id: 'about' },
                        { label: 'Syllabus', id: 'syllabus' },
                        { label: 'Tools', id: 'tools' },
                        { label: 'Projects', id: 'projects' },
                        { label: 'Videos', id: 'videos' },
                        ...(SHOW_TESTIMONIALS ? [{ label: 'Reviews', id: 'testimonials' }] : []),
                        { label: 'Eligibility', id: 'eligibility' },
                        { label: 'Pricing', id: 'fees' },
                    ].map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <a
                                key={tab.id}
                                href={`#${tab.id}`}
                                className={`px-4 py-2 rounded-xl text-[14px] transition-all duration-200 font-bold ${
                                    isActive
                                        ? 'theme-accent-pill font-extrabold shadow-sm'
                                        : 'theme-text-muted hover:text-[var(--text-base)] hover:bg-[var(--bg-alt)] border border-transparent'
                                }`}
                            >
                                {tab.label}
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* About header stays 100svh because it sits visually AT the top of the page under the transparent nav */}
            <header id="about" className="relative snap-start min-h-[100svh] flex flex-col justify-center pt-28 md:pt-48 pb-16 md:pb-24 px-6 scroll-mt-[80px] md:scroll-mt-[132px] overflow-hidden">
                {/* Dynamic Background Data-Node Animation */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-700 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
                    {/* Rotating grid/node structure */}
                    <div className="absolute inset-0 w-[200%] h-[200%] translate-x-[-25%] translate-y-[-25%] gear-large opacity-10"
                         style={{backgroundImage: 'radial-gradient(circle at 2px 2px, var(--brand-500) 1px, transparent 0)', backgroundSize: '40px 40px'}}>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center w-full relative z-10">
                    <div className="relative space-y-6 md:space-y-8 text-left">
                        {/* Animated Data-Analytics Dashboard Motif — background wash filling this column exactly, same margins as the text, clear of the lead-capture form in the other column */}
                        <div className="absolute inset-0 opacity-[0.14] pointer-events-none hidden md:block -z-10">
                            <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none">
                                <g className="theme-mid-text" stroke="currentColor" strokeWidth="1" opacity="0.25">
                                    <line x1="10" y1="170" x2="310" y2="170" />
                                    <line x1="10" y1="10" x2="10" y2="170" />
                                </g>
                                <rect className="hero-chart-bar text-brand-500" x="30" y="90" width="24" height="80" rx="4" fill="currentColor" opacity="0.7" style={{animationDelay: '0s'}} />
                                <rect className="hero-chart-bar theme-mid-text" x="70" y="60" width="24" height="110" rx="4" fill="currentColor" opacity="0.7" style={{animationDelay: '0.3s'}} />
                                <rect className="hero-chart-bar text-brand-500" x="110" y="100" width="24" height="70" rx="4" fill="currentColor" opacity="0.7" style={{animationDelay: '0.6s'}} />
                                <rect className="hero-chart-bar theme-mid-text" x="150" y="40" width="24" height="130" rx="4" fill="currentColor" opacity="0.7" style={{animationDelay: '0.9s'}} />
                                <rect className="hero-chart-bar text-brand-500" x="190" y="75" width="24" height="95" rx="4" fill="currentColor" opacity="0.7" style={{animationDelay: '1.2s'}} />
                                <path className="hero-chart-line theme-mid-text" d="M30 130 L70 95 L110 115 L150 55 L190 85 L230 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                <circle className="hero-chart-chip text-brand-400" cx="230" cy="45" r="5" fill="currentColor" style={{animationDelay: '0.5s'}} />
                                <circle className="hero-chart-chip theme-mid-text" cx="150" cy="55" r="4" fill="currentColor" style={{animationDelay: '1.4s'}} />
                            </svg>
                        </div>
                        <div className="inline-block theme-accent-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                            {settings?.brand?.tagline || "Logic-First. AI-Fast."}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text-base)] tracking-tight transition-all duration-300 hover:scale-[1.01] hover:drop-shadow-lg cursor-default">
                            Certification in <br/>
                            <span className="theme-gradient-text">
                                <TypewriterText text={currentProgram.title} />
                            </span>
                        </h1>
                        <p className="text-sm md:text-base text-[var(--text-base)] opacity-70 max-w-2xl leading-relaxed mb-6 font-medium">
                            {currentProgram.description ||settings?.seo?.metaDescription}
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="space-y-3 md:space-y-4 text-sm font-semibold text-[var(--text-base)] opacity-90 text-left flex-1">
                                <div className="flex items-center space-x-3"><Icon name="calendar" size={18} className="theme-mid-text flex-shrink-0" /><span>4-Month Intensive Zero-to-Job Career Program</span></div>
                                <div className="flex items-center space-x-3"><Icon name="video" size={18} className="theme-mid-text flex-shrink-0" /><span>100% Live Instructor-Led Virtual Classrooms</span></div>
                                <div className="flex items-center space-x-3"><Icon name="check-circle" size={18} className="theme-mid-text flex-shrink-0" /><span>Placement Assistance for All Eligible Candidates</span></div>
                                <div className="flex items-center space-x-3"><Icon name="award" size={18} className="theme-mid-text flex-shrink-0" /><span>{PROJECT_COUNT}+ Industry-Grade Projects and Case Studies</span></div>
                            </div>
                            <img src="assets/images/pilot/hero.jpg" alt="" className="hidden lg:block w-32 h-32 rounded-2xl object-cover object-top border-2 theme-border-strong shadow-lg flex-shrink-0" onError={e => e.target.style.display='none'} />
                        </div>
                        <div className="pt-2 md:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                            <TiltCard>
                                <a href="#syllabus" className="block w-full theme-btn-gradient text-white px-8 py-3.5 md:py-4 rounded font-bold transition-all text-sm uppercase tracking-widest text-center shadow-lg">
                                    Explore Curriculum
                                </a>
                            </TiltCard>
                            <TiltCard>
                                <a href={window.SITE_DATA.media?.downloads?.brochure || "#"} className="theme-mid-outline-btn block w-full font-bold px-8 py-3.5 md:py-4 rounded uppercase tracking-widest text-sm text-center transition-all">
                                    Download Brochure
                                </a>
                            </TiltCard>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 max-w-md ml-auto w-full">
                    <div className="bg-[var(--surface-form)] p-8 border border-[var(--border-color)] rounded-3xl w-full shadow-2xl backdrop-blur-md text-left mt-8 lg:mt-0 relative overflow-hidden group">
                        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-brand-300 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></div>
                        
                        <h3 className="text-2xl font-extrabold mb-2 text-[var(--text-base)] relative z-10 tracking-tight">{settings?.ui?.modalTitle || "Begin Your Journey"}</h3>
                        <p className="text-sm text-[var(--text-base)] opacity-60 mb-6 font-medium relative z-10">{settings?.ui?.modalSubText}</p>
                        
                        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Full Name" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full p-4 border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-base)] rounded-xl text-sm focus:border-brand-500 outline-none font-medium transition-all placeholder-[var(--text-base)] placeholder-opacity-40 focus:ring-1 focus:ring-brand-500" />
                            <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-base)] rounded-xl text-sm focus:border-brand-500 outline-none font-medium transition-all placeholder-[var(--text-base)] placeholder-opacity-40 focus:ring-1 focus:ring-brand-500" />
                            <input type="tel" placeholder="Mobile Number" required maxLength="10" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-base)] rounded-xl text-sm focus:border-brand-500 outline-none font-medium transition-all placeholder-[var(--text-base)] placeholder-opacity-40 focus:ring-1 focus:ring-brand-500" />
                            
                            <div className="pt-2">
                                <TiltCard>
                                    <button type="submit" disabled={isSubmitting} className="w-full block theme-btn-gradient text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                        {isSubmitting ? 'Processing...' : (settings?.labels?.applyButton || 'Apply Now')}
                                    </button>
                                </TiltCard>
                            </div>
                            
                            <p className="mt-4 text-[10px] text-[var(--text-base)] opacity-40 text-center leading-tight">
                                By applying, you agree to our <a href="privacy-policy.html" target="_blank" className="underline theme-mid-hover-text">Privacy Policy</a>. Data is used only for your professional consultation.
                            </p>
                        </form>
                    </div>
                    <div className="grid grid-cols-3 divide-x theme-border-strong border theme-border-strong rounded-2xl overflow-hidden theme-card">
                        <CountDownStat from={100} to={30} label="Seats Per Batch" />
                        <CountUpStat target={16} suffix=" Weeks" label="Intensive Program" icon="calendar" />
                        <CountUpStat target={PROJECT_COUNT} suffix="+" label="Live Projects" icon="layout-grid" />
                    </div>
                    </div>
                </div>
            </header>

            <ScrollReveal delay={100}>
                <section id="syllabus" className={`${sectionClass} theme-bg-alt relative overflow-hidden`}>
                    {/* Futuristic Gradient Section Separator */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
                    
                    {/* Ambient Glow Pill Spotlights */}
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="w-full max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4 border-b theme-border-strong pb-4">
                            <div>
                                <window.SectionEyebrow className="text-xs block mb-1">Curriculum Architecture</window.SectionEyebrow>
                                <h2 className="text-3xl font-extrabold text-left theme-text-primary tracking-tight">Job-Ready Data Analytics Curriculum</h2>
                            </div>
                        </div>
                        
                        {/* Module Progress Roadmap */}
                        <div className="flex items-start gap-0 mb-5 overflow-x-auto pb-2 -mx-1 px-1" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                            {(currentProgram.syllabus || []).map((mod, idx) => (
                                <React.Fragment key={idx}>
                                    <button
                                        onClick={() => handleModuleToggle(idx)}
                                        className="flex-shrink-0 flex flex-col items-center gap-1.5 group"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                                            idx <= activeModuleIdx
                                                ? 'theme-btn-gradient text-white shadow-md'
                                                : 'bg-transparent border-2 border-slate-400 text-slate-500 group-hover:border-brand-500/50'
                                        }`}>
                                            {idx + 1}
                                        </div>
                                        <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors max-w-[64px] text-center leading-tight ${
                                            idx === activeModuleIdx ? 'theme-mid-text' : 'text-slate-500'
                                        }`}>
                                            {mod.shortLabel || mod.title.split(' ').slice(0, 2).join(' ')}
                                        </span>
                                    </button>
                                    {idx < (currentProgram.syllabus?.length || 1) - 1 && (
                                        <div className={`flex-1 h-0.5 mx-1 min-w-[20px] mt-4 transition-colors ${
                                            idx < activeModuleIdx ? 'bg-brand-500' : 'bg-slate-700'
                                        }`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 min-h-[300px]">
                            <div className="lg:w-1/3 flex flex-col space-y-3">
                                {(currentProgram.syllabus || []).map((mod, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <button 
                                            onClick={() => handleModuleToggle(idx)} 
                                            className={`p-6 text-left rounded-xl transition-all font-semibold flex items-center justify-between group ${activeModuleIdx === idx ? 'theme-btn-gradient text-white shadow-lg' : 'theme-card border theme-border theme-text-secondary hover:border-brand-500/40 hover:text-[var(--text-base)]'}`}
                                        >
                                            <span className="text-md font-bold">{idx + 1}. {mod.title}</span>
                                            <Icon name="chevron-right" size={20} className={`transition-all duration-300 transform ${activeModuleIdx === idx ? 'rotate-90 opacity-100' : 'rotate-0 opacity-40 group-hover:opacity-70'}`} />
                                        </button>
    
                                        {/* MOBILE ACCORDION CONTENT */}
                                        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${activeModuleIdx === idx ? 'max-h-[1200px] opacity-100 py-6' : 'max-h-0 opacity-0'}`}>
                                            <div className="theme-bg-alt rounded-2xl p-6 border theme-border space-y-6">
                                                <div className="flex flex-col space-y-1">
                                                    <span className="theme-mid-text font-bold uppercase text-[10px] tracking-widest">Module 0{idx + 1} Details</span>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Icon name="play-circle" size={16} className="theme-mid-text" />
                                                        <span className="text-[11px] font-bold theme-text-muted uppercase">Live: {mod.lectures} • {mod.hours} Hours</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    {(mod.content || []).map((bullet, i) => (
                                                        <div key={i} className="flex items-start space-x-3 text-left">
                                                            <Icon name="check-circle" size={14} className="theme-mid-text mt-1 flex-shrink-0" />
                                                            <span className="text-sm font-medium theme-text-secondary leading-snug">{bullet}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <TiltCard><a href={window.SITE_DATA.media?.downloads?.brochure || "#"} className="theme-mid-outline-btn w-full flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-all"><Icon name="download" size={14} /><span>Download Brochure</span></a></TiltCard>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
    
                            {/* DESKTOP DETAIL VIEW */}
                            <div className="hidden lg:flex lg:w-2/3 theme-bg-alt p-10 rounded-2xl border theme-border flex-col shadow-2xl relative overflow-hidden group backdrop-blur-xl">
                                <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-brand-500 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

                                {currentProgram.syllabus && currentProgram.syllabus[activeModuleIdx] ? (
                                    <>
                                        <div className="mb-8 pb-6 border-b theme-border flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                                            <div className="space-y-1 text-left">
                                                <span className="theme-mid-text font-bold uppercase text-[11px] tracking-widest">Module 0{activeModuleIdx + 1}</span>
                                                <h3 className="text-2xl font-bold theme-text-primary mt-1">{currentProgram.syllabus[activeModuleIdx].title}</h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Icon name="play-circle" size={18} className="theme-mid-text" />
                                                    <span className="text-xs font-bold theme-text-muted uppercase tracking-tighter">Live Lectures: {currentProgram.syllabus[activeModuleIdx].lectures} • Total: {currentProgram.syllabus[activeModuleIdx].hours} Hours</span>
                                                </div>
                                            </div>
                                            <TiltCard><a href={window.SITE_DATA.media?.downloads?.brochure || "#"} className="theme-mid-outline-btn block flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest self-start transition-all cursor-pointer"><Icon name="download" size={14} /><span>Download Brochure</span></a></TiltCard>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-left relative z-10">
                                            {(currentProgram.syllabus[activeModuleIdx].content || []).map((bullet, i) => (
                                                <div key={i} className="flex items-start space-x-3 group/bullet">
                                                    <Icon name="check-circle" size={14} className="theme-mid-text mt-1 flex-shrink-0" />
                                                    <span className="text-[14px] font-medium theme-text-secondary group-hover/bullet:text-[var(--text-base)] transition-colors">{bullet}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full theme-text-muted font-bold relative z-10">Please select a module to view curriculum details.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Week-by-week rising trend toward Career Launch — HTML labels (matches site type scale exactly), SVG used only for the curve/area/dots */}
                    {(currentProgram.syllabus || []).length > 1 && (() => {
                        const totalModules = currentProgram.syllabus.length;
                        const X0 = 20, X1 = 780, YBOTTOM = 100, YTOP = 16;
                        const ease = (t) => t * t; // gradual, accelerating rise — not linear
                        const pointFor = (idx) => {
                            const t = idx / (totalModules - 1);
                            return { t, x: X0 + t * (X1 - X0), y: YBOTTOM + (YTOP - YBOTTOM) * ease(t), week: Math.round(1 + t * 15) };
                        };
                        const SAMPLES = 48;
                        const curvePoints = Array.from({ length: SAMPLES + 1 }, (_, i) => {
                            const t = i / SAMPLES;
                            return `${X0 + t * (X1 - X0)},${YBOTTOM + (YTOP - YBOTTOM) * ease(t)}`;
                        });
                        const linePath = `M${curvePoints.join(' L')}`;
                        const areaPath = `${linePath} L${X1},118 L${X0},118 Z`;
                        return (
                            <div className="w-full max-w-7xl mx-auto mt-10 pt-8 border-t theme-border relative z-10">
                                <span className="theme-mid-text font-bold uppercase text-[10px] tracking-widest block mb-4">16-Week Path to Career Launch</span>
                                <div className="relative w-full" style={{height: '118px'}}>
                                    <svg viewBox="0 0 800 118" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" fill="none">
                                        <defs>
                                            <linearGradient id="careerLaunchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="var(--brand-500)" />
                                                <stop offset="100%" stopColor="var(--brand-accent)" />
                                            </linearGradient>
                                        </defs>
                                        <path d={areaPath} fill="url(#careerLaunchGrad)" opacity="0.12" />
                                        <path d={linePath} stroke="url(#careerLaunchGrad)" strokeWidth="2.5" strokeLinecap="round" />
                                        <circle r="5" fill="url(#careerLaunchGrad)">
                                            <animateMotion path={linePath} dur="5s" repeatCount="indefinite" />
                                        </circle>
                                        {(currentProgram.syllabus || []).map((mod, idx) => {
                                            const { x, y } = pointFor(idx);
                                            const isLast = idx === totalModules - 1;
                                            return <circle key={idx} cx={x} cy={y} r={isLast ? 6 : 3.5} fill={isLast ? 'var(--brand-accent)' : 'var(--brand-mid)'} stroke="var(--bg-base)" strokeWidth="2" />;
                                        })}
                                    </svg>
                                    {(currentProgram.syllabus || []).map((mod, idx) => {
                                        const { t, week } = pointFor(idx);
                                        const isLast = idx === totalModules - 1;
                                        return (
                                            <div key={idx} className="absolute" style={{ left: `${t * 100}%`, top: '100%', transform: 'translate(-50%, 4px)' }}>
                                                <span className="text-[10px] font-bold theme-text-muted uppercase tracking-wider whitespace-nowrap">Wk {week}</span>
                                            </div>
                                        );
                                    })}
                                    <div className="absolute" style={{ left: `${pointFor(totalModules - 1).t * 100}%`, top: `${(pointFor(totalModules - 1).y / 118) * 100}%`, transform: 'translate(-100%, -22px)' }}>
                                        <span className="theme-mid-text font-black uppercase text-[11px] tracking-wider whitespace-nowrap">Career Launch</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </section>
            </ScrollReveal>

            <ScrollReveal delay={100}>
                <section id="tools" className={`${sectionClass} theme-bg relative overflow-hidden`}>
                    {/* Inner aurora glow — matches hero technique */}
                    <div className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.07] animate-pulse pointer-events-none"></div>
                    <div className="absolute bottom-[-15%] right-[-10%] w-[35vw] h-[35vw] bg-brand-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.05] animate-pulse pointer-events-none" style={{animationDelay:'3s'}}></div>
                    <div className="w-full max-w-7xl mx-auto text-left relative z-10">
                        <window.SectionEyebrow>Industry Stack</window.SectionEyebrow>
                        <h2 className="text-3xl font-bold mb-16 theme-text-primary tracking-tight">Modern Industry Tool Stack</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {tools.map((tool, i) => (
                            <ScrollReveal key={i} delay={i * 70}>
                            <TiltCard className="group h-full rounded-2xl">
                                <div className={`${tool.color} theme-mid-hover-border p-8 flex flex-col items-center justify-center space-y-4 border theme-border shadow-sm rounded-2xl transition-all duration-300 h-full hover:shadow-lg relative overflow-hidden`}>
                                    <div className="w-16 h-16 flex items-center justify-center relative z-10">
                                        <img
                                            src={tool.img}
                                            alt={tool.name}
                                            className="w-12 h-12 md:w-16 md:h-16 object-contain transition-transform group-hover:scale-110 duration-500"
                                            onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/2741/2741270.png'; }}
                                        />
                                    </div>
                                    <span className="font-bold theme-text-secondary text-sm relative z-10 group-hover:text-[var(--brand-mid)] transition-colors duration-300">{tool.name}</span>
                                    {/* Hover Glow — now blue-to-green, was blue-only */}
                                    <div className="absolute inset-0 theme-hover-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{background: 'var(--brand-accent)'}}></div>
                                </div>
                            </TiltCard>
                            </ScrollReveal>
                        ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* PROJECTS SECTION - 2026 Tilt Grid */}
            <ScrollReveal>
                <section id="projects" className={`${sectionClass} theme-bg-alt relative overflow-hidden`}>
                    <div className="absolute top-[-10%] right-[-8%] w-[40vw] h-[40vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[130px] opacity-[0.06] animate-pulse pointer-events-none"></div>
                    <div className="w-full max-w-7xl mx-auto text-left relative z-10">
                        <window.SectionEyebrow>Hands-On Work</window.SectionEyebrow>
                        <h2 className="text-3xl font-extrabold mb-8 md:mb-12 theme-text-primary tracking-tight flex items-center gap-3">
                            <Icon name="layout-grid" size={32} className="text-brand-500" />
                            {PROJECT_COUNT}+ Real-Time Industry Projects
                        </h2>

                        {/* Tile Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {(media.projects || []).slice(0, 6).map((proj, idx) => (
                                <TiltCard key={proj.id} className="col-span-1 group">
                                    <div className="h-full w-full theme-card rounded-2xl border theme-border overflow-hidden relative transition-all duration-300 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10 flex flex-col">
                                        <div className="h-32 md:h-40 theme-card flex items-center justify-center relative overflow-hidden">
                                            <img src={proj.img} alt={proj.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700" onError={e => e.target.style.display='none'} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                                            <Icon name="image" size={32} className="opacity-20 absolute" />
                                            {/* Project number badge on image */}
                                            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur theme-mid-text px-2 py-1 rounded border border-[var(--brand-mid)]">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            {/* MasterStudy-style corner tag */}
                                            <window.CardBadge className="absolute top-3 right-3">Live Project</window.CardBadge>
                                        </div>
                                        <div className="p-4 md:p-5 relative z-10 theme-card flex-grow flex flex-col gap-2">
                                            <h4 className="font-bold theme-text-primary text-[13px] md:text-sm tracking-tight line-clamp-2">{proj.title}</h4>
                                            {proj.description && <p className="text-[11px] theme-text-muted leading-snug line-clamp-2">{proj.description}</p>}
                                            {proj.tools && proj.tools.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-auto pt-1">
                                                    {proj.tools.map((t, ti) => (
                                                        <span key={ti} className="text-[9px] font-bold uppercase tracking-wider theme-accent-pill px-1.5 py-0.5 rounded">{t}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/5 to-brand-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            <ScrollReveal delay={100}>
                <section id="videos" className={`${sectionClass} theme-bg relative overflow-hidden`}>
                    <div className="absolute bottom-[-15%] left-[-8%] w-[40vw] h-[40vw] bg-brand-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.06] animate-pulse pointer-events-none" style={{animationDelay:'1.5s'}}></div>
                     <div className="w-full max-w-7xl mx-auto text-left relative z-10">
                        <window.SectionEyebrow>Watch & Learn</window.SectionEyebrow>
                        <h2 className="text-3xl font-bold theme-text-primary tracking-tight mb-12">Program Overview & Demos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(media.videos || []).map((vid, i) => (
                                <TiltCard key={i} className="group">
                                    <a href={vid.url || '#'} target="_blank" rel="noopener noreferrer" className="block aspect-video theme-card rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden border theme-border hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/15 transition-all duration-300">
                                        <img src={vid.thumb || `https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`} alt={vid.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 opacity-85 group-hover:opacity-100" onError={e => e.target.style.display='none'} />
                                        {/* Dark overlay for readability */}
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"></div>
                                        {/* Pulsing play button ring */}
                                        <div className="relative z-10 flex items-center justify-center">
                                            <div className="absolute w-14 h-14 rounded-full animate-ping" style={{background: 'color-mix(in srgb, var(--brand-mid) 30%, transparent)'}}></div>
                                            <div className="w-12 h-12 rounded-full theme-btn-gradient backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon name="play" size={20} className="text-white ml-0.5" />
                                            </div>
                                        </div>
                                        {/* Title badge */}
                                        <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                                            <span className="text-white font-semibold text-[11px] uppercase tracking-wide line-clamp-2 leading-tight">{vid.title}</span>
                                        </div>
                                    </a>
                                </TiltCard>
                            ))}
                        </div>
                     </div>
                </section>
            </ScrollReveal>

            {SHOW_TRUST_STRIP && (
                <ScrollReveal delay={100}>
                    <section id="trust" className={`${sectionClass} theme-bg-alt relative overflow-hidden justify-center`} style={{minHeight: 'auto', paddingTop: '3rem', paddingBottom: '3rem'}}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[140px] opacity-[0.07] pointer-events-none"></div>
                        <div className="w-full max-w-4xl mx-auto text-center relative z-10">
                            <span className="inline-block theme-accent-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Track Record</span>
                            <div className="flex items-center justify-center gap-4">
                                <span className="theme-gradient-text text-6xl md:text-7xl font-extrabold tracking-tight">100+</span>
                                <span className="text-left theme-text-primary text-lg md:text-xl font-bold leading-tight max-w-[220px]">Students Mentored in Live Online Classes</span>
                            </div>
                            <p className="theme-text-muted text-sm mt-6 max-w-xl mx-auto leading-relaxed">
                                Before launching The Data Pilot, our mentors personally trained 100+ learners through live online cohorts — the same teaching approach now built into this program.
                            </p>
                        </div>
                    </section>
                </ScrollReveal>
            )}

            <ScrollReveal delay={100}>
                <section id="eligibility" className="snap-start min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center py-8 md:py-10 px-6 border-b theme-border-strong scroll-mt-[80px] md:scroll-mt-[132px] theme-bg-alt relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse 60% 80% at 10% 55%, var(--brand-500) 0%, transparent 60%)', opacity: 0.07}}></div>
                    <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse 40% 50% at 90% 40%, var(--brand-700) 0%, transparent 60%)', opacity: 0.04}}></div>

                    <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left relative z-10">

                        {/* Left — Criteria */}
                        <div className="space-y-4 w-full self-center">
                            <div className="inline-flex items-center theme-accent-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                Candidate Profiling
                            </div>
                            <h2 className="text-2xl md:text-3xl font-extrabold theme-text-primary tracking-tight leading-tight">
                                Who Is This<br />
                                <span className="theme-gradient-text">Program For?</span>
                            </h2>
                            <p className="theme-text-muted font-medium leading-relaxed text-sm max-w-sm">
                                Built for graduates, working professionals, and career-changers ready to enter data.
                            </p>

                            <div className="space-y-2">
                                {[
                                    "Final year students or graduates from any discipline.",
                                    "Working professionals looking for career acceleration.",
                                    "Basic understanding of logical reasoning required.",
                                    "Commitment to 15-20 hours of weekly learning."
                                ].map((text, i) => (
                                    <ScrollReveal key={i} delay={i * 70}>
                                        <div className="flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01]"
                                             style={{
                                                 background: 'color-mix(in srgb, var(--brand-500) 5%, var(--surface-card))',
                                                 borderColor: 'color-mix(in srgb, var(--brand-500) 20%, transparent)',
                                                 borderLeftWidth: '3px',
                                                 borderLeftColor: 'var(--brand-500)'
                                             }}>
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-white font-black text-xs theme-btn-gradient">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm font-semibold theme-text-secondary leading-snug pt-0.5">{text}</span>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>

                        {/* Right — Eligibility Checker */}
                        <EligibilityChecker />

                    </div>
                </section>
            </ScrollReveal>

            {/* INVEST SECTION */}
            <ScrollReveal delay={100}>
                <section id="fees" className="min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center py-8 md:py-12 px-6 theme-bg scroll-mt-[80px] md:scroll-mt-[132px]">
                    <div className="w-full max-w-5xl mx-auto text-left mb-4">
                        <window.SectionEyebrow className="text-xs block mb-2">Certification Program</window.SectionEyebrow>
                        <h2 className="text-3xl font-extrabold theme-text-primary tracking-tight">Program Fees</h2>
                    </div>
                    <div className="w-full max-w-5xl mx-auto theme-card rounded-[3rem] border theme-border overflow-hidden shadow-2xl grid md:grid-cols-2">
                        <div className="p-6 md:p-10 space-y-5 text-left">
                            <h3 className="text-xl font-extrabold tracking-tight theme-text-primary">What's Included</h3>
                            <div className="space-y-3">
                                {(currentProgram.highlights || []).map((t, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <Icon name="check-circle" size={20} className="theme-mid-text flex-shrink-0" />
                                        <span className="text-md font-bold theme-text-secondary">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        <div className="p-6 md:p-10 theme-btn-gradient text-white flex flex-col justify-center space-y-5 text-left">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Program Fee</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{currentProgram.title}</h3>
                            </div>
    
                            <div className="space-y-1">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 flex-wrap overflow-hidden">
                                    <span className="text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap">
                                        ₹{(formData.discountApplied ? formData.finalPrice : currentProgram.price)?.toLocaleString()} /-
                                    </span>
                                    
                                    {formData.discountApplied && (
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-white/60 line-through text-xs md:text-sm font-medium whitespace-nowrap">
                                                ₹{currentProgram.price?.toLocaleString()} /-
                                            </span>
                                            <span className="text-white text-xs md:text-sm font-bold whitespace-nowrap">
                                                - ₹{formData.discountAmount?.toLocaleString()} /-
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-white/60 text-[10px] md:text-xs font-medium uppercase tracking-widest mt-1">Inclusive of all taxes</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex gap-2 p-1 bg-white/10 border border-white/10 rounded-xl focus-within:border-white/40 transition-all">
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon Code"
                                        className="bg-transparent flex-1 px-3 py-2 text-xs md:text-sm outline-none font-bold uppercase tracking-widest placeholder:text-white/50 text-white min-w-0"
                                        value={formData.couponCode}
                                        onChange={(e) => setFormData({...formData, couponCode: e.target.value})}
                                    />
                                    <TiltCard>
                                        <button 
                                            onClick={applyCoupon}
                                            className="block bg-white theme-mid-text hover:brightness-95 px-4 md:px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex-shrink-0"
                                        >
                                            Apply
                                        </button>
                                    </TiltCard>
                                </div>
                                {formData.discountApplied && (
                                    <p className="text-[10px] text-white font-bold px-2 flex items-center gap-1 uppercase tracking-widest animate-pulse">
                                        <Icon name="tag" size={10} /> Discount Applied Successfully
                                    </p>
                                )}
                            </div>
    
                            <TiltCard>
                                <button className="w-full block bg-white theme-mid-text hover:brightness-95 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3">
                                    <Icon name="credit-card" size={18} className="flex-shrink-0" />
                                    <span className="text-center">Make Payment ₹{(formData.discountApplied ? formData.finalPrice : currentProgram.price)?.toLocaleString()} /-</span>
                                </button>
                            </TiltCard>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            <Footer />
        </div>
    );
};

if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(<App />);