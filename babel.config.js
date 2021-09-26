module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  env: {
    test: {
      plugins: [
        ["@babel/plugin-transform-runtime"],
        ["@babel/plugin-proposal-private-methods", { loose: true }],
      ],
    },
  },
};
