import type { Config } from "tailwindcss";
import twColors from 'tailwindcss/colors'


const colors = {
  transparent: twColors.transparent,
  black: '#2e3239',
  gray: '#cdcdcd',
  white: twColors.white,
  primary: '#0281ff',
  secondary: '#161D25',
  'bg-color': '#F2F2F5',
  aqua: '#268697',
  red: twColors.red[400]
}


const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
