import { build } from "esbuild"

build({
  entryPoints: [`src/index.ts`],
  outfile: `dist/index.js`,
  platform: `node`,
  format: `esm`,
  sourcemap: true,
  bundle: true,
  external: [`react`],
}).catch(() => process.exit(1))
