// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`esbuild`)
  .build({
    entryPoints: [`example/src/server.ts`],
    format: `cjs`,
    outfile: `example/dist/server.js`,
    platform: `node`,
    sourcemap: true,
    target: `node14`,
    watch: true,
  })
  .catch(() => process.exit(1))
