module.exports = {
  parser: '@typescript-eslint/parser',  // Add this line to use the TypeScript parser
  parserOptions: {
    ecmaVersion: 2021, // or "latest"
    sourceType: 'module', // For ES module support
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Add this for TypeScript rules
  ],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'no-undef': ['error', { 'typeof': true }],
    "@typescript-eslint/no-var-requires": "off",
  }
};
