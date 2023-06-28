import type { CornerOptions, Layer } from ".."
import { straight } from "../preset/corners"
import { createPathfinder } from "../utils/svg/createPathfinder"

export const DEFAULT_LAYER: Layer = {
  color: `transparent`,
  blur: 0,
  spread: 0,
  offset: { x: 0, y: 0 },
  stroke: null,
  pathfinder: createPathfinder(0, straight),
}

export const DEFAULT_OPTIONS: CornerOptions = {
  useClipPath: true,
  cornerSize: 15,
  above: null,
  below: null,
}
