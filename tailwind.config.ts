import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        card: "#121212",
        primary: "#8b5cf6",
        success: "#10b981",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".glass": {
          "backdrop-filter": "blur(24px)",
          "background-color": "rgba(255, 255, 255, 0.05)",
          "border": "1px solid rgba(255, 255, 255, 0.1)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
