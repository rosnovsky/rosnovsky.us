module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    screens: {
      xs: { min: '200px', max: '639px' },
      sm: { min: '640px', max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px' }
    },
    // fontSize: {
    //   '5xl': '2.5rem',
    //   '6xl': '2.75rem',
    //   '7xl': '4.5rem',
    //   '8xl': '6.25rem'
    // },
    boxShadow: {
      small: '0 5px 10px rgba(0, 0, 0, 0.12)',
      medium: '0 8px 30px rgba(0, 0, 0, 0.12)'
    },
    typography: {
      default: {
        css: {
          a: {
            color: '#CF7D32',
            fontWeight: 'bold',
            '&:hover': {
              color: '#a34604'
            }
          }
        }
      }
    }
  },
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography')
  ],
  future: {
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true
  }
}
