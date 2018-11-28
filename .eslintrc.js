module.exports = {
  "extends": "google",
  "parserOptions": {
    "ecmaVersion": 6
  },
  rules: {
    'max-len': ["error", { "code": 120 }],
    "indent": ["error", 2],
    "object-curly-spacing": [1, "always"],
  }
};
