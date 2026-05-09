/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
        dark: {
          bg: '#0a0a0a',
          surface: '#121212',
          card: '#181818',
          hover: '#282828',
          border: '#2a2a2a',
        },
        // Gradient accent colors (purple/blue/green)
        accent: {
          purple: '#8b5cf6',
          blue: '#3b82f6',
          green: '#10b981',
          'purple-dark': '#6d28d9',
          'blue-dark': '#2563eb',
          'green-dark': '#059669',
        },
        // Primary action color (green)
        primary: {
          DEFAULT: '#10b981',
          hover: '#059669',
          dark: '#047857',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-purple-blue': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        'gradient-blue-green': 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
        'gradient-purple-green': 'linear-gradient(135deg, #8b5cf6 0%, #10b981 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

