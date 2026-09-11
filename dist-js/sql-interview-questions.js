const SqlInterviewQuestions = () => {
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
    className: "flex-grow max-w-3xl mx-auto w-full px-6 py-12 space-y-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl md:text-5xl font-black tracking-tight"
  }, "Top 25 SQL Interview Questions at Deloitte India (2026 Edition)"), /*#__PURE__*/React.createElement("p", {
    className: "text-lg theme-text-muted"
  }, "A comprehensive guide to cracking the technical SQL round at top Indian analytics firms.")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-12 animate-fade-in-up"
  }, /*#__PURE__*/React.createElement("section", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold border-b theme-border pb-2"
  }, "1. The Difference Between RANK(), DENSE_RANK(), and ROW_NUMBER()"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "This is the most frequently asked question. `ROW_NUMBER()` assigns a unique sequential integer to rows. `RANK()` provides the same rank for ties but skips the next rank. `DENSE_RANK()` provides the same rank for ties and does not skip the next rank."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto"
  }, "SELECT name, salary, DENSE_RANK() OVER(ORDER BY salary DESC) as rnk FROM employees;")), /*#__PURE__*/React.createElement("section", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold border-b theme-border pb-2"
  }, "2. Find the Second Highest Salary (Without LIMIT)"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "Interviewers want to see if you know how to use subqueries or window functions instead of just `ORDER BY DESC LIMIT 1 OFFSET 1`."), /*#__PURE__*/React.createElement("pre", {
    className: "bg-black/30 p-4 rounded-xl border theme-border font-mono text-sm text-cyan-300 overflow-x-auto"
  }, "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);")), /*#__PURE__*/React.createElement("section", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold border-b theme-border pb-2"
  }, "3. What is a CTE (Common Table Expression)?"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-sm md:text-base leading-relaxed"
  }, "A CTE provides a temporary result set that you can reference within another SELECT, INSERT, UPDATE, or DELETE statement. It drastically improves query readability.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border border-indigo-500/30 rounded-3xl p-8 text-center space-y-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-black"
  }, "Want to master all 25 questions?"), /*#__PURE__*/React.createElement("p", {
    className: "theme-text-muted text-lg"
  }, "Stop memorizing answers. Build the actual intuition for advanced SQL, query optimization, and ETL pipelines in our 16-Week Live Masterclass."), /*#__PURE__*/React.createElement("a", {
    href: "/#curriculum",
    className: "inline-block py-4 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all"
  }, "View The Data Pilot Curriculum")))), /*#__PURE__*/React.createElement("footer", {
    className: "py-8 text-center theme-text-muted text-sm border-t theme-border mt-auto"
  }, /*#__PURE__*/React.createElement("p", null, "© ", new Date().getFullYear(), " The Data Pilot. All rights reserved.")));
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(SqlInterviewQuestions, null));