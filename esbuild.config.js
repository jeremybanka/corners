// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`esbuild`)
  .build({
    bundle: true,
    entryPoints: [`src/index.tsx`],
    minify: true,
    outfile: `dist/index.js`,
    platform: `browser`,
    sourcemap: true,
    watch: true,
  })
  .catch(() => process.exit(1))
