/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#FF8863",
          "primary-content": "#ffffff",
          secondary: "#DAE8FF",
          "secondary-content": "#212638",
          accent: "#93BBFB",
          "accent-content": "#212638",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#f4f8ff",
          "base-300": "#DAE8FF",
          "base-content": "#212638",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FFfFF3",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: "#8B0000", // Dark red
          "primary-content": "#F8F8FF", // Ghost white
          secondary: "#1C1C1C", // Dark gray
          "secondary-content": "#F8F8FF", // Ghost white
          accent: "#8B0000", // Dark red
          "accent-content": "#F8F8FF", // Ghost white
          neutral: "#F8F8FF", // Ghost white
          "neutral-content": "#8B0000", // Dark red
          "base-100": "#000000", // Black
          "base-200": "#1C1C1C", // Dark gray
          "base-300": "#2E2E2E", // Darker gray
          "base-content": "#F8F8FF", // Ghost white
          info: "#A9A9A9", // Dark gray
          success: "#006400", // Dark green
          warning: "#FF8C00", // Dark orange
          error: "#8B0000", // Dark red
          "--rounded-btn": "9999rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "oklch(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
