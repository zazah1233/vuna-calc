const js = require('@eslint/js');

module.exports = [
  // Ignore generated and dependency folders
  { ignores: ['dist/', 'coverage/', 'node_modules/'] },

  // Base recommended rules
  js.configs.recommended,

  // Rules for all .js files (CommonJS, browser + Node globals)
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        // Browser globals (needed by ui.js)
        window:          'readonly',
        document:        'readonly',
        console:         'readonly',
        setTimeout:      'readonly',
        clearTimeout:    'readonly',
        setInterval:     'readonly',
        clearInterval:   'readonly',
        alert:           'readonly',
        confirm:         'readonly',
        prompt:          'readonly',
        fetch:           'readonly',
        parseFloat:      'readonly',
        parseInt:        'readonly',
        isNaN:           'readonly',
        isFinite:        'readonly',
        Function:        'readonly',
        String:          'readonly',

        // Node / CommonJS globals (needed by calculator.js)
        module:          'writable',
        require:         'readonly',
        process:         'readonly',
        __dirname:       'readonly',
        __filename:      'readonly',

        // Calculator engine (used in ui.js without import)
        evaluateExpression: 'readonly',
        percentOf:          'readonly',

        // Jest globals (used in test files)
        describe:        'readonly',
        it:              'readonly',
        expect:          'readonly',
        beforeEach:      'readonly',
        afterEach:       'readonly',
        beforeAll:       'readonly',
        afterAll:        'readonly',
        test:            'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq':         'error',
      'semi':           ['error', 'always'],
    },
  },

  // Rules for ES Module files (build script)
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType:  'module',
      globals: {
        console: 'readonly',
      },
    },
  },
];
