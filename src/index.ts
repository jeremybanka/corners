import { corners } from "./react/createComponentFactory"

export type Point2d = {
  x: number
  y: number
}

export type PointPair = {
  p1: Point2d
  p2: Point2d
}

export type DrawCorner = (p1: Point2d, p2: Point2d, idx: number) => string[]

export type ShadowSpec = {
  x: number
  y: number
  blur: number
  spread: number
}

export type CornerOptions = {
  size: number
  shadow?: ShadowSpec
  card?: boolean
}

export default corners
export * from "./constants/html"
export * from "./preset/corners"
export * from "./preset/factories"
export * from "./react/useSize"
export * from "./utils/svg/createCorner"
export * from "./utils/svg/createPathfinder"
export * from "./utils/svg/writePathPoint"
