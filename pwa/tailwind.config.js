module.exports = {
  presets: [
    require('frappe-ui/src/utils/tailwind.config')
  ],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        keyframes: {
          'slide-in-right': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          'fade-out': {
            '0%': { opacity: 1 },
            '100%': { opacity: 0 },
          },
        },
        animation: {
          'slide-in-right': 'slide-in-right 0.5s ease-out',
          'fade-out': 'fade-out 0.5s ease-out forwards 1s',
        },
      },
    },
  plugins: [],
}
