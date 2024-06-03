import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        api: "readonly",
        selectedJournal: "writable",
      },
    },
    ignores: ["./commitlint.config.js"],
  },
  pluginJs.configs.recommended,
];
