// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`esbuild`)
  .build({
    entryPoints: [`src/index.ts`],
    outfile: `dist/index.js`,
    platform: `node`,
    format: `cjs`,
    sourcemap: true,
    bundle: true,
    external: [`react`],
  })
  .catch(() => process.exit(1))
