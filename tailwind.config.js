/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['var(--font-rubik)'],
        quicksand: ['var(--font-quicksand)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        eyeblink: {
          '0%, 100%': { clipPath: 'ellipse(45% 45% at 50% 50%)' },
          '90%': { clipPath: 'ellipse(45% 45% at 50% 50%)' },
          '95%': { clipPath: 'ellipse(45% 0% at 50% 50%)' }
        }
      },
      animation: {
        eyeblink: 'eyeblink 20s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'circle': 'cubic-bezier(0, .5, .5, 1)'
      }
    },
  },
  plugins: [],
}
