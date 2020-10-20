module.exports = {
  purge: ['./src/**/*.js'],
  theme: {},
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/custom-forms')]
}
