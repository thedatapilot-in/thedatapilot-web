/**
 * THE DATA PILOT - SERVICES PAGE (services.js)
 * VERSION: 1.0.0
 * ARCHITECTURE: Bootloader page — loaded via site-loader.js
 */

const {
  useState,
  useEffect
} = React;
const InternalEmergencyUI = ({
  errorMsg
}) => /*#__PURE__*/React.createElement("div", {
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
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    maxWidth: '448px',
    width: '100%'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '28px'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: '52px',
    height: '52px',
    backgroundColor: 'var(--brand-500)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "28",
  height: "28",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "white",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    lineHeight: '1'
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontWeight: '800',
    fontSize: '22px',
    color: 'var(--text-base)',
    marginBottom: '4px'
  }
}, "The Data Pilot"), /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--brand-500)'
  }
}, "Logic-First. AI-Fast."))), /*#__PURE__*/React.createElement("button", {
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
    cursor: 'pointer'
  }
}, "Check Connection")));
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
  if (error) return window.EmergencyUI ? /*#__PURE__*/React.createElement(window.EmergencyUI, {
    error: error
  }) : /*#__PURE__*/React.createElement(InternalEmergencyUI, {
    errorMsg: error
  });
  if (!isLoaded) return null;
  const {
    services
  } = window.SITE_DATA;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen theme-text-primary animate-in fade-in duration-700"
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement("header", {
    className: "pt-40 pb-16 px-6 theme-bg-alt border-b theme-border-strong"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto text-center"
  }, /*#__PURE__*/React.createElement(window.ScrollReveal, null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-amber-400 animate-pulse"
  }), "Services In Development • Bookings Opening Soon"), /*#__PURE__*/React.createElement(window.SectionEyebrow, null, "Expert Services"), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-extrabold theme-text-primary mb-4"
  }, "Built for Corporate Teams"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg theme-text-muted font-medium leading-relaxed max-w-2xl mx-auto"
  }, "Professional consulting and training designed for high-level strategy and impact.")))), /*#__PURE__*/React.createElement("main", {
    className: "py-16 px-6 max-w-7xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid md:grid-cols-3 gap-6"
  }, (services.items || []).map((service, idx) => /*#__PURE__*/React.createElement(window.ScrollReveal, {
    key: service.id,
    delay: idx * 80
  }, /*#__PURE__*/React.createElement(window.TiltCard, {
    className: "h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-card border theme-border-strong rounded-[2rem] p-8 flex flex-col h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement(window.CardBadge, {
    className: "absolute top-6 right-6"
  }, service.category), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold theme-text-primary mb-4 pr-16"
  }, service.title), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted font-medium leading-relaxed mb-8 flex-grow"
  }, service.description), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    className: "w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest mt-auto bg-white/10 text-white/50 cursor-not-allowed border border-white/10 select-none"
  }, "In Progress"))))))), /*#__PURE__*/React.createElement(window.Footer, null));
};
if (!window._reactRoot) {
  window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(/*#__PURE__*/React.createElement(App, null));