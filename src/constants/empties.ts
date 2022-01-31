import type { CornerOptions, Layer } from ".."

export const DEFAULT_LAYER: Layer = {
  color: `black`,
  x: 0,
  y: 0,
  blur: 0,
  spread: 0,
  stroke: null,
  blendMode: `normal`,
}

export const DEFAULT_OPTIONS: CornerOptions = {
  noClipping: false,
  cornerSize: 15,
  above: null,
  below: null,
}
