const SqlInterviewQuestions = () => {
    const [activeAccordion, setActiveAccordion] = React.useState(null);
    const [isReady, setIsReady] = React.useState(window.SITE_DATA?.isLoaded);

    React.useEffect(() => {
        const handleEngineReady = () => setIsReady(true);
        window.addEventListener('engineReady', handleEngineReady);
        return () => window.removeEventListener('engineReady', handleEngineReady);
    }, []);

    if (!isReady) return <div className="min-h-screen theme-bg flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin"></div></div>;

    return (
        <div className="min-h-screen theme-bg theme-text-primary font-sans flex flex-col relative">
            <window.Navbar />

            <main className="flex-grow pt-32 pb-24 px-6 max-w-4xl mx-auto w-full space-y-16 relative z-10">
                <div className="text-center space-y-6">
                    <window.SectionEyebrow className="mb-2 mx-auto justify-center flex">Interview Prep Guide</window.SectionEyebrow>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight theme-text-primary">
                        Top 25 SQL Interview Questions (2026 Edition)
                    </h1>
                    <p className="text-lg theme-text-muted max-w-2xl mx-auto leading-relaxed">
                        A comprehensive guide to cracking the technical SQL round at top Indian analytics firms like Deloitte, TCS, and Fractal.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Q1 */}
                    <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                        <h2 className="text-2xl font-bold mb-4">1. The Difference Between RANK(), DENSE_RANK(), and ROW_NUMBER()</h2>
                        <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                            This is the most frequently asked question. `ROW_NUMBER()` assigns a unique sequential integer to rows. `RANK()` provides the same rank for ties but skips the next rank. `DENSE_RANK()` provides the same rank for ties and does not skip the next rank.
                        </p>
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                            <pre className="font-mono text-[13px] text-cyan-300">
{`SELECT name, salary, DENSE_RANK() OVER(ORDER BY salary DESC) as rnk FROM employees;`}
                            </pre>
                        </div>
                    </section>

                    {/* Q2 */}
                    <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                        <h2 className="text-2xl font-bold mb-4">2. Find the Second Highest Salary (Without LIMIT)</h2>
                        <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                            Interviewers want to see if you know how to use subqueries or window functions instead of just `ORDER BY DESC LIMIT 1 OFFSET 1`.
                        </p>
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                            <pre className="font-mono text-[13px] text-cyan-300">
{`SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);`}
                            </pre>
                        </div>
                    </section>

                    {/* Q3 */}
                    <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                        <h2 className="text-2xl font-bold mb-4">3. What is a CTE (Common Table Expression)?</h2>
                        <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                            A CTE provides a temporary result set that you can reference within another SELECT, INSERT, UPDATE, or DELETE statement. It drastically improves query readability and allows recursive queries.
                        </p>
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                            <pre className="font-mono text-[13px] text-cyan-300">
{`WITH DepartmentAvg AS (
    SELECT dept_id, AVG(salary) as avg_sal FROM employees GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal 
FROM employees e JOIN DepartmentAvg d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;`}
                            </pre>
                        </div>
                    </section>

                    {/* Q4 */}
                    <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                        <h2 className="text-2xl font-bold mb-4">4. How do you find duplicate records in a table?</h2>
                        <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                            You group by the columns that should be unique and use the `HAVING` clause to filter groups with a count greater than 1.
                        </p>
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                            <pre className="font-mono text-[13px] text-cyan-300">
{`SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;`}
                            </pre>
                        </div>
                    </section>
                    
                    {/* Q5 */}
                    <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                        <h2 className="text-2xl font-bold mb-4">5. Delete duplicate rows but keep the latest one</h2>
                        <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                            This is an advanced question that requires using a CTE with `ROW_NUMBER()` to assign a unique ID to duplicates, and then deleting where the row number is greater than 1.
                        </p>
                        <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                            <pre className="font-mono text-[13px] text-cyan-300">
{`WITH RankedDuplicates AS (
    SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY created_at DESC) as rn
    FROM users
)
DELETE FROM users WHERE id IN (
    SELECT id FROM RankedDuplicates WHERE rn > 1
);`}
                            </pre>
                        </div>
                    </section>

                    <window.GlobalCTABanner 
                        title="Ready for the other 18 Advanced Questions?"
                        subtitle="Stop memorizing answers. Build the actual intuition for advanced SQL, query optimization, and ETL pipelines in our 16-Week Live Masterclass."
                    />
                </div>
            </main>
            
            <window.Footer />
        </div>
    );
};

if (!window._reactRoot) {
    window._reactRoot = ReactDOM.createRoot(document.getElementById('root'));
}
window._reactRoot.render(<SqlInterviewQuestions />);
