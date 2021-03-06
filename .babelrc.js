module.exports = {
  presets: ["next/babel", "@zeit/next-typescript/babel"],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        ssr: true,
        displayName: true,
        preprocess: false
      }
    ]
  ]
};
