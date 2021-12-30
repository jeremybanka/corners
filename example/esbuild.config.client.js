// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`esbuild`)
  .build({
    bundle: true,
    entryPoints: [`example/src/client.tsx`],
    minify: true,
    outfile: `example/dist/client.js`,
    platform: `browser`,
    sourcemap: true,
    watch: true,
  })
  .catch(() => process.exit(1))
