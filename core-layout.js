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

    const activeItemClass = "bg-brand-50/60 text-brand-700 border-l-4 border-brand-500";
    const inactiveItemClass = "text-secondary-600 border-l-4 border-transparent hover:bg-secondary-50";

    return (
        <nav className="fixed w-full z-50 bg-white border-b border-secondary-100 h-20 flex items-center shadow-sm">
            <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center text-left">
                <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.location.href = 'index.html'}>
                    <img src={`assets/images/thedatapilot_logo_${window.LIVE_THEME || 'crimson'}.png`} alt="" className="h-10 sm:h-12 w-auto max-h-12 object-contain object-left shrink-0" />
                    <span className="font-bold text-[22px] text-brand-600 tracking-tight">{brand}</span>
                </div>

                <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-secondary-500">
                    <a href="products.html" className={`hover:text-brand-500 transition-colors font-bold text-[17px] tracking-tight ${isProductsPage ? 'text-brand-600' : ''}`}>Products</a>
                    <a href="services.html" className={`hover:text-brand-500 transition-colors font-bold text-[17px] tracking-tight ${isServicesPage ? 'text-brand-600' : ''}`}>Services</a>
                    
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
                            className={`flex items-center space-x-1 hover:text-brand-500 transition-colors font-bold text-[17px] tracking-tight ${isLandingPage ? 'text-brand-600' : ''}`}
                        >
                            <span>All Programs</span>
                            <window.Icon 
                                name="chevron-down" 
                                size={14} 
                                className={isDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} 
                            />
                        </button>
                        
                        {isDropdownOpen && programs && (
                            <div className="absolute top-full left-0 w-64 z-50 animate-in fade-in duration-200">
                                {/* The Visual Menu Card connected directly with 0 gaps */}
                                <div className="bg-white border border-secondary-100 shadow-xl rounded-xl py-2 overflow-hidden">
                                    {Object.entries(programs).map(([progId, prog]) => (
                                        <button 
                                            key={progId} 
                                            onClick={() => { 
                                                if(onProgramChange) onProgramChange(progId); 
                                                else window.location.href=`index.html#about`; 
                                                setIsDropdownOpen(false); 
                                            }} 
                                            className={`w-full text-left px-4 py-2 hover:bg-secondary-50 font-bold text-xs tracking-tight transition-colors ${progId === activeProgramId ? 'text-brand-600' : 'text-secondary-600'}`}
                                        >
                                            {prog.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button onClick={() => setIsModalOpen(true)} className="text-brand-600 font-bold hover:underline text-[17px] tracking-tight">Request Callback</button>
                    <button onClick={() => setIsModalOpen(true)} className="bg-brand-500 text-white px-6 py-2.5 rounded font-bold text-[17px] hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 active:scale-95 transition-transform tracking-tight">Join Program</button>
                </div>

                <button className="lg:hidden p-2 text-secondary-600 outline-none active:scale-95 transition-transform" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <window.Icon name={isMenuOpen ? "x" : "menu"} size={28} />
                </button>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-secondary-100 shadow-2xl py-8 px-6 animate-in slide-in-from-top duration-300 z-50 overflow-y-auto max-h-[calc(100vh-80px)]">
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
                                            className={`block w-full text-left p-4 rounded-xl text-[13px] font-bold transition-all ${isCourseActive ? 'bg-brand-100/50 text-brand-700' : 'text-secondary-500 hover:bg-secondary-50'}`}
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
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 relative shadow-2xl">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-secondary-400 hover:text-secondary-900">
                            <window.Icon name="x" size={24} />
                        </button>
                        <h3 className="font-bold text-2xl mb-2 text-secondary-900 tracking-tight">{settings?.ui?.modalTitle}</h3>
                        <p className="text-sm text-secondary-500 mb-8 font-medium">{settings?.ui?.modalSubText}</p>
                        <form className="space-y-4" onSubmit={handleModalSubmit}>
                            <input type="text" placeholder="Full Name" required value={modalFormData.full_name} onChange={e => setModalFormData({...modalFormData, full_name: e.target.value})} className="w-full p-4 border border-secondary-100 bg-secondary-50 rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <input type="email" placeholder="Email Address" required value={modalFormData.email} onChange={e => setModalFormData({...modalFormData, email: e.target.value})} className="w-full p-4 border border-secondary-100 bg-secondary-50 rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
                            <input type="tel" placeholder="Mobile Number" required maxLength="10" value={modalFormData.phone} onChange={e => setModalFormData({...modalFormData, phone: e.target.value})} className="w-full p-4 border border-secondary-100 bg-secondary-50 rounded-xl outline-none focus:border-brand-500 text-sm font-medium transition-all" />
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
                        <p className="text-secondary-400 text-[13px] font-medium leading-relaxed max-w-xs">{settings?.ui?.footerDescription}</p>
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
                <div className="flex flex-col space-y-4 text-secondary-400">
                    <h5 className="text-white text-[11px] font-bold tracking-widest uppercase opacity-40 mb-2">Legal & Navigation</h5>
                    <div className="flex flex-col space-y-3 font-bold text-sm">
                        <a href="about-us.html" className="hover:text-brand-400 transition-colors">About Us</a>
                        <a href="privacy-policy.html" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
                        <a href="terms-and-conditions.html" className="hover:text-brand-400 transition-colors">Terms & Conditions</a>
                        <a href="refund-policy.html" className="hover:text-brand-400 transition-colors">Refund Policy</a>
                    </div>
                </div>

                {/* Contact Section - Slightly smaller for professional hierarchy */}
                <div className="space-y-4 text-secondary-400">
                    <h5 className="text-white text-[11px] font-bold tracking-widest uppercase opacity-40 mb-2">Contact</h5>
                    <div className="space-y-5">
                        <div className="flex items-start gap-2.5">
                            <window.Icon name="map-pin" size={14} className="text-brand-500 mt-1 flex-shrink-0 opacity-80"/> 
                            <div className="text-[13px] text-secondary-400 font-medium leading-relaxed">
                                {(settings?.contact?.addressLines || []).map((line, idx) => (
                                    <div key={idx} className={idx === 0 ? "font-bold text-secondary-300" : ""}>{line}</div>
                                ))}
                            </div>
                        </div>
                        <div className="text-[13px] font-bold flex items-center gap-2.5">
                            <window.Icon name="mail" size={14} className="text-brand-500 opacity-80"/> 
                            <span className="text-secondary-500">Email: <a href={`mailto:${settings?.contact?.infoEmail}`} className="text-secondary-300 hover:text-brand-400 transition-colors font-bold underline underline-offset-4 decoration-white/10">{settings?.contact?.infoEmail}</a></span>
                        </div>
                    </div>
                    <div className="pt-8 text-[10px] font-black text-secondary-700 tracking-[0.4em] uppercase select-none">Logic-First. AI-Fast.</div>
                </div>
            </div>
        </footer>
    );
};