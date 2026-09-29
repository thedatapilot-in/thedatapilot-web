/**
 * THE DATA PILOT - MASTER ENGINE v2.0.40
 * ---------------------------------------------------------
 * UI FIX: Restored missing Social Media icons in the Footer.
 * EXPLANATION: Bypassed the external icon library for brands (since it 
 * dropped support for them) and hardcoded the raw, unbreakable SVGs for 
 * LinkedIn, Instagram, YouTube, and Facebook.
 * ---------------------------------------------------------
 */

// 1. GLOBAL STATE INITIALIZATION
window.SITE_DATA = {
    settings: null,
    programs: null,
    products: null,
    services: null,
    media: null,
    isLoaded: false,
    error: null
};

// 2. THE DATA LOADER
window.loadSiteData = async () => {
    const v = new Date().getTime(); 
    const safeFetch = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) return null; 
            return await res.json();
        } catch (err) {
            console.error(`[Data Vault] JSON Sync Error:`, err);
            return null;
        }
    };

    try {
        const [settings, programs, products, services, media] = await Promise.all([
            safeFetch(`data/settings.json?v=${v}`),
            safeFetch(`data/programs.json?v=${v}`),
            safeFetch(`data/products.json?v=${v}`),
            safeFetch(`data/services.json?v=${v}`),
            safeFetch(`data/media.json?v=${v}`)
        ]);

        if (!programs) throw new Error("Critical logic data missing.");

        // --- SEO & METADATA SYNC ENGINE ---
        const syncMetadata = (seoData) => {
            if (!seoData) return;
            
            // 1. Update Tab Title
            if (seoData.metaTitle) document.title = seoData.metaTitle;
            
            // Helper for Meta Tags
            const updateMeta = (attr, value, content) => {
                let el = document.querySelector(`meta[${attr}="${value}"]`);
                if (!el) {
                    el = document.createElement('meta');
                    el.setAttribute(attr, value);
                    document.head.appendChild(el);
                }
                el.content = content;
            };

            // 2. Sync All Tags (Standard, Open Graph, and Twitter)
            if (seoData.metaDescription) updateMeta("name", "description", seoData.metaDescription);
            if (seoData.ogTitle) updateMeta("property", "og:title", seoData.ogTitle);
            if (seoData.ogDescription) updateMeta("property", "og:description", seoData.ogDescription);
            if (seoData.ogImage) updateMeta("property", "og:image", seoData.ogImage);
            if (seoData.ogType) updateMeta("property", "og:type", seoData.ogType);
            if (seoData.twitterCard) updateMeta("name", "twitter:card", seoData.twitterCard);
        };

        window.SITE_DATA = { 
            settings: settings || {}, 
            programs, 
            products: products || {}, 
            services: services || {}, 
            media: media || {}, 
            isLoaded: true, 
            error: null 
        };

        // Execute SEO sync immediately after data is ready
        syncMetadata(settings?.seo);
        
        window.dispatchEvent(new Event('siteDataLoaded'));
    } catch (error) {
        window.SITE_DATA.error = error.message;
        window.dispatchEvent(new Event('siteDataLoaded'));
    }
};

window.loadSiteData();

/**
 * 3. DYNAMIC UI COMPONENTS
 */

window.Icon = ({ name, size = 20, className = "" }) => {
    React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, [name]);
    return <i key={name} data-lucide={name} className={className} style={{ width: size, height: size }}></i>;
};

/**
 * Centralized formatting components — defined once here (core-layout.js,
 * loaded on every page), so every page's section labels/badges/CTAs stay
 * visually identical automatically instead of each page re-implementing
 * its own copy of the same className string.
 */

// Small uppercase eyebrow label above a section heading (e.g. "About Us", "Digital Products")
// No default margin/size baked in — callers pass their own spacing via className since
// this is reused in contexts needing different gaps (mb-1 vs mb-4) and Tailwind's CDN JIT
// can't reliably resolve which of two conflicting margin classes wins.
window.SectionEyebrow = ({ children, className = "text-xs block mb-3" }) => (
    <span className={`theme-mid-text font-bold uppercase tracking-widest ${className}`}>{children}</span>
);

// Small rounded corner tag on a card (e.g. project/product/service cards)
window.CardBadge = ({ children, className = "" }) => (
    <span className={`inline-block theme-btn-gradient text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shadow-lg ${className}`}>{children}</span>
);

// Primary gradient CTA button/link — matches the hero "Explore Curriculum" treatment
window.GradientButton = ({ as: Tag = 'button', children, className = "", ...props }) => (
    <Tag className={`theme-btn-gradient text-white font-bold transition-all shadow-lg active:scale-95 ${className}`} {...props}>{children}</Tag>
);

window.GlobalCTABanner = ({ title, subtitle }) => (
    <div className="mt-16 p-10 sm:p-14 rounded-[2.5rem] relative overflow-hidden bg-gradient-to-br from-brand-900/40 via-secondary-900/40 to-brand-900/20 border border-brand-500/20 shadow-2xl group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-500/30 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-accent/30 transition-colors duration-1000"></div>
        
        <div className="relative z-10 text-center space-y-6">
            <window.CardBadge className="mb-2">Augmented Data Analytics</window.CardBadge>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">{title}</h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
            </p>
            <div className="pt-6">
                <window.GradientButton onClick={() => window.location.href = 'index.html#curriculum'} className="px-10 py-5 rounded-2xl text-[17px]">
                    View The Data Pilot Curriculum
                </window.GradientButton>
            </div>
        </div>
    </div>
);

window.Navbar = ({ activeProgramId, onProgramChange }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    // FIX: Lock body scroll when mobile menu is active
    React.useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalFormData, setModalFormData] = React.useState({ full_name: '', email: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const { settings, programs } = window.SITE_DATA;
    const brand = settings?.brand?.name || "The Data Pilot";

    const path = window.location.pathname;
    const isProductsPage = path.endsWith('products.html');
    const isServicesPage = path.endsWith('services.html');
    const isLandingPage = path.endsWith('index.html') || path === '/' || path.endsWith('/');

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = new FormData();
        Object.keys(modalFormData).forEach(key => data.append(key, modalFormData[key]));
        try {
            const res = await fetch('submit.php', { method: 'POST', body: data });
            const result = await res.json();
            if(result.status === 'success') {
                window.dispatchEvent(new CustomEvent('siteToast', { 
                    detail: { status: 'success', message: "Request Received! We'll contact you shortly." } 
                }));
                setIsModalOpen(false);
                setModalFormData({ full_name: '', email: '', phone: '' });
            } else {
                window.dispatchEvent(new CustomEvent('siteToast', { 
                    detail: { status: 'error', message: result.message || "Submission failed." } 
                }));
            }
        } catch (err) {
            window.dispatchEvent(new CustomEvent('siteToast', { 
                detail: { status: 'error', message: "Connection error. Please try again." } 
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const activeItemClass = "theme-card/60 theme-mid-text border-l-4 border-[var(--brand-mid)]";
    const inactiveItemClass = "theme-text-secondary border-l-4 border-transparent hover:bg-[var(--bg-base)]";

    return (
        <nav className="fixed w-full z-50 theme-bg border-b theme-border h-20 flex items-center shadow-sm">
            <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center text-left">
                <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.location.href = 'index.html'}>
                    <img src={`assets/images/thedatapilot_logo_${window.LIVE_THEME || 'crimson'}.png`} alt="" className="h-10 sm:h-12 w-auto max-h-12 object-contain object-left shrink-0" onError={e => { e.target.onerror=null; e.target.src='assets/images/thedatapilot_logo.png'; }} />
                    <span className="font-bold text-[22px] theme-mid-text tracking-tight">{brand}</span>
                </div>

                <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold theme-text-primary">
                    <span className="flex items-center gap-1.5 font-bold text-[17px] tracking-tight text-slate-400/60 cursor-not-allowed select-none">
                        Products
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">Soon</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-[17px] tracking-tight text-slate-400/60 cursor-not-allowed select-none">
                        Services
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">Soon</span>
                    </span>
                    
                    <div
                        ref={dropdownRef}
                        className="relative group py-2"
                    >
                        {/* The Trigger Button — click to open/close only, no hover-open */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsDropdownOpen(prev => !prev);
                            }}
                            className={`flex items-center space-x-1 hover:brightness-90 transition-colors font-bold text-[17px] tracking-tight ${isLandingPage ? 'theme-mid-text' : 'theme-text-primary'}`}
                        >
                            <span>All Programs</span>
                            <window.Icon 
                                name="chevron-down" 
                                size={14} 
                                className={isDropdownOpen ? 'rotate-180 transition-transform theme-mid-text' : 'transition-transform text-slate-300'} 
                            />
                        </button>
                        
                        {isDropdownOpen && programs && (
                            <div className="absolute top-full left-0 w-max min-w-[220px] max-w-xs z-[60] animate-in fade-in duration-200 pt-1">
                                {/* Seamless edge-to-edge dropdown card */}
                                <div className="border theme-border-strong shadow-2xl rounded-xl overflow-hidden backdrop-blur-xl" style={{backgroundColor: 'var(--bg-base)'}}>
                                    {Object.entries(programs).map(([progId, prog]) => {
                                        const isSelected = progId === activeProgramId;
                                        return (
                                            <button
                                                key={progId}
                                                onClick={() => {
                                                    if(onProgramChange) onProgramChange(progId);
                                                    else window.location.href=`index.html#about`;
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 hover:bg-[var(--bg-alt)] font-bold text-xs tracking-tight transition-colors ${
                                                    isSelected ? 'theme-mid-text font-extrabold bg-[var(--bg-alt)]' : 'text-[var(--text-base)]'
                                                }`}
                                            >
                                                {prog.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsModalOpen(true)} className="theme-mid-text hover:brightness-90 font-extrabold hover:underline text-[17px] tracking-tight">Request Callback</button>
                    <button onClick={() => setIsModalOpen(true)} className="theme-btn-gradient text-white px-6 py-2.5 rounded-xl font-bold text-[17px] transition-colors shadow-lg active:scale-95 transition-transform tracking-tight">Join Program</button>
                </div>

                <button className="lg:hidden p-2 theme-text-primary outline-none active:scale-95 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <window.Icon name={isMenuOpen ? "x" : "menu"} size={28} />
                </button>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full theme-bg border-b theme-border shadow-2xl py-8 px-6 animate-in slide-in-from-top duration-300 z-50 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <div className="flex flex-col space-y-4 text-sm font-bold">
                        <div className="flex items-center justify-between p-4 rounded-xl opacity-60 cursor-not-allowed select-none">
                            <span>Products</span>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">In Progress</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl opacity-60 cursor-not-allowed select-none">
                            <span>Services</span>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">In Progress</span>
                        </div>
                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl flex items-center justify-between transition-all ${isLandingPage ? activeItemClass : inactiveItemClass}`}>
                                <span className="font-bold">All Programs</span>
                                <window.Icon name="chevron-down" size={14} className={isLandingPage ? "theme-mid-text" : "text-secondary-300"} />
                            </div>
                            
                            <div className="pl-6 space-y-3">
                                {programs && Object.entries(programs).map(([progId, prog]) => {
                                    const isCourseActive = isLandingPage && progId === activeProgramId;
                                    return (
                                        <button 
                                            key={progId} 
                                            onClick={() => { 
                                                if(onProgramChange) onProgramChange(progId); 
                                                else window.location.href=`index.html#about`; 
                                                setIsMenuOpen(false); 
                                            }} 
                                            className={`block w-full text-left p-4 rounded-xl text-[13px] font-bold transition-all ${isCourseActive ? 'theme-accent-pill' : 'theme-text-muted hover:bg-[var(--bg-base)]'}`}
                                        >
                                            {prog.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-secondary-50 flex flex-col space-y-4">
                            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="theme-mid-text font-bold text-left px-2 py-3">Request Callback</button>
                            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="theme-btn-gradient text-white py-5 rounded-2xl font-bold shadow-lg text-center">Join Program</button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-900/80 backdrop-blur-sm">
                    <div className="theme-bg w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-3 theme-text-muted hover:text-[var(--text-base)]">
                            <window.Icon name="x" size={24} />
                        </button>
                        <h3 className="font-bold text-2xl mb-2 theme-text-primary tracking-tight">{settings?.ui?.modalTitle}</h3>
                        <p className="text-sm theme-text-muted mb-8 font-medium">{settings?.ui?.modalSubText}</p>
                        <form className="space-y-4" onSubmit={handleModalSubmit}>
                            <input type="text" placeholder="Full Name" required value={modalFormData.full_name} onChange={e => setModalFormData({...modalFormData, full_name: e.target.value})} className="w-full p-4 border theme-border theme-bg rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <input type="email" placeholder="Email Address" required value={modalFormData.email} onChange={e => setModalFormData({...modalFormData, email: e.target.value})} className="w-full p-4 border theme-border theme-bg rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <input type="tel" placeholder="Mobile Number" required maxLength="10" value={modalFormData.phone} onChange={e => setModalFormData({...modalFormData, phone: e.target.value})} className="w-full p-4 border theme-border theme-bg rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <button type="submit" disabled={isSubmitting} className="w-full theme-btn-gradient text-white py-5 rounded-xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50">
                                {isSubmitting ? 'Processing...' : (settings?.labels?.applyButton || 'Submit Request')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    );
};

window.Footer = () => {
    const { settings } = window.SITE_DATA;
    const socialLinks = settings?.social || {};
    const [hoveredPlatform, setHoveredPlatform] = React.useState(null);
    
    const socialColors = { linkedin: "#0077b5", instagram: "#e4405f", youtube: "#ff0000", facebook: "#1877f2", twitter: "#000000", x: "#000000", whatsapp: "#25d366" };

    // Bypasses the external icon library entirely for social brands
    const renderSocialIcon = (platform) => {
        const p = platform.toLowerCase();
        if (p === 'whatsapp') return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
        );
        if (p === 'twitter' || p === 'x') return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        );
        if (p === 'linkedin') return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        );
        if (p === 'instagram') return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        );
        if (p === 'youtube') return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
        );
        if (p === 'facebook') return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        );
        
        return <window.Icon name={platform} size={20} />;
    };

    return (
        <footer className="py-20 bg-secondary-900 text-white px-6 text-left border-t border-white/5">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                {/* Brand & Social */}
                <div className="space-y-6">
                    <div>
                        <div className="font-extrabold text-2xl theme-mid-text mb-2">{settings?.brand?.name}</div>
                        <p className="text-white/60 text-[13px] font-medium leading-relaxed max-w-xs">{settings?.ui?.footerDescription}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {Object.entries(socialLinks).map(([platform, url]) => {
                            const isHovered = hoveredPlatform === platform;
                            return (
                                <a 
                                    key={platform}
                                    href={url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setHoveredPlatform(platform)}
                                    onMouseLeave={() => setHoveredPlatform(null)}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group border"
                                    style={{ 
                                        backgroundColor: isHovered ? socialColors[platform] : 'rgba(30, 41, 59, 0.5)',
                                        borderColor: isHovered ? socialColors[platform] : 'rgba(51, 65, 85, 0.5)'
                                    }}
                                >
                                    <div className={`text-white transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                                        {renderSocialIcon(platform)}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Legal & Navigation - Unified Size */}
                <div className="flex flex-col space-y-4 text-white/60">
                    <h5 className="text-white text-[11px] font-bold tracking-widest uppercase opacity-60 mb-2">Legal & Navigation</h5>
                    <div className="flex flex-col space-y-3 font-bold text-sm">
                        <a href="about-us.html" className="theme-mid-hover-text transition-colors">About Us</a>
                        <a href="privacy-policy.html" className="theme-mid-hover-text transition-colors">Privacy Policy</a>
                        <a href="terms-and-conditions.html" className="theme-mid-hover-text transition-colors">Terms & Conditions</a>
                        <a href="refund-policy.html" className="theme-mid-hover-text transition-colors">Refund Policy</a>
                    </div>
                </div>

                {/* Contact Section - Slightly smaller for professional hierarchy */}
                <div className="space-y-4 text-white/60">
                    <h5 className="text-white text-[11px] font-bold tracking-widest uppercase opacity-60 mb-2">Contact</h5>
                    <div className="space-y-5">
                        <div className="flex items-start gap-2.5">
                            <window.Icon name="map-pin" size={14} className="theme-mid-text mt-1 flex-shrink-0 opacity-80"/>
                            <div className="text-[13px] text-white/60 font-medium leading-relaxed">
                                {(settings?.contact?.addressLines || []).map((line, idx) => (
                                    <div key={idx} className={idx === 0 ? "font-bold text-secondary-300" : ""}>{line}</div>
                                ))}
                            </div>
                        </div>
                        <div className="text-[13px] font-bold flex items-center gap-2.5">
                            <window.Icon name="mail" size={14} className="theme-mid-text opacity-80"/>
                            <span className="text-white/60">Email: <a href={`mailto:${settings?.contact?.infoEmail}`} className="text-secondary-300 theme-mid-hover-text transition-colors font-bold underline underline-offset-4 decoration-white/10">{settings?.contact?.infoEmail}</a></span>
                        </div>
                    </div>
                    <div className="pt-8 text-[10px] font-black text-white/50 tracking-[0.4em] uppercase select-none">Logic-First. AI-Fast.</div>
                </div>
            </div>
        </footer>
    );
};

// ============================================================
// SHARED REUSABLE COMPONENTS — available to all page scripts
// ============================================================

window.useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                observer.unobserve(entry.target);
            }
        }, options);
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [options]);
    return [ref, isIntersecting];
};

window.ScrollReveal = ({ children, className = "", delay = 0 }) => {
    const [ref, isVisible] = window.useIntersectionObserver({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

window.TiltCard = ({ children, className = "" }) => {
    const cardRef = React.useRef(null);
    const [style, setStyle] = React.useState({});
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10;
        const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        });
    };
    const handleMouseLeave = () => setStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: 'transform 0.5s ease-out',
        boxShadow: 'none'
    });
    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
             className={`transition-all will-change-transform ${className}`} style={style}>
            {children}
        </div>
    );
};

window.CylinderCarousel = ({ items, renderItem, height = 400, itemWidth = 320 }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!items || items.length === 0) return null;

    // Force a gentler curve by artificially increasing the number of cylinder faces
    let displayItems = [...items];
    while (displayItems.length < 10) {
        displayItems = [...displayItems, ...items];
    }

    const numItems = displayItems.length;
    
    // Responsive Scaling Logic (Fix for Z-Fold Outer and Inner Screens)
    const safePadding = windowWidth < 640 ? 40 : 80;
    // On massive screens, we can let the card grow a bit larger up to 1.2x if it wants to, but default to capping at itemWidth to preserve design.
    // Actually, letting it cap at itemWidth is safest.
    const actualItemWidth = Math.min(itemWidth, windowWidth - safePadding);
    const scaleFactor = actualItemWidth / itemWidth;
    const actualHeight = height * scaleFactor;

    const cardWidth = actualItemWidth;
    const theta = 360 / numItems;
    // Dynamically adjust radius based on actual scaled card width
    const radius = Math.max((cardWidth / 2) / Math.tan(Math.PI / numItems) + (60 * scaleFactor), 150);

    const next = () => setCurrentIndex(prev => prev + 1);
    const prev = () => setCurrentIndex(prev => prev - 1);

    const touchStartX = React.useRef(null);
    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (!touchStartX.current) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) next();
        else if (diff < -50) prev();
        touchStartX.current = null;
    };

    return (
        <div className="w-full overflow-hidden py-10">
            <div className="relative w-full flex flex-col items-center select-none" style={{ perspective: '1600px' }}>
                <div 
                    className="relative flex items-center justify-center cursor-grab active:cursor-grabbing" 
                    style={{ height: actualHeight + 'px', width: cardWidth + 'px', transformStyle: 'preserve-3d', transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)', transform: `translateZ(${-radius}px) rotateY(${currentIndex * -theta}deg)` }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {displayItems.map((item, i) => {
                        const normalizedCurrent = ((currentIndex % numItems) + numItems) % numItems;
                        const diff = Math.abs(normalizedCurrent - i);
                        const distance = Math.min(diff, numItems - diff);
                        // Fade and scale back items slightly
                        const isFront = distance === 0;
                        const opacity = distance > Math.floor(numItems / 4) ? 0.1 : (isFront ? 1 : 0.6);

                        return (
                            <div 
                                key={i} 
                                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${!isFront ? 'pointer-events-none' : ''}`}
                                style={{ 
                                    transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                                    opacity: opacity,
                                    filter: isFront ? 'none' : 'blur(3px)'
                                }}
                            >
                                {renderItem(item, i, isFront)}
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-12 flex gap-6 z-20">
                    <button onClick={prev} className="w-14 h-14 rounded-full theme-bg border-2 theme-border flex items-center justify-center shadow-xl hover:bg-brand-500 hover:text-white transition-all hover:scale-110">
                        <window.Icon name="chevron-left" size={24} />
                    </button>
                    <button onClick={next} className="w-14 h-14 rounded-full theme-bg border-2 theme-border flex items-center justify-center shadow-xl hover:bg-brand-500 hover:text-white transition-all hover:scale-110">
                        <window.Icon name="chevron-right" size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

window.TypewriterText = ({ text }) => {
    const [displayedLength, setDisplayedLength] = React.useState(0);
    React.useEffect(() => {
        setDisplayedLength(0);
        const timer = setInterval(() => {
            setDisplayedLength(prev => {
                if (prev >= text.length) { clearInterval(timer); return prev; }
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

// ============================================================
// DOT GRID CANVAS — structured dot grid background
// Circular dots in a regular grid, pulse animation, mouse glow.
// Auto-injects on all pages. Color follows --brand-500.
// Respects prefers-reduced-motion.
// ============================================================
(function initDotGridBackground() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Mouse-proximity effect never activates on touch devices (no mousemove) — skip the
    // continuous per-frame rAF loop and grid canvas entirely rather than let it run inert.
    if (window.matchMedia('(hover: none)').matches) return;

    function setup() {
        const canvas = document.createElement('canvas');
        canvas.id = 'dot-grid-bg';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:1';
        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        const SPACING = 38;
        const BASE_R = 1.8;
        const MAX_R = 4.5;
        const MOUSE_R = 140;
        const STILL_MS = 380;
        let W, H, dots = [];
        let mouseX = -9999, mouseY = -9999;
        let targetX = -9999, targetY = -9999;
        let prevTX = -9999, prevTY = -9999;
        let vx = 0, vy = 0;
        let fadeIn = 0;
        let cursorActive = false;
        let lastMoveTime = 0;
        // Soap-bubble spring state
        let stretchVal = 1.0;
        let stretchVel = 0.0;
        let bubbleAngle = 0;

        function hexToRgbObj(hex, fallback) {
            const h = (hex && hex.startsWith('#')) ? hex : fallback;
            return {
                r: parseInt(h.slice(1, 3), 16),
                g: parseInt(h.slice(3, 5), 16),
                b: parseInt(h.slice(5, 7), 16)
            };
        }

        function getBrandRgbPair() {
            const cs = getComputedStyle(document.documentElement);
            return {
                from: hexToRgbObj(cs.getPropertyValue('--brand-500').trim(), '#84cc16'),
                to: hexToRgbObj(cs.getPropertyValue('--brand-accent').trim(), '#84cc16')
            };
        }

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            const cols = Math.ceil(W / SPACING) + 2;
            const rows = Math.ceil(H / SPACING) + 2;
            const ox = (W % SPACING) / 2;
            const oy = (H % SPACING) / 2;
            dots = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    dots.push({
                        x: ox + c * SPACING,
                        y: oy + r * SPACING,
                        phase: Math.random() * Math.PI * 2
                    });
                }
            }
        }

        let rgbPair = getBrandRgbPair();

        function tick() {
            // Deactivate after STILL_MS of no movement
            if (cursorActive && performance.now() - lastMoveTime > STILL_MS) {
                cursorActive = false;
            }

            // Smooth velocity — heavy lag so shape deforms gradually
            vx = vx * 0.90 + (targetX - prevTX) * 0.10;
            vy = vy * 0.90 + (targetY - prevTY) * 0.10;
            prevTX = targetX;
            prevTY = targetY;

            // Lerp displayed position toward target
            mouseX += (targetX - mouseX) * 0.1;
            mouseY += (targetY - mouseY) * 0.1;

            // Fade in/out
            const fadeDest = cursorActive ? 1 : 0;
            fadeIn += (fadeDest - fadeIn) * (cursorActive ? 0.045 : 0.028);

            ctx.clearRect(0, 0, W, H);
            rgbPair = getBrandRgbPair();

            if (fadeIn < 0.004) { requestAnimationFrame(tick); return; }

            const globalBase = fadeIn * 0.055;

            // Soap-bubble spring physics
            const speed = Math.sqrt(vx * vx + vy * vy);
            // Lerp angle smoothly — orientation rotates gradually, never snaps
            if (speed > 0.2) {
                const tAngle = Math.atan2(vy, vx);
                let da = tAngle - bubbleAngle;
                if (da > Math.PI) da -= 2 * Math.PI;
                if (da < -Math.PI) da += 2 * Math.PI;
                bubbleAngle += da * 0.06;
            }
            // Spring: slow, viscous — target stretch driven by speed
            const targetStretch = 1 + speed * 0.22;
            const springForce = (Math.min(targetStretch, 3.2) - stretchVal) * 0.04;
            stretchVel = stretchVel * 0.82 + springForce;
            stretchVal = Math.max(1.0, stretchVal + stretchVel);
            // Incompressible area conservation: a×b = R² (major stretches, minor shrinks equally)
            // At stretchVal=1 → circle. At stretchVal=3 → 3× long, 1/3 narrow. Same area.
            const cosA = Math.cos(bubbleAngle);
            const sinA = Math.sin(bubbleAngle);

            for (const d of dots) {
                const dx = d.x - mouseX;
                const dy = d.y - mouseY;
                // Stretch along travel, compress cross-axis by same factor → area constant
                const along = dx * cosA + dy * sinA;   // + = ahead of cursor, - = behind
                const lx = along / stretchVal;
                const ly = (-dx * sinA + dy * cosA) * stretchVal;
                const dist = Math.sqrt(lx * lx + ly * ly);
                const proximity = Math.max(0, 1 - dist / MOUSE_R);
                // Suppress dots ahead of cursor when moving: tail only trails behind
                const fwdClip = MOUSE_R * 0.28;
                const frontFade = stretchVal > 1.06
                    ? Math.max(0, 1 - Math.max(0, along - fwdClip) / fwdClip)
                    : 1;
                const r = BASE_R + proximity * fadeIn * (MAX_R - BASE_R);
                const alpha = (globalBase + proximity * fadeIn * 0.42) * frontFade;

                if (alpha < 0.004) continue;
                // Blend each dot's color across the grid left->right, blue->green,
                // so the hover effect isn't uniformly one color.
                const t = Math.max(0, Math.min(1, d.x / W));
                const dr = Math.round(rgbPair.from.r + (rgbPair.to.r - rgbPair.from.r) * t);
                const dg = Math.round(rgbPair.from.g + (rgbPair.to.g - rgbPair.from.g) * t);
                const db = Math.round(rgbPair.from.b + (rgbPair.to.b - rgbPair.from.b) * t);
                ctx.beginPath();
                ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${dr},${dg},${db},${alpha})`;
                ctx.fill();
            }

            requestAnimationFrame(tick);
        }

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
            const wasInactive = !cursorActive;
            targetX = e.clientX;
            targetY = e.clientY;
            cursorActive = true;
            lastMoveTime = performance.now();
            if (wasInactive) {
                mouseX = targetX; mouseY = targetY;
                prevTX = targetX; prevTY = targetY;
                vx = 0; vy = 0;
            }
        });
        window.addEventListener('mouseleave', () => { cursorActive = false; });
        requestAnimationFrame(tick);
    }

    // Backup: dot grid background
    if (document.body) setup();
    else document.addEventListener('DOMContentLoaded', setup);
})();

// ============================================================
// HALFTONE BLOOM BACKGROUND — WebGL organic bloom grid
// Converted from React HalftoneBloom — Originkit
// ============================================================
(function initHalftoneBloomBackground() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    function setup() {
        const root = document.createElement('div');
        root.id = 'halftone-bg';
        root.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;background:transparent;opacity:0.3;';
        
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
        root.appendChild(canvas);
        document.body.insertBefore(root, document.body.firstChild);

        const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, stencil: false });
        if (!gl) {
            console.error("HalftoneBloom: WebGL2 unavailable");
            return;
        }

        const MAX_DPR = 2;
        const LAYERS = 86;
        const GAIN = 0.48;
        const TURN = 0.32;
        const SWELL = 1.1;
        const REST = 0.42;
        const CAP = 0.55;

        const VERT_SRC = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`;

        const FIELD_SRC = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uC1;
uniform vec3 uC2;
uniform float uSize;
uniform float uAngle;
out vec4 o;

const float TAU = 6.28318530718;
const float LAYERS = 86.0;
const float GAIN = 0.480;
const vec2 CENTRE = vec2(-0.25, 0.56);
const float TILT = 1.4;
const float ZOOM = 1.05;
const float THETA = 2.13;
const float SHEAR = 0.965;
const float SHRINK = 0.957;
const vec2 WARP_FREQ = vec2(0.45, 2.5);
const vec2 WARP_AMP = vec2(0.13, 0.028);
const vec2 ASPECT = vec2(2.2, 0.18);
const float OFFSET = 0.37;
const float GLOW = 0.0021;
const float SOFT = 0.0019;
const float FALLOFF = 0.37;
const float PHASE = 23.0;
const float CYCLE = 0.16;
const float HUE_TRAVEL = 2.0;

mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }

void main() {
  vec2 R = uRes;
  vec2 pos = (gl_FragCoord.xy - 0.5 * R) / R.y;

  pos = rot(uAngle) * pos / uSize;
  float t = uTime * 0.49 + PHASE;
  float breath = (-sin(uTime * 0.735) + sin(uTime * 0.49 + 1.0)) * 0.25 + 0.5;
  vec2 u = rot(TILT) * ((pos - CENTRE) * (ZOOM - breath * 0.085));
  mat2 fold = mat2(cos(THETA), sin(THETA), -SHEAR, cos(THETA));

  vec3 col = vec3(0.0);
  for (float i = 1.0; i <= LAYERS; i += 1.0) {
    u.x -= sin(u.y * WARP_FREQ.x + t + i * 0.007) * WARP_AMP.x;
    u.y -= sin(u.x * WARP_FREQ.y - t + i * 0.02) * WARP_AMP.y;
    u = fold * u * SHRINK;
    vec2 q = (u - vec2(OFFSET + breath * 0.1, 0.0)) * ASPECT;
    float g = GLOW / (dot(q, q) + SOFT) * (0.25 + breath * 0.4);
    float r = length(u);
    float k = sin(i * CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    col += g * mix(uC1, uC2, k) * (0.62 + 0.5 * k) * exp2(-r * FALLOFF);
  }
  vec3 x = max(col * GAIN, 0.0);
  col = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.85, 0.92, 0.98));
  col *= 1.0 - smoothstep(0.5, 1.6, length(pos)) * 0.07;
  o = vec4(col, 1.0);
}
`;

        const FINISH_SRC = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform vec2 uRes;
uniform float uTime;
uniform vec3 uBg;
uniform float uPaper;
uniform vec2 uMouse;
uniform float uOn;
uniform float uReach;
uniform float uCell;
uniform float uPR;
out vec4 o;

const float PI = 3.14159265359;
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);
const float TURN = 0.3200;
const float SWELL = 1.1000;
const float REST = 0.4200;
const float CAP = 0.5500;

float ign(vec2 p, float f) { p += 5.588238 * mod(f, 64.0); return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y)); }

vec3 scene(vec2 uv) { return max(texture(uField, clamp(uv, 0.0, 1.0)).rgb, 0.0); }

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;

  mat2 turn = mat2(cos(TURN), -sin(TURN), sin(TURN), cos(TURN));
  vec2 rp = turn * frag;
  vec2 c = (floor(rp / uCell) + 0.5) * uCell;
  vec2 src = transpose(turn) * c;
  vec3 soft = scene(uv);
  vec3 ink = scene(src / uRes);
  float lvl = clamp(dot(ink, LUMA), 0.0, 1.0);
  float radius = uCell * sqrt(pow(lvl, 0.9) / PI);
  float presence = smoothstep(0.03, 0.16, lvl) * REST;

  if (uOn > 0.0) {
    vec2 d = (src - uMouse) / uReach;
    float w = uOn * exp(-dot(d, d));
    if (w > 1e-4) {
      radius *= 1.0 + SWELL * w;
      presence = mix(presence, 1.0, min(w, 1.0));
    }
  }
  radius = min(radius, uCell * CAP);
  float aa = 0.7 * uPR;
  float dm = 1.0 - smoothstep(radius - aa, radius + aa, length(rp - c));
  vec3 dots = ink * min(0.8 / max(lvl, 1e-3), 2.2) * dm;
  vec3 L = mix(soft, dots, presence);

  vec3 dark = uBg + L * (1.0 - uBg);
  float strength = clamp(max(L.r, max(L.g, L.b)), 0.0, 1.0);
  vec3 paper = uBg * (1.0 - strength) + L * 0.96;
  vec3 col = mix(dark, paper, uPaper);
  col += (ign(frag, floor(uTime * 24.0)) - 0.5) / 255.0;
  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

        function link(gl, frag, label) {
            const shader = (type, src) => {
                const sh = gl.createShader(type);
                if (!sh) return null;
                gl.shaderSource(sh, src);
                gl.compileShader(sh);
                if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
                    console.error("HalftoneBloom " + label + " shader:", gl.getShaderInfoLog(sh));
                    gl.deleteShader(sh);
                    return null;
                }
                return sh;
            };
            const vs = shader(gl.VERTEX_SHADER, VERT_SRC);
            const fs = shader(gl.FRAGMENT_SHADER, frag);
            if (!vs || !fs) return null;
            const prog = gl.createProgram();
            if (!prog) return null;
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
                console.error("HalftoneBloom " + label + " link:", gl.getProgramInfoLog(prog));
                gl.deleteProgram(prog);
                return null;
            }
            return prog;
        }

        function locations(gl, prog, names) {
            const out = {};
            for (const n of names) out[n] = gl.getUniformLocation(prog, n);
            return out;
        }

        function fieldTarget(gl) {
            const fbo = gl.createFramebuffer();
            let tex = null;
            let w = 0, h = 0;
            let half = !!gl.getExtension("EXT_color_buffer_float");
            return {
                fbo,
                texture: () => tex,
                width: () => w,
                height: () => h,
                resize(nw, nh) {
                    if (nw === w && nh === h && tex) return;
                    for (let attempt = 0; attempt < 2; attempt++) {
                        if (tex) gl.deleteTexture(tex);
                        tex = gl.createTexture();
                        gl.bindTexture(gl.TEXTURE_2D, tex);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                        gl.texImage2D(gl.TEXTURE_2D, 0, half ? gl.RGBA16F : gl.RGBA8, nw, nh, 0, gl.RGBA, half ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
                        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
                        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
                        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                        if (ok || !half) break;
                        half = false;
                    }
                    w = nw; h = nh;
                }
            };
        }

        function trackPointer(root) {
            const p = { tx: 0, ty: 0, inside: false, seen: false };
            const read = (e) => {
                const r = root.getBoundingClientRect();
                const sx = root.offsetWidth / (r.width || 1);
                const sy = root.offsetHeight / (r.height || 1);
                p.tx = (e.clientX - r.left) * sx;
                p.ty = (e.clientY - r.top) * sy;
                p.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
                p.seen = true;
            };
            const out = (e) => { if (!e.relatedTarget) p.inside = false; };
            window.addEventListener("pointermove", read, { passive: true });
            window.addEventListener("pointerdown", read, { passive: true });
            document.addEventListener("pointerout", out);
            return { p };
        }

        function hexToRgb(hex) {
            let h = hex.trim();
            if (h.startsWith('#')) h = h.slice(1);
            if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
            const r = parseInt(h.slice(0, 2), 16) / 255;
            const g = parseInt(h.slice(2, 4), 16) / 255;
            const b = parseInt(h.slice(4, 6), 16) / 255;
            return [r, g, b];
        }

        const field = link(gl, FIELD_SRC, "field");
        const finish = link(gl, FINISH_SRC, "finish");
        if (!field || !finish) return;
        const uf = locations(gl, field, ["uRes", "uTime", "uC1", "uC2", "uSize", "uAngle"]);
        const un = locations(gl, finish, ["uField", "uRes", "uTime", "uBg", "uPaper", "uMouse", "uOn", "uReach", "uCell", "uPR"]);
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const target = fieldTarget(gl);
        const pointer = trackPointer(root);
        const ptr = pointer.p;

        let mx = 0, my = 0, on = 0, last = performance.now(), clock = 0;

        const DEFAULTS = { speed: 1, size: 1, angle: 0, dot: 6, hover: 1, reach: 429 };

        function render(now) {
            requestAnimationFrame(render);
            const dt = Math.max(0, Math.min((now - last) / 1000, 0.05));
            last = now;
            clock = (clock + dt * DEFAULTS.speed) % 3600;

            const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
            const cw = canvas.clientWidth || 1200;
            const ch = canvas.clientHeight || 800;
            const bw = Math.max(1, Math.round(cw * dpr));
            const bh = Math.max(1, Math.round(ch * dpr));
            if (canvas.width !== bw || canvas.height !== bh) {
                canvas.width = bw; canvas.height = bh;
            }
            target.resize(Math.max(1, Math.round(bw / 2)), Math.max(1, Math.round(bh / 2)));

            const present = ptr.inside ? 1 : 0;
            if (present && on < 0.02) { mx = ptr.tx; my = ptr.ty; }
            on += (present - on) * (1 - Math.exp(-dt * 5));
            const k = 1 - Math.exp(-dt * 16);
            mx += (ptr.tx - mx) * k;
            my += (ptr.ty - my) * k;

            // Extract live theme colors
            const cs = getComputedStyle(document.documentElement);
            const rawBg = cs.getPropertyValue('--bg-base').trim() || '#0f172a';
            const rawC1 = cs.getPropertyValue('--brand-500').trim() || '#a468ff';
            const rawC2 = cs.getPropertyValue('--brand-accent').trim() || '#7030d4';

            const bg = hexToRgb(rawBg);
            const c1 = hexToRgb(rawC1);
            const c2 = hexToRgb(rawC2);
            const bgLum = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2];

            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
            gl.viewport(0, 0, target.width(), target.height());
            gl.useProgram(field);
            gl.uniform2f(uf.uRes, target.width(), target.height());
            gl.uniform1f(uf.uTime, clock);
            gl.uniform3f(uf.uC1, c1[0], c1[1], c1[2]);
            gl.uniform3f(uf.uC2, c2[0], c2[1], c2[2]);
            gl.uniform1f(uf.uSize, DEFAULTS.size);
            gl.uniform1f(uf.uAngle, (DEFAULTS.angle * Math.PI) / 180);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            const pr = bw / cw;
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, bw, bh);
            gl.useProgram(finish);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, target.texture());
            gl.uniform1i(un.uField, 0);
            gl.uniform2f(un.uRes, bw, bh);
            gl.uniform1f(un.uTime, clock);
            gl.uniform3f(un.uBg, bg[0], bg[1], bg[2]);
            let paperVal = Math.max(0, Math.min(1, (bgLum - 0.35) / 0.3));
            gl.uniform1f(un.uPaper, paperVal);
            gl.uniform2f(un.uMouse, mx * pr, (ch - my) * pr);
            gl.uniform1f(un.uOn, on * DEFAULTS.hover);
            gl.uniform1f(un.uReach, DEFAULTS.reach * pr);
            gl.uniform1f(un.uCell, DEFAULTS.dot * pr);
            gl.uniform1f(un.uPR, pr);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

        requestAnimationFrame(render);
    }

    // if (document.body) setup();
    // else document.addEventListener('DOMContentLoaded', setup);
})();

// ============================================================
// AURORA BACKGROUND — organic blob glows on all pages.
// Matches landing-page hero technique: solid brand color +
// mix-blend-mode:screen + animate-pulse. No overflow:hidden
// so blurs feather organically beyond the container edge.
// z-index:45 — above all sections, below nav z-50.
// ============================================================
(function initAuroraBackground() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes orb-drift-a {
        0%,100% { transform: translateY(0) scale(1); }
        50%      { transform: translateY(6vh) scale(1.08); }
      }
      @keyframes orb-drift-b {
        0%,100% { transform: translateY(0) scale(1.05); }
        50%      { transform: translateY(-5vh) scale(0.95); }
      }
      #aurora-orbs > div {
        position: absolute;
        border-radius: 50%;
        mix-blend-mode: screen;
        pointer-events: none;
        filter: blur(110px);
      }
    `;
    document.head.appendChild(styleEl);

    function setup() {
        const wrap = document.createElement('div');
        wrap.id = 'aurora-orbs';
        // No overflow:hidden — lets blur feather past container edges
        wrap.style.cssText =
            'position:fixed;inset:0;z-index:45;pointer-events:none';

        // Left — upper blob
        const b1 = document.createElement('div');
        b1.style.cssText =
            'width:50vw;height:50vw;top:-15%;left:-25%;' +
            'background:var(--brand-500);opacity:0.13;' +
            'animation:orb-drift-a 20s ease-in-out infinite';

        // Left — lower blob (offset timing)
        const b2 = document.createElement('div');
        b2.style.cssText =
            'width:40vw;height:40vw;bottom:-10%;left:-20%;' +
            'background:var(--brand-400);opacity:0.09;' +
            'animation:orb-drift-b 26s ease-in-out infinite';

        // Right — upper blob
        const b3 = document.createElement('div');
        b3.style.cssText =
            'width:50vw;height:50vw;top:-15%;right:-25%;' +
            'background:var(--brand-500);opacity:0.11;' +
            'animation:orb-drift-b 22s ease-in-out infinite';

        // Right — lower blob
        const b4 = document.createElement('div');
        b4.style.cssText =
            'width:40vw;height:40vw;bottom:-10%;right:-20%;' +
            'background:var(--brand-400);opacity:0.08;' +
            'animation:orb-drift-a 28s ease-in-out infinite';

        wrap.appendChild(b1);
        wrap.appendChild(b2);
        wrap.appendChild(b3);
        wrap.appendChild(b4);
        document.body.appendChild(wrap);
    }

    if (document.body) setup();
    else document.addEventListener('DOMContentLoaded', setup);
})();

// --- INDUSTRY STANDARD: MASTER LAYOUT COMPONENT ---
// Reusable layout wrapper that handles engineReady, Navbar, Footer, and standard padding.
window.PageLayout = ({ children, maxWidth = "max-w-4xl" }) => {
    const [isReady, setIsReady] = React.useState(window.SITE_DATA?.isLoaded);

    React.useEffect(() => {
        const handleEngineReady = () => setIsReady(true);
        window.addEventListener('siteDataLoaded', handleEngineReady);
        return () => window.removeEventListener('siteDataLoaded', handleEngineReady);
    }, []);

    if (!isReady) {
        return (
            <div className="min-h-screen theme-bg flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen theme-bg theme-text-primary font-sans flex flex-col relative">
            <window.Navbar />
            <main className={`flex-grow ${maxWidth} mx-auto w-full px-6 pt-24 lg:pt-28 2xl:pt-32 pb-12 lg:pb-20 2xl:pb-24 flex flex-col gap-4 lg:gap-6 2xl:gap-8 relative z-10`}>
                {children}
            </main>
            <window.Footer />
        </div>
    );
};

// Standardized safe React mounting to prevent `Identifier 'root' has already been declared`
window.mountApp = (AppComponent) => {
    if (!window._reactRoot) {
        window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
    }
    window._reactRoot.render(AppComponent);
};

