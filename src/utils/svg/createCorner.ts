import { writePathPoint } from "./writePathPoint"
import type { DrawCorner, Point2d } from "../.."
import { interpolate } from "../interpolate"

type SVGCommand =
  | [`curve`, Point2d, Point2d, Point2d]
  | [`line`, Point2d]
  | [`symmetric`, Point2d, Point2d]

type FinalSVGCommand =
  | [`curve`, Point2d, Point2d]
  | [`line`]
  | [`symmetric`, Point2d]

export type CornerSpec = Readonly<[...SVGCommand[], FinalSVGCommand]>

enum Commands {
  curve = `C`,
  line = `L`,
  symmetric = `S`,
}

type PointFinder = (p1: Point2d, p2: Point2d, j: number) => string

export const createCorner = (spec: CornerSpec): DrawCorner => {
  const [...commands] = spec
  let pointFinders: PointFinder[] = []
  for (const command of commands) {
    const [type, ...points] = command
    const newPointFinders = points.map((point, i) => {
      const finder: PointFinder = (p1, p2, j) => {
        const isEven = j % 2 === 0
        const axis1 = isEven ? `x` : `y`
        const axis2 = isEven ? `y` : `x`
        const pathPoint = {
          [axis1]: interpolate(p1[axis1], p2[axis1], point.x),
          [axis2]: interpolate(p1[axis2], p2[axis2], point.y),
        }
        return writePathPoint(
          pathPoint.x,
          pathPoint.y,
          i === 0 ? Commands[type] : undefined
        )
      }
      return finder
    })
    pointFinders = [...pointFinders, ...newPointFinders]
  }
  pointFinders = [
    (p1, _, j) => writePathPoint(p1.x, p1.y, j === 0 ? `M` : `L`),
    ...pointFinders,
    (_, p2) => writePathPoint(p2.x, p2.y),
  ]
  return (p1, p2, idx) => pointFinders.map((finder) => finder(p1, p2, idx))
}
