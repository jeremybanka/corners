module.exports = {
  extends: [
    `plugin:@typescript-eslint/recommended`,
    `plugin:import/recommended`,
  ],
  plugins: [
    `import`,
    `@typescript-eslint`
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: `module`,
    ecmaFeatures: { jsx: true },
    project: [`./tsconfig.json`, `./tsconfig.node.json`, `./apps/cornersjs.org/tsconfig.json`],
  },
  ignorePatterns: [`**/dist/**`],
  env: {
    node: true,
    browser: true,
    es2021: true,
    mocha: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [`.js`, `.cjs`, `.ts`, `.tsx`],
      },
    },
  },
  rules: {
    "@typescript-eslint/explicit-member-accessibility": `error`,
    "@typescript-eslint/prefer-enum-initializers": `error`,
    "@typescript-eslint/prefer-literal-enum-member": `error`,
    "@typescript-eslint/prefer-optional-chain": `error`,
    "@typescript-eslint/sort-type-constituents": `error`,
    "@typescript-eslint/type-annotation-spacing": `error`,
    "@typescript-eslint/unified-signatures": `error`,
    "@typescript-eslint/no-unused-vars": `off`,
    "@typescript-eslint/no-explicit-any": `off`,
    "@typescript-eslint/explicit-module-boundary-types": `error`,
    "@typescript-eslint/consistent-type-imports": [
      `error`,
      {
        fixStyle: `separate-type-imports`,
        prefer: `type-imports`, 
      },
    ],
    "import/extensions": [
      `error`,
      {
        ts: `never`,
        tsx: `never`,
        js: `never`,
        jsx: `never`,
        css: `always`,
        scss: `always`,
        client: `always`,
        server: `always`,
        web: `always`,
        node: `always`,
        schema: `always`,
        json: `always`,
      },
    ],
    "import/named": 0,
    "import/no-unresolved": `off`,
    "import/prefer-default-export": `off`,
    "import/order": [
      `error`,
      {
        "groups": [`builtin`, `external`, `internal`],
        "pathGroups": [
          {
            pattern: `~`,
            group: `internal`,
            position: `before`,
          },
          {
            pattern: `~/**`,
            group: `internal`,
            position: `before`,
          },
        ],
        "newlines-between": `always`,
        "alphabetize": {
          order: `asc`,
          caseInsensitive: true,
        },
      },
    ],
    "quotes": [`error`, `backtick`],
    "quote-props": [`error`, `consistent`, { unnecessary: false }],
  },
}
