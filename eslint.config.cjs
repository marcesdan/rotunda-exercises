const eslint = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");

module.exports = {
  files: ["**/*.{js,ts}"],
  languageOptions: {
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    "@typescript-eslint": tseslint,
  },
  rules: {
    ...eslint.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    "no-undef": "off", // Allow global objects like console, process
    "no-console": "warn",
  },
  ignores: ["dist/**", "node_modules/**"],
};
