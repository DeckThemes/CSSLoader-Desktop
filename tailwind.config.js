/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        minusNav: "calc(100vh - 4rem)",
      },
      screens: {
        "2cols": "690px",
        "3cols": "1020px",
        "4cols": "1350px",
        "5cols": "1680px",
      },
      colors: {
        cssPurple: "#de2cf7",
        audioBlue: "rgb(26,159,255)",
        discordColor: "#5865F2",
        patreonColor: "#FF424D",
        // These are used to "transform" the card values to look like the bg values
        lightenerDark: "rgba(255,255,255,0.1)",
        lightenerLight: "rgba(255,255,255,0.3)",
        bgDark: "#2e2e2e",
        bgLight: "#e2e2e2",
        cardDark: "#0000004e",
        cardLight: "#0000002e",
        elevation: {
          1: {
            light: "#0000001e",
            dark: "#0000002e",
          },
          2: {
            light: "#0000002e",
            dark: "#0000004e",
          },
          3: {
            light: "#0000006e",
            dark: "#0000006e",
          },
        },
        borderDark: "#0e0e0e",
        borderLight: "#a2a2a2",
        darkBorderDark: "#020202",
        darkBorderLight: "rgb(140,140,140)",
        textLight: "#000",
        textFadedLight: "#333",
        textDark: "#fff",
        textFadedDark: "#aaa",
      },
    },
  },
  plugins: [],
};
