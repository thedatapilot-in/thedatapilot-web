import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
/**
 * THE DATA PILOT - PRODUCTS PAGE (products.js)
 * VERSION: 1.0.0
 * ARCHITECTURE: Bootloader page — loaded via site-loader.js
 */

const {
  useState,
  useEffect
} = React;
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
          flexShrink: 0
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
    }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
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
      },
      children: "Check Connection"
    }, void 0, false)]
  }, void 0, true)
}, void 0, false);
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
      if (!window.SITE_DATA?.isLoaded) setError("Initializing logic engine...");
    }, 6000);
    return () => {
      window.removeEventListener('siteDataLoaded', handleSync);
      clearTimeout(timer);
    };
  }, []);
  if (error) return window.EmergencyUI ? /*#__PURE__*/_jsxDEV(window.EmergencyUI, {
    error: error
  }, void 0, false) : /*#__PURE__*/_jsxDEV(InternalEmergencyUI, {
    errorMsg: error
  }, void 0, false);
  if (!isLoaded) return null;
  const {
    products
  } = window.SITE_DATA;
  return /*#__PURE__*/_jsxDEV("div", {
    className: "min-h-screen theme-text-primary animate-in fade-in duration-700",
    children: [/*#__PURE__*/_jsxDEV(window.Navbar, {}, void 0, false), /*#__PURE__*/_jsxDEV("header", {
      className: "pt-40 pb-16 px-6 theme-bg-alt border-b theme-border-strong",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "max-w-4xl mx-auto text-center",
        children: /*#__PURE__*/_jsxDEV(window.ScrollReveal, {
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3",
            children: [/*#__PURE__*/_jsxDEV("span", {
              className: "w-2 h-2 rounded-full bg-amber-400 animate-pulse"
            }, void 0, false), "Catalog In Progress • Launching Soon"]
          }, void 0, true), /*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
            children: "Digital Products"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "text-4xl md:text-5xl font-extrabold theme-text-primary mb-4",
            children: "Logic-Ready Templates"
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            className: "text-lg theme-text-muted font-medium leading-relaxed max-w-2xl mx-auto",
            children: "Automated scripts and frameworks to accelerate your daily data workflows."
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("main", {
      className: "py-16 px-6 max-w-7xl mx-auto",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "grid md:grid-cols-3 gap-6",
        children: (products.items || []).map((product, idx) => /*#__PURE__*/_jsxDEV(window.ScrollReveal, {
          delay: idx * 80,
          children: /*#__PURE__*/_jsxDEV(window.TiltCard, {
            className: "h-full",
            children: /*#__PURE__*/_jsxDEV("div", {
              className: "theme-card border theme-border-strong rounded-3xl p-8 flex flex-col h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden",
              children: [/*#__PURE__*/_jsxDEV(window.CardBadge, {
                className: "absolute top-5 right-5",
                children: product.type
              }, void 0, false), /*#__PURE__*/_jsxDEV("h3", {
                className: "text-xl font-bold theme-text-primary mb-3 pr-16",
                children: product.title
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: "text-sm theme-text-muted font-medium leading-relaxed flex-grow mb-6",
                children: product.description
              }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                className: "pt-5 border-t theme-border flex items-center justify-between mt-auto",
                children: [/*#__PURE__*/_jsxDEV("span", {
                  className: "text-2xl font-black theme-text-primary",
                  children: [product.currency, product.price]
                }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
                  disabled: true,
                  className: "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/10 text-white/50 cursor-not-allowed border border-white/10 select-none",
                  children: "In Progress"
                }, void 0, false)]
              }, void 0, true)]
            }, void 0, true)
          }, void 0, false)
        }, product.id, false))
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV(window.Footer, {}, void 0, false)]
  }, void 0, true);
};
if (!window._reactRoot) {
  window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(/*#__PURE__*/_jsxDEV(App, {}, void 0, false));