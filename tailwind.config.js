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
        "2cols": "650px",
      },
      colors: {
        base: {
          1: {
            dark: "hsl(220, 11%, 5.5%)",
            light: "hsl(264, 6%, 98.5%)",
          },
          2: {
            dark: "hsla(220, 12%, 6%, 0.8)",
            light: "hsl(264, 7%, 100%)",
          },
          "2T": {
            dark: "hsla(220, 12%, 8%, 0.7)",
            light: "hsla(264, 100%, 100%, 0.7)",
          },
          "3T": {
            dark: "hsla(220, 9%, 60%, 0.1)",
            light: "hsla(264, 100%, 100%, 0.7)",
          },
          3: {
            dark: "hsl(220, 10%, 13%)",
            light: "hsl(264, 100%, 100%)",
          },
          4: {
            dark: "hsl(220, 11%, 15%)",
            light: "hsl(264, 1%, 88%)",
          },
          "4T": {
            dark: "hsla(220, 9%, 30%, 0.33)",
            light: "hsla(264, 20%, 10%, 0.12)",
          },
          5: {
            dark: "hsl(220, 11%, 12%)",
            light: "hsl(264, 3%, 90%)",
          },
          5.5: {
            dark: "#151619",
          },
          "5T": {
            dark: "hsla(220, 13%, 60%, 0.15)",
            light: "hsla(264, 15%, 10%, 0.09)",
          },
          6: {
            dark: "hsl(220, 13%, 4%)",
            light: "hsl(264, 3%, 95%)",
          },
          "6T": {
            dark: "hsla(220, 13%, 4%, 0.7)",
            light: "hsla(264, 10%, 14%, 0.05)",
          },
          contrast: {
            dark: "hsl(270, 3%, 75%)",
            light: "hsl(264, 6%, 17%)",
          },
        },
        fore: {
          11: {
            dark: "hsl(220, 3%, 95%)",
            light: "hsl(264, 6%, 8%)",
          },
          10: {
            dark: "hsl(220, 3%, 75%)",
            light: "hsl(264, 6%, 17%)",
          },
          9: {
            dark: "hsl(220, 3%, 69%)",
            light: "hsl(264, 6%, 30%)",
          },
          "9Hex": {
            dark: "#aeafb2",
            light: "#4c4851",
          },
          2: {
            dark: "hsla(220, 20%, 83%, 0.15)",
            light: "hsla(264, 24%, 10%, 0.08)",
          },
          3: {
            dark: "hsl(220, 3%, 20%)",
            light: "hsl(264, 3%, 86%)",
          },
          4: {
            dark: "hsl(220, 3%, 20%)",
            light: "hsl(264, 3%, 79%)",
          },
          "3T": {
            dark: "hsla(220, 20%, 83%, 0.19)",
            light: "hsla(264, 24%, 10%, 0.14)",
          },
          "4T": {
            dark: "hsla(220, 26%, 89%, 0.31)",
            light: "hsla(264, 28%, 10%, 0.26)",
          },
          "5T": {
            dark: "hsla(220, 26%, 89%, 0.31)",
            light: "hsla(264, 28%, 10%, 0.34)",
          },
          6: {
            dark: "hsl(220, 3%, 45%)",
            light: "hsl(264, 3%, 59%)",
          },
          5: {
            dark: "hsl(220, 3%, 45%)",
            light: "hsl(264, 3%, 69%)",
          },
          "6T": {
            dark: "hsla(220, 3%, 80%, 0.5)",
            light: "hsla(264, 3%, 17%, 0.5)",
          },
          8: {
            dark: "hsl(220, 3%, 55%)",
            light: "hsl(264, 3%, 42%)",
          },
          contrast: {
            dark: "hsl(220, 11%, 10%)",
            light: "hsl(115, 100%, 100%)",
          },
        },
        borders: {
          base1: {
            dark: "hsl(220, 9%, 14%)",
            light: "hsl(220, 9%, 84%)",
          },
          base2: {
            dark: "hsl(220, 9%, 20%)",
            light: "hsl(220, 9%, 65%)",
          },
          base3: {
            dark: "hsl(220, 9%, 28%)",
            light: "hsl(220, 9%, 90%)",
          },
        },
        shadows: {
          menuShadow: {
            dark: "0px 8px 25px hsla(220, 5%, 0%, 0.45)",
            light: "0px 8px 25px hsla(220, 5%, 0%, 0.45)",
          },
          modalShadow: {
            dark: "0px 16px 34px hsla(220, 4%, 0%, 0.65)",
            light: "0px 16px 34px hsla(220, 4%, 50%, 0.5)",
          },
          sidebarShadow: {
            dark: "0px 0px 30px hsl(220, 5%, 0%)",
            light: "0px 0px 30px hsl(220, 5%, 0%)",
          },
        },
        "app-neutralDrop": {
          dark: "hsla(220, 6%, 9%, 0.9)",
          light: "hsla(264, 3%, 92%, 0.9)",
        },
        "app-backdrop": {
          dark: "hsla(220, 5%, 6%, 0.4)",
          light: "hsla(264, 3%, 92%, 0.3)",
        },
        "app-backdropUmbra": {
          dark: "hsla(220, 7%, 4%, 0.85)",
          light: "hsla(264, 3%, 92%, 0.85)",
        },
        "app-backdropUmbraSolid": {
          dark: "hsl(229, 5%, 4%)",
          light: "hsla(264, 3%, 94%, 1)",
        },
        brandBlue: "#2563eb",
        dangerRed: "#EB3431",
        cssPurple: "#de2cf7",
        audioBlue: "rgb(26,159,255)",
        discordColor: "#5865F2",
        patreonColor: "#FF424D",
        // These are used to "transform" the card values to look like the bg values
        lightenerDark: "rgba(255,255,255,0.1)",
        lightenerLight: "rgba(255,255,255,0.3)",
        header: {
          dark: "hsl(220, 11%, 5.5%)",
          light: "",
        },
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
