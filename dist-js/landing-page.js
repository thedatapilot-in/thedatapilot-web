import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
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

const {
  useState,
  useEffect
} = React;
const PROJECT_COUNT = 6;

/**
 * InternalEmergencyUI
 * Fallback UI used if data fetching or React mounting fails.
 */
const InternalEmergencyUI = ({
  errorMsg
}) => /*#__PURE__*/_jsxDEV("div", {
  style: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    backgroundColor: 'var(--bg-base)',
    textAlign: 'center'
  },
  children: /*#__PURE__*/_jsxDEV("div", {
    style: {
      maxWidth: '448px',
      width: '100%'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '28px'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          width: '52px',
          height: '52px',
          backgroundColor: 'var(--brand-500)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--brand-500) 20%, transparent)'
        },
        children: /*#__PURE__*/_jsxDEV("svg", {
          width: "28",
          height: "28",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "white",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /*#__PURE__*/_jsxDEV("path", {
            d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
          }, void 0, false)
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          lineHeight: '1'
        },
        children: [/*#__PURE__*/_jsxDEV("span", {
          style: {
            fontWeight: '800',
            fontSize: '22px',
            color: 'var(--text-base)',
            marginBottom: '4px'
          },
          children: "The Data Pilot"
        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
          style: {
            fontSize: '13px',
            fontWeight: '600',
            color: 'var(--brand-500)'
          },
          children: "Logic-First. AI-Fast."
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      style: {
        backgroundColor: 'var(--surface-card)',
        padding: '30px',
        borderRadius: '40px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        style: {
          width: '100px',
          height: '80px',
          margin: '0 auto 32px auto',
          position: 'relative'
        },
        children: [/*#__PURE__*/_jsxDEV("svg", {
          width: "64",
          height: "64",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "var(--brand-500)",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          style: {
            position: 'absolute',
            top: 0,
            left: 0
          },
          className: "gear-large",
          children: [/*#__PURE__*/_jsxDEV("path", {
            d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("svg", {
          width: "42",
          height: "42",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "var(--brand-500)",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          style: {
            position: 'absolute',
            bottom: 0,
            right: 0
          },
          className: "gear-small",
          children: [/*#__PURE__*/_jsxDEV("path", {
            d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
          }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("h2", {
        style: {
          fontWeight: '800',
          fontSize: '24px',
          margin: '0 0 12px 0',
          color: 'var(--text-base)'
        },
        children: "System is temporarily down"
      }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
        style: {
          color: 'color-mix(in srgb, var(--text-base) 75%, transparent)',
          fontWeight: '500',
          marginBottom: '36px',
          lineHeight: '1.6',
          fontSize: '15px'
        },
        children: errorMsg || "We are working on it and will be back online shortly."
      }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
        onClick: () => window.location.reload(),
        style: {
          width: '100%',
          backgroundColor: 'var(--brand-500)',
          color: 'white',
          padding: '22px',
          borderRadius: '16px',
          fontWeight: '800',
          fontSize: '15px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--brand-500) 20%, transparent)'
        },
        children: "Check Connection"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
      style: {
        marginTop: '18px',
        fontSize: '12px',
        fontWeight: '700',
        color: 'color-mix(in srgb, var(--text-base) 50%, transparent)',
        letterSpacing: '0.05em'
      },
      children: "Commitment to world-class data services and mentorship"
    }, void 0, false)]
  }, void 0, true)
}, void 0, false);
const TypewriterText = ({
  text
}) => {
  const {
    useState,
    useEffect
  } = React;
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
  return /*#__PURE__*/_jsxDEV("span", {
    className: "inline-block relative",
    children: [text.substring(0, displayedLength), !isDone && /*#__PURE__*/_jsxDEV("span", {
      className: "absolute -right-2 top-1/2 -translate-y-1/2 w-[3px] h-[70%] bg-brand-500 animate-pulse"
    }, void 0, false)]
  }, void 0, true);
};
const useIntersectionObserver = options => {
  const {
    useState,
    useEffect,
    useRef
  } = React;
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
const ScrollReveal = ({
  children,
  className = "",
  delay = 0
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1
  });
  return /*#__PURE__*/_jsxDEV("div", {
    ref: ref,
    className: `transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`,
    style: {
      transitionDelay: `${delay}ms`
    },
    children: children
  }, void 0, false);
};
const TiltCard = ({
  children,
  className = ""
}) => {
  const {
    useRef,
    useState
  } = React;
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const handleMouseMove = e => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
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
  return /*#__PURE__*/_jsxDEV("div", {
    ref: cardRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `transition-all will-change-transform ${className}`,
    style: style,
    children: children
  }, void 0, false);
};
const CountDownStat = ({
  from = 100,
  to,
  label
}) => {
  const [count, setCount] = useState(from);
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1
  });
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
  return /*#__PURE__*/_jsxDEV("div", {
    ref: ref,
    className: "text-center px-1 py-3 overflow-hidden",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "flex items-center justify-center gap-0.5 sm:gap-1 mb-1 px-0.5",
      children: [/*#__PURE__*/_jsxDEV(Icon, {
        name: "users",
        size: 11,
        className: "theme-accent-text opacity-70 flex-shrink-0 hidden sm:inline-block"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "text-base sm:text-lg md:text-2xl font-extrabold theme-gradient-text tabular-nums whitespace-nowrap",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "text-[10px] sm:text-xs md:text-sm align-top mr-0.5 opacity-60",
          children: "<"
        }, void 0, false), count]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      className: "text-[8px] sm:text-[10px] font-bold uppercase tracking-widest theme-text-muted leading-tight",
      children: label
    }, void 0, false)]
  }, void 0, true);
};
const CountUpStat = ({
  target,
  suffix = '',
  label,
  icon = 'trending-up'
}) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1
  });
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
  return /*#__PURE__*/_jsxDEV("div", {
    ref: ref,
    className: "text-center px-1 py-3 overflow-hidden",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "flex items-center justify-center gap-0.5 sm:gap-1 mb-1 px-0.5",
      children: [/*#__PURE__*/_jsxDEV(Icon, {
        name: icon,
        size: 11,
        className: "theme-accent-text opacity-70 flex-shrink-0 hidden sm:inline-block"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "text-base sm:text-lg md:text-2xl font-extrabold theme-gradient-text tabular-nums whitespace-nowrap",
        children: [count, suffix]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      className: "text-[8px] sm:text-[10px] font-bold uppercase tracking-widest theme-text-muted mt-1 leading-tight",
      children: label
    }, void 0, false)]
  }, void 0, true);
};
const SHOW_TESTIMONIALS = false; // fabricated names/quotes — kept disabled, do not enable
const SHOW_TRUST_STRIP = true; // honest, no-name credibility strip — real stat only

const DUMMY_TESTIMONIALS = [{
  name: "Priya S.",
  role: "Data Analyst, Mid-size MNC",
  before: "Commerce Graduate — 0 coding background",
  quote: "I had zero coding background. After 4 months I landed my first analyst role with a 280% salary jump. The SQL and Power BI modules were the game-changers for me.",
  initials: "PS"
}, {
  name: "Rahul M.",
  role: "Business Analyst, Early-stage Startup",
  before: "Sales Executive — 3 years experience",
  quote: "Switched from a dead-end sales role to data. The live projects gave me a portfolio that actually got me shortlisted. Worth every rupee, genuinely.",
  initials: "RM"
}, {
  name: "Anjali K.",
  role: "BI Developer, IT Services Firm",
  before: "BCA Graduate — Fresh Talent profile",
  quote: "The eligibility checker said I was a fresh talent. The program delivered exactly what it promised — from zero to job-ready in 16 weeks. No filler content.",
  initials: "AK"
}];
const EligibilityChecker = () => {
  const {
    useState
  } = React;
  const {
    Icon
  } = window;
  const TOTAL_STEPS = 4;
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    education: '',
    experience: '',
    field: '',
    tools: [],
    analyticalScore: 5,
    targetRole: '',
    timeline: '',
    motivation: ''
  });
  const toolOptions = ['Excel', 'Google Sheets', 'SQL', 'Python', 'Power BI', 'Tableau', 'Gemini / AI Tools', 'None yet'];
  const handleToolToggle = (e, tool) => {
    e.preventDefault();
    setFormData(prev => {
      if (tool === 'None yet') return {
        ...prev,
        tools: ['None yet']
      };
      const without = prev.tools.filter(t => t !== 'None yet');
      return {
        ...prev,
        tools: without.includes(tool) ? without.filter(t => t !== tool) : [...without, tool]
      };
    });
  };
  const buildProfile = e => {
    e.preventDefault();
    const {
      field,
      experience,
      tools,
      analyticalScore,
      targetRole,
      timeline
    } = formData;
    const hasNoTools = tools.length === 0 || tools.includes('None yet');
    const toolCount = tools.filter(t => t !== 'None yet').length;
    const isFresher = ['Fresher', '1-2 Years'].includes(experience);
    const isSenior = experience === '5+ Years';
    const isTech = field === 'Tech / Engineering';
    const isFinance = field === 'Finance / Accounting';
    const isMkt = field === 'Marketing / Sales';
    const hasAdvanced = toolCount >= 3 || analyticalScore >= 7;
    let key;
    if (isFresher && hasNoTools) key = 'zero';else if (!isTech && !hasAdvanced && !isSenior) key = 'switcher';else if (isTech && toolCount >= 1) key = 'tech';else if (isSenior || hasAdvanced) key = 'senior';else key = 'accelerator';
    const fieldLabel = field || 'your current domain';
    const roleLabel = targetRole || 'Data Analyst';
    const toolList = toolCount > 0 ? tools.filter(t => t !== 'None yet').join(', ') : 'no tools yet';
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
    setProfile({
      key,
      data: PROFILES[key]
    });
  };
  const reset = () => {
    setProfile(null);
    setStep(1);
    setFormData({
      education: '',
      experience: '',
      field: '',
      tools: [],
      analyticalScore: 5,
      targetRole: '',
      timeline: '',
      motivation: ''
    });
  };
  const inputClass = "w-full p-3.5 border theme-border theme-card rounded-lg text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none font-medium transition-all theme-text-secondary";
  const btnClass = "theme-btn-gradient text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2";
  const step1Valid = formData.education && formData.experience && formData.field;
  const step2Valid = formData.tools.length > 0;
  const step3Valid = formData.targetRole;
  if (profile) {
    const {
      data
    } = profile;
    return /*#__PURE__*/_jsxDEV("div", {
      className: "theme-card border theme-border-strong rounded-3xl p-6 md:p-8 relative overflow-hidden self-center w-full animate-in zoom-in duration-500",
      style: {
        boxShadow: '0 0 0 1px color-mix(in srgb, var(--brand-500) 40%, transparent), 0 24px 48px -8px rgba(0,0,0,0.25)'
      },
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-600 via-brand-400 to-brand-500"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "flex items-start gap-4 mb-5",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "w-11 h-11 bg-brand-500/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-brand-500/20",
          children: /*#__PURE__*/_jsxDEV(Icon, {
            name: data.icon,
            size: 22,
            className: "theme-mid-text"
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-0.5",
            children: data.badge
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            className: "text-lg font-extrabold theme-text-primary leading-tight",
            children: data.title
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "mb-3 p-4 rounded-xl bg-brand-500/5 border border-brand-500/15",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-1.5",
          children: "What you bring"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "text-[13px] theme-text-secondary leading-relaxed",
          children: data.strength
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "mb-3 p-4 rounded-xl theme-card border theme-border",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-1.5",
          children: "Where this program closes your gap"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "text-[13px] theme-text-secondary leading-relaxed",
          children: data.gap
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "mb-3",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "text-[9px] font-bold uppercase tracking-widest theme-text-muted block mb-2",
          children: "Your critical modules"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-wrap gap-1.5",
          children: data.modules.map((m, i) => /*#__PURE__*/_jsxDEV("span", {
            className: "text-[10px] font-bold uppercase tracking-wider theme-accent-pill px-2.5 py-1 rounded-full",
            children: m
          }, i, false))
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "mb-5 p-4 rounded-xl bg-brand-500/5 border border-brand-500/15",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "text-[9px] font-bold uppercase tracking-widest theme-mid-text block mb-1.5",
          children: "Projected outcome"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "text-[13px] theme-text-secondary leading-relaxed",
          children: data.outcome
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "flex flex-col sm:flex-row gap-3 pt-4 border-t theme-border",
        children: [/*#__PURE__*/_jsxDEV("button", {
          type: "button",
          onClick: reset,
          className: "px-4 py-2.5 text-xs font-bold theme-text-muted hover:text-[var(--text-base)] uppercase tracking-widest border theme-border rounded-lg transition-all flex items-center justify-center gap-2",
          children: [/*#__PURE__*/_jsxDEV(Icon, {
            name: "rotate-ccw",
            size: 13
          }, void 0, false), " Retake"]
        }, void 0, true), /*#__PURE__*/_jsxDEV("a", {
          href: "#about",
          className: "flex-1 theme-btn-gradient text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg text-center",
          children: "Start Your Journey"
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true);
  }
  return /*#__PURE__*/_jsxDEV("div", {
    className: "theme-card border theme-border-strong rounded-3xl p-5 md:p-7 relative overflow-hidden self-center w-full",
    style: {
      boxShadow: '0 0 0 1px color-mix(in srgb, var(--brand-500) 35%, transparent), 0 20px 40px -8px rgba(0,0,0,0.15)'
    },
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "absolute top-0 left-0 w-full h-1 theme-border-strong",
      style: {
        backgroundColor: 'var(--border-strong)'
      },
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "h-full theme-btn-gradient transition-all duration-500",
        style: {
          width: `${step / TOTAL_STEPS * 100}%`
        }
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
      className: "mb-5 mt-1",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "flex items-center justify-between mb-1",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "theme-mid-text font-bold uppercase tracking-widest text-[10px]",
          children: ["Step ", step, " of ", TOTAL_STEPS]
        }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
          className: "text-[10px] theme-text-muted font-medium",
          children: [Math.round(step / TOTAL_STEPS * 100), "% complete"]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("h3", {
        className: "text-lg font-bold theme-text-primary",
        children: [step === 1 && "Your Background", step === 2 && "Your Current Skills", step === 3 && "Your Career Goal", step === 4 && "Your Timeline"]
      }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
        className: "text-xs theme-text-muted mt-0.5",
        children: [step === 1 && "Tell us where you're coming from — your education, experience, and domain.", step === 2 && "Be honest. This shapes the gap analysis in your profile.", step === 3 && "Where do you want to land? This personalises your outcome forecast.", step === 4 && "How fast do you want to get there?"]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      className: "min-h-[240px]",
      children: [step === 1 && /*#__PURE__*/_jsxDEV("div", {
        className: "space-y-4 animate-in slide-in-from-right-8 duration-300",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2",
            children: "Highest Education"
          }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
            value: formData.education,
            onChange: e => setFormData({
              ...formData,
              education: e.target.value
            }),
            className: inputClass,
            children: [/*#__PURE__*/_jsxDEV("option", {
              value: "",
              disabled: true,
              children: "Select your degree..."
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "High School / Diploma"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Bachelor's Degree"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Master's Degree"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "PhD"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2",
            children: "Work Experience"
          }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
            value: formData.experience,
            onChange: e => setFormData({
              ...formData,
              experience: e.target.value
            }),
            className: inputClass,
            children: [/*#__PURE__*/_jsxDEV("option", {
              value: "",
              disabled: true,
              children: "Select experience level..."
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Fresher"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "1-2 Years"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "3-5 Years"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "5+ Years"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2",
            children: "Current / Previous Domain"
          }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
            value: formData.field,
            onChange: e => setFormData({
              ...formData,
              field: e.target.value
            }),
            className: inputClass,
            children: [/*#__PURE__*/_jsxDEV("option", {
              value: "",
              disabled: true,
              children: "Select your domain..."
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Tech / Engineering"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Finance / Accounting"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Marketing / Sales"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Healthcare / Pharma"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Operations / Supply Chain"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Fresher — No Domain Yet"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), step === 2 && /*#__PURE__*/_jsxDEV("div", {
        className: "space-y-6 animate-in slide-in-from-right-8 duration-300",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3",
            children: ["Tools You Have Worked With ", /*#__PURE__*/_jsxDEV("span", {
              className: "theme-mid-text normal-case font-medium",
              children: "(pick all that apply)"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-wrap gap-2",
            children: toolOptions.map(tool => /*#__PURE__*/_jsxDEV("button", {
              type: "button",
              onClick: e => handleToolToggle(e, tool),
              className: `px-3.5 py-2 rounded-full text-xs font-bold transition-all ${formData.tools.includes(tool) ? 'theme-btn-gradient text-white shadow-md' : 'theme-card border theme-border theme-text-secondary hover:border-brand-500/40'}`,
              children: tool
            }, tool, false))
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3 flex justify-between",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Honest Self-Rating — Data & Analytics"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "theme-mid-text font-black",
              children: [formData.analyticalScore, " / 10"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("input", {
            type: "range",
            min: "1",
            max: "10",
            value: formData.analyticalScore,
            onChange: e => setFormData({
              ...formData,
              analyticalScore: parseInt(e.target.value)
            }),
            className: "w-full accent-brand-500 cursor-pointer"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex justify-between text-[9px] theme-text-muted font-bold uppercase mt-1.5",
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "Complete Beginner"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "Advanced"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true), step === 3 && /*#__PURE__*/_jsxDEV("div", {
        className: "space-y-4 animate-in slide-in-from-right-8 duration-300",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2",
            children: "Target Role After the Program"
          }, void 0, false), /*#__PURE__*/_jsxDEV("select", {
            value: formData.targetRole,
            onChange: e => setFormData({
              ...formData,
              targetRole: e.target.value
            }),
            className: inputClass,
            children: [/*#__PURE__*/_jsxDEV("option", {
              value: "",
              disabled: true,
              children: "Select your target role..."
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Data Analyst"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Business Analyst"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "BI / Reporting Analyst"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Data Engineer"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "SQL / Database Developer"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Marketing Analyst"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Financial Analyst"
            }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
              children: "Not Sure Yet"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3",
            children: "What is driving this decision?"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-1 gap-2",
            children: ['Switch careers into data', 'Get promoted in my current company', 'Increase my salary significantly', 'Build skills for freelancing or consulting'].map(m => /*#__PURE__*/_jsxDEV("button", {
              type: "button",
              onClick: e => {
                e.preventDefault();
                setFormData({
                  ...formData,
                  motivation: m
                });
              },
              className: `text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all border ${formData.motivation === m ? 'theme-accent-pill border-[var(--brand-mid)]' : 'theme-card theme-border theme-text-secondary hover:border-brand-500/30'}`,
              children: m
            }, m, false))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), step === 4 && /*#__PURE__*/_jsxDEV("div", {
        className: "space-y-4 animate-in slide-in-from-right-8 duration-300",
        children: /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("label", {
            className: "block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3",
            children: "When do you want to land your target role?"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 gap-2",
            children: [['Within 3 months', 'Urgent — I need to move fast'], ['3-6 months', 'Focused — I have a clear timeline'], ['6-12 months', 'Steady — building while working'], ['Just exploring', "I'm in research mode right now"]].map(([val, desc]) => /*#__PURE__*/_jsxDEV("button", {
              type: "button",
              onClick: e => {
                e.preventDefault();
                setFormData({
                  ...formData,
                  timeline: val
                });
              },
              className: `text-left px-3 py-3 rounded-xl text-xs font-bold transition-all border ${formData.timeline === val ? 'theme-accent-pill border-[var(--brand-mid)]' : 'theme-card theme-border theme-text-secondary hover:border-brand-500/30'}`,
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "block font-black text-[11px] mb-0.5",
                children: val
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "text-[10px] opacity-70 font-medium",
                children: desc
              }, void 0, false)]
            }, val, true))
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      className: "mt-6 flex justify-between pt-5 border-t theme-border",
      children: [step > 1 ? /*#__PURE__*/_jsxDEV("button", {
        type: "button",
        onClick: e => {
          e.preventDefault();
          setStep(step - 1);
        },
        className: "px-4 py-2.5 text-sm font-bold theme-text-muted hover:text-[var(--text-base)] transition-colors flex items-center gap-2",
        children: [/*#__PURE__*/_jsxDEV(Icon, {
          name: "arrow-left",
          size: 15
        }, void 0, false), " Back"]
      }, void 0, true) : /*#__PURE__*/_jsxDEV("div", {}, void 0, false), step < TOTAL_STEPS ? /*#__PURE__*/_jsxDEV("button", {
        type: "button",
        onClick: e => {
          e.preventDefault();
          setStep(step + 1);
        },
        disabled: step === 1 && !step1Valid || step === 2 && !step2Valid || step === 3 && !step3Valid,
        className: `${btnClass} disabled:opacity-40 disabled:cursor-not-allowed`,
        children: ["Continue ", /*#__PURE__*/_jsxDEV(Icon, {
          name: "arrow-right",
          size: 15
        }, void 0, false)]
      }, void 0, true) : /*#__PURE__*/_jsxDEV("button", {
        type: "button",
        onClick: buildProfile,
        disabled: !formData.timeline,
        className: `${btnClass} disabled:opacity-40 disabled:cursor-not-allowed`,
        children: ["See My Profile ", /*#__PURE__*/_jsxDEV(Icon, {
          name: "sparkles",
          size: 15
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true)]
  }, void 0, true);
};

/**
 * CareerLaunchChart — staircase toward Career Launch, one tread per module.
 * A dot travels the path (slowed to 8s/lap) while a single label cycles
 * through each module's name with a glow-in/fade-out, ending on
 * "Career Launched" before looping back to the first module.
 */
const CareerLaunchChart = ({
  syllabus
}) => {
  const {
    useState,
    useEffect
  } = React;
  const totalModules = (syllabus || []).length;
  const [activeIdx, setActiveIdx] = useState(0); // 0..totalModules-1 = module index, totalModules = "Career Launched"

  useEffect(() => {
    if (totalModules < 2) return;
    setActiveIdx(0);
    const SEGMENT_MS = 8000 / totalModules;
    const HOLD_LAUNCHED_MS = 2000;
    let idx = 0;
    let timer;
    const scheduleNext = delay => {
      timer = setTimeout(() => {
        idx = idx >= totalModules ? 0 : idx + 1;
        setActiveIdx(idx);
        scheduleNext(idx === totalModules ? HOLD_LAUNCHED_MS : SEGMENT_MS);
      }, delay);
    };
    scheduleNext(SEGMENT_MS);
    return () => clearTimeout(timer);
  }, [totalModules]);
  if (totalModules < 2) return null;
  const VBW = 800,
    VBH = 46;
  const X0 = 14,
    X1 = 786,
    YBASE = 40,
    YBOTTOM = 32,
    YTOP = 8;
  const ease = t => t * t;
  const colW = (X1 - X0) / totalModules;
  const levelFor = idx => YBOTTOM + (YTOP - YBOTTOM) * ease(idx / (totalModules - 1));
  const midXFor = idx => X0 + idx * colW + colW / 2;
  const weekFor = idx => Math.round(1 + idx / (totalModules - 1) * 15);
  let stairPath = `M${X0},${levelFor(0)}`;
  for (let idx = 0; idx < totalModules; idx++) {
    const treadRightX = X0 + (idx + 1) * colW;
    stairPath += ` L${treadRightX},${levelFor(idx)}`;
    if (idx < totalModules - 1) stairPath += ` L${treadRightX},${levelFor(idx + 1)}`;
  }
  const areaPath = `${stairPath} L${X1},${YBASE} L${X0},${YBASE} Z`;
  const SEGMENT_MS = 8000 / totalModules;
  const isLaunched = activeIdx >= totalModules;
  const activeLabel = isLaunched ? 'Career Launched' : (syllabus[activeIdx] || {}).shortLabel || (syllabus[activeIdx] || {}).title || '';
  return /*#__PURE__*/_jsxDEV("div", {
    className: "w-full max-w-7xl mx-auto mt-6 pt-4 border-t theme-border relative z-10",
    children: /*#__PURE__*/_jsxDEV("div", {
      className: "relative w-full",
      style: {
        aspectRatio: `${VBW} / ${VBH}`
      },
      children: [/*#__PURE__*/_jsxDEV("svg", {
        viewBox: `0 0 ${VBW} ${VBH}`,
        className: "absolute inset-0 w-full h-full",
        fill: "none",
        children: [/*#__PURE__*/_jsxDEV("defs", {
          children: /*#__PURE__*/_jsxDEV("linearGradient", {
            id: "careerLaunchGrad",
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "0%",
            children: [/*#__PURE__*/_jsxDEV("stop", {
              offset: "0%",
              stopColor: "var(--brand-500)"
            }, void 0, false), /*#__PURE__*/_jsxDEV("stop", {
              offset: "100%",
              stopColor: "var(--brand-accent)"
            }, void 0, false)]
          }, void 0, true)
        }, void 0, false), /*#__PURE__*/_jsxDEV("g", {
          stroke: "var(--border-strong)",
          strokeWidth: "1.25",
          opacity: "0.6",
          children: [/*#__PURE__*/_jsxDEV("line", {
            x1: X0,
            y1: YBASE,
            x2: X1,
            y2: YBASE
          }, void 0, false), /*#__PURE__*/_jsxDEV("line", {
            x1: X0,
            y1: YTOP - 4,
            x2: X0,
            y2: YBASE
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("path", {
          d: areaPath,
          fill: "url(#careerLaunchGrad)",
          opacity: "0.12"
        }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
          d: stairPath,
          stroke: "url(#careerLaunchGrad)",
          strokeWidth: "1.25",
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
          r: "3.5",
          fill: "url(#careerLaunchGrad)",
          children: /*#__PURE__*/_jsxDEV("animateMotion", {
            path: stairPath,
            dur: "8s",
            repeatCount: "indefinite",
            calcMode: "linear"
          }, void 0, false)
        }, void 0, false), syllabus.map((mod, idx) => {
          const isLast = idx === totalModules - 1;
          return /*#__PURE__*/_jsxDEV("circle", {
            cx: midXFor(idx),
            cy: levelFor(idx),
            r: isLast ? 4 : 2.5,
            fill: isLast ? 'var(--brand-accent)' : 'var(--brand-mid)',
            stroke: "var(--bg-base)",
            strokeWidth: "1.25"
          }, idx, false);
        })]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute",
        style: {
          left: `${midXFor(totalModules - 1) / VBW * 100}%`,
          top: `${levelFor(totalModules - 1) / VBH * 100}%`,
          transform: 'translate(-100%, -22px)'
        },
        children: /*#__PURE__*/_jsxDEV("span", {
          className: "theme-mid-text font-black text-[10px] tracking-wider whitespace-nowrap",
          children: "Career Launch"
        }, void 0, false)
      }, void 0, false), syllabus.map((mod, idx) => {
        const isEndpoint = idx === 0 || idx === totalModules - 1;
        return /*#__PURE__*/_jsxDEV("div", {
          className: `absolute ${isEndpoint ? '' : 'hidden sm:block'}`,
          style: {
            left: `${midXFor(idx) / VBW * 100}%`,
            top: '100%',
            transform: 'translate(-50%, 4px)'
          },
          children: /*#__PURE__*/_jsxDEV("span", {
            className: "text-[8px] sm:text-[9px] font-bold theme-text-muted tracking-wider whitespace-nowrap",
            children: ["Week ", weekFor(idx)]
          }, void 0, true)
        }, idx, false);
      }), /*#__PURE__*/_jsxDEV("div", {
        className: "absolute left-1/2 -translate-x-1/2",
        style: {
          top: '-4px'
        },
        children: /*#__PURE__*/_jsxDEV("span", {
          className: "theme-launch-callout text-[10px] sm:text-xs font-bold whitespace-nowrap",
          style: {
            animationDuration: `${isLaunched ? 2000 : SEGMENT_MS}ms`
          },
          children: activeLabel
        }, activeIdx, false)
      }, void 0, false)]
    }, void 0, true)
  }, void 0, false);
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
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [feedback, setFeedback] = useState({
    show: false,
    status: '',
    message: ''
  });
  const [activeTab, setActiveTab] = useState('about');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'syllabus', 'tools', 'projects', 'videos', ...(SHOW_TRUST_STRIP ? ['trust'] : []), 'eligibility', 'fees'];
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
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    // Trigger once to set the initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const triggerFeedback = (status, message) => {
    setFeedback({
      show: true,
      status,
      message
    });
    setTimeout(() => setFeedback({
      show: false,
      status: '',
      message: ''
    }), 5000);
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
    const handleGlobalToast = e => {
      if (isMounted) {
        const {
          status,
          message
        } = e.detail;
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
  const handleSubmit = async e => {
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
      const res = await fetch('submit.php', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.status === 'success') {
        triggerFeedback('success', "Application Received! Check your email.");
        setFormData({
          ...formData,
          full_name: '',
          email: '',
          phone: ''
        });
      } else {
        triggerFeedback('error', result.message || "Submission failed.");
      }
    } catch (err) {
      triggerFeedback('error', "Connection error.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const applyCoupon = () => {
    const currentPrice = window.SITE_DATA?.programs?.[activeProgramId]?.price || 0;
    const validCoupons = {
      'PILOT10': 0.10,
      'LAUNCH20': 0.20
    };
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
  if (error) return /*#__PURE__*/_jsxDEV(InternalEmergencyUI, {
    errorMsg: error
  }, void 0, false);
  if (!isLoaded) return null;
  const {
    settings,
    programs,
    media
  } = window.SITE_DATA;
  const currentProgram = programs && programs[activeProgramId] ? programs[activeProgramId] : {
    title: 'Loading...',
    syllabus: [],
    eligibility: [],
    highlights: [],
    price: 0
  };
  const {
    Navbar,
    Footer,
    Icon
  } = window;
  const RAZORPAY_KEY_ID = "rzp_live_TZXbhC3V2JjMUU";
  const loadRazorpaySDK = () => {
    return new Promise(resolve => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };
  const initiateRazorpayPayment = async (customer = formData) => {
    const payableAmount = formData.discountApplied && formData.finalPrice > 0 ? formData.finalPrice : currentProgram.price || 40000;
    if (isNaN(payableAmount) || payableAmount < 1) {
      triggerFeedback('error', 'Please enter a valid enrollment amount.');
      return;
    }
    setPaymentProcessing(true);
    const isSDKReady = await loadRazorpaySDK();
    if (!isSDKReady || !window.Razorpay) {
      setPaymentProcessing(false);
      triggerFeedback('error', 'Payment gateway failed to load. Please check your internet or adblocker.');
      return;
    }
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: Math.round(payableAmount * 100),
      currency: "INR",
      name: "The Data Pilot",
      description: `${currentProgram.title} Admission`,
      image: "https://thedatapilot.in/assets/images/thedatapilot_logo_cobalt.png",
      prefill: {
        name: customer.full_name || '',
        email: customer.email || '',
        contact: customer.phone || ''
      },
      notes: {
        program_id: currentProgram.id || activeProgramId,
        program_name: currentProgram.title,
        coupon_applied: formData.discountApplied ? formData.couponCode || 'PROMO' : 'NONE',
        final_amount: String(payableAmount)
      },
      theme: {
        color: "#0284c7"
      },
      handler: async function (response) {
        setPaymentProcessing(false);
        setCheckoutModalOpen(false);

        // Sync with leads database and admissions email
        try {
          const payData = new FormData();
          payData.append('full_name', customer.full_name || 'Enrolled Student');
          payData.append('email', customer.email || '');
          payData.append('phone', customer.phone || '');
          payData.append('program_id', currentProgram.id || activeProgramId);
          payData.append('payment_id', response.razorpay_payment_id);
          payData.append('amount_paid', String(payableAmount));
          payData.append('utm_source', 'razorpay_checkout');
          payData.append('source_url', window.location.href);
          await fetch('submit.php', {
            method: 'POST',
            body: payData
          });
        } catch (err) {
          console.error("Could not sync payment record:", err);
        }
        setPaymentSuccess({
          paymentId: response.razorpay_payment_id,
          amount: payableAmount,
          programTitle: currentProgram.title,
          studentName: customer.full_name || 'Student'
        });
        triggerFeedback('success', `Payment of ₹${payableAmount.toLocaleString()} received!`);
      },
      modal: {
        ondismiss: function () {
          setPaymentProcessing(false);
        }
      }
    };
    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        setPaymentProcessing(false);
        triggerFeedback('error', resp.error?.description || 'Payment was not completed.');
      });
      rzp.open();
    } catch (err) {
      setPaymentProcessing(false);
      triggerFeedback('error', 'Error launching payment window.');
    }
  };
  const handlePaymentClick = () => {
    setCheckoutModalOpen(true);
  };
  const tools = [{
    name: 'PostgreSQL',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: 'theme-card'
  }, {
    name: 'Power BI',
    img: 'https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg',
    color: 'theme-card'
  }, {
    name: 'Python',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'theme-card'
  }, {
    name: 'Spreadsheets',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg',
    color: 'theme-card'
  }, {
    name: 'Jupyter',
    img: 'https://www.vectorlogo.zone/logos/jupyter/jupyter-icon.svg',
    color: 'theme-card'
  }, {
    name: 'Data Warehousing',
    img: 'https://api.iconify.design/vscode-icons:file-type-sql.svg?width=144&height=144',
    color: 'theme-card'
  }, {
    name: 'Gemini AI',
    img: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
    color: 'theme-card'
  }, {
    name: 'Soft Skills',
    img: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
    color: 'theme-card'
  }];

  // CENTRALIZED RULE FOR PERFECT ALIGNMENT: 
  const sectionClass = "min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center scroll-mt-[80px] md:scroll-mt-[132px] py-16 md:py-20 px-6 border-b theme-border-strong";
  const handleModuleToggle = idx => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setActiveModuleIdx(activeModuleIdx === idx ? -1 : idx);
    } else {
      setActiveModuleIdx(idx);
    }
  };
  return /*#__PURE__*/_jsxDEV("div", {
    className: "min-h-screen theme-text-primary animate-in fade-in duration-700 text-left",
    children: [/*#__PURE__*/_jsxDEV(Navbar, {
      activeProgramId: activeProgramId,
      onProgramChange: id => {
        setActiveProgramId(id);
        setActiveModuleIdx(0);
        setFormData({
          ...formData,
          discountApplied: false,
          couponCode: ''
        });
      }
    }, void 0, false), feedback.show && /*#__PURE__*/_jsxDEV("div", {
      className: `fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 ${feedback.status === 'success' ? 'bg-secondary-900 border-l-4 border-brand-500' : 'bg-rose-900 border-l-4 border-rose-400'}`,
      children: [/*#__PURE__*/_jsxDEV(Icon, {
        name: feedback.status === 'success' ? 'check-circle' : 'alert-circle',
        size: 20,
        className: feedback.status === 'success' ? 'theme-mid-text' : 'text-rose-300'
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        className: "text-white font-bold text-sm tracking-tight",
        children: feedback.message
      }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
        onClick: () => setFeedback({
          ...feedback,
          show: false
        }),
        className: "ml-4 text-white/50 hover:text-white",
        children: /*#__PURE__*/_jsxDEV(Icon, {
          name: "x",
          size: 16
        }, void 0, false)
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      className: "fixed top-20 left-0 right-0 w-full z-40 backdrop-blur-xl border-b theme-border-strong shadow-md hidden md:block py-2.5",
      style: {
        background: 'var(--nav-bg)'
      },
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "max-w-5xl mx-auto flex items-center justify-between px-4",
        children: [{
          label: 'About',
          id: 'about'
        }, {
          label: 'Syllabus',
          id: 'syllabus'
        }, {
          label: 'Tools',
          id: 'tools'
        }, {
          label: 'Projects',
          id: 'projects'
        }, {
          label: 'Videos',
          id: 'videos'
        }, ...(SHOW_TESTIMONIALS ? [{
          label: 'Reviews',
          id: 'testimonials'
        }] : []), {
          label: 'Eligibility',
          id: 'eligibility'
        }, {
          label: 'Pricing',
          id: 'fees'
        }].map(tab => {
          const isActive = activeTab === tab.id;
          return /*#__PURE__*/_jsxDEV("a", {
            href: `#${tab.id}`,
            className: `px-4 py-2 rounded-xl text-[14px] transition-all duration-200 font-bold ${isActive ? 'theme-accent-pill font-extrabold shadow-sm' : 'theme-text-muted hover:text-[var(--text-base)] hover:bg-[var(--bg-alt)] border border-transparent'}`,
            children: tab.label
          }, tab.id, false);
        })
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("header", {
      id: "about",
      className: "relative min-h-[100svh] flex flex-col justify-start pt-24 md:pt-36 pb-16 md:pb-24 px-6 scroll-mt-[80px] md:scroll-mt-[132px] overflow-hidden",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "absolute inset-0 z-0 pointer-events-none",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-[-25%] left-[-25%] w-[40vw] h-[40vw] rounded-full animate-pulse",
          style: {
            background: 'radial-gradient(circle, color-mix(in srgb, var(--brand-400) 18%, white) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-[-20%] right-[-20%] w-[34vw] h-[34vw] rounded-full animate-pulse",
          style: {
            background: 'radial-gradient(circle, color-mix(in srgb, var(--brand-accent) 18%, white) 0%, transparent 70%)',
            filter: 'blur(30px)',
            animationDelay: '2s'
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-0 w-[200%] h-[200%] translate-x-[-25%] translate-y-[-25%] gear-large opacity-10",
          style: {
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--brand-500) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-start w-full relative z-10",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "relative space-y-6 md:space-y-8 text-left",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "absolute inset-0 opacity-[0.14] pointer-events-none hidden md:block -z-10",
            children: /*#__PURE__*/_jsxDEV("svg", {
              viewBox: "0 0 320 200",
              preserveAspectRatio: "xMidYMid slice",
              className: "w-full h-full",
              fill: "none",
              children: [/*#__PURE__*/_jsxDEV("g", {
                className: "theme-mid-text",
                stroke: "currentColor",
                strokeWidth: "1",
                opacity: "0.25",
                children: [/*#__PURE__*/_jsxDEV("line", {
                  x1: "10",
                  y1: "170",
                  x2: "310",
                  y2: "170"
                }, void 0, false), /*#__PURE__*/_jsxDEV("line", {
                  x1: "10",
                  y1: "10",
                  x2: "10",
                  y2: "170"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("rect", {
                className: "hero-chart-bar text-brand-500",
                x: "30",
                y: "90",
                width: "24",
                height: "80",
                rx: "4",
                fill: "currentColor",
                opacity: "0.7",
                style: {
                  animationDelay: '0s'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                className: "hero-chart-bar theme-mid-text",
                x: "70",
                y: "60",
                width: "24",
                height: "110",
                rx: "4",
                fill: "currentColor",
                opacity: "0.7",
                style: {
                  animationDelay: '0.3s'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                className: "hero-chart-bar text-brand-500",
                x: "110",
                y: "100",
                width: "24",
                height: "70",
                rx: "4",
                fill: "currentColor",
                opacity: "0.7",
                style: {
                  animationDelay: '0.6s'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                className: "hero-chart-bar theme-mid-text",
                x: "150",
                y: "40",
                width: "24",
                height: "130",
                rx: "4",
                fill: "currentColor",
                opacity: "0.7",
                style: {
                  animationDelay: '0.9s'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("rect", {
                className: "hero-chart-bar text-brand-500",
                x: "190",
                y: "75",
                width: "24",
                height: "95",
                rx: "4",
                fill: "currentColor",
                opacity: "0.7",
                style: {
                  animationDelay: '1.2s'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("path", {
                className: "hero-chart-line theme-mid-text",
                d: "M30 130 L70 95 L110 115 L150 55 L190 85 L230 45",
                stroke: "currentColor",
                strokeWidth: "2.5",
                strokeLinecap: "round",
                fill: "none"
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                className: "hero-chart-chip text-brand-400",
                cx: "230",
                cy: "45",
                r: "5",
                fill: "currentColor",
                style: {
                  animationDelay: '0.5s'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("circle", {
                className: "hero-chart-chip theme-mid-text",
                cx: "150",
                cy: "55",
                r: "4",
                fill: "currentColor",
                style: {
                  animationDelay: '1.4s'
                }
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "inline-block theme-accent-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
            children: settings?.brand?.tagline || "Logic-First. AI-Fast."
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text-base)] tracking-tight transition-all duration-300 hover:scale-[1.01] hover:drop-shadow-lg cursor-default",
            children: ["Certification in ", /*#__PURE__*/_jsxDEV("br", {}, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "theme-gradient-text",
              children: /*#__PURE__*/_jsxDEV(TypewriterText, {
                text: currentProgram.title
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "text-sm md:text-base text-[var(--text-base)] opacity-90 max-w-2xl leading-relaxed mb-6 font-medium",
            children: currentProgram.description || settings?.seo?.metaDescription
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center gap-2 lg:gap-4",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "space-y-3 md:space-y-4 text-sm font-semibold text-[var(--text-base)] opacity-90 text-left flex-1",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center space-x-3",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: "calendar",
                  size: 18,
                  className: "theme-mid-text flex-shrink-0"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "4-Month Intensive Zero-to-Job Career Program"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center space-x-3",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: "video",
                  size: 18,
                  className: "theme-mid-text flex-shrink-0"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "100% Live Instructor-Led Virtual Classrooms"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center space-x-3",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: "check-circle",
                  size: 18,
                  className: "theme-mid-text flex-shrink-0"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: "Placement Assistance for All Eligible Candidates"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center space-x-3",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: "award",
                  size: 18,
                  className: "theme-mid-text flex-shrink-0"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  children: [PROJECT_COUNT, "+ Industry-Grade Projects and Case Studies"]
                }, void 0, true)]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "hidden lg:block relative flex-shrink-0 w-60 -my-6 -mr-4",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute inset-0 scale-125",
                style: {
                  background: 'radial-gradient(circle, color-mix(in srgb, var(--brand-mid) 30%, transparent) 0%, transparent 70%)',
                  filter: 'blur(28px)'
                }
              }, void 0, false), /*#__PURE__*/_jsxDEV("img", {
                src: "assets/images/pilot/hero.png",
                alt: "",
                className: "relative w-full h-auto object-contain",
                style: {
                  filter: 'drop-shadow(0 18px 20px rgba(0,0,0,0.12))'
                },
                onError: e => e.target.style.display = 'none'
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[65%] h-5 rounded-full opacity-25",
                style: {
                  background: 'radial-gradient(ellipse, var(--text-base) 0%, transparent 75%)',
                  filter: 'blur(6px)'
                }
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-2 md:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6",
            children: [/*#__PURE__*/_jsxDEV(TiltCard, {
              children: /*#__PURE__*/_jsxDEV("a", {
                href: "#syllabus",
                className: "block w-full theme-btn-gradient text-white px-8 py-3.5 md:py-4 rounded font-bold transition-all text-sm uppercase tracking-widest text-center shadow-lg",
                children: "Explore Curriculum"
              }, void 0, false)
            }, void 0, false), /*#__PURE__*/_jsxDEV(TiltCard, {
              children: /*#__PURE__*/_jsxDEV("a", {
                href: window.SITE_DATA.media?.downloads?.brochure || "#",
                className: "theme-mid-outline-btn block w-full font-bold px-8 py-3.5 md:py-4 rounded uppercase tracking-widest text-sm text-center transition-all",
                children: "Download Brochure"
              }, void 0, false)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "flex flex-col gap-4 max-w-md ml-auto w-full lg:mt-[62px]",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "bg-[var(--surface-form)] p-8 border border-[var(--border-color)] rounded-3xl w-full shadow-2xl backdrop-blur-md text-left mt-8 lg:mt-0 relative overflow-hidden group",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "absolute top-[-50px] right-[-50px] w-32 h-32 bg-brand-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-brand-300 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
              className: "text-2xl font-extrabold mb-2 text-[var(--text-base)] relative z-10 tracking-tight",
              children: settings?.ui?.modalTitle || "Begin Your Journey"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "text-sm text-[var(--text-base)] opacity-60 mb-6 font-medium relative z-10",
              children: settings?.ui?.modalSubText
            }, void 0, false), /*#__PURE__*/_jsxDEV("form", {
              className: "space-y-4 relative z-10",
              onSubmit: handleSubmit,
              children: [/*#__PURE__*/_jsxDEV("input", {
                type: "text",
                placeholder: "Full Name",
                required: true,
                value: formData.full_name,
                onChange: e => setFormData({
                  ...formData,
                  full_name: e.target.value
                }),
                className: "w-full p-4 border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-base)] rounded-xl text-sm focus:border-brand-500 outline-none font-medium transition-all placeholder-[var(--text-base)] placeholder-opacity-40 focus:ring-1 focus:ring-brand-500"
              }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
                type: "email",
                placeholder: "Email Address",
                required: true,
                value: formData.email,
                onChange: e => setFormData({
                  ...formData,
                  email: e.target.value
                }),
                className: "w-full p-4 border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-base)] rounded-xl text-sm focus:border-brand-500 outline-none font-medium transition-all placeholder-[var(--text-base)] placeholder-opacity-40 focus:ring-1 focus:ring-brand-500"
              }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
                type: "tel",
                placeholder: "Mobile Number",
                required: true,
                maxLength: "10",
                value: formData.phone,
                onChange: e => setFormData({
                  ...formData,
                  phone: e.target.value
                }),
                className: "w-full p-4 border border-[var(--border-color)] bg-[var(--surface-card)] text-[var(--text-base)] rounded-xl text-sm focus:border-brand-500 outline-none font-medium transition-all placeholder-[var(--text-base)] placeholder-opacity-40 focus:ring-1 focus:ring-brand-500"
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "pt-2",
                children: /*#__PURE__*/_jsxDEV(TiltCard, {
                  children: /*#__PURE__*/_jsxDEV("button", {
                    type: "submit",
                    disabled: isSubmitting,
                    className: "w-full block theme-btn-gradient text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50",
                    children: isSubmitting ? 'Processing...' : settings?.labels?.applyButton || 'Apply Now'
                  }, void 0, false)
                }, void 0, false)
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "mt-4 text-[10px] text-[var(--text-base)] opacity-40 text-center leading-tight",
                children: ["By applying, you agree to our ", /*#__PURE__*/_jsxDEV("a", {
                  href: "privacy-policy.html",
                  target: "_blank",
                  className: "underline theme-mid-hover-text",
                  children: "Privacy Policy"
                }, void 0, false), ". Data is used only for your professional consultation."]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-3 divide-x theme-border-strong border theme-border-strong rounded-2xl overflow-hidden theme-card",
            children: [/*#__PURE__*/_jsxDEV(CountDownStat, {
              from: 100,
              to: 30,
              label: "Seats Per Batch"
            }, void 0, false), /*#__PURE__*/_jsxDEV(CountUpStat, {
              target: 16,
              suffix: " Weeks",
              label: "Intensive Program",
              icon: "calendar"
            }, void 0, false), /*#__PURE__*/_jsxDEV(CountUpStat, {
              target: PROJECT_COUNT,
              suffix: "+",
              label: "Live Projects",
              icon: "layout-grid"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV(ScrollReveal, {
      delay: 100,
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "syllabus",
        className: `${sectionClass} theme-bg-alt relative overflow-hidden`,
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-1/4 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-7xl mx-auto relative z-10",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4 border-b theme-border-strong pb-4",
            children: /*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
                className: "text-xs block mb-1",
                children: "Curriculum Architecture"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                className: "text-3xl font-extrabold text-left theme-text-primary tracking-tight",
                children: "Job-Ready Data Analytics Curriculum"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-start gap-0 mb-5 overflow-x-auto pb-2 -mx-1 px-1",
            style: {
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            },
            children: (currentProgram.syllabus || []).map((mod, idx) => /*#__PURE__*/_jsxDEV(React.Fragment, {
              children: [/*#__PURE__*/_jsxDEV("button", {
                onClick: () => handleModuleToggle(idx),
                className: "flex-shrink-0 flex flex-col items-center gap-1.5 group",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${idx <= activeModuleIdx ? 'theme-btn-gradient text-white shadow-md' : 'bg-transparent border-2 border-slate-400 text-slate-500 group-hover:border-brand-500/50'}`,
                  children: idx + 1
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: `text-[9px] font-bold uppercase tracking-wider transition-colors max-w-[64px] text-center leading-tight ${idx === activeModuleIdx ? 'theme-mid-text' : 'text-slate-500'}`,
                  children: mod.shortLabel || mod.title.split(' ').slice(0, 2).join(' ')
                }, void 0, false)]
              }, void 0, true), idx < (currentProgram.syllabus?.length || 1) - 1 && /*#__PURE__*/_jsxDEV("div", {
                className: `flex-1 h-0.5 mx-1 min-w-[20px] mt-4 transition-colors ${idx < activeModuleIdx ? 'bg-brand-500' : 'bg-slate-700'}`
              }, void 0, false)]
            }, idx, true))
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex flex-col lg:flex-row gap-6 min-h-[300px]",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "lg:w-1/3 flex flex-col space-y-3",
              children: (currentProgram.syllabus || []).map((mod, idx) => /*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("button", {
                  onClick: () => handleModuleToggle(idx),
                  className: `p-6 text-left rounded-xl transition-all font-semibold flex items-center justify-between group ${activeModuleIdx === idx ? 'theme-btn-gradient text-white shadow-lg' : 'theme-card border theme-border theme-text-secondary hover:border-brand-500/40 hover:text-[var(--text-base)]'}`,
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "text-md font-bold",
                    children: [idx + 1, ". ", mod.title]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(Icon, {
                    name: "chevron-right",
                    size: 20,
                    className: `transition-all duration-300 transform ${activeModuleIdx === idx ? 'rotate-90 opacity-100' : 'rotate-0 opacity-40 group-hover:opacity-70'}`
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: `lg:hidden overflow-hidden transition-all duration-300 ${activeModuleIdx === idx ? 'max-h-[1200px] opacity-100 py-6' : 'max-h-0 opacity-0'}`,
                  children: /*#__PURE__*/_jsxDEV("div", {
                    className: "theme-bg-alt rounded-2xl p-6 border theme-border space-y-6",
                    children: [/*#__PURE__*/_jsxDEV("div", {
                      className: "flex flex-col space-y-1",
                      children: [/*#__PURE__*/_jsxDEV("span", {
                        className: "theme-mid-text font-bold uppercase text-[10px] tracking-widest",
                        children: ["Module 0", idx + 1, " Details"]
                      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                        className: "flex items-center gap-2 mt-2",
                        children: [/*#__PURE__*/_jsxDEV(Icon, {
                          name: "play-circle",
                          size: 16,
                          className: "theme-mid-text"
                        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                          className: "text-[11px] font-bold theme-text-muted uppercase",
                          children: ["Live: ", mod.lectures, " • ", mod.hours, " Hours"]
                        }, void 0, true)]
                      }, void 0, true)]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                      className: "space-y-3",
                      children: (mod.content || []).map((bullet, i) => /*#__PURE__*/_jsxDEV("div", {
                        className: "flex items-start space-x-3 text-left",
                        children: [/*#__PURE__*/_jsxDEV(Icon, {
                          name: "check-circle",
                          size: 14,
                          className: "theme-mid-text mt-1 flex-shrink-0"
                        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                          className: "text-sm font-medium theme-text-secondary leading-snug",
                          children: bullet
                        }, void 0, false)]
                      }, i, true))
                    }, void 0, false), /*#__PURE__*/_jsxDEV(TiltCard, {
                      children: /*#__PURE__*/_jsxDEV("a", {
                        href: window.SITE_DATA.media?.downloads?.brochure || "#",
                        className: "theme-mid-outline-btn w-full flex items-center justify-center space-x-2 py-3 rounded-lg text-xs font-bold uppercase tracking-widest cursor-pointer transition-all",
                        children: [/*#__PURE__*/_jsxDEV(Icon, {
                          name: "download",
                          size: 14
                        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                          children: "Download Brochure"
                        }, void 0, false)]
                      }, void 0, true)
                    }, void 0, false)]
                  }, void 0, true)
                }, void 0, false)]
              }, idx, true))
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "hidden lg:flex lg:w-2/3 theme-bg-alt p-10 rounded-2xl border theme-border flex-col shadow-2xl relative overflow-hidden group backdrop-blur-xl",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "absolute top-[-50px] right-[-50px] w-48 h-48 bg-brand-500 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
              }, void 0, false), currentProgram.syllabus && currentProgram.syllabus[activeModuleIdx] ? /*#__PURE__*/_jsxDEV(_Fragment, {
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "mb-8 pb-6 border-b theme-border flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "space-y-1 text-left",
                    children: [/*#__PURE__*/_jsxDEV("span", {
                      className: "theme-mid-text font-bold uppercase text-[11px] tracking-widest",
                      children: ["Module 0", activeModuleIdx + 1]
                    }, void 0, true), /*#__PURE__*/_jsxDEV("h3", {
                      className: "text-2xl font-bold theme-text-primary mt-1",
                      children: currentProgram.syllabus[activeModuleIdx].title
                    }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                      className: "flex items-center gap-2 mt-2",
                      children: [/*#__PURE__*/_jsxDEV(Icon, {
                        name: "play-circle",
                        size: 18,
                        className: "theme-mid-text"
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        className: "text-xs font-bold theme-text-muted uppercase tracking-tighter",
                        children: ["Live Lectures: ", currentProgram.syllabus[activeModuleIdx].lectures, " • Total: ", currentProgram.syllabus[activeModuleIdx].hours, " Hours"]
                      }, void 0, true)]
                    }, void 0, true)]
                  }, void 0, true), /*#__PURE__*/_jsxDEV(TiltCard, {
                    children: /*#__PURE__*/_jsxDEV("a", {
                      href: window.SITE_DATA.media?.downloads?.brochure || "#",
                      className: "theme-mid-outline-btn block flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest self-start transition-all cursor-pointer",
                      children: [/*#__PURE__*/_jsxDEV(Icon, {
                        name: "download",
                        size: 14
                      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                        children: "Download Brochure"
                      }, void 0, false)]
                    }, void 0, true)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "grid md:grid-cols-2 gap-x-10 gap-y-4 text-left relative z-10",
                  children: (currentProgram.syllabus[activeModuleIdx].content || []).map((bullet, i) => /*#__PURE__*/_jsxDEV("div", {
                    className: "flex items-start space-x-3 group/bullet",
                    children: [/*#__PURE__*/_jsxDEV(Icon, {
                      name: "check-circle",
                      size: 14,
                      className: "theme-mid-text mt-1 flex-shrink-0"
                    }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                      className: "text-[14px] font-medium theme-text-secondary group-hover/bullet:text-[var(--text-base)] transition-colors",
                      children: bullet
                    }, void 0, false)]
                  }, i, true))
                }, void 0, false)]
              }, void 0, true) : /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center justify-center h-full theme-text-muted font-bold relative z-10",
                children: "Please select a module to view curriculum details."
              }, void 0, false)]
            }, void 0, true)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV(CareerLaunchChart, {
          syllabus: currentProgram.syllabus
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV(ScrollReveal, {
      delay: 100,
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "tools",
        className: `${sectionClass} theme-bg relative overflow-hidden`,
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.07] animate-pulse pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-[-15%] right-[-10%] w-[35vw] h-[35vw] bg-brand-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.05] animate-pulse pointer-events-none",
          style: {
            animationDelay: '3s'
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-7xl mx-auto text-left relative z-10",
          children: [/*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
            children: "Industry Stack"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            className: "text-3xl font-bold mb-16 theme-text-primary tracking-tight",
            children: "Modern Industry Tool Stack"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-2 md:grid-cols-4 gap-8",
            children: tools.map((tool, i) => /*#__PURE__*/_jsxDEV(ScrollReveal, {
              delay: i * 70,
              children: /*#__PURE__*/_jsxDEV(TiltCard, {
                className: "group h-full rounded-2xl",
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: `${tool.color} theme-mid-hover-border p-8 flex flex-col items-center justify-center space-y-4 border theme-border shadow-sm rounded-2xl transition-all duration-300 h-full hover:shadow-lg relative overflow-hidden`,
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-16 h-16 flex items-center justify-center relative z-10",
                    children: /*#__PURE__*/_jsxDEV("img", {
                      src: tool.img,
                      alt: tool.name,
                      className: "w-12 h-12 md:w-16 md:h-16 object-contain transition-transform group-hover:scale-110 duration-500",
                      onError: e => {
                        e.target.src = 'https://cdn-icons-png.flaticon.com/512/2741/2741270.png';
                      }
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "font-bold theme-text-secondary text-sm relative z-10 group-hover:text-[var(--brand-mid)] transition-colors duration-300",
                    children: tool.name
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "absolute inset-0 theme-hover-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "absolute -bottom-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
                    style: {
                      background: 'var(--brand-accent)'
                    }
                  }, void 0, false)]
                }, void 0, true)
              }, void 0, false)
            }, i, false))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV(ScrollReveal, {
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "projects",
        className: `${sectionClass} theme-bg-alt relative overflow-hidden`,
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-[-10%] right-[-8%] w-[40vw] h-[40vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[130px] opacity-[0.06] animate-pulse pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-7xl mx-auto text-left relative z-10",
          children: [/*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
            children: "Hands-On Work"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            className: "text-3xl font-extrabold mb-8 md:mb-12 theme-text-primary tracking-tight flex items-center gap-3",
            children: [/*#__PURE__*/_jsxDEV(Icon, {
              name: "layout-grid",
              size: 32,
              className: "text-brand-500"
            }, void 0, false), PROJECT_COUNT, "+ Real-Time Industry Projects"]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6",
            children: (media.projects || []).slice(0, 6).map((proj, idx) => /*#__PURE__*/_jsxDEV(TiltCard, {
              className: "col-span-1 group",
              children: /*#__PURE__*/_jsxDEV("div", {
                className: "h-full w-full theme-card rounded-2xl border theme-border overflow-hidden relative transition-all duration-300 hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10 flex flex-col",
                children: [/*#__PURE__*/_jsxDEV("div", {
                  className: "h-32 md:h-40 theme-card flex items-center justify-center relative overflow-hidden",
                  children: [/*#__PURE__*/_jsxDEV("img", {
                    src: proj.img,
                    alt: proj.title,
                    className: "absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700",
                    onError: e => e.target.style.display = 'none'
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                  }, void 0, false), /*#__PURE__*/_jsxDEV(Icon, {
                    name: "image",
                    size: 32,
                    className: "opacity-20 absolute"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur theme-mid-text px-2 py-1 rounded border border-[var(--brand-mid)]",
                    children: String(idx + 1).padStart(2, '0')
                  }, void 0, false), /*#__PURE__*/_jsxDEV(window.CardBadge, {
                    className: "absolute top-3 right-3",
                    children: "Live Project"
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "p-4 md:p-5 relative z-10 theme-card flex-grow flex flex-col gap-2",
                  children: [/*#__PURE__*/_jsxDEV("h4", {
                    className: "font-bold theme-text-primary text-[13px] md:text-sm tracking-tight line-clamp-2",
                    children: proj.title
                  }, void 0, false), proj.description && /*#__PURE__*/_jsxDEV("p", {
                    className: "text-[11px] theme-text-muted leading-snug line-clamp-2",
                    children: proj.description
                  }, void 0, false), proj.tools && proj.tools.length > 0 && /*#__PURE__*/_jsxDEV("div", {
                    className: "flex flex-wrap gap-1 mt-auto pt-1",
                    children: proj.tools.map((t, ti) => /*#__PURE__*/_jsxDEV("span", {
                      className: "text-[9px] font-bold uppercase tracking-wider theme-accent-pill px-1.5 py-0.5 rounded",
                      children: t
                    }, ti, false))
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-gradient-to-br from-brand-500/0 via-brand-500/5 to-brand-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                }, void 0, false)]
              }, void 0, true)
            }, proj.id, false))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV(ScrollReveal, {
      delay: 100,
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "videos",
        className: `${sectionClass} theme-bg relative overflow-hidden`,
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute bottom-[-15%] left-[-8%] w-[40vw] h-[40vw] bg-brand-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.06] animate-pulse pointer-events-none",
          style: {
            animationDelay: '1.5s'
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-7xl mx-auto text-left relative z-10",
          children: [/*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
            children: "Watch & Learn"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            className: "text-3xl font-bold theme-text-primary tracking-tight mb-12",
            children: "Program Overview & Demos"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: (media.videos || []).map((vid, i) => /*#__PURE__*/_jsxDEV(TiltCard, {
              className: "group",
              children: /*#__PURE__*/_jsxDEV("a", {
                href: vid.url || '#',
                target: "_blank",
                rel: "noopener noreferrer",
                className: "block aspect-video theme-card rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden border theme-border hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/15 transition-all duration-300",
                children: [/*#__PURE__*/_jsxDEV("img", {
                  src: vid.thumb || `https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`,
                  alt: vid.title,
                  className: "absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-700 opacity-85 group-hover:opacity-100",
                  onError: e => e.target.style.display = 'none'
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300"
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  className: "relative z-10 flex items-center justify-center",
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "absolute w-14 h-14 rounded-full animate-ping",
                    style: {
                      background: 'color-mix(in srgb, var(--brand-mid) 30%, transparent)'
                    }
                  }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                    className: "w-12 h-12 rounded-full theme-btn-gradient backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300",
                    children: /*#__PURE__*/_jsxDEV(Icon, {
                      name: "play",
                      size: 20,
                      className: "text-white ml-0.5"
                    }, void 0, false)
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
                  className: "absolute bottom-0 left-0 right-0 px-3 py-2.5 bg-gradient-to-t from-black/80 via-black/50 to-transparent",
                  children: /*#__PURE__*/_jsxDEV("span", {
                    className: "text-white font-semibold text-[11px] uppercase tracking-wide line-clamp-2 leading-tight",
                    children: vid.title
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true)
            }, i, false))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), SHOW_TRUST_STRIP && /*#__PURE__*/_jsxDEV(ScrollReveal, {
      delay: 100,
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "trust",
        className: `${sectionClass} theme-bg-alt relative overflow-hidden justify-center`,
        style: {
          minHeight: 'auto',
          paddingTop: '3rem',
          paddingBottom: '3rem'
        },
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-brand-500 rounded-full mix-blend-multiply filter blur-[140px] opacity-[0.07] pointer-events-none"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-4xl mx-auto text-center relative z-10",
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "inline-block theme-accent-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6",
            children: "Track Record"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center gap-4",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "theme-gradient-text text-6xl md:text-7xl font-extrabold tracking-tight",
              children: "100+"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "text-left theme-text-primary text-lg md:text-xl font-bold leading-tight max-w-[220px]",
              children: "Students Mentored in Live Online Classes"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            className: "theme-text-muted text-sm mt-6 max-w-xl mx-auto leading-relaxed",
            children: "Before launching The Data Pilot, our mentors personally trained 100+ learners through live online cohorts — the same teaching approach now built into this program."
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV(ScrollReveal, {
      delay: 100,
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "eligibility",
        className: "min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center py-8 md:py-10 px-6 border-b theme-border-strong scroll-mt-[80px] md:scroll-mt-[132px] theme-bg-alt relative overflow-hidden",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: 'radial-gradient(ellipse 60% 80% at 10% 55%, var(--brand-500) 0%, transparent 60%)',
            opacity: 0.07
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: 'radial-gradient(ellipse 40% 50% at 90% 40%, var(--brand-700) 0%, transparent 60%)',
            opacity: 0.04
          }
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center text-left relative z-10",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "space-y-4 w-full self-center",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "inline-flex items-center theme-accent-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest",
              children: "Candidate Profiling"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              className: "text-2xl md:text-3xl font-extrabold theme-text-primary tracking-tight leading-tight",
              children: ["Who Is This", /*#__PURE__*/_jsxDEV("br", {}, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                className: "theme-gradient-text",
                children: "Program For?"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              className: "theme-text-muted font-medium leading-relaxed text-sm max-w-sm",
              children: "Built for graduates, working professionals, and career-changers ready to enter data."
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-2",
              children: ["Final year students or graduates from any discipline.", "Working professionals looking for career acceleration.", "Basic understanding of logical reasoning required.", "Commitment to 15-20 hours of weekly learning."].map((text, i) => /*#__PURE__*/_jsxDEV(ScrollReveal, {
                delay: i * 70,
                children: /*#__PURE__*/_jsxDEV("div", {
                  className: "flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 hover:scale-[1.01]",
                  style: {
                    background: 'color-mix(in srgb, var(--brand-500) 5%, var(--surface-card))',
                    borderColor: 'color-mix(in srgb, var(--brand-500) 20%, transparent)',
                    borderLeftWidth: '3px',
                    borderLeftColor: 'var(--brand-500)'
                  },
                  children: [/*#__PURE__*/_jsxDEV("div", {
                    className: "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-white font-black text-xs theme-btn-gradient",
                    children: i + 1
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-sm font-semibold theme-text-secondary leading-snug pt-0.5",
                    children: text
                  }, void 0, false)]
                }, void 0, true)
              }, i, false))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV(EligibilityChecker, {}, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV(ScrollReveal, {
      delay: 100,
      children: /*#__PURE__*/_jsxDEV("section", {
        id: "fees",
        className: "min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-132px)] flex flex-col justify-center py-8 md:py-12 px-6 theme-bg scroll-mt-[80px] md:scroll-mt-[132px]",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-5xl mx-auto text-left mb-4",
          children: [/*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
            className: "text-xs block mb-2",
            children: "Certification Program"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            className: "text-3xl font-extrabold theme-text-primary tracking-tight",
            children: "Program Fees"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "w-full max-w-5xl mx-auto theme-card rounded-[3rem] border theme-border overflow-hidden shadow-2xl grid md:grid-cols-2",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "p-6 md:p-10 space-y-5 text-left",
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "text-xl font-extrabold tracking-tight theme-text-primary",
              children: "What's Included"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-3",
              children: (currentProgram.highlights || []).map((t, i) => /*#__PURE__*/_jsxDEV("div", {
                className: "flex items-center space-x-4",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: "check-circle",
                  size: 20,
                  className: "theme-mid-text flex-shrink-0"
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-md font-bold theme-text-secondary",
                  children: t
                }, void 0, false)]
              }, i, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "p-6 md:p-10 theme-btn-gradient text-white flex flex-col justify-center space-y-5 text-left",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("span", {
                className: "text-[10px] font-black uppercase tracking-[0.3em] text-white/80",
                children: "Program Fee"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                className: "text-xl md:text-2xl font-bold text-white leading-tight",
                children: currentProgram.title
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-1",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 flex-wrap overflow-hidden",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap",
                  children: ["₹", (formData.discountApplied ? formData.finalPrice : currentProgram.price)?.toLocaleString(), " /-"]
                }, void 0, true), formData.discountApplied && /*#__PURE__*/_jsxDEV("div", {
                  className: "flex flex-wrap items-center gap-2",
                  children: [/*#__PURE__*/_jsxDEV("span", {
                    className: "text-white/60 line-through text-xs md:text-sm font-medium whitespace-nowrap",
                    children: ["₹", currentProgram.price?.toLocaleString(), " /-"]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
                    className: "text-white text-xs md:text-sm font-bold whitespace-nowrap",
                    children: ["- ₹", formData.discountAmount?.toLocaleString(), " /-"]
                  }, void 0, true)]
                }, void 0, true)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                className: "text-white/60 text-[10px] md:text-xs font-medium uppercase tracking-widest mt-1",
                children: "Inclusive of all taxes"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "space-y-3",
              children: [/*#__PURE__*/_jsxDEV("div", {
                className: "flex gap-2 p-1 bg-white/10 border border-white/10 rounded-xl focus-within:border-white/40 transition-all",
                children: [/*#__PURE__*/_jsxDEV("input", {
                  type: "text",
                  placeholder: "Enter Coupon Code",
                  className: "bg-transparent flex-1 px-3 py-2 text-xs md:text-sm outline-none font-bold uppercase tracking-widest placeholder:text-white/50 text-white min-w-0",
                  value: formData.couponCode,
                  onChange: e => setFormData({
                    ...formData,
                    couponCode: e.target.value
                  })
                }, void 0, false), /*#__PURE__*/_jsxDEV(TiltCard, {
                  children: /*#__PURE__*/_jsxDEV("button", {
                    onClick: applyCoupon,
                    className: "block bg-white theme-mid-text hover:brightness-95 px-4 md:px-5 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex-shrink-0",
                    children: "Apply"
                  }, void 0, false)
                }, void 0, false)]
              }, void 0, true), formData.discountApplied && /*#__PURE__*/_jsxDEV("p", {
                className: "text-[10px] text-white font-bold px-2 flex items-center gap-1 uppercase tracking-widest animate-pulse",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: "tag",
                  size: 10
                }, void 0, false), " Discount Applied Successfully"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV(TiltCard, {
              children: /*#__PURE__*/_jsxDEV("button", {
                onClick: handlePaymentClick,
                disabled: paymentProcessing,
                className: "w-full block bg-white theme-mid-text hover:brightness-95 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 cursor-pointer disabled:opacity-75",
                children: [/*#__PURE__*/_jsxDEV(Icon, {
                  name: paymentProcessing ? "loader" : "credit-card",
                  size: 18,
                  className: `flex-shrink-0 ${paymentProcessing ? 'animate-spin' : ''}`
                }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                  className: "text-center",
                  children: paymentProcessing ? "Connecting to Razorpay..." : `Make Payment ₹${(formData.discountApplied ? formData.finalPrice : currentProgram.price)?.toLocaleString()} /-`
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), checkoutModalOpen && /*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "theme-card border theme-border-strong rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-left",
        children: [/*#__PURE__*/_jsxDEV("button", {
          onClick: () => setCheckoutModalOpen(false),
          className: "absolute top-5 right-5 text-zinc-400 hover:text-zinc-200 p-2 transition-colors rounded-full hover:bg-white/10",
          "aria-label": "Close",
          children: /*#__PURE__*/_jsxDEV(Icon, {
            name: "x",
            size: 20
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "flex items-center gap-3 mb-4",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 flex-shrink-0",
            children: /*#__PURE__*/_jsxDEV(Icon, {
              name: "shield-check",
              size: 22
            }, void 0, false)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("h3", {
              className: "text-lg md:text-xl font-black theme-text-primary tracking-tight",
              children: "Complete Enrollment"
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              className: "text-xs theme-text-muted",
              children: currentProgram.title
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "p-4 mb-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-between",
          children: [/*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "block text-[11px] font-bold uppercase tracking-wider theme-text-secondary mb-0.5",
              children: "Total Payable"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "text-xs theme-text-muted",
              children: formData.discountApplied ? `Discount Applied (${formData.couponCode || 'PROMO'})` : 'Standard Enrollment Fee'
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "text-right",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "text-2xl font-black theme-text-primary tracking-tight",
              children: ["₹", (formData.discountApplied && formData.finalPrice > 0 ? formData.finalPrice : currentProgram.price || 40000).toLocaleString()]
            }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
              className: "text-[10px] theme-text-muted block",
              children: "INR (All-inclusive)"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("form", {
          onSubmit: e => {
            e.preventDefault();
            setCheckoutModalOpen(false);
            initiateRazorpayPayment(formData);
          },
          className: "space-y-3.5",
          children: [/*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5",
              children: "Full Name *"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              type: "text",
              required: true,
              placeholder: "e.g. John Doe",
              value: formData.full_name,
              onChange: e => setFormData({
                ...formData,
                full_name: e.target.value
              }),
              className: "w-full p-3.5 border theme-border bg-white/5 theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium transition-all"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5",
              children: "Email Address (for Receipt & Access) *"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              type: "email",
              required: true,
              placeholder: "e.g. student@gmail.com",
              value: formData.email,
              onChange: e => setFormData({
                ...formData,
                email: e.target.value
              }),
              className: "w-full p-3.5 border theme-border bg-white/5 theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium transition-all"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("label", {
              className: "block text-[11px] font-bold uppercase tracking-wider theme-text-muted mb-1.5",
              children: "WhatsApp / Contact Mobile *"
            }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
              type: "tel",
              required: true,
              maxLength: "10",
              placeholder: "10-digit Mobile Number",
              value: formData.phone,
              onChange: e => setFormData({
                ...formData,
                phone: e.target.value
              }),
              className: "w-full p-3.5 border theme-border bg-white/5 theme-text-primary rounded-xl text-sm outline-none focus:border-brand-500 font-medium transition-all"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "pt-2",
            children: /*#__PURE__*/_jsxDEV("button", {
              type: "submit",
              disabled: paymentProcessing,
              className: "w-full theme-btn-gradient text-white py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75",
              children: [/*#__PURE__*/_jsxDEV(Icon, {
                name: "lock",
                size: 16
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: "Proceed to Secure Payment"
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "flex items-center justify-center gap-2 pt-2 text-[10px] theme-text-muted",
            children: [/*#__PURE__*/_jsxDEV(Icon, {
              name: "check-circle",
              size: 12,
              className: "text-emerald-500"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              children: "256-Bit SSL Encrypted • Powered by Razorpay"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false), paymentSuccess && /*#__PURE__*/_jsxDEV("div", {
      className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "theme-card border border-emerald-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-center",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20",
          children: /*#__PURE__*/_jsxDEV(Icon, {
            name: "check",
            size: 36
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
          className: "text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-2",
          children: "Payment Confirmed"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
          className: "text-2xl font-black theme-text-primary mb-1 tracking-tight",
          children: "Admission Successful!"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "text-xs theme-text-secondary font-medium mb-6",
          children: ["Welcome aboard, ", /*#__PURE__*/_jsxDEV("span", {
            className: "font-bold theme-text-primary",
            children: paymentSuccess.studentName
          }, void 0, false), "!"]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "bg-white/5 border theme-border rounded-2xl p-4 text-left space-y-2 mb-6",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "flex justify-between items-center text-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "theme-text-muted font-medium",
              children: "Program"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "theme-text-primary font-bold",
              children: paymentSuccess.programTitle
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex justify-between items-center text-xs",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "theme-text-muted font-medium",
              children: "Amount Paid"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "theme-text-primary font-black text-sm",
              children: ["₹", paymentSuccess.amount?.toLocaleString(), " /-"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "flex justify-between items-center text-xs pt-2 border-t theme-border",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "theme-text-muted font-medium",
              children: "Payment ID"
            }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
              className: "font-mono text-[11px] theme-mid-text font-bold select-all",
              children: paymentSuccess.paymentId
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
          className: "text-xs theme-text-muted font-medium leading-relaxed mb-6",
          children: "A receipt and onboarding instructions have been sent to your email. Our admissions coordinator will reach out within 24 hours."
        }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
          onClick: () => setPaymentSuccess(null),
          className: "w-full theme-btn-gradient text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 cursor-pointer",
          children: "Done"
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false), /*#__PURE__*/_jsxDEV(Footer, {}, void 0, false)]
  }, void 0, true);
};
if (!window._reactRoot) {
  window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(/*#__PURE__*/_jsxDEV(App, {}, void 0, false));