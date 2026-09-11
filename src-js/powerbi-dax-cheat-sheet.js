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

            <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Power BI DAX Formula Cheat Sheet
                    </h1>
                    <p className="text-lg theme-text-muted">
                        The ultimate reference guide for Data Analysis Expressions (DAX) used in Power BI, Analysis Services, and Power Pivot.
                    </p>
                </div>

                <div className="space-y-12 animate-fade-in-up">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold border-b theme-border pb-2">1. The Most Important Function: CALCULATE</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            `CALCULATE` evaluates an expression in a modified filter context. It is the only DAX function that can modify filter context.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
                            Total Sales (USA) = CALCULATE([Total Sales], Geography[Country] = "USA")
                        </pre>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold border-b theme-border pb-2">2. Time Intelligence: SAMEPERIODLASTYEAR</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            Essential for Year-over-Year (YoY) growth calculations. It requires a dedicated Date table marked as a Date Table.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
                            Sales Last Year = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))
                        </pre>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold border-b theme-border pb-2">3. Iterators: SUMX</h2>
                        <p className="theme-text-muted text-sm md:text-base leading-relaxed">
                            Iterator functions (ending in X) step through a table row-by-row to evaluate an expression, and then aggregate the results.
                        </p>
                        <pre className="bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto">
                            Total Margin = SUMX(Sales, Sales[Quantity] * (Sales[UnitPrice] - Sales[UnitCost]))
                        </pre>
                    </section>

                    <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-3xl p-8 text-center space-y-6">
                        <h3 className="text-2xl font-black">DAX is easy to learn, but hard to master.</h3>
                        <p className="theme-text-muted text-lg">
                            Go beyond basic formulas. Learn advanced Data Modeling, Evaluation Contexts, and Row-Level Security in our Augmented Data Analytics Masterclass.
                        </p>
                        <a href="/#curriculum" className="inline-block py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all">
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
