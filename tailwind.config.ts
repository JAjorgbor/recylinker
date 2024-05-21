import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./scaffold/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          background: '#edf5f7',
          primary: {
            //... 50 to 900
            50: "#E8FAF0",
            100: "#D1F4E0",
            200: "#A2E9C1",
            300: "#A2E9C1",
            400: "#74DFA2",
            500: "#45D483",
            600: "#17C964",
            700: "#12A150",
            800: "#0E793C",
            900: "#095028",
            DEFAULT: "#87B237",
          },


          // ... rest of the colors
        },
      },
      dark: {
        colors: {
          background: '#040D12',
          primary: {
            //... 50 to 900
            50: "#E8FAF0",
            100: "#D1F4E0",
            200: "#A2E9C1",
            300: "#A2E9C1",
            400: "#74DFA2",
            500: "#45D483",
            600: "#17C964",
            700: "#12A150",
            800: "#0E793C",
            900: "#095028",
            DEFAULT: "#87B237",
          },


          // ... rest of the colors
        },
      },
    }

  })],

};
export default config;
