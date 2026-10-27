import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "storybook-static", "node_modules", "playwright-report"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: { import: importPlugin },
    settings: {},
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/features",
              from: "./src/features",
              except: ["./"],
              message: "Features must not import other features.",
            },
            {
              target: "./src/ui",
              from: "./src/features",
              message: "UI must not import features.",
            },
            {
              target: "./src/core",
              from: "./src/features",
              message: "Core must not import features.",
            },
          ],
        },
      ],
    },
  },
  // 🔹 القاعدة الجديدة لمنع استيراد الـ API Client المباشر
  {
    files: ["src/features/**/*", "src/ui/**/*"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@elwarsha/api-client",
              message:
                "Do not import @elwarsha/api-client directly in UI or Features. Use @entities or @core/api instead.",
            },
          ],
          patterns: [
            {
              group: ["@elwarsha/api-client*"],
              message:
                "Do not import @elwarsha/api-client directly in UI or Features. Use @entities or @core/api instead.",
            },
          ],
        },
      ],
    },
  }
);