import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,tsx}"],
  theme: {
    colors: {
      "prim-900": "#201C26",
      "text-100": "#FBEED3"
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
