const SqlInterviewQuestions = () => {
    return (
        <div className="min-h-screen theme-bg theme-text-primary font-sans flex flex-col">
            <header className="border-b theme-border bg-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3">
                        <img src="assets/images/thedatapilot_logo.png" alt="The Data Pilot" className="w-8 h-8 rounded-full shadow-lg" />
                        <span className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                            The Data Pilot
                        </span>
                    </a>
                    <a href="/#curriculum" className="text-sm font-medium hover:text-indigo-400 transition-colors">Master SQL in 16 Weeks</a>
                </div>
            </header>

            <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Top 25 SQL Interview Questions (2026 Edition)
                    </h1>
                    <p className="text-lg theme-text-muted">
                        A comprehensive guide to cracking the technical SQL round at top Indian analytics firms like Deloitte, TCS, and Fractal.
                    </p>
                </div>

                <div className="space-y-12 animate-fade-in-up">
                    
                    {/* Q1 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">1. The Difference Between RANK(), DENSE_RANK(), and ROW_NUMBER()</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            This is the most frequently asked question. `ROW_NUMBER()` assigns a unique sequential integer to rows. `RANK()` provides the same rank for ties but skips the next rank. `DENSE_RANK()` provides the same rank for ties and does not skip the next rank.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto">
                            SELECT name, salary, DENSE_RANK() OVER(ORDER BY salary DESC) as rnk FROM employees;
                        </pre>
                    </section>

                    {/* Q2 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">2. Find the Second Highest Salary (Without LIMIT)</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            Interviewers want to see if you know how to use subqueries or window functions instead of just `ORDER BY DESC LIMIT 1 OFFSET 1`.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto">
                            SELECT MAX(salary) FROM employees WHERE salary &lt; (SELECT MAX(salary) FROM employees);
                        </pre>
                    </section>

                    {/* Q3 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">3. What is a CTE (Common Table Expression)?</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            A CTE provides a temporary result set that you can reference within another SELECT, INSERT, UPDATE, or DELETE statement. It drastically improves query readability and allows recursive queries.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto">
{`WITH DepartmentAvg AS (
    SELECT dept_id, AVG(salary) as avg_sal FROM employees GROUP BY dept_id
)
SELECT e.name, e.salary, d.avg_sal 
FROM employees e JOIN DepartmentAvg d ON e.dept_id = d.dept_id
WHERE e.salary > d.avg_sal;`}
                        </pre>
                    </section>

                    {/* Q4 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">4. How do you find duplicate records in a table?</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            You group by the columns that should be unique and use the `HAVING` clause to filter groups with a count greater than 1.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto">
{`SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;`}
                        </pre>
                    </section>
                    
                    {/* Q5 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">5. Delete duplicate rows but keep the latest one</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            This is an advanced question that requires using a CTE with `ROW_NUMBER()` to assign a unique ID to duplicates, and then deleting where the row number is greater than 1.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto">
{`WITH RankedDuplicates AS (
    SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY created_at DESC) as rn
    FROM users
)
DELETE FROM users WHERE id IN (
    SELECT id FROM RankedDuplicates WHERE rn > 1
);`}
                        </pre>
                    </section>
                    
                    {/* Q6 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">6. Difference between WHERE and HAVING?</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            `WHERE` filters rows before any grouping or aggregations take place. `HAVING` filters the grouped result set after the `GROUP BY` clause is applied. You cannot use aggregate functions (like SUM or COUNT) in a WHERE clause.
                        </p>
                    </section>
                    
                    {/* Q7 */}
                    <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                        <h2 className="text-xl font-bold">7. LEFT JOIN vs INNER JOIN vs FULL OUTER JOIN</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            `INNER JOIN` returns only rows with a match in both tables. `LEFT JOIN` returns all rows from the left table, and matching rows from the right (filling with NULLs if no match). `FULL OUTER JOIN` returns all rows from both tables, filling with NULLs where there are no matches.
                        </p>
                    </section>

                    <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-3xl p-8 text-center space-y-6">
                        <h3 className="text-2xl font-black">Ready for the other 18 Advanced Questions?</h3>
                        <p className="theme-text-muted text-lg">
                            Stop memorizing answers. Build the actual intuition for advanced SQL, query optimization, and ETL pipelines in our 16-Week Live Masterclass.
                        </p>
                        <a href="/#curriculum" className="inline-block py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                            View The Data Pilot Curriculum
                        </a>
                    </div>
                </div>
            </main>
            
            <footer className="py-8 text-center theme-text-muted text-sm border-t theme-border mt-auto">
                <p>&copy; {new Date().getFullYear()} The Data Pilot. All rights reserved.</p>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SqlInterviewQuestions />);
