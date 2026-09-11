const PowerBIDaxCheatSheet = () => {
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
                    <a href="/#curriculum" className="text-sm font-medium hover:text-indigo-400 transition-colors">Master Power BI</a>
                </div>
            </header>

            <main className="flex-grow max-w-4xl mx-auto w-full px-6 py-12 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Power BI DAX Formula Cheat Sheet
                    </h1>
                    <p className="text-lg theme-text-muted">
                        The ultimate reference guide for Data Analysis Expressions (DAX) used in Power BI, Analysis Services, and Power Pivot. Master these 10 formulas to pass any technical round.
                    </p>
                </div>

                <div className="space-y-12 animate-fade-in-up">
                    
                    {/* Aggregation */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black border-b-2 theme-border pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Aggregation Functions</h2>
                        
                        <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                            <h3 className="text-xl font-bold">1. SUM vs SUMX</h3>
                            <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                                `SUM` simply adds up all the values in a single column. `SUMX` is an iterator function that evaluates an expression for every row in a table, and then sums the results. Use `SUMX` when you need row-by-row calculations (like Price * Quantity) before summing.
                            </p>
                            <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
{`-- Basic column sum
Total Quantity = SUM(Sales[Quantity])

-- Iterating row by row
Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])`}
                            </pre>
                        </section>
                    </div>

                    {/* Filter Context */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black border-b-2 theme-border pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Filter Context Modifiers</h2>
                        
                        <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                            <h3 className="text-xl font-bold">2. CALCULATE</h3>
                            <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                                The most important function in DAX. It evaluates an expression in a context that is modified by the specified filters. If you don't understand `CALCULATE`, you don't understand DAX.
                            </p>
                            <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
{`Total Sales (USA) = 
CALCULATE(
    [Total Sales], 
    Geography[Country] = "USA"
)`}
                            </pre>
                        </section>

                        <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                            <h3 className="text-xl font-bold">3. FILTER</h3>
                            <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                                Returns a table that represents a subset of another table or expression. Usually used inside `CALCULATE` when you need complex filtering logic (like measures or multiple columns) that simple boolean filters cannot handle.
                            </p>
                            <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
{`High Value Sales = 
CALCULATE(
    [Total Sales],
    FILTER(Sales, Sales[Revenue] > 10000)
)`}
                            </pre>
                        </section>

                        <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                            <h3 className="text-xl font-bold">4. ALL & ALLEXCEPT</h3>
                            <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                                `ALL` removes all filters from a table or column. It's crucial for calculating percentages of a grand total. `ALLEXCEPT` removes all filters except for those on specified columns.
                            </p>
                            <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
{`-- Ignores all slices and filters on the Sales table
Grand Total Sales = CALCULATE([Total Sales], ALL(Sales))

-- Calculate % of Total
% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Sales)))`}
                            </pre>
                        </section>
                    </div>

                    {/* Time Intelligence */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black border-b-2 theme-border pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Time Intelligence</h2>
                        
                        <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                            <h3 className="text-xl font-bold">5. SAMEPERIODLASTYEAR</h3>
                            <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                                Essential for Year-over-Year (YoY) growth calculations. It requires a dedicated Date table marked as a Date Table in your model.
                            </p>
                            <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
{`Sales Last Year = 
CALCULATE(
    [Total Sales], 
    SAMEPERIODLASTYEAR('Date'[Date])
)`}
                            </pre>
                        </section>

                        <section className="theme-card p-6 rounded-2xl border theme-border space-y-4">
                            <h3 className="text-xl font-bold">6. TOTALYTD</h3>
                            <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                                Evaluates the year-to-date value of the expression in the current context. Also requires a Date table.
                            </p>
                            <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
{`YTD Sales = TOTALYTD([Total Sales], 'Date'[Date])`}
                            </pre>
                        </section>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-3xl p-8 text-center space-y-6">
                        <h3 className="text-2xl font-black">DAX is easy to learn, but hard to master.</h3>
                        <p className="theme-text-muted text-lg">
                            Go beyond basic formulas. Learn advanced Star Schema Data Modeling, Evaluation Contexts, and Row-Level Security in our Augmented Data Analytics Masterclass.
                        </p>
                        <a href="/#curriculum" className="inline-block py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
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
root.render(<PowerBIDaxCheatSheet />);
