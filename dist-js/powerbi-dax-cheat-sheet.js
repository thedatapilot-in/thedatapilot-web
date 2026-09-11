const PowerBIDaxCheatSheet = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen theme-bg theme-text-primary font-sans flex flex-col"
  }, /*#__PURE__*/React.createElement("header", {
    className: "border-b theme-border bg-white/5 backdrop-blur-md sticky top-0 z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/images/thedatapilot_logo.png",
    alt: "The Data Pilot",
    className: "w-8 h-8 rounded-full shadow-lg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"
  }, "The Data Pilot")), /*#__PURE__*/React.createElement("a", {
    href: "/#curriculum",
    className: "text-sm font-medium hover:text-indigo-400 transition-colors"
  }, "Master Power BI"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow max-w-4xl mx-auto w-full px-6 py-12 space-y-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-black tracking-tight"
  }, "Power BI DAX Formula Cheat Sheet"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg theme-text-muted"
  }, "The ultimate reference guide for Data Analysis Expressions (DAX) used in Power BI, Analysis Services, and Power Pivot. Master these 10 formulas to pass any technical round.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-12 animate-fade-in-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-black border-b-2 theme-border pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
  }, "Aggregation Functions"), /*#__PURE__*/React.createElement("section", {
    className: "theme-card p-6 rounded-2xl border theme-border space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "1. SUM vs SUMX"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "`SUM` simply adds up all the values in a single column. `SUMX` is an iterator function that evaluates an expression for every row in a table, and then sums the results. Use `SUMX` when you need row-by-row calculations (like Price * Quantity) before summing."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto"
  }, `-- Basic column sum
Total Quantity = SUM(Sales[Quantity])

-- Iterating row by row
Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])`))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-black border-b-2 theme-border pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
  }, "Filter Context Modifiers"), /*#__PURE__*/React.createElement("section", {
    className: "theme-card p-6 rounded-2xl border theme-border space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "2. CALCULATE"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "The most important function in DAX. It evaluates an expression in a context that is modified by the specified filters. If you don't understand `CALCULATE`, you don't understand DAX."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto"
  }, `Total Sales (USA) = 
CALCULATE(
    [Total Sales], 
    Geography[Country] = "USA"
)`)), /*#__PURE__*/React.createElement("section", {
    className: "theme-card p-6 rounded-2xl border theme-border space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "3. FILTER"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "Returns a table that represents a subset of another table or expression. Usually used inside `CALCULATE` when you need complex filtering logic (like measures or multiple columns) that simple boolean filters cannot handle."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto"
  }, `High Value Sales = 
CALCULATE(
    [Total Sales],
    FILTER(Sales, Sales[Revenue] > 10000)
)`)), /*#__PURE__*/React.createElement("section", {
    className: "theme-card p-6 rounded-2xl border theme-border space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "4. ALL & ALLEXCEPT"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "`ALL` removes all filters from a table or column. It's crucial for calculating percentages of a grand total. `ALLEXCEPT` removes all filters except for those on specified columns."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto"
  }, `-- Ignores all slices and filters on the Sales table
Grand Total Sales = CALCULATE([Total Sales], ALL(Sales))

-- Calculate % of Total
% of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Sales)))`))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-black border-b-2 theme-border pb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"
  }, "Time Intelligence"), /*#__PURE__*/React.createElement("section", {
    className: "theme-card p-6 rounded-2xl border theme-border space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "5. SAMEPERIODLASTYEAR"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "Essential for Year-over-Year (YoY) growth calculations. It requires a dedicated Date table marked as a Date Table in your model."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto"
  }, `Sales Last Year = 
CALCULATE(
    [Total Sales], 
    SAMEPERIODLASTYEAR('Date'[Date])
)`)), /*#__PURE__*/React.createElement("section", {
    className: "theme-card p-6 rounded-2xl border theme-border space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "6. TOTALYTD"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "Evaluates the year-to-date value of the expression in the current context. Also requires a Date table."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-yellow-300 overflow-x-auto"
  }, `YTD Sales = TOTALYTD([Total Sales], 'Date'[Date])`))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-3xl p-8 text-center space-y-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-black"
  }, "DAX is easy to learn, but hard to master."), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-lg"
  }, "Go beyond basic formulas. Learn advanced Star Schema Data Modeling, Evaluation Contexts, and Row-Level Security in our Augmented Data Analytics Masterclass."), /*#__PURE__*/React.createElement("a", {
    href: "/#curriculum",
    className: "inline-block py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
  }, "View The Data Pilot Curriculum")))), /*#__PURE__*/React.createElement("footer", {
    className: "py-8 text-center theme-text-muted text-sm border-t theme-border mt-auto"
  }, /*#__PURE__*/React.createElement("p", null, "© ", new Date().getFullYear(), " The Data Pilot. All rights reserved.")));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(PowerBIDaxCheatSheet, null));