import type { DrawCorner } from "~/index"
import { straight } from "~/preset/corners"

type SvgPath = string

export type Pathfinder = (
  height: number,
  width: number,
  cornerSize?: number
) => SvgPath

export type CreatePathfinder = (
  defaultCornerSize: number,
  ...corners: (DrawCorner | null)[]
) => Pathfinder

export const createPathfinder: CreatePathfinder = (
  defaultCornerSize,
  ...corners
) => {
  const fourCorners = expandCorners(...corners)
  return (height, width, cornerSize = defaultCornerSize) => {
    if ([height, width, cornerSize].includes(0)) {
      return ``
    }
    const cornerPoints = getCornerPointsForClipPath(cornerSize, height, width)
    return findPath(cornerPoints, fourCorners)
  }
}

type FourCorners = [DrawCorner, DrawCorner, DrawCorner, DrawCorner]

type ExpandCorners = (...corners: (DrawCorner | null)[]) => FourCorners

const expandCorners: ExpandCorners = (...corners) => {
  if ([1, 2, 4].includes(corners.length) === false) {
    throw new Error(`Expected 1, 2, or 4 corners, got ${corners.length}`)
  }
  const A = corners[0] ?? straight
  const B = 1 in corners ? corners[1] ?? straight : A
  const C = 2 in corners ? corners[2] ?? straight : A
  const D = 3 in corners ? corners[3] ?? straight : 1 in corners ? B : A
  return [A, B, C, D]
}

type PointPair = {
  p1: { x: number; y: number }
  p2: { x: number; y: number }
}

export const findPath = (
  cornerPoints: [PointPair, PointPair, PointPair, PointPair],
  corners: [DrawCorner, DrawCorner, DrawCorner, DrawCorner]
): SvgPath => {
  const path =
    cornerPoints.reduce((acc, { p1, p2 }, idx) => {
      const drawCorner = corners[idx]
      return acc + drawCorner(p1, p2, idx).join(`\n`) + `\n`
    }, ``) + `Z`
  return path
}

type GetCornerPoints = (
  cornerSize: number,
  height: number,
  width: number
) => [PointPair, PointPair, PointPair, PointPair]

const getCornerPointsForClipPath: GetCornerPoints = (
  cornerSize: number,
  height: number,
  width: number
) => {
  const maxCornerSize = Math.min(cornerSize, Math.min(height, width) / 2)
  const cornerHeight = maxCornerSize / height
  const cornerWidth = maxCornerSize / width

  return [
    { p1: { x: 1 - cornerWidth, y: 0 }, p2: { x: 1, y: cornerHeight } },
    { p1: { x: 1, y: 1 - cornerHeight }, p2: { x: 1 - cornerWidth, y: 1 } },
    { p1: { x: cornerWidth, y: 1 }, p2: { x: 0, y: 1 - cornerHeight } },
    { p1: { x: 0, y: cornerHeight }, p2: { x: cornerWidth, y: 0 } },
  ]
}
