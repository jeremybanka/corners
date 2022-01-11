import type { CornerOptions, Layer } from ".."

export const DEFAULT_LAYER: Layer = {
  color: `black`,
  x: 0,
  y: 0,
  blur: 0,
  spread: 0,
  stroke: null,
}

export const DEFAULT_OPTIONS: CornerOptions = {
  useClipPath: true,
  cornerSize: 15,
  above: null,
  below: null,
}
