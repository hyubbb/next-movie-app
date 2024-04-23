import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    pluginJs.configs.recommended,
    ...tslint.configs.recommended,
    pluginReactConfig,
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "warn",
    "react/no-find-dom-node": "off",
  },
  globals: globals.browser, // 'globals' 설정 추가
};
