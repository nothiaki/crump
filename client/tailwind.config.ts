import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    colors: {
      "prim-900": "#201C26",
      "prim-700": "#3B2F42",
      "prim-400": "#644B6C",
      "text-100": "#FBEED3",
      "success-400": "#5B9F66",
      "input-border": "#5E5765"
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
