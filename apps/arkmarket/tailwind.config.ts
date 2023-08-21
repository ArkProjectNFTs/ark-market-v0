/** @type {import('tailwindcss').Config} */

import baseConfig from "@ark-project/tailwind-config";
module.exports = {
  darkMode: "class",
  presets: [baseConfig],
  content: [
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
	],
}