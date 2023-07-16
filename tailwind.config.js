/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "1200px",
    },
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        light_bg: "hsl(180, 52%, 96%)",
        filter: "hsl(180, 31%, 95%)",
        dark_cyan: "hsl(180, 8%, 52%)",
        vdark_cyan: "hsl(180, 14%, 20%)",
      },
      backgroundImage: {
        "bg-dsk": "url('/images/bg-header-desktop.svg')",
        "bg-mob": "url('/images/bg-header-mobile.svg')",
      },
    },
  },
  plugins: [],
};
