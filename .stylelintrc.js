export default {
  extends: [
    "stylelint-config-html/vue",
    "stylelint-config-recommended-vue/scss",
    "stylelint-config-recommended-less",
    "stylelint-stylus/standard",
    "stylelint-config-rational-order",
  ],
  overrides: [
    {
      files: ["**/*.styl"],
      extends: ["stylelint-stylus/standard"],
      customSyntax: "postcss-styl",
      rules: { "stylus/indentation": 4 },
    },
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html",
      rules: {},
    },
  ],
  rules: {
    "unit-no-unknown": true,
    "declaration-property-value-no-unknown": true,
  },
};
