/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return `rgb(var(${variableName}) / <alpha-value>)`;
}

module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: withOpacity("--ink-900"),
          50: withOpacity("--ink-50"),
          100: withOpacity("--ink-100"),
          200: withOpacity("--ink-200"),
          300: withOpacity("--ink-300"),
          400: withOpacity("--ink-400"),
          500: withOpacity("--ink-500"),
          600: withOpacity("--ink-600"),
          700: withOpacity("--ink-700"),
          800: withOpacity("--ink-800"),
          900: withOpacity("--ink-900"),
          950: withOpacity("--ink-950"),
        },
        signal: {
          DEFAULT: withOpacity("--signal-500"),
          50: withOpacity("--signal-50"),
          100: withOpacity("--signal-100"),
          200: withOpacity("--signal-200"),
          300: withOpacity("--signal-300"),
          400: withOpacity("--signal-400"),
          500: withOpacity("--signal-500"),
          600: withOpacity("--signal-600"),
          700: withOpacity("--signal-700"),
        },
        wire: {
          DEFAULT: withOpacity("--wire-400"),
          400: withOpacity("--wire-400"),
          500: withOpacity("--wire-500"),
          600: withOpacity("--wire-600"),
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgb(var(--grid-line) / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid-line) / 0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        blueprint: "48px 48px",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgb(var(--ink-100) / 0.06) inset",
        glow: "0 0 0 1px rgba(245, 166, 35, 0.4), 0 0 24px 0 rgba(245, 166, 35, 0.15)",
      },
      transitionTimingFunction: {
        signal: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
