/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 0%" },
        },
        spin: {
          from: { transform: "rotateY(0deg)" },
          to: { transform: "rotateY(360deg)" },
        },
        spinrevert: {
          from: { transform: "rotateY(360deg)" },
          to: { transform: "rotateY(0deg)" },
        },
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        spin: "spin linear infinite",
        spinrevert: "spinrevert linear infinite",
        shine: "shine 5s linear infinite",
      },
      transformStyle: {
        "preserve-3d": "preserve-3d",
      },
      rotate: {
        "x-90": "rotateX(90deg)",
      },
    },
  },
  plugins: [],
};
