/**
 * THE DATA PILOT - DATA ANALYST SALARY & CAREER HIKE CALCULATOR
 * File: salary-calculator.js
 * Architecture: Interactive Micro-App mounted via site-loader.js
 */

const { useState, useMemo } = React;

const ROLES = [
    { id: "fresher", name: "Fresher / College Graduate", baseAvg: 3.0, currentSkills: ["Basic Excel"] },
    { id: "support", name: "BPO / Customer Support / Non-Tech", baseAvg: 3.5, currentSkills: ["Spreadsheets", "Communication"] },
    { id: "operations", name: "Operations / MIS / Business Admin", baseAvg: 4.2, currentSkills: ["Excel Reporting", "VLOOKUP"] },
    { id: "qa", name: "QA / Manual Testing / IT Support", baseAvg: 4.5, currentSkills: ["Basic Queries", "Jira", "Testing"] },
    { id: "junior_analyst", name: "Junior Analyst / Excel Specialist", baseAvg: 5.0, currentSkills: ["SQL Basics", "Advanced Excel"] }
];

const STACKS = [
    {
        id: "core",
        title: "Core Analyst",
        subtitle: "SQL + Excel",
        badge: "Traditional Baseline",
        avgHike: "35% - 50%",
        skills: ["SQL Basics", "Excel Dashboards", "Data Cleaning"],
        desc: "Entry-level reporting roles with basic query execution."
    },
    {
        id: "bi",
        title: "Modern BI Analyst",
        subtitle: "SQL + Power BI + Python",
        badge: "High Demand",
        avgHike: "60% - 90%",
        skills: ["Advanced SQL (CTEs, Windowing)", "Power BI & DAX", "Python (Pandas)"],
        desc: "Interactive enterprise dashboards and business intelligence modeling."
    },
    {
        id: "augmented",
        title: "Augmented Data Analyst",
        subtitle: "The Data Pilot Stack (BI + Python + GenAI)",
        badge: "Highest Package 🔥",
        avgHike: "100% - 150%+",
        skills: ["Advanced SQL Optimization", "Power BI Architecture", "Python Automation Pipelines", "GenAI Data Workflows"],
        desc: "Next-gen analysts who automate 80% of reporting using AI-augmented workflows."
    }
];

const SalaryCalculator = () => {
    const [currentRole, setCurrentRole] = useState("support");
    const [currentCTC, setCurrentCTC] = useState(3.5);
    const [targetStack, setTargetStack] = useState("augmented");
    const [experience, setExperience] = useState("1-3");

    // Lead capture modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [sidePromoVisible, setSidePromoVisible] = useState(true);

    // Interactive Compensation Calculations (2026 India Market Data)
    const calculation = useMemo(() => {
        let projected = 0;
        const expMultiplier = experience === "fresher" ? 1.0 : experience === "1-3" ? 1.25 : 1.55;

        if (targetStack === "core") {
            projected = Math.max(currentCTC * 1.35, 5.5 * expMultiplier);
        } else if (targetStack === "bi") {
            projected = Math.max(currentCTC * 1.70, 8.0 * expMultiplier);
        } else {
            // Augmented Data Analyst Stack
            projected = Math.max(currentCTC * 2.15, 11.5 * expMultiplier);
        }

        projected = Math.round(projected * 10) / 10;
        const hikePercent = currentCTC > 0 ? Math.round(((projected - currentCTC) / currentCTC) * 100) : 100;

        // Approximate monthly in-hand take-home after standard deduction and new tax regime
        let annualTax = 0;
        if (projected > 7.5) {
            annualTax = (projected - 7.5) * 0.12 * 100000;
        }
        const annualInHand = (projected * 100000 * 0.92) - annualTax;
        const monthlyInHand = Math.round(annualInHand / 12);

        return {
            projectedCTC: projected,
            hikePercent: hikePercent > 0 ? hikePercent : 40,
            monthlyInHand: monthlyInHand > 0 ? monthlyInHand : 45000
        };
    }, [currentCTC, targetStack, experience]);

    // Handle lead submission to submit.php
    const handleLeadSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("full_name", leadForm.name);
            fd.append("email", leadForm.email);
            fd.append("phone", leadForm.phone);
            fd.append("program_id", "ada");
            fd.append("utm_source", "salary_calculator");
            fd.append("utm_medium", targetStack);
            fd.append("utm_campaign", `hike_${calculation.hikePercent}pct`);
            fd.append("utm_content", `Current: ${currentCTC}L | Target: ${calculation.projectedCTC}L | Role: ${currentRole}`);
            fd.append("source_url", window.location.href);

            await fetch("submit.php", { method: "POST", body: fd });
            setSubmitSuccess(true);
        } catch (err) {
            console.error("Lead submission error:", err);
            setSubmitSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const { Icon } = window;
    const targetStackData = STACKS.find(s => s.id === targetStack) || STACKS[2];

    return (
        <window.PageLayout maxWidth="max-w-7xl">
            {/* Build badge — temporary, testing-only, removed before go-live.
                Fixed position in the empty top padding band (below the
                Navbar, above where PageLayout's content actually starts),
                so it never takes space from or competes with the two cards. */}
            <span className="fixed top-20 sm:top-24 right-3 z-30 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-brand-500/10 text-brand-500 border border-brand-500/30 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>BUILD v3.2.32</span>
            </span>

            <div className="grid lg:grid-cols-12 gap-8 items-stretch">

                {/* LEFT COLUMN: INPUT STUDIO (7 COLS) */}
                <div className="lg:col-span-7 flex flex-col h-full">
                    <div className="theme-card border theme-border rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-full space-y-6">

                        {/* TITLE + SUBTITLE INSIDE THE CARD */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black theme-text-primary tracking-tight">
                                Data Analyst Salary & <span className="theme-mid-text">Hike Calculator</span>
                            </h1>
                            <p className="text-sm theme-text-muted mt-1">
                                Benchmark your compensation and calculate projected packages across analytics stacks.
                            </p>
                        </div>

                        {/* 1. CURRENT ROLE */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2">
                                Current Background / Role
                            </label>
                            <div className="relative">
                                <select
                                    value={currentRole}
                                    onChange={(e) => {
                                        setCurrentRole(e.target.value);
                                        if (e.target.value === "fresher" && currentCTC > 2) setCurrentCTC(0);
                                    }}
                                    className="w-full p-3 pr-10 rounded-xl border theme-border theme-card theme-text-primary text-sm font-semibold appearance-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 cursor-pointer transition-all"
                                >
                                    {ROLES.map(role => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-500">
                                    <Icon name="chevron-down" size={16} />
                                </div>
                            </div>
                        </div>

                        {/* 2. CURRENT CTC SLIDER */}
                        <div className="p-4 rounded-xl bg-brand-500/5 border theme-border">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider theme-text-secondary">
                                    Current Annual Salary
                                </span>
                                <span className="text-sm font-extrabold theme-mid-text bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/30">
                                    {currentCTC === 0 ? "Fresher (₹0)" : `₹${currentCTC.toFixed(1)} LPA`}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="15"
                                step="0.5"
                                value={currentCTC}
                                onChange={(e) => setCurrentCTC(parseFloat(e.target.value))}
                                className="w-full custom-salary-slider cursor-pointer accent-brand-500"
                            />
                            <div className="flex justify-between text-xs theme-text-secondary font-bold mt-2.5">
                                <span>₹0 (Fresher)</span>
                                <span>₹5 LPA</span>
                                <span>₹10 LPA</span>
                                <span>₹15+ LPA</span>
                            </div>
                        </div>

                        {/* 3. TOTAL EXPERIENCE */}
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2">
                                Total Experience
                            </span>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: "fresher", label: "Fresher" },
                                    { id: "1-3", label: "1–3 Yrs" },
                                    { id: "3+", label: "3+ Yrs" }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setExperience(item.id)}
                                        className={`py-2.5 px-2 rounded-lg text-center border text-xs sm:text-sm font-bold transition-all ${
                                            experience === item.id
                                                ? "border-brand-500 bg-brand-500/10 theme-mid-text ring-1 ring-brand-500/30"
                                                : "theme-border theme-text-muted hover:border-brand-300"
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 4. TARGET ANALYTICS STACK */}
                        <div className="flex-1">
                            <span className="block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2">
                                Target Analytics Stack
                            </span>
                            <div className="space-y-2.5">
                                {STACKS.map(stack => {
                                    const isActive = targetStack === stack.id;
                                    return (
                                        <div
                                            key={stack.id}
                                            onClick={() => setTargetStack(stack.id)}
                                            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                                                isActive
                                                    ? "border-brand-500 bg-brand-500/10 ring-1 ring-brand-500/30 shadow-sm"
                                                    : "theme-border hover:border-brand-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold text-sm theme-text-primary">
                                                    {stack.title}
                                                </span>
                                                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                                                    isActive ? "bg-emerald-500 text-white" : "theme-text-muted"
                                                }`}>
                                                    +{stack.avgHike}
                                                </span>
                                            </div>
                                            <span className="text-xs theme-text-muted">
                                                {stack.subtitle}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT COLUMN: SALARY PROJECTION PIPELINE (5 COLS) */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="theme-card border theme-border rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-full">

                        <div className="flex flex-col items-center text-center pb-4 border-b theme-border mb-4">
                            <span className="text-base font-extrabold theme-text-primary mb-2">
                                Salary Projection Pipeline
                            </span>
                            <span className="text-xs font-extrabold theme-mid-text bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/30">
                                +{calculation.hikePercent}% Expected Hike
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center space-y-2">
                            {/* STEP: CURRENT BASE */}
                            <div className="flex items-center justify-between p-3.5 rounded-xl border theme-border theme-bg-alt">
                                <span className="text-sm font-bold theme-text-secondary">Current Base:</span>
                                <span className="text-base font-extrabold theme-text-primary">
                                    {currentCTC === 0 ? "Fresher (₹0)" : `₹${currentCTC.toFixed(1)} LPA`}
                                </span>
                            </div>
                            <div className="flex justify-center text-brand-500">
                                <Icon name="arrow-down" size={16} />
                            </div>

                            {/* STEP: TARGET STACK */}
                            <div className="flex items-center justify-between p-3.5 rounded-xl border theme-border theme-bg-alt">
                                <span className="text-sm font-bold theme-text-primary">{targetStackData.title}</span>
                                <span className="text-sm font-extrabold text-emerald-500">+{targetStackData.avgHike}</span>
                            </div>
                            <div className="flex justify-center text-brand-500">
                                <Icon name="arrow-down" size={16} />
                            </div>

                            {/* OUTPUT: PROJECTED PACKAGE */}
                            <div className="p-4 rounded-xl border-2 border-brand-500 bg-brand-500/10 text-center space-y-1">
                                <span className="block text-xs font-bold uppercase tracking-wider theme-mid-text">
                                    Projected Annual Package
                                </span>
                                <div className="text-3xl md:text-4xl font-black theme-mid-text">
                                    ₹{calculation.projectedCTC.toFixed(1)} <span className="text-lg font-bold">LPA</span>
                                </div>
                                <div className="text-sm font-bold text-emerald-500">
                                    Estimated In-Hand: ₹{calculation.monthlyInHand.toLocaleString()}/mo
                                </div>
                            </div>
                        </div>

                        {/* STACK REQUIREMENTS */}
                        <div className="mt-4 pt-4 border-t theme-border">
                            <span className="block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2.5 text-center">
                                Stack Requirements to Unlock Package
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                {targetStackData.skills.map(sk => (
                                    <span key={sk} className="text-center text-[11px] font-semibold px-2 py-2 rounded-lg theme-bg-alt theme-text-secondary border theme-border">
                                        {sk}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full theme-btn-gradient text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                        >
                            <Icon name="zap" size={18} />
                            <span>Get 16-Week Transition Roadmap</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* LEAD CAPTURE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="theme-card border theme-border-strong rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-left">
                        <button
                            onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                            className="absolute top-5 right-5 theme-text-muted hover:theme-text-primary p-2 transition-colors rounded-full hover:bg-white/10"
                        >
                            <Icon name="x" size={20} />
                        </button>

                        {!submitSuccess ? (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-500 flex-shrink-0">
                                        <Icon name="file-text" size={22} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-black theme-text-primary tracking-tight">Claim Your Roadmap</h3>
                                        <p className="text-xs theme-text-muted">Targeting ₹{calculation.projectedCTC} LPA (+{calculation.hikePercent}% Hike)</p>
                                    </div>
                                </div>

                                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5">Full Name *</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Rahul Sharma"
                                            value={leadForm.name}
                                            onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                                            className="w-full p-3.5 border theme-border theme-card theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5">Email Address *</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="e.g. rahul@gmail.com"
                                            value={leadForm.email}
                                            onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                                            className="w-full p-3.5 border theme-border theme-card theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5">WhatsApp Mobile *</label>
                                        <input
                                            type="tel"
                                            required
                                            maxLength="10"
                                            placeholder="10-digit Mobile Number"
                                            value={leadForm.phone}
                                            onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                                            className="w-full p-3.5 border theme-border theme-card theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full theme-btn-gradient text-white py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
                                    >
                                        <Icon name={isSubmitting ? "loader" : "send"} size={16} className={isSubmitting ? "animate-spin" : ""} />
                                        <span>{isSubmitting ? "Generating Consultation..." : "Get Detailed Career Roadmap"}</span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="py-6 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto">
                                    <Icon name="check-circle" size={32} />
                                </div>
                                <h3 className="text-xl font-extrabold theme-text-primary">Roadmap Generated!</h3>
                                <p className="text-sm theme-text-muted leading-relaxed">
                                    Thank you, {leadForm.name}! Our senior analytics counselor will reach out on WhatsApp to walk you through your gap analysis and syllabus.
                                </p>
                                <button
                                    onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 theme-text-primary font-bold text-xs uppercase tracking-wider"
                                >
                                    Close Window
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* FLOATING MARKETING POPUP — only shown where there's genuine
                margin outside the max-w-7xl content container to sit in
                without overlapping it (roughly >=1600px viewports); width is
                capped to that actual margin so it can never overlap the
                calculator, height grows naturally as text wraps narrower. */}
            {sidePromoVisible && (
                <div
                    className="hidden 2xl:block fixed bottom-6 left-6 z-40 p-1 animate-in slide-in-from-bottom-5 duration-500"
                    style={{ width: "min(20rem, calc((100vw - 80rem) / 2 - 1.5rem))" }}
                >
                    <div className="theme-card border-2 border-brand-500/50 rounded-3xl p-5 shadow-2xl backdrop-blur-xl relative text-left bg-[#0f172a]/95">
                        <button
                            onClick={() => setSidePromoVisible(false)}
                            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Dismiss banner"
                        >
                            <Icon name="x" size={16} />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-400">Live Cohort Batch</span>
                        </div>

                        <h4 className="text-sm md:text-base font-extrabold text-white mb-1.5 leading-snug">
                            Ready to transition to Data Analytics in 16 weeks?
                        </h4>

                        <p className="text-xs text-slate-300 font-medium mb-3.5 leading-relaxed">
                            Join live cohorts in SQL, Power BI, Python & GenAI with 1-on-1 industry mentorship.
                        </p>

                        <div className="flex items-center gap-2">
                            <a
                                href="index.html#about"
                                className="flex-1 theme-btn-gradient text-white text-center py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>Learn More</span>
                                <Icon name="arrow-right" size={14} />
                            </a>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-3 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-all"
                            >
                                Inquire
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </window.PageLayout>
    );
};

window.mountApp(<SalaryCalculator />);
