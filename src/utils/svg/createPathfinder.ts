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

/* eslint-disable no-case-declarations */
export const createPathfinder: CreatePathfinder = (
  defaultCornerSize,
  ...corners
) => {
  switch (corners.length) {
    case 1:
      const corner = corners[0] ?? straight
      return (height: number, width: number, cornerSize?: number) =>
        findPath(height, width, cornerSize || defaultCornerSize, [
          corner,
          corner,
          corner,
          corner,
        ])
    case 2:
      const cornerX = corners[0] ?? straight
      const cornerY = corners[1] ?? straight
      return (height: number, width: number, cornerSize?: number) =>
        findPath(height, width, cornerSize || defaultCornerSize, [
          cornerX,
          cornerY,
          cornerX,
          cornerY,
        ])
    case 4:
      const cornerA = corners[0] ?? straight
      const cornerB = corners[1] ?? straight
      const cornerC = corners[2] ?? straight
      const cornerD = corners[3] ?? straight
      return (height: number, width: number, cornerSize?: number) =>
        findPath(height, width, cornerSize || defaultCornerSize, [
          cornerA,
          cornerB,
          cornerC,
          cornerD,
        ])
    default:
      throw new Error(`pass 1, 2, or 4 corners`)
  }
}
/* eslint-enable no-case-declarations */

export const findPath = (
  height: number,
  width: number,
  cornerSize: number,
  corners: [DrawCorner, DrawCorner, DrawCorner, DrawCorner]
): SvgPath => {
  if (!height || !width || !cornerSize) return ``
  const maxCornerSize = Math.min(cornerSize, Math.min(height, width) / 2)
  const cornerHeight = maxCornerSize / height
  const cornerWidth = maxCornerSize / width

  const cornerPoints = [
    { p1: { x: 1 - cornerWidth, y: 0 }, p2: { x: 1, y: cornerHeight } },
    { p1: { x: 1, y: 1 - cornerHeight }, p2: { x: 1 - cornerWidth, y: 1 } },
    { p1: { x: cornerWidth, y: 1 }, p2: { x: 0, y: 1 - cornerHeight } },
    { p1: { x: 0, y: cornerHeight }, p2: { x: cornerWidth, y: 0 } },
  ]

  const path =
    cornerPoints.reduce((acc, { p1, p2 }, idx) => {
      const drawCorner = corners[idx]
      return acc + drawCorner(p1, p2, idx).join(`\n`) + `\n`
    }, ``) + `Z`
  return path
}
