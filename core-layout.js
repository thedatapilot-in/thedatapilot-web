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
    return <i data-lucide={name} className={className} style={{ width: size, height: size }}></i>;
};

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

    const activeItemClass = "theme-card/60 text-brand-700 border-l-4 border-brand-500";
    const inactiveItemClass = "theme-text-secondary border-l-4 border-transparent hover:theme-bg";

    return (
        <nav className="fixed w-full z-50 theme-bg border-b theme-border h-20 flex items-center shadow-sm">
            <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center text-left">
                <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.location.href = 'index.html'}>
                    <img src={`assets/images/thedatapilot_logo_${window.LIVE_THEME || 'crimson'}.png`} alt="" className="h-10 sm:h-12 w-auto max-h-12 object-contain object-left shrink-0" onError={e => { e.target.onerror=null; e.target.src='assets/images/thedatapilot_logo.png'; }} />
                    <span className="font-bold text-[22px] text-brand-400 tracking-tight">{brand}</span>
                </div>

                <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold theme-text-primary">
                    <a href="products.html" className={`hover:text-brand-400 transition-colors font-bold text-[17px] tracking-tight ${isProductsPage ? 'text-brand-400' : 'theme-text-primary'}`}>Products</a>
                    <a href="services.html" className={`hover:text-brand-400 transition-colors font-bold text-[17px] tracking-tight ${isServicesPage ? 'text-brand-400' : 'theme-text-primary'}`}>Services</a>
                    
                    <div 
                        ref={dropdownRef}
                        className="relative group py-2" 
                        onMouseEnter={() => setIsDropdownOpen(true)} 
                    >
                        {/* The Trigger Button */}
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                setIsDropdownOpen(true);
                            }}
                            className={`flex items-center space-x-1 hover:text-brand-400 transition-colors font-bold text-[17px] tracking-tight ${isLandingPage ? 'text-brand-400' : 'theme-text-primary'}`}
                        >
                            <span>All Programs</span>
                            <window.Icon 
                                name="chevron-down" 
                                size={14} 
                                className={isDropdownOpen ? 'rotate-180 transition-transform text-brand-400' : 'transition-transform text-slate-300'} 
                            />
                        </button>
                        
                        {isDropdownOpen && programs && (
                            <div className="absolute top-full left-0 w-max min-w-[220px] max-w-xs z-[60] animate-in fade-in duration-200 pt-1">
                                {/* Seamless edge-to-edge dropdown card */}
                                <div className="bg-[#0f172a] border border-slate-700/80 shadow-2xl rounded-xl overflow-hidden backdrop-blur-xl">
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
                                                className={`w-full text-left px-4 py-3 hover:bg-slate-800/90 font-bold text-xs tracking-tight transition-colors ${
                                                    isSelected ? 'text-brand-400 font-extrabold bg-slate-800/50' : 'text-slate-200'
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

                    <button onClick={() => setIsModalOpen(true)} className="text-brand-400 hover:text-brand-300 font-extrabold hover:underline text-[17px] tracking-tight">Request Callback</button>
                    <button onClick={() => setIsModalOpen(true)} className="bg-brand-500 text-white px-6 py-2.5 rounded-xl font-bold text-[17px] hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/20 active:scale-95 transition-transform tracking-tight">Join Program</button>
                </div>

                <button className="lg:hidden p-2 theme-text-secondary outline-none active:scale-95 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <window.Icon name={isMenuOpen ? "x" : "menu"} size={28} />
                </button>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full theme-bg border-b theme-border shadow-2xl py-8 px-6 animate-in slide-in-from-top duration-300 z-50 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <div className="flex flex-col space-y-4 text-sm font-bold">
                        <a href="products.html" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl transition-all ${isProductsPage ? activeItemClass : inactiveItemClass}`}>Products</a>
                        <a href="services.html" onClick={() => setIsMenuOpen(false)} className={`p-4 rounded-xl transition-all ${isServicesPage ? activeItemClass : inactiveItemClass}`}>Services</a>
                        
                        <div className="space-y-4">
                            <div className={`p-4 rounded-xl flex items-center justify-between transition-all ${isLandingPage ? activeItemClass : inactiveItemClass}`}>
                                <span className="font-bold">All Programs</span>
                                <window.Icon name="chevron-down" size={14} className={isLandingPage ? "text-brand-400" : "text-secondary-300"} />
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
                                            className={`block w-full text-left p-4 rounded-xl text-[13px] font-bold transition-all ${isCourseActive ? 'bg-brand-100/50 text-brand-700' : 'theme-text-muted hover:theme-bg'}`}
                                        >
                                            {prog.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-secondary-50 flex flex-col space-y-4">
                            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="text-brand-600 font-bold text-left px-2">Request Callback</button>
                            <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="bg-brand-500 text-white py-5 rounded-2xl font-bold shadow-lg shadow-brand-500/20 text-center">Join Program</button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary-900/80 backdrop-blur-sm">
                    <div className="theme-bg w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 theme-text-muted hover:theme-text-primary">
                            <window.Icon name="x" size={24} />
                        </button>
                        <h3 className="font-bold text-2xl mb-2 theme-text-primary tracking-tight">{settings?.ui?.modalTitle}</h3>
                        <p className="text-sm theme-text-muted mb-8 font-medium">{settings?.ui?.modalSubText}</p>
                        <form className="space-y-4" onSubmit={handleModalSubmit}>
                            <input type="text" placeholder="Full Name" required value={modalFormData.full_name} onChange={e => setModalFormData({...modalFormData, full_name: e.target.value})} className="w-full p-4 border theme-border theme-bg rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <input type="email" placeholder="Email Address" required value={modalFormData.email} onChange={e => setModalFormData({...modalFormData, email: e.target.value})} className="w-full p-4 border theme-border theme-bg rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <input type="tel" placeholder="Mobile Number" required maxLength="10" value={modalFormData.phone} onChange={e => setModalFormData({...modalFormData, phone: e.target.value})} className="w-full p-4 border theme-border theme-bg rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-500 text-white py-5 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:bg-brand-600 active:scale-95 transition-all disabled:opacity-50">
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
                        <div className="font-extrabold text-2xl text-brand-400 mb-2">{settings?.brand?.name}</div>
                        <p className="theme-text-muted text-[13px] font-medium leading-relaxed max-w-xs">{settings?.ui?.footerDescription}</p>
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
                <div className="flex flex-col space-y-4 theme-text-muted">
                    <h5 className="text-white text-[11px] font-bold tracking-widest uppercase opacity-40 mb-2">Legal & Navigation</h5>
                    <div className="flex flex-col space-y-3 font-bold text-sm">
                        <a href="about-us.html" className="hover:text-brand-400 transition-colors">About Us</a>
                        <a href="privacy-policy.html" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
                        <a href="terms-and-conditions.html" className="hover:text-brand-400 transition-colors">Terms & Conditions</a>
                        <a href="refund-policy.html" className="hover:text-brand-400 transition-colors">Refund Policy</a>
                    </div>
                </div>

                {/* Contact Section - Slightly smaller for professional hierarchy */}
                <div className="space-y-4 theme-text-muted">
                    <h5 className="text-white text-[11px] font-bold tracking-widest uppercase opacity-40 mb-2">Contact</h5>
                    <div className="space-y-5">
                        <div className="flex items-start gap-2.5">
                            <window.Icon name="map-pin" size={14} className="text-brand-500 mt-1 flex-shrink-0 opacity-80"/> 
                            <div className="text-[13px] theme-text-muted font-medium leading-relaxed">
                                {(settings?.contact?.addressLines || []).map((line, idx) => (
                                    <div key={idx} className={idx === 0 ? "font-bold text-secondary-300" : ""}>{line}</div>
                                ))}
                            </div>
                        </div>
                        <div className="text-[13px] font-bold flex items-center gap-2.5">
                            <window.Icon name="mail" size={14} className="text-brand-500 opacity-80"/> 
                            <span className="theme-text-muted">Email: <a href={`mailto:${settings?.contact?.infoEmail}`} className="text-secondary-300 hover:text-brand-400 transition-colors font-bold underline underline-offset-4 decoration-white/10">{settings?.contact?.infoEmail}</a></span>
                        </div>
                    </div>
                    <div className="pt-8 text-[10px] font-black theme-text-secondary tracking-[0.4em] uppercase select-none">Logic-First. AI-Fast.</div>
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

        function getBrandRgb() {
            const raw = getComputedStyle(document.documentElement)
                .getPropertyValue('--brand-500').trim();
            const hex = raw.startsWith('#') ? raw : '#84cc16';
            return {
                r: parseInt(hex.slice(1, 3), 16),
                g: parseInt(hex.slice(3, 5), 16),
                b: parseInt(hex.slice(5, 7), 16)
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

        let rgb = getBrandRgb();

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
            rgb = getBrandRgb();

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
                ctx.beginPath();
                ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
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

    if (document.body) setup();
    else document.addEventListener('DOMContentLoaded', setup);
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
