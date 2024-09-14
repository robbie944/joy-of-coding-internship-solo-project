module.exports = {
  extends: ['@redwoodjs/eslint-config'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
    ecmaVersion: 2021, // Use the latest ECMAScript features
    sourceType: 'module', // Allow use of imports
  },
  rules: {
    'react/prop-types': 'off', // Example rule customization
  },
  env: {
    browser: true, // Define browser global variables
    node: true, // Define Node.js global variables
  },
};
