module.exports = {
  content: ["src/pages/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
