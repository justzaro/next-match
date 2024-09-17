import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: { 
        backgroundImage: {
          'dark-gradient': 'linear-gradient(to top, rgb(0,0,0,0.5), transparent)'
        }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
