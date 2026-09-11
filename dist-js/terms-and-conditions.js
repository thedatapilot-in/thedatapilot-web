import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
/**
 * THE DATA PILOT - TERMS AND CONDITIONS COMPONENT (terms-and-conditions.js)
 * ---------------------------------------------------------
 * Logic for the Terms and Conditions page.
 * DATA INTEGRITY: Content strictly pulled from settings.json.
 * BUGS FIXED: Fixed margin-bottom syntax error in fallback UI.
 * ---------------------------------------------------------
 */

const {
  useState,
  useEffect
} = React;

/**
 * Navigation-Friendly Emergency UI (LOCKED DESIGN & WORDING)
 */
const InternalEmergencyUI = () => /*#__PURE__*/_jsxDEV("div", {
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
        children: "We are working on it and will be back online shortly."
      }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
        onClick: () => window.location.reload(true),
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
          boxShadow: '0 10px 15px -3px color-mix(in srgb, var(--brand-500) 30%, transparent)'
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
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const checkDataSync = () => {
      if (window.SITE_DATA && window.SITE_DATA.isLoaded && window.Navbar && window.Footer) {
        setIsLoaded(true);
        setHasError(false);
      } else if (window.SITE_DATA && window.SITE_DATA.error) {
        setHasError(true);
      }
    };
    window.addEventListener('siteDataLoaded', checkDataSync);
    checkDataSync();
    const timer = setTimeout(() => {
      if (!window.SITE_DATA?.isLoaded) {
        setHasError(true);
      }
    }, 8000);
    return () => {
      window.removeEventListener('siteDataLoaded', checkDataSync);
      clearTimeout(timer);
    };
  }, []);
  if (hasError) return /*#__PURE__*/_jsxDEV(InternalEmergencyUI, {}, void 0, false);
  if (!isLoaded) return null;
  const {
    Navbar,
    Footer,
    Icon
  } = window;
  const termsData = window.SITE_DATA?.settings?.termsAndConditions || {};
  const contactEmail = window.SITE_DATA?.settings?.contact?.admissionsEmail || "info@thedatapilot.in";
  const businessAddress = window.SITE_DATA?.settings?.contact?.address || "Ranchi, Jharkhand, India";
  const safeHeader = termsData.header || {
    title: "Terms and Conditions",
    subtitle: "Effective Date: March 20, 2026"
  };
  const safeIntro = termsData.intro || "";
  const safeSections = termsData.sections || [];
  return /*#__PURE__*/_jsxDEV("div", {
    className: "min-h-screen theme-text-primary theme-bg animate-in fade-in duration-700",
    children: [/*#__PURE__*/_jsxDEV(Navbar, {}, void 0, false), /*#__PURE__*/_jsxDEV("header", {
      className: "pt-40 pb-16 px-6 theme-bg-alt border-b theme-border-strong",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "max-w-4xl mx-auto text-left",
        children: /*#__PURE__*/_jsxDEV(window.ScrollReveal, {
          children: [/*#__PURE__*/_jsxDEV(window.SectionEyebrow, {
            children: "Legal"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
            className: "text-4xl font-extrabold theme-text-primary mb-2",
            children: safeHeader.title
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            className: "theme-text-muted font-medium text-sm",
            children: safeHeader.subtitle
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
      className: "py-12 px-6 text-left",
      children: /*#__PURE__*/_jsxDEV("div", {
        className: "max-w-4xl mx-auto",
        children: /*#__PURE__*/_jsxDEV("div", {
          className: "theme-text-secondary space-y-2 leading-relaxed",
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "mb-6",
            children: safeIntro
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "policy-content space-y-8",
            children: safeSections.map((section, idx) => /*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("h2", {
                className: "text-xl font-bold theme-text-primary mb-3 tracking-tight",
                children: section.title
              }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
                className: section.list && section.list.length > 0 ? "mb-3" : "",
                children: section.content
              }, void 0, false), section.list && section.list.length > 0 && /*#__PURE__*/_jsxDEV("ul", {
                className: "list-disc pl-6 space-y-2",
                children: section.list.map((item, i) => /*#__PURE__*/_jsxDEV("li", {
                  children: item
                }, i, false))
              }, void 0, false), section.title.toLowerCase().includes('contact') && /*#__PURE__*/_jsxDEV("ul", {
                className: "space-y-3 mt-4",
                children: [/*#__PURE__*/_jsxDEV("li", {
                  className: "flex items-center gap-3 font-semibold theme-text-primary",
                  children: [/*#__PURE__*/_jsxDEV(Icon, {
                    name: "mail",
                    size: 18,
                    className: "theme-mid-text"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: contactEmail
                  }, void 0, false)]
                }, void 0, true), /*#__PURE__*/_jsxDEV("li", {
                  className: "flex items-center gap-3 font-semibold theme-text-primary",
                  children: [/*#__PURE__*/_jsxDEV(Icon, {
                    name: "map-pin",
                    size: 18,
                    className: "theme-mid-text"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                    children: businessAddress
                  }, void 0, false)]
                }, void 0, true)]
              }, void 0, true)]
            }, idx, true))
          }, void 0, false)]
        }, void 0, true)
      }, void 0, false)
    }, void 0, false), /*#__PURE__*/_jsxDEV(Footer, {}, void 0, false)]
  }, void 0, true);
};
if (!window._reactRoot) {
  window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(/*#__PURE__*/_jsxDEV(App, {}, void 0, false));