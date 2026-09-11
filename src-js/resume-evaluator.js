const { useState, useEffect } = React;

const ATS_KEYWORDS = [
    { category: 'SQL & Databases', words: ['SQL', 'Window Functions', 'CTEs', 'Stored Procedures', 'Joins', 'Relational Database', 'MySQL', 'PostgreSQL', 'ETL'] },
    { category: 'BI & Visualization', words: ['Power BI', 'DAX', 'Power Query', 'Tableau', 'Dashboard', 'Data Visualization', 'Row-Level Security', 'RLS'] },
    { category: 'Programming', words: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Data Cleaning', 'Data Manipulation'] },
    { category: 'Soft Skills & Business', words: ['Stakeholder', 'Business Insights', 'KPIs', 'Cross-functional', 'Impact', 'Optimization'] }
];

const ResumeEvaluator = () => {
    const [resumeText, setResumeText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [isReady, setIsReady] = useState(window.SITE_DATA?.isLoaded);

    useEffect(() => {
        const handleEngineReady = () => setIsReady(true);
        window.addEventListener('engineReady', handleEngineReady);
        return () => window.removeEventListener('engineReady', handleEngineReady);
    }, []);

    if (!isReady) return <div className="min-h-screen theme-bg flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div></div>;

    const handleAnalyze = () => {
        if (!resumeText.trim()) return;
        setIsAnalyzing(true);
        setResults(null);

        // Simulate a slight delay for dramatic "analyzing" effect
        setTimeout(() => {
            const textLower = resumeText.toLowerCase();
            let score = 0;
            let totalWords = 0;
            const matches = {};
            const missing = {};

            ATS_KEYWORDS.forEach(cat => {
                matches[cat.category] = [];
                missing[cat.category] = [];
                cat.words.forEach(word => {
                    totalWords++;
                    if (textLower.includes(word.toLowerCase())) {
                        matches[cat.category].push(word);
                        score++;
                    } else {
                        missing[cat.category].push(word);
                    }
                });
            });

            const finalScore = Math.round((score / totalWords) * 100);

            setResults({
                score: finalScore,
                matches,
                missing
            });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen theme-bg theme-text-primary font-sans flex flex-col">
            <window.Navbar />

            <main className="flex-grow max-w-4xl mx-auto w-full px-6 pt-32 pb-24 flex flex-col gap-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Does your resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">pass the ATS?</span>
                    </h1>
                    <p className="text-lg theme-text-muted max-w-2xl mx-auto">
                        Paste your resume below to instantly scan for the exact technical keywords top analytics recruiters (Deloitte, TCS, Fractal) are filtering for.
                    </p>
                </div>

                {!results && !isAnalyzing && (
                    <div className="theme-card p-6 md:p-8 rounded-3xl shadow-2xl border theme-border space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Paste Resume Text Here</label>
                            <textarea
                                className="w-full h-64 p-4 rounded-xl border theme-border bg-black/20 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-sm resize-y"
                                placeholder="E.g., Results-driven professional with experience in..."
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={!resumeText.trim()}
                            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex justify-center items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Scan Resume Against ATS
                        </button>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center py-24 space-y-6">
                        <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                        <h2 className="text-2xl font-bold animate-pulse">Running ATS Keyword Simulation...</h2>
                        <p className="theme-text-muted text-sm text-center max-w-md">Scanning for DAX, Window Functions, Python, and ETL architecture...</p>
                    </div>
                )}

                {results && (
                    <div className="space-y-8 animate-fade-in-up">
                        {/* Score Card */}
                        <div className="theme-card p-8 rounded-3xl border theme-border flex flex-col md:flex-row items-center gap-8 justify-between">
                            <div className="flex flex-col items-center justify-center shrink-0">
                                <div className={`relative flex items-center justify-center w-32 h-32 rounded-full border-8 ${results.score >= 70 ? 'border-green-500' : results.score >= 40 ? 'border-yellow-500' : 'border-red-500'} bg-black/20 shadow-inner`}>
                                    <span className="text-4xl font-black">{results.score}%</span>
                                </div>
                                <span className="mt-4 font-bold tracking-widest uppercase text-sm">ATS Match Score</span>
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-bold">
                                    {results.score >= 70 ? "Excellent Match! 🔥" : results.score >= 40 ? "Needs Improvement ⚠️" : "High Risk of Rejection ❌"}
                                </h3>
                                <p className="theme-text-muted text-sm md:text-base">
                                    {results.score >= 70 
                                        ? "Your resume is highly optimized for modern Data Analytics roles. Make sure you can defend these skills technically in an interview!" 
                                        : "Your resume is missing critical technical keywords that modern applicant tracking systems (ATS) look for. You are likely being auto-rejected before a human even reads your profile."}
                                </p>
                                <div className="pt-4">
                                    <button onClick={() => {setResults(null); setResumeText('');}} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        Scan Another Resume
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {ATS_KEYWORDS.map(cat => (
                                <div key={cat.category} className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                                    <h4 className="font-bold border-b theme-border pb-2">{cat.category}</h4>
                                    
                                    {/* Matches */}
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold text-green-500 uppercase tracking-wider">Found ({results.matches[cat.category].length})</div>
                                        <div className="flex flex-wrap gap-2">
                                            {results.matches[cat.category].map(word => (
                                                <span key={word} className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 rounded-md">
                                                    {word}
                                                </span>
                                            ))}
                                            {results.matches[cat.category].length === 0 && <span className="text-xs theme-text-muted italic">None found</span>}
                                        </div>
                                    </div>

                                    {/* Missing */}
                                    <div className="space-y-2 pt-2">
                                        <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Missing ({results.missing[cat.category].length})</div>
                                        <div className="flex flex-wrap gap-2">
                                            {results.missing[cat.category].map(word => (
                                                <span key={word} className="px-2 py-1 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-md line-through opacity-70">
                                                    {word}
                                                </span>
                                            ))}
                                            {results.missing[cat.category].length === 0 && <span className="text-xs theme-text-muted italic">None missing!</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Conversion Hook */}
                        <window.GlobalCTABanner 
                            title="Missing the required skills?" 
                            subtitle="Don't just stuff keywords. Learn them practically. Join our 16-week live instructor-led Masterclass and build portfolio projects that actually prove your skills." 
                        />
                    </div>
                )}
            </main>

            <window.Footer />
        </div>
    );
};

if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(<ResumeEvaluator />);
