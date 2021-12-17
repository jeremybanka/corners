// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require(`esbuild`)

esbuild
  .build({
    entryPoints: [`example/src/client.tsx`],
    outfile: `example/dist/client.js`,
    bundle: true,
    minify: true,
    platform: `browser`,
    sourcemap: true,
    watch: true,
  })
  .catch(() => process.exit(1))
