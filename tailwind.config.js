module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        manocska: "var(--color-manocska)",
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      fontSize: {
        xxs: ".6em",
      },
    },
    fontFamily: {
      display: ["Montserrat"],
      body: ["Montserrat"],
      mono: ["Source Code Pro", "SFMono-Regular"],
    },
  },
  variants: {
    extend: {
      fill: ["hover"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
