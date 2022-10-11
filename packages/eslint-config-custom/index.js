module.exports = {
  extends: ["next", "turbo", "prettier"],
  plugins: ["eslint-plugin-react-hooks"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "turbo/no-undeclared-env-vars": "off",
  },
};
