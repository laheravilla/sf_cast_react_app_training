/**
 * Eslint is a library that detects code standards violations in JS!
 * Here are the coding standards to be followed in this project
 *
 * Tell Eslint where's code to be checked: "./node_modules/.bin/eslint assets/"
 */
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        "no-console": 0,
        "no-unused-vars": 0
    }
};