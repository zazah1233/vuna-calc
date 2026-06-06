const { evaluateExpression, percentOf } = require('../src/calculator');

describe('arithmetic', () => {
  it('adds',        () => expect(evaluateExpression('2+3')).toBe(5));
  it('subtracts',   () => expect(evaluateExpression('10-4')).toBe(6));
  it('multiplies',  () => expect(evaluateExpression('3*4')).toBe(12));
  it('divides',     () => expect(evaluateExpression('10/2')).toBe(5));
  it('precedence',  () => expect(evaluateExpression('2+3*4')).toBe(14));
  it('decimal',     () => expect(evaluateExpression('1.5+1.5')).toBe(3));
  it('throws on division by zero',
    () => expect(() => evaluateExpression('5/0')).toThrow());
  it('throws on invalid chars',
    () => expect(() => evaluateExpression('2&3')).toThrow());
  it('throws on empty expression',
    () => expect(() => evaluateExpression('')).toThrow());
});

describe('percentOf (custom feature)', () => {
  it('25 is 12.5% of 200',  () => expect(percentOf(25, 200)).toBe(12.5));
  it('50 is 50% of 100',    () => expect(percentOf(50, 100)).toBe(50));
  it('0 is 0% of anything', () => expect(percentOf(0, 500)).toBe(0));
  it('throws when total is zero',
    () => expect(() => percentOf(10, 0)).toThrow());
});
