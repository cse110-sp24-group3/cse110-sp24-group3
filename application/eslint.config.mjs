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
    ignores: [
      "./commitlint.config.js",
      "**/*.test.js", // Ignore all test files
      "dist/**/*", // Ignore all files in dist directories
      "./dist/**/*",
      "./output/", // Ignore all files in output directories
    ],
  },
  pluginJs.configs.recommended,
];
