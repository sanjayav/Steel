/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0C1117',
        card: '#161C23',
        divider: '#1F2933',
        primary: '#00D48E',
        secondary: '#4ED0FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'number': '0.1em',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(0, 212, 142, 0.3)',
        'glow-secondary': '0 0 20px rgba(78, 208, 255, 0.3)',
        'card-hover': '0 10px 40px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

