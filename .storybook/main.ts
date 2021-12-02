import path from 'path'

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-typescript"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  "aliases": {
    "@components": path.resolve(__dirname, "../components"),
    "@pages": path.resolve(__dirname, "../pages"),
    "@lib": path.resolve(__dirname, "../lib"),
  }
}
