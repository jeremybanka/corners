import type { CSSProperties } from "react"

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

export type Layer = {
  color: string
  x: number
  y: number
  blur: number
  spread: number
  stroke: {
    color?: string
    dashArray?: number[]
    width?: number
  } | null
  blendMode: CSSProperties[`mixBlendMode`]
}

export type CornerOptions = {
  cornerSize: number
  noClipping: boolean
  above: Partial<Layer> | Partial<Layer>[] | null
  below: Partial<Layer> | Partial<Layer>[] | null
}

export default corners
export * from "./constants/html"
export * from "./preset/corners"
export * from "./preset/factories"
export * from "./react/useSize"
export * from "./utils/svg/createCorner"
export * from "./utils/svg/createPathfinder"
export * from "./utils/svg/writePathPoint"
