const {
  useState,
  useEffect,
  useRef
} = React;
const SQL_MAPPINGS = [{
  prompt: "Find the top 3 highest paid employees in each department",
  sql: `WITH RankedEmployees AS (
    SELECT 
        employee_id, 
        first_name, 
        last_name, 
        department_id, 
        salary,
        DENSE_RANK() OVER(PARTITION BY department_id ORDER BY salary DESC) as rank
    FROM employees
)
SELECT * 
FROM RankedEmployees 
WHERE rank <= 3;`,
  explanation: "Uses a Common Table Expression (CTE) and the DENSE_RANK() window function to rank salaries within each department partition."
}, {
  prompt: "Show the month over month revenue growth percentage",
  sql: `WITH MonthlyRevenue AS (
    SELECT 
        DATE_TRUNC('month', order_date) as month,
        SUM(revenue) as total_revenue
    FROM sales
    GROUP BY 1
)
SELECT 
    month,
    total_revenue,
    LAG(total_revenue) OVER(ORDER BY month) as prev_month_revenue,
    ROUND(((total_revenue - LAG(total_revenue) OVER(ORDER BY month)) / LAG(total_revenue) OVER(ORDER BY month)) * 100, 2) as growth_pct
FROM MonthlyRevenue;`,
  explanation: "Uses the LAG() window function to access the previous month's revenue to calculate the MoM growth percentage."
}, {
  prompt: "Find customers who ordered in 2023 but not in 2024",
  sql: `SELECT DISTINCT customer_id
FROM orders
WHERE EXTRACT(YEAR FROM order_date) = 2023
  AND customer_id NOT IN (
      SELECT customer_id 
      FROM orders 
      WHERE EXTRACT(YEAR FROM order_date) = 2024
  );`,
  explanation: "Uses a subquery with NOT IN to filter out customers who have an order in the year 2024."
}, {
  prompt: "Get the running total of sales per day",
  sql: `SELECT 
    order_date,
    SUM(daily_sales) as daily_sales,
    SUM(SUM(daily_sales)) OVER(ORDER BY order_date) as running_total
FROM sales
GROUP BY order_date
ORDER BY order_date;`,
  explanation: "Uses the SUM() window function ordered by date to create a cumulative running total."
}];
const SqlGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [showOptions, setShowOptions] = useState(true);
  const handleGenerate = text => {
    const queryText = text || inputText;
    if (!queryText.trim()) return;
    setIsGenerating(true);
    setResult(null);
    setInputText(queryText);
    setShowOptions(false);

    // Find the closest match or default to a complex looking one
    const match = SQL_MAPPINGS.find(m => m.prompt.toLowerCase() === queryText.toLowerCase()) || SQL_MAPPINGS[0];
    setTimeout(() => {
      setResult(match);
      setIsGenerating(false);
    }, 1500);
  };
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
  }, "Master SQL in 16 Weeks"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-grow max-w-4xl mx-auto w-full px-6 py-12 flex flex-col gap-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-black tracking-tight"
  }, "Plain English to ", /*#__PURE__*/React.createElement("span", {
    className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400"
  }, "Advanced SQL")), /*#__PURE__*/React.createElement("p", {
    className: "text-lg theme-text-muted max-w-2xl mx-auto"
  }, "Describe what data you want in plain English, and our tool will generate the optimized SQL syntax instantly.")), /*#__PURE__*/React.createElement("div", {
    className: "theme-card p-6 md:p-8 rounded-3xl shadow-2xl border theme-border space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "w-full h-32 p-4 rounded-xl border theme-border bg-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-lg resize-y",
    placeholder: "E.g., Find the top 3 highest paid employees in each department...",
    value: inputText,
    onChange: e => {
      setInputText(e.target.value);
      if (e.target.value === '') setShowOptions(true);
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleGenerate(inputText),
    disabled: !inputText.trim() || isGenerating,
    className: "absolute bottom-4 right-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  }, "Generate SQL")), showOptions && !isGenerating && !result && /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t theme-border"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm theme-text-muted mb-3 font-semibold uppercase tracking-wider"
  }, "Try these examples:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, SQL_MAPPINGS.map((mapping, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => handleGenerate(mapping.prompt),
    className: "text-xs bg-black/20 border theme-border hover:border-cyan-500/50 px-3 py-2 rounded-lg transition-colors text-left flex-1 min-w-[200px]"
  }, "\"", mapping.prompt, "\""))))), isGenerating && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center py-12 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-mono text-sm text-cyan-400 animate-pulse"
  }, "Parsing natural language to syntax tree...")), result && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 animate-fade-in-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "theme-card rounded-2xl border theme-border overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-black/40 border-b theme-border px-4 py-2 flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-xs text-green-400"
  }, "Query Generated Successfully"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs theme-text-muted hover:text-white transition-colors flex items-center gap-1",
    onClick: () => {
      navigator.clipboard.writeText(result.sql);
      alert("SQL copied to clipboard!");
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-4 h-4",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
  })), "Copy Code")), /*#__PURE__*/React.createElement("pre", {
    className: "p-6 overflow-x-auto"
  }, /*#__PURE__*/React.createElement("code", {
    className: "font-mono text-sm text-blue-200"
  }, result.sql))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold mb-1 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-5 h-5 text-blue-400",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  })), "AI Explanation:"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm"
  }, result.explanation)), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-6 text-center space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold"
  }, "Relying on AI for SQL is dangerous in interviews."), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm max-w-lg mx-auto"
  }, "Top tier companies (Amazon, Deloitte) test you on live whiteboards without AI. Learn to write advanced Window Functions and CTEs from scratch in our Live Analytics Masterclass."), /*#__PURE__*/React.createElement("a", {
    href: "/#curriculum",
    className: "inline-block py-3 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all text-sm"
  }, "Explore the 16-Week Curriculum")))), /*#__PURE__*/React.createElement("footer", {
    className: "py-8 text-center theme-text-muted text-sm border-t theme-border mt-auto"
  }, /*#__PURE__*/React.createElement("p", null, "© ", new Date().getFullYear(), " The Data Pilot. All rights reserved.")));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(SqlGenerator, null));