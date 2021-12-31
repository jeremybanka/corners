import { interpolate } from "./interpolate"

type SvgCommandCode = `C` | `L` | `M` | `Q` | `S`

function writePathPoint(x: number, y: number, command?: SvgCommandCode): string {
  return command ? `${command} ${x},${y}` : `  ${x},${y}`
}

type Point2d = {
  x: number
  y: number
}

export type DrawCorner = (p1: Point2d, p2: Point2d, idx: number) => string[]

export const chamfer: DrawCorner = (p1, p2, idx) => [
  writePathPoint(p1.x, p1.y, idx === 0 ? `M` : `L`),
  writePathPoint(p2.x, p2.y, `L`),
]

export const straight: DrawCorner = (p1, p2, idx) => {
  const isEven = idx % 2 === 0
  const ex = {
    x: isEven ? p2.x : p1.x,
    y: isEven ? p1.y : p2.y,
  }
  return [writePathPoint(ex.x, ex.y, idx === 0 ? `M` : `L`)]
}

export const roundedNaive: DrawCorner = (p1, p2, idx) => {
  const isEven = idx % 2 === 0
  const ex = {
    x: isEven ? p2.x : p1.x,
    y: isEven ? p1.y : p2.y,
  }
  return [
    writePathPoint(p1.x, p1.y, idx === 0 ? `M` : `L`),
    writePathPoint(ex.x, ex.y, `C`),
    writePathPoint(ex.x, ex.y),
    writePathPoint(p2.x, p2.y),
  ]
}

export const round: DrawCorner = (p1, p2, idx) => {
  const isEven = idx % 2 === 0
  const axis1 = isEven ? `x` : `y`
  const axis2 = isEven ? `y` : `x`

  const c0 = {
    [axis1]: interpolate(p1[axis1], p2[axis1], 0.438),
    [axis2]: p1[axis2],
  }
  const c1 = {
    [axis1]: interpolate(p1[axis1], p2[axis1], 0.68),
    [axis2]: p1[axis2],
  }
  const c2 = {
    [axis1]: interpolate(p1[axis1], p2[axis1], 0.84),
    [axis2]: interpolate(p1[axis2], p2[axis2], 0.16),
  }
  const s0 = {
    [axis1]: p2[axis1],
    [axis2]: interpolate(p2[axis2], p1[axis2], 0.438),
  }

  return [
    writePathPoint(p1.x, p1.y, idx === 0 ? `M` : `L`),
    writePathPoint(c0.x, c0.y, `C`),
    writePathPoint(c1.x, c1.y),
    writePathPoint(c2.x, c2.y),
    writePathPoint(s0.x, s0.y, `S`),
    writePathPoint(p2.x, p2.y),
  ]
}

// export type DrawCorners = cornerPoints

export const drawCorners = (
  height: number,
  width: number,
  cornerSize: number,
  corners: [DrawCorner, DrawCorner, DrawCorner, DrawCorner]
): string => {
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
        drawCorners(height, width, cornerSize || defaultCornerSize, [
          corner,
          corner,
          corner,
          corner,
        ])
    case 2:
      const cornerX = corners[0] ?? straight
      const cornerY = corners[1] ?? straight
      return (height: number, width: number, cornerSize?: number) =>
        drawCorners(height, width, cornerSize || defaultCornerSize, [
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
        drawCorners(height, width, cornerSize || defaultCornerSize, [
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
