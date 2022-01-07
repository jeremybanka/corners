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

export default corners
export * from "./utils/svg/createCorner"
export * from "./preset/factories"
export * from "./preset/corners"
export * from "./react/useSize"
export * from "./utils/svg/createPathfinder"
export * from "./utils/svg/writePathPoint"
