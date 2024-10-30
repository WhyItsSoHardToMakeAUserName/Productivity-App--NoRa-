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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'l-white-100':'#f2f2f2',
        'l-black':'#252422',
        'l-white-200':'#e5e6e4',
        'l-white-300':'#d9d9d9',


        'd-bg':'',
      },
    },
  },
  plugins: [],
};
export default config;
