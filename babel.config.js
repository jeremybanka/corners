module.exports = (api, targets) => {
  // https://babeljs.io/docs/en/config-files#config-function-api
  const isTestEnv = api.env(`test`)

  return {
    babelrc: false,
    ignore: [`./node_modules`],
    presets: [
      [
        `@babel/preset-env`,
        {
          loose: true,
          modules: isTestEnv ? `commonjs` : false,
          targets: isTestEnv ? { node: `current` } : targets,
          exclude: [`@babel/plugin-transform-regenerator`],
        },
      ],
    ],
    plugins: [
      [`@babel/plugin-transform-typescript`],
      [
        `babel-plugin-root-import`,
        {
          rootPathSuffix: `./app`,
          rootPathPrefix: `~/`,
        },
      ],
    ],
  }
}
