/**
 * THE DATA PILOT - DATA ANALYTICS RESOURCE HUB
 * File: data-hub.js
 * Architecture: Interactive Micro-App mounted via site-loader.js
 */

const { useState, useEffect } = React;

const DATASETS = [
    {
        id: "rbi-finance",
        title: "RBI Banking & Credit Risk Simulator",
        category: "Finance & Banking",
        format: "CSV",
        size: "1.2 MB (10,000 Rows)",
        desc: "A realistic dataset simulating retail banking transactions, credit scores, and default statuses. Perfect for building credit risk models or financial dashboards.",
        link: "https://github.com/thedatapilot-in/public-datasets/blob/main/rbi_banking_credit_risk.csv"
    },
    {
        id: "ecommerce-retail",
        title: "E-Commerce Customer Churn & LTV",
        category: "Retail",
        format: "CSV",
        size: "2.4 MB (25,000 Rows)",
        desc: "Transactional data with customer demographic flags, purchase frequency, and churn labels. Great for cohort analysis and RFM modeling.",
        link: "https://github.com/thedatapilot-in/public-datasets/blob/main/ecommerce_churn_ltv.csv"
    }
];

const DASHBOARDS = [
    {
        id: "finance-dashboard",
        title: "Enterprise Financial Performance Tracker",
        tool: "Power BI (.pbix)",
        difficulty: "Intermediate",
        desc: "A fully built Power BI template with a customized dark-mode theme, DAX measures for YTD growth, and interactive drill-downs.",
        link: "https://github.com/thedatapilot-in/public-dashboards/blob/main/financial_performance.pbix"
    },
    {
        id: "hr-attrition",
        title: "HR Attrition & Retention Analytics",
        tool: "Tableau (.twbx)",
        difficulty: "Beginner Friendly",
        desc: "Analyze employee turnover with this ready-to-use Tableau workbook. Includes sample data and calculated fields for attrition rate.",
        link: "https://github.com/thedatapilot-in/public-dashboards/blob/main/hr_attrition.twbx"
    }
];

const SNIPPETS = [
    {
        id: "sql-cohort",
        title: "Advanced SQL Cohort Analysis",
        language: "PostgreSQL",
        code: `-- Calculate monthly retention cohorts
WITH user_activity AS (
    SELECT 
        user_id,
        DATE_TRUNC('month', created_at) AS cohort_month,
        DATE_TRUNC('month', activity_date) AS activity_month
    FROM events
)
SELECT 
    cohort_month,
    EXTRACT(MONTH FROM AGE(activity_month, cohort_month)) AS month_number,
    COUNT(DISTINCT user_id) AS active_users
FROM user_activity
GROUP BY 1, 2
ORDER BY 1, 2;`,
        desc: "A classic query to calculate user retention by monthly cohorts using window functions and date truncation."
    },
    {
        id: "python-cleaning",
        title: "Pandas Automated Data Cleaning Pipeline",
        language: "Python",
        code: `import pandas as pd
import numpy as np

def clean_data(df):
    # 1. Standardize column names
    df.columns = df.columns.str.lower().str.replace(' ', '_')
    # 2. Handle missing numeric values with median
    num_cols = df.select_dtypes(include=[np.number]).columns
    df[num_cols] = df[num_cols].fillna(df[num_cols].median())
    # 3. Drop exact duplicates
    df = df.drop_duplicates()
    return df`,
        desc: "A reusable Python function to standardize column names, handle missing values, and remove duplicates in one go."
    }
];

const App = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState("datasets");
    const [sidePromoVisible, setSidePromoVisible] = useState(true);
    const [downloadIntercept, setDownloadIntercept] = useState(null);

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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        window.dispatchEvent(new CustomEvent('siteToast', { 
            detail: { status: 'success', message: "Code copied to clipboard!" } 
        }));
    };

    if (!isLoaded) return null;

    const { Navbar, Footer, Icon, ScrollReveal } = window;

    return (
        <div className="min-h-screen theme-text-primary animate-in fade-in duration-700">
            <Navbar />

            {/* HERO HEADER */}
            <header className="pt-36 pb-12 px-6 theme-bg-alt border-b theme-border-strong text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
                            <Icon name="database" size={14} className="text-brand-400" />
                            <span>100% Free Open-Source Resources</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black theme-text-primary tracking-tight mb-4">
                            The Ultimate <span className="theme-mid-text">Data Hub</span>
                        </h1>
                        <p className="text-base md:text-lg theme-text-muted font-medium max-w-2xl mx-auto leading-relaxed">
                            Supercharge your portfolio. Download free dummy datasets, professional Power BI dashboard templates, and advanced SQL/Python snippets used by top engineers.
                        </p>
                    </ScrollReveal>
                </div>
            </header>

            {/* MAIN WORKSPACE */}
            <main className="py-12 md:py-16 px-6 max-w-6xl mx-auto">
                
                {/* TABS NAVIGATION */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {[
                        { id: "datasets", label: "Dummy Datasets", icon: "table" },
                        { id: "dashboards", label: "Dashboard Templates", icon: "pie-chart" },
                        { id: "snippets", label: "SQL & Python Snippets", icon: "code" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${
                                activeTab === tab.id
                                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                                    : "bg-white/5 border border-white/10 theme-text-secondary hover:bg-white/10"
                            }`}
                        >
                            <Icon name={tab.icon} size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT: DATASETS */}
                {activeTab === "datasets" && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {DATASETS.map(ds => (
                            <div key={ds.id} className="theme-card border theme-border-strong rounded-3xl p-6 md:p-8 shadow-xl flex flex-col hover:border-brand-500/50 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                                        <Icon name="file-text" size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 theme-text-muted uppercase tracking-wider">
                                        {ds.format} • {ds.size}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold theme-text-primary mb-2">{ds.title}</h3>
                                <div className="text-xs font-semibold theme-text-secondary mb-4 uppercase tracking-widest">{ds.category}</div>
                                <p className="text-sm theme-text-muted mb-8 flex-1 leading-relaxed">{ds.desc}</p>
                                <a 
                                    href={ds.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => setDownloadIntercept(ds)}
                                    className="w-full text-center py-3.5 rounded-xl border-2 border-brand-500/50 text-brand-400 font-bold text-sm uppercase tracking-widest hover:bg-brand-500/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Icon name="download" size={16} /> Get Dataset
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* TAB CONTENT: DASHBOARDS */}
                {activeTab === "dashboards" && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {DASHBOARDS.map(db => (
                            <div key={db.id} className="theme-card border theme-border-strong rounded-3xl p-6 md:p-8 shadow-xl flex flex-col hover:border-brand-500/50 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                                        <Icon name="monitor" size={24} />
                                    </div>
                                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 theme-text-muted uppercase tracking-wider">
                                        {db.difficulty}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold theme-text-primary mb-2">{db.title}</h3>
                                <div className="text-xs font-semibold theme-text-secondary mb-4 uppercase tracking-widest">{db.tool}</div>
                                <p className="text-sm theme-text-muted mb-8 flex-1 leading-relaxed">{db.desc}</p>
                                <a 
                                    href={db.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => setDownloadIntercept(db)}
                                    className="w-full text-center py-3.5 rounded-xl border-2 border-brand-500/50 text-brand-400 font-bold text-sm uppercase tracking-widest hover:bg-brand-500/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Icon name="download" size={16} /> Download Template
                                </a>
                            </div>
                        ))}
                    </div>
                )}

                {/* TAB CONTENT: SNIPPETS */}
                {activeTab === "snippets" && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                        {SNIPPETS.map(snip => (
                            <div key={snip.id} className="theme-card border theme-border-strong rounded-3xl overflow-hidden shadow-xl flex flex-col">
                                <div className="p-6 md:p-8 flex-1 border-b theme-border-strong">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                                            <Icon name="terminal" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold theme-text-primary leading-tight">{snip.title}</h3>
                                            <div className="text-[10px] font-bold theme-text-secondary uppercase tracking-widest">{snip.language}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm theme-text-muted leading-relaxed">{snip.desc}</p>
                                </div>
                                <div className="bg-[#0f172a] p-4 relative group">
                                    <button 
                                        onClick={() => copyToClipboard(snip.code)}
                                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                                        title="Copy to clipboard"
                                    >
                                        <Icon name="copy" size={16} />
                                    </button>
                                    <pre className="text-xs text-slate-300 overflow-x-auto p-2 custom-scrollbar">
                                        <code>{snip.code}</code>
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>

            {/* FLOATING MARKETING POPUP ON THE SIDE */}
            {sidePromoVisible && (
                <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full p-1 animate-in slide-in-from-bottom-5 duration-500">
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
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-400">Master Data Analytics</span>
                        </div>

                        <h4 className="text-sm md:text-base font-extrabold text-white mb-1.5 leading-snug">
                            Stop copying. Start building.
                        </h4>
                        
                        <p className="text-xs text-slate-300 font-medium mb-3.5 leading-relaxed">
                            Join our 16-week intensive cohort to learn how to architect these models and dashboards from scratch.
                        </p>

                        <div className="flex items-center gap-2">
                            <a 
                                href="index.html#about" 
                                className="flex-1 theme-btn-gradient text-white text-center py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                                <span>Explore Program</span>
                                <Icon name="arrow-right" size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* DOWNLOAD INTERCEPT MODAL */}
            {downloadIntercept && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f172a]/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="theme-card border theme-border-strong rounded-3xl p-8 max-w-lg w-full shadow-2xl relative text-center">
                        <button 
                            onClick={() => setDownloadIntercept(null)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 theme-text-secondary transition-colors"
                        >
                            <Icon name="x" size={18} />
                        </button>
                        
                        <div className="w-16 h-16 mx-auto bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                            <Icon name="check-circle" size={32} />
                        </div>
                        
                        <h2 className="text-2xl font-black theme-text-primary mb-2">Downloading...</h2>
                        <p className="theme-text-muted mb-8 text-sm leading-relaxed">
                            Your secure download has started. While you wait... did you know you can learn to architect these exact models from scratch?
                        </p>
                        
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                            <h3 className="font-bold theme-text-primary mb-2">The Data Pilot 16-Week Cohort</h3>
                            <ul className="theme-text-secondary text-sm space-y-2 mb-4">
                                <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-brand-400" /> Live Mentorship & Portfolio Building</li>
                                <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-brand-400" /> Advanced SQL, DAX, & Python</li>
                                <li className="flex items-center gap-2"><Icon name="check" size={14} className="text-brand-400" /> Real-world Business Domains</li>
                            </ul>
                        </div>
                        
                        <a 
                            href="index.html#about" 
                            className="w-full theme-btn-gradient text-white py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg hover:shadow-brand-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            Explore The Masterclass <Icon name="arrow-right" size={16} />
                        </a>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(document.getElementById("root"));
}
window._reactRoot.render(<App />);
