module.exports = {
  plugins: [
    'tailwindcss',
    `autoprefixer`,
    process.env.NODE_ENV === `production`
      ? [
          `cssnano`,
          {
            preset: `default`
          }
        ]
      : null,
    [
      'postcss-preset-env',
      {
        stage: 3,
        features: {
          'color-mod-function': { unresolved: 'warn' },
          'nesting-rules': true,
          'custom-media-queries': {
            preserve: false
          },
          'custom-properties': {
            preserve: false
          }
        }
      }
    ]
  ]
}
