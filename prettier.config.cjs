/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  trailingComma: "none",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  tailwindConfig: "./packages/tailwind",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@ark-market/(.*)$",
    "",
    "^arkmarket/(.*)$",
    "",
    "^@/types/(.*)$",
    "^@/lib/(.*)$",
    "^@/components/(.*)$",
    "",
    "^~/styles/(.*)$",
    "^~/(.*)$",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.4"
};

module.exports = config;
