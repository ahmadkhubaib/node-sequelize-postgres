module.exports = {
  extends: "airbnb-base",
  rules: {
    "no-console": 0,
    "no-param-reassign": [2, { props: false }],
    "prefer-destructuring": 0,
    treatUndefinedAsUnspecified: 2,
    "arrow-body-style": 0,
    "comma-dangle": 0,
    indent: ["error", 4]
  },
  env: {
    commonjs: true,
    node: true,
    mocha: true
  }
};
