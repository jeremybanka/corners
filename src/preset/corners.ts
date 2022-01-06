import { interpolate } from "~/utils/interpolate"
import { writePathPoint } from "~/utils/svg/writePathPoint"

import type { DrawCorner } from ".."

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
    [axis2]: interpolate(p1[axis2], p2[axis2], 0.562),
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
