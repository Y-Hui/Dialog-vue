module.exports = {
  root: true,
  'settings': {
    "import/resolver": {
      "webpack": {
        "config": "node_modules/@vue/cli-service/webpack.config.js"
      }
    }
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    "global-require": 0,
    "semi": ["error", "never"],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "space-unary-ops": ["error", { "words": true, "nonwords": false }],

    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
