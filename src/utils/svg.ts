type SvgCommandCode = `C` | `L` | `M` | `Q` | `S`

function writePathPoint(x: number, y: number, command?: SvgCommandCode): string {
  return command ? `${command} ${x},${y}` : `  ${x},${y}`
}

interface Point2d {
  x: number
  y: number
}

const drawAngledCorner = (p1: Point2d, p2: Point2d, idx: number) =>
  [
    writePathPoint(p1.x, p1.y, idx === 0 ? `M` : `L`),
    writePathPoint(p2.x, p2.y, `L`),
  ].join(`\n`) + `\n`

const drawRoundedCornerNaively = (p1: Point2d, p2: Point2d, idx: number) => {
  const isEven = idx % 2 === 0
  const ex = {
    x: isEven ? p2.x : p1.x,
    y: isEven ? p1.y : p2.y,
  }
  return (
    [
      writePathPoint(p1.x, p1.y, idx === 0 ? `M` : `L`),
      writePathPoint(ex.x, ex.y, `C`),
      writePathPoint(ex.x, ex.y),
      writePathPoint(p2.x, p2.y),
    ].join(`\n`) + `\n`
  )
}

type Interpolate = (from: number, to: number, completionRatio: number) => number

const interpolate: Interpolate = (from, to, completionRatio = 0.5) =>
  from + completionRatio * (to - from)

const drawRoundedCorner = (p1: Point2d, p2: Point2d, idx: number): string => {
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

  return (
    [
      writePathPoint(p1.x, p1.y, idx === 0 ? `M` : `L`),
      writePathPoint(c0.x, c0.y, `C`),
      writePathPoint(c1.x, c1.y),
      writePathPoint(c2.x, c2.y),
      writePathPoint(s0.x, s0.y, `S`),
      writePathPoint(p2.x, p2.y),
    ].join(`\n`) + `\n`
  )
}

export const drawClipPath = (
  height: number,
  width: number,
  cornerSize: number,
  cornerFunction: (
    p1: Point2d,
    p2: Point2d,
    idx: number,
    cornerSize: number
  ) => string
): string => {
  if (!height || !width || !cornerSize) return ``
  const realCornerSize = Math.min(cornerSize, Math.min(height, width) / 2)
  const cornerHeight = realCornerSize / height
  const cornerWidth = realCornerSize / width

  const cornerPoints = [
    { p1: { x: 1 - cornerWidth, y: 0 }, p2: { x: 1, y: cornerHeight } },
    { p1: { x: 1, y: 1 - cornerHeight }, p2: { x: 1 - cornerWidth, y: 1 } },
    { p1: { x: cornerWidth, y: 1 }, p2: { x: 0, y: 1 - cornerHeight } },
    { p1: { x: 0, y: cornerHeight }, p2: { x: cornerWidth, y: 0 } },
  ]

  const path =
    cornerPoints.reduce(
      (acc, { p1, p2 }, idx) => acc + cornerFunction(p1, p2, idx, cornerSize),
      ``
    ) + `Z`
  return path
}

export type DrawPath = (
  height: number,
  width: number,
  cornerSize: number
) => string

export const drawRoundedBoxNaively: DrawPath = (height, width, cornerRadius) =>
  drawClipPath(height, width, cornerRadius, drawRoundedCornerNaively)

export const drawChamferedBox: DrawPath = (height, width, cornerRadius) =>
  drawClipPath(height, width, cornerRadius, drawAngledCorner)

export const drawRoundedBox: DrawPath = (height, width, cornerRadius) =>
  drawClipPath(height, width, cornerRadius, drawRoundedCorner)
