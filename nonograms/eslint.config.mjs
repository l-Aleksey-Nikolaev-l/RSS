import globals from "globals";

export default [
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  {
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      "max-len": ["error", { "code": 80 }],
      "no-unused-vars": 1,
      "prefer-const": ["error", { "ignoreReadBeforeAssign": true }],
    }
  }
];