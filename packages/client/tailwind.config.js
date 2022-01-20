module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      primary: {
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
      },
      secondary: {
        DEFAULT: "var(--color-secondary)",
        "washed-out": "var(--color-secondary-washed-out)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        hover: "var(--color-accent-hover)",
        disabled: "var(--color-accent-disabled)",
      },
      'danger': "var(--color-danger)",
      'success': "var(--color-success)",
      'warning': "var(--color-warning)",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
