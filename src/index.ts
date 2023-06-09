import { corners } from "./react/interface"
import type { Fragment } from "./utils/patch"
import { patch } from "./utils/patch"
import type { Pathfinder } from "./utils/svg/createPathfinder"

export type Point2d = {
  x: number
  y: number
}

export type PointPair = {
  p1: Point2d
  p2: Point2d
}

export type OneManyOrNull<T> = T | T[] | null

export type Scraps<T extends object> = OneManyOrNull<Fragment<T>>

export const harvest =
  <T extends object>(base: T) =>
  (scraps: Scraps<T>): T[] => {
    if (scraps === null) return []
    if (Array.isArray(scraps)) return scraps.map((scrap) => patch(base, scrap))
    return [patch(base, scraps)]
  }

export type DrawCorner = (p1: Point2d, p2: Point2d, idx: number) => string[]

export type Layer = {
  pathfinder: Pathfinder
  color: string
  offset: Point2d
  blur: number
  spread: number
  stroke: {
    color: string
    dashArray: number[]
    width: number
  } | null
  // blendMode: CSSProperties[`mixBlendMode`]
}

export type CornerOptions = {
  cornerSize: number
  noClipping: boolean
  above: Scraps<Layer>
  below: Scraps<Layer>
}

export default corners
export * from "./constants/html"
export * from "./preset/corners"
export * from "./preset/factories"
export * from "./react/useSize"
export * from "./utils/interpolate"
export * from "./utils/svg/createCorner"
export * from "./utils/svg/createPathfinder"
export * from "./utils/svg/writePathPoint"
