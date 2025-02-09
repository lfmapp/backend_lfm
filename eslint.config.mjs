// eslint.config.js
import eslintPluginSecurity from "eslint-plugin-security";

export default [
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      security: eslintPluginSecurity,
    },
    rules: {
      "security/detect-object-injection": "warn",
    },
  },
];
