// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009ad4',
          dark: '#007ba8',
          light: '#33afdc',
          50: '#e6f6fc',
          100: '#cceef8',
          200: '#99ddf1',
          300: '#66ccea',
          400: '#33bbea',
          500: '#009ad4',
          600: '#007ba8',
          700: '#005c7e',
          800: '#003e54',
          900: '#001f2a',
        },
        accent: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
        },
        dark: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'form': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}