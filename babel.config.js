module.exports = (api, targets) => {
  // https://babeljs.io/docs/en/config-files#config-function-api
  const isTestEnv = api.env(`test`)

  return {
    babelrc: false,
    ignore: [`./node_modules`],
    presets: [
      `@babel/preset-react`,
      `@babel/preset-typescript`,
      `@babel/preset-env`,
    ],
    plugins: [
      [
        `babel-plugin-root-import`,
        {
          rootPathSuffix: `./src`,
          rootPathPrefix: `~/`,
        },
      ],
    ],
  }
}
