const fs = require('fs');
const babel = require('@babel/core');
const code = fs.readFileSync('landing-page.js', 'utf-8');
try {
  babel.parse(code, { presets: ['@babel/preset-react'] });
  console.log("No syntax errors!");
} catch (e) {
  console.error("Syntax Error:", e);
}
