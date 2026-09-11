const PowerBIDaxCheatSheet = () => {
    return (
        <div className="min-h-screen theme-bg theme-text-primary font-sans flex flex-col relative">
            <window.Navbar />

            <main className="flex-grow pt-32 pb-24 px-6 max-w-4xl mx-auto w-full space-y-16 relative z-10">
                <div className="text-center space-y-6">
                    <window.SectionEyebrow className="mb-2 mx-auto justify-center flex">Masterclass Cheat Sheet</window.SectionEyebrow>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight theme-text-primary">
                        Power BI DAX Formula Cheat Sheet
                    </h1>
                    <p className="text-lg theme-text-muted max-w-2xl mx-auto leading-relaxed">
                        The ultimate reference guide for Data Analysis Expressions (DAX) used in Power BI, Analysis Services, and Power Pivot. Master these 10 formulas to pass any technical round.
                    </p>
                </div>

                <div className="space-y-16">
                    
                    {/* Aggregation */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black border-b-2 border-brand-500/20 pb-4 theme-text-primary">1. Aggregation Functions</h2>
                        
                        <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <h3 className="text-xl font-bold mb-4">SUM vs SUMX</h3>
                            <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                                `SUM` simply adds up all the values in a single column. `SUMX` is an iterator function that evaluates an expression for every row in a table, and then sums the results. Use `SUMX` when you need row-by-row calculations (like Price * Quantity) before summing.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                                <pre className="font-mono text-[13px] text-yellow-300">
{`-- Basic column sum
Total Quantity = SUM(Sales[Quantity])

-- Iterating row by row
Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])`}
                                </pre>
                            </div>
                        </section>
                    </div>

                    {/* Filter Context */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black border-b-2 border-brand-500/20 pb-4 theme-text-primary">2. Filter Context Modifiers</h2>
                        
                        <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <h3 className="text-xl font-bold mb-4">CALCULATE</h3>
                            <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                                The most important function in DAX. It evaluates an expression in a context that is modified by the specified filters. If you don't understand `CALCULATE`, you don't understand DAX.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                                <pre className="font-mono text-[13px] text-yellow-300">
{`Total Sales (USA) = 
CALCULATE(
    [Total Sales], 
    Geography[Country] = "USA"
)`}
                                </pre>
                            </div>
                        </section>

                        <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <h3 className="text-xl font-bold mb-4">FILTER</h3>
                            <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                                Returns a table that represents a subset of another table or expression. Usually used inside `CALCULATE` when you need complex filtering logic (like measures or multiple columns) that simple boolean filters cannot handle.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                                <pre className="font-mono text-[13px] text-yellow-300">
{`High Value Sales = 
CALCULATE(
    [Total Sales],
    FILTER(Sales, Sales[Revenue] > 10000)
)`}
                                </pre>
                            </div>
                        </section>

                        <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <h3 className="text-xl font-bold mb-4">ALL & ALLEXCEPT</h3>
                            <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                                `ALL` removes all filters from a table or column. It's crucial for calculating percentages of a grand total. `ALLEXCEPT` removes all filters except for those on specified columns.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                                <pre className="font-mono text-[13px] text-yellow-300">
{`-- Ignores all slices and filters on the Sales table
Grand Total Sales = CALCULATE([Total Sales], ALL(Sales))

-- Calculate % of Total
% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Sales)))`}
                                </pre>
                            </div>
                        </section>
                    </div>

                    {/* Time Intelligence */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black border-b-2 border-brand-500/20 pb-4 theme-text-primary">3. Time Intelligence</h2>
                        
                        <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <h3 className="text-xl font-bold mb-4">SAMEPERIODLASTYEAR</h3>
                            <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                                Essential for Year-over-Year (YoY) growth calculations. It requires a dedicated Date table marked as a Date Table in your model.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                                <pre className="font-mono text-[13px] text-yellow-300">
{`Sales Last Year = 
CALCULATE(
    [Total Sales], 
    SAMEPERIODLASTYEAR('Date'[Date])
)`}
                                </pre>
                            </div>
                        </section>

                        <section className="theme-card p-8 rounded-3xl border theme-border shadow-theme relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                            <h3 className="text-xl font-bold mb-4">TOTALYTD</h3>
                            <p className="theme-text-muted text-[15px] leading-relaxed mb-6">
                                Evaluates the year-to-date value of the expression in the current context. Also requires a Date table.
                            </p>
                            <div className="bg-[#0f172a] rounded-xl border border-slate-700/50 p-5 overflow-x-auto">
                                <pre className="font-mono text-[13px] text-yellow-300">
{`YTD Sales = TOTALYTD([Total Sales], 'Date'[Date])`}
                                </pre>
                            </div>
                        </section>
                    </div>

                    <window.GlobalCTABanner 
                        title="DAX is easy to learn, but hard to master."
                        subtitle="Go beyond basic formulas. Learn advanced Star Schema Data Modeling, Evaluation Contexts, and Row-Level Security in our Augmented Data Analytics Masterclass."
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
window._reactRoot.render(<PowerBIDaxCheatSheet />);
