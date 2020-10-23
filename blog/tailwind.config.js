module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.jsx',
  ],
  theme: {
    typography: {
      default: {
        css: {
          a: {
            color: '#CF7D32',
            fontWeight: "bold",
            '&:hover': {
              color: '#a34604',
            },
          },
        },
      },
    },
  },
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/custom-forms'), require('@tailwindcss/typography')],
  future: {
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
    removeDeprecatedGapUtilities: true,
  },
}
