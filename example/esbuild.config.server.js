// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require(`esbuild`)

esbuild
  .build({
    entryPoints: [`example/src/server.ts`],
    outfile: `example/dist/server.js`,
    platform: `node`,
    sourcemap: true,
    target: `node14`,
    format: `cjs`,
    watch: true,
  })
  .catch(() => process.exit(1))
