// .eslintrc.js
module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
  },
};