import type { CornerOptions, Layer } from ".."
import { createPathfinder, straight } from ".."

export const DEFAULT_LAYER: Layer = {
  color: `black`,
  blur: 0,
  spread: 0,
  offset: { x: 0, y: 0 },
  stroke: null,
  pathfinder: createPathfinder(0, straight),
}

export const DEFAULT_OPTIONS: CornerOptions = {
  noClipping: false,
  cornerSize: 15,
  above: null,
  below: null,
}
