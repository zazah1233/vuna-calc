/**
 * VUNA-Calc — UI / DOM Wiring
 * Calls functions from calculator.js (loaded before this file).
 * No pure logic here — only event handlers and display updates.
 */

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────────────
  var expression = '';
  var justEvaluated = false;
  var errorTimeout;

  // ── DOM refs ───────────────────────────────────────────────────────────────
  var display = document.getElementById('display');
  var exprLine = document.getElementById('expr-line');
  var percentPart = document.getElementById('pct-part');
  var percentTotal = document.getElementById('pct-total');
  var percentResult = document.getElementById('pct-result');

  // ── Display helpers ────────────────────────────────────────────────────────
  function setDisplay(val) {
    display.textContent = val;
    display.classList.remove('error');
  }

  function showError(msg) {
    display.textContent = msg;
    display.classList.add('error');
    expression = '';
    justEvaluated = false;
  }

  function updateExprLine(val) {
    exprLine.textContent = val;
  }

  // ── Button handlers ────────────────────────────────────────────────────────
  function handleDigit(d) {
    if (justEvaluated) {
      expression = '';
      justEvaluated = false;
    }
    expression += d;
    setDisplay(expression);
    updateExprLine('');
  }

  function handleOperator(op) {
    if (justEvaluated) justEvaluated = false;
    if (expression === '' && op === '-') {
      expression = '-';
    } else if (expression !== '') {
      expression += op;
    }
    setDisplay(expression);
    updateExprLine('');
  }

  function handleDecimal() {
    if (justEvaluated) {
      expression = '0';
      justEvaluated = false;
    }
    // Prevent double decimal in the last number token
    var parts = expression.split(/[+\-*/]/);
    var last = parts[parts.length - 1];
    if (last.indexOf('.') === -1) {
      expression += expression === '' ? '0.' : '.';
      setDisplay(expression);
    }
  }

  function handleEquals() {
    if (expression === '') return;
    try {
      var result = evaluateExpression(expression);
      updateExprLine(expression + ' =');
      expression = String(result);
      setDisplay(expression);
      justEvaluated = true;
    } catch (err) { // eslint-disable-line no-unused-vars
      showError('Error');
    }
  }

  function handleAC() {
    expression = '';
    justEvaluated = false;
    setDisplay('0');
    updateExprLine('');
  }

  function handleCE() {
    if (expression.length > 0) {
      expression = expression.slice(0, -1);
    }
    setDisplay(expression === '' ? '0' : expression);
  }

  // ── Button click routing ───────────────────────────────────────────────────
  document.getElementById('buttons').addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;

    var val = btn.dataset.val;
    var action = btn.dataset.action;

    if (val !== undefined) {
      if (/^[0-9]$/.test(val)) {
        handleDigit(val);
      } else if (val === '.') {
        handleDecimal();
      } else {
        handleOperator(val);
      }
    } else if (action) {
      if (action === 'equals') handleEquals();
      else if (action === 'ac') handleAC();
      else if (action === 'ce') handleCE();
    }
  });

  // ── Keyboard support ───────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (/^[0-9]$/.test(e.key)) handleDigit(e.key);
    else if (['+', '-', '*', '/'].indexOf(e.key) !== -1) handleOperator(e.key);
    else if (e.key === '.') handleDecimal();
    else if (e.key === 'Enter' || e.key === '=') handleEquals();
    else if (e.key === 'Backspace') handleCE();
    else if (e.key === 'Escape') handleAC();
  });

  // ── Custom Feature: % of calculator ───────────────────────────────────────
  document.getElementById('pct-calc-btn').addEventListener('click', function () {
    clearTimeout(errorTimeout);
    var part = parseFloat(percentPart.value);
    var total = parseFloat(percentTotal.value);

    if (isNaN(part) || isNaN(total)) {
      percentResult.textContent = 'Enter both numbers';
      return;
    }

    try {
      var pct = percentOf(part, total);
      percentResult.textContent = part + ' is ' + pct.toFixed(4).replace(/\.?0+$/, '') + '% of ' + total;
    } catch (err) { // eslint-disable-line no-unused-vars
      percentResult.textContent = 'Total cannot be zero';
    }
  });

})();
