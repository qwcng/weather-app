/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Kolory badge'y
    "bg-red-500/20", "text-red-200", "border-red-500/30", "text-red-300",
    "bg-orange-500/20", "text-orange-200", "border-orange-500/30", "text-orange-300",
    "bg-amber-500/20", "text-amber-200", "border-amber-500/30", "text-amber-300",
    "bg-yellow-500/20", "text-yellow-200", "border-yellow-500/30", "text-yellow-300",
    "bg-indigo-500/20", "text-indigo-200", "border-indigo-500/30", "text-indigo-300",
    "bg-blue-500/20", "text-blue-200", "border-blue-500/30", "text-blue-300",
    "bg-green-500/20", "text-green-200", "border-green-500/30", "text-green-300",
    "bg-purple-500/20", "text-purple-200", "border-purple-500/30", "text-purple-300",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};