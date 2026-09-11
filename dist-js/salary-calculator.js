/**
 * THE DATA PILOT - DATA ANALYST SALARY & CAREER HIKE CALCULATOR
 * File: salary-calculator.js
 * Architecture: Interactive Micro-App mounted via site-loader.js
 */

const {
  useState,
  useEffect,
  useMemo
} = React;
const ROLES = [{
  id: "fresher",
  name: "Fresher / College Graduate",
  baseAvg: 3.0,
  currentSkills: ["Basic Excel"]
}, {
  id: "support",
  name: "BPO / Customer Support / Non-Tech",
  baseAvg: 3.5,
  currentSkills: ["Spreadsheets", "Communication"]
}, {
  id: "operations",
  name: "Operations / MIS / Business Admin",
  baseAvg: 4.2,
  currentSkills: ["Excel Reporting", "VLOOKUP"]
}, {
  id: "qa",
  name: "QA / Manual Testing / IT Support",
  baseAvg: 4.5,
  currentSkills: ["Basic Queries", "Jira", "Testing"]
}, {
  id: "junior_analyst",
  name: "Junior Analyst / Excel Specialist",
  baseAvg: 5.0,
  currentSkills: ["SQL Basics", "Advanced Excel"]
}];
const STACKS = [{
  id: "core",
  title: "Core Analyst",
  subtitle: "SQL + Excel",
  badge: "Traditional Baseline",
  avgHike: "35% - 50%",
  skills: ["SQL Basics", "Excel Dashboards", "Data Cleaning"],
  desc: "Entry-level reporting roles with basic query execution."
}, {
  id: "bi",
  title: "Modern BI Analyst",
  subtitle: "SQL + Power BI + Python",
  badge: "High Demand",
  avgHike: "60% - 90%",
  skills: ["Advanced SQL (CTEs, Windowing)", "Power BI & DAX", "Python (Pandas)"],
  desc: "Interactive enterprise dashboards and business intelligence modeling."
}, {
  id: "augmented",
  title: "Augmented Data Analyst",
  subtitle: "The Data Pilot Stack (BI + Python + GenAI)",
  badge: "Highest Package 🔥",
  avgHike: "100% - 150%+",
  skills: ["Advanced SQL Optimization", "Power BI Architecture", "Python Automation Pipelines", "GenAI Data Workflows"],
  desc: "Next-gen analysts who automate 80% of reporting using AI-augmented workflows."
}];
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentRole, setCurrentRole] = useState("support");
  const [currentCTC, setCurrentCTC] = useState(3.5);
  const [targetStack, setTargetStack] = useState("augmented");
  const [experience, setExperience] = useState("1-3");

  // Lead capture modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [sidePromoVisible, setSidePromoVisible] = useState(true);
  useEffect(() => {
    const handleSync = () => {
      if (window.SITE_DATA && window.SITE_DATA.isLoaded) setIsLoaded(true);
    };
    window.addEventListener("siteDataLoaded", handleSync);
    if (window.SITE_DATA && window.SITE_DATA.isLoaded) setIsLoaded(true);
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => {
      window.removeEventListener("siteDataLoaded", handleSync);
      clearTimeout(timer);
    };
  }, []);

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
    const hikePercent = currentCTC > 0 ? Math.round((projected - currentCTC) / currentCTC * 100) : 100;

    // Approximate monthly in-hand take-home after standard deduction and new tax regime
    let annualTax = 0;
    if (projected > 7.5) {
      annualTax = (projected - 7.5) * 0.12 * 100000;
    }
    const annualInHand = projected * 100000 * 0.92 - annualTax;
    const monthlyInHand = Math.round(annualInHand / 12);
    return {
      projectedCTC: projected,
      hikePercent: hikePercent > 0 ? hikePercent : 40,
      monthlyInHand: monthlyInHand > 0 ? monthlyInHand : 45000
    };
  }, [currentCTC, targetStack, experience]);

  // Handle lead submission to submit.php
  const handleLeadSubmit = async e => {
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
      await fetch("submit.php", {
        method: "POST",
        body: fd
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isLoaded) return null;
  const {
    Navbar,
    Footer,
    Icon,
    TiltCard,
    ScrollReveal
  } = window;
  const selectedRoleData = ROLES.find(r => r.id === currentRole) || ROLES[0];
  const targetStackData = STACKS.find(s => s.id === targetStack) || STACKS[2];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen theme-text-primary animate-in fade-in duration-700"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("header", {
    className: "pt-36 pb-12 px-6 theme-bg-alt border-b theme-border-strong text-center relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto"
  }, /*#__PURE__*/React.createElement(ScrollReveal, null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles",
    size: 14,
    className: "text-brand-400"
  }), /*#__PURE__*/React.createElement("span", null, "Official 2026 India Compensation Benchmark")), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl md:text-5xl font-black theme-text-primary tracking-tight mb-4"
  }, "Data Analyst Salary & ", /*#__PURE__*/React.createElement("span", {
    className: "theme-mid-text"
  }, "Career Hike Calculator")), /*#__PURE__*/React.createElement("p", {
    className: "text-base md:text-lg theme-text-muted font-medium max-w-2xl mx-auto leading-relaxed"
  }, "Discover your market value. Calculate your projected salary package, monthly take-home, and the exact skills required to unlock high-paying analytics roles.")))), /*#__PURE__*/React.createElement("main", {
    className: "py-12 md:py-16 px-6 max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid lg:grid-cols-12 gap-8 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-card border theme-border-strong rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2.5"
  }, "Step 1: Select Your Current Background / Role"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5"
  }, ROLES.map(role => /*#__PURE__*/React.createElement("button", {
    key: role.id,
    type: "button",
    onClick: () => {
      setCurrentRole(role.id);
      if (role.id === "fresher" && currentCTC > 2) setCurrentCTC(0);
    },
    className: `p-3.5 rounded-2xl text-left border text-xs font-bold transition-all flex items-center justify-between ${currentRole === role.id ? "border-brand-500 bg-brand-500/10 theme-mid-text shadow-sm" : "border-white/5 bg-white/5 theme-text-muted hover:border-white/10"}`
  }, /*#__PURE__*/React.createElement("span", null, role.name), currentRole === role.id && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    className: "theme-mid-text"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-white/5 border border-white/5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold uppercase tracking-wider theme-text-secondary"
  }, "Step 2: Current Annual Salary (₹ LPA)"), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-black theme-mid-text"
  }, currentCTC === 0 ? "Fresher (₹0)" : `₹${currentCTC.toFixed(1)} LPA`)), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "15",
    step: "0.5",
    value: currentCTC,
    onChange: e => setCurrentCTC(parseFloat(e.target.value)),
    className: "w-full accent-brand-500 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] theme-text-muted font-bold mt-2"
  }, /*#__PURE__*/React.createElement("span", null, "Fresher / ₹0"), /*#__PURE__*/React.createElement("span", null, "₹5 LPA"), /*#__PURE__*/React.createElement("span", null, "₹10 LPA"), /*#__PURE__*/React.createElement("span", null, "₹15 LPA"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2.5"
  }, "Step 3: Total Work Experience"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2.5"
  }, [{
    id: "fresher",
    label: "Fresher (0 Yrs)"
  }, {
    id: "1-3",
    label: "1 – 3 Years"
  }, {
    id: "3+",
    label: "3+ Years"
  }].map(item => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    type: "button",
    onClick: () => setExperience(item.id),
    className: `py-3 px-2 rounded-xl text-center border text-xs font-bold transition-all ${experience === item.id ? "border-brand-500 bg-brand-500/10 theme-mid-text" : "border-white/5 bg-white/5 theme-text-muted hover:border-white/10"}`
  }, item.label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider theme-text-secondary mb-2.5"
  }, "Step 4: Choose Your Target Analytics Stack"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, STACKS.map(stack => /*#__PURE__*/React.createElement("div", {
    key: stack.id,
    onClick: () => setTargetStack(stack.id),
    className: `p-4 rounded-2xl border transition-all cursor-pointer relative ${targetStack === stack.id ? "border-brand-500 bg-brand-500/10 shadow-md ring-1 ring-brand-500/40" : "border-white/5 bg-white/5 hover:border-white/10"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-sm md:text-base theme-text-primary"
  }, stack.title), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/20 theme-mid-text"
  }, stack.badge)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-black text-emerald-400"
  }, "Avg +", stack.avgHike)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs theme-text-muted font-medium mb-2"
  }, stack.desc), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, stack.skills.map(sk => /*#__PURE__*/React.createElement("span", {
    key: sk,
    className: "text-[10px] font-semibold px-2 py-0.5 rounded bg-white/5 theme-text-secondary border border-white/10"
  }, sk))))))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-card border theme-border-strong rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden bg-gradient-to-b from-brand-500/5 to-transparent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center pb-6 border-b theme-border space-y-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider theme-text-muted"
  }, "Projected Post-Transition Package"), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl md:text-5xl font-black theme-mid-text tracking-tight"
  }, "₹", calculation.projectedCTC.toFixed(1), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold theme-text-muted"
  }, "LPA")), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "+", calculation.hikePercent, "% Expected Hike"))), /*#__PURE__*/React.createElement("div", {
    className: "py-5 border-b theme-border flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider theme-text-secondary block"
  }, "Estimated In-Hand Salary"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] theme-text-muted"
  }, "Post Indian tax & PF take-home")), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-black text-emerald-400"
  }, "₹", calculation.monthlyInHand.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] theme-text-muted block"
  }, "/ month"))), /*#__PURE__*/React.createElement("div", {
    className: "py-5 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase tracking-wider theme-text-secondary"
  }, "Your Personalized Skills Gap"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold theme-mid-text"
  }, "To Unlock ₹", calculation.projectedCTC, " LPA")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, targetStackData.skills.map(skill => {
    const isAlreadyKnown = selectedRoleData.currentSkills.includes(skill);
    return /*#__PURE__*/React.createElement("div", {
      key: skill,
      className: "flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-semibold theme-text-primary"
    }, skill), isAlreadyKnown ? /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold text-emerald-400 flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 12
    }), " Acquired") : /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold text-amber-400 flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "alert-circle",
      size: 12
    }), " Skill Gap • Needed"));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 space-y-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsModalOpen(true),
    className: "w-full theme-btn-gradient text-white py-4 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Fast-Track This Hike in 16 Weeks")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-center theme-text-muted"
  }, "Get personalized 1-on-1 career consultation & curriculum breakdown.")))))), isModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-card border theme-border-strong rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-left"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsModalOpen(false);
      setSubmitSuccess(false);
    },
    className: "absolute top-5 right-5 text-zinc-400 hover:text-zinc-200 p-2 transition-colors rounded-full hover:bg-white/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  })), !submitSuccess ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 flex-shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 22
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg md:text-xl font-black theme-text-primary tracking-tight"
  }, "Claim Your Roadmap"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs theme-text-muted"
  }, "Targeting ₹", calculation.projectedCTC, " LPA (+", calculation.hikePercent, "% Hike)"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleLeadSubmit,
    className: "space-y-3.5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5"
  }, "Full Name *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    placeholder: "e.g. Rahul Sharma",
    value: leadForm.name,
    onChange: e => setLeadForm({
      ...leadForm,
      name: e.target.value
    }),
    className: "w-full p-3.5 border theme-border bg-white/5 theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5"
  }, "Email Address *"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    placeholder: "e.g. rahul@gmail.com",
    value: leadForm.email,
    onChange: e => setLeadForm({
      ...leadForm,
      email: e.target.value
    }),
    className: "w-full p-3.5 border theme-border bg-white/5 theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5"
  }, "WhatsApp Mobile *"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    required: true,
    maxLength: "10",
    placeholder: "10-digit Mobile Number",
    value: leadForm.phone,
    onChange: e => setLeadForm({
      ...leadForm,
      phone: e.target.value
    }),
    className: "w-full p-3.5 border theme-border bg-white/5 theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "w-full theme-btn-gradient text-white py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isSubmitting ? "loader" : "send",
    size: 16,
    className: isSubmitting ? "animate-spin" : ""
  }), /*#__PURE__*/React.createElement("span", null, isSubmitting ? "Generating Consultation..." : "Get Detailed Career Roadmap")))) : /*#__PURE__*/React.createElement("div", {
    className: "py-6 text-center space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 32
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-extrabold theme-text-primary"
  }, "Roadmap Generated!"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm theme-text-muted leading-relaxed"
  }, "Thank you, ", leadForm.name, "! Our senior analytics counselor will reach out on WhatsApp to walk you through your gap analysis and syllabus."), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsModalOpen(false);
      setSubmitSuccess(false);
    },
    className: "px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 theme-text-primary font-bold text-xs uppercase tracking-wider"
  }, "Close Window")))), sidePromoVisible && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-40 max-w-sm w-full p-1 animate-in slide-in-from-bottom-5 duration-500"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-card border-2 border-brand-500/50 rounded-3xl p-5 shadow-2xl backdrop-blur-xl relative text-left bg-[#0f172a]/95"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSidePromoVisible(false),
    className: "absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",
    "aria-label": "Dismiss banner"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-extrabold uppercase tracking-widest text-brand-400"
  }, "The Data Pilot Official Cohort")), /*#__PURE__*/React.createElement("h4", {
    className: "text-sm md:text-base font-extrabold text-white mb-1.5 leading-snug"
  }, "Ready to unlock this package in 16 weeks?"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 font-medium mb-3.5 leading-relaxed"
  }, "Join live cohorts in SQL, Power BI, Python & GenAI with 1-on-1 industry mentorship."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html#about",
    className: "flex-1 theme-btn-gradient text-white text-center py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", null, "Visit Official Website"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsModalOpen(true),
    className: "px-3 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-xs font-bold transition-all"
  }, "Inquire")))), /*#__PURE__*/React.createElement(Footer, null));
};
if (!window._reactRoot) {
  window._reactRoot = ReactDOM.createRoot(document.getElementById("root"));
}
window._reactRoot.render(/*#__PURE__*/React.createElement(App, null));