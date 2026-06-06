/**
 * VUNA-Calc — Pure Logic Engine
 * No DOM references here. This file is imported by Jest for testing
 * and loaded in the browser before ui.js.
 */

/**
 * Evaluates a simple arithmetic expression string.
 * Allowed characters: digits, decimal point, +, -, *, /
 * Throws on division by zero or invalid characters.
 * @param {string} expr
 * @returns {number}
 */
function evaluateExpression(expr) {
  if (typeof expr !== 'string' || expr.trim() === '') {
    throw new Error('Empty expression');
  }

  // Allow only safe characters
  if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
    throw new Error('Invalid characters in expression');
  }

  // Check for division by zero before eval
  if (/\/\s*0(\D|$)/.test(expr)) {
    throw new Error('Division by zero');
  }

  const result = Function('"use strict"; return (' + expr + ')')();

  if (!isFinite(result)) {
    throw new Error('Division by zero');
  }

  return result;
}

/**
 * Custom feature: percentage calculator.
 * Returns what percentage `part` is of `total`.
 * e.g. percentOf(25, 200) => 12.5  (25 is 12.5% of 200)
 * @param {number} part
 * @param {number} total
 * @returns {number}
 */
function percentOf(part, total) {
  if (total === 0) {
    throw new Error('Total cannot be zero');
  }
  return (part / total) * 100;
}

// Export for Jest (CommonJS environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateExpression, percentOf };
}
