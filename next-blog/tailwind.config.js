module.exports = {
  purge: ['./pages/**/*.tsx'],
  theme: {
    extend: {}
  },
  variants: {},
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
