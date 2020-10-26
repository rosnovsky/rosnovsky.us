module.exports = {
  purge: ['./src/**/*.html', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    screens: {
      xs: { min: '200px', max: '639px' },
      sm: { min: '640px', max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px' }
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
