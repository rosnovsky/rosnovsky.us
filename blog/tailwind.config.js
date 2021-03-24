module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    // fontFamily: {
    //   body: ['Space Grotesk', 'Helvetica', 'sans-serif'],
    //   heading: ['Inter', 'Roboto', 'Helvetica', 'sans-serif'],
    // },
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
    typography: {
      default: {
        css: {
          a: {
            color: 'rgba(1, 71, 55, 1)',
            fontWeight: 'bold',
            '&:hover': {
              color: 'rgba(14, 159, 110, 1)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography'),
  ],
}
