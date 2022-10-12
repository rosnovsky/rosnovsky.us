module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["eslint-plugin-react-hooks", "@typescript-eslint"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "turbo/no-undeclared-env-vars": "off",
    "prefer-const": ["warn", { destructuring: "all" }],
  },
};
