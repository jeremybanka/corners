import type { CornerSpec } from "~/index"
import { createCorner } from "~/utils/svg/createCorner"

import { round } from "./corners"

const RoundedSpec: CornerSpec = [
  [`curve`, { x: 0.438, y: 0 }, { x: 0.68, y: 0 }, { x: 0.84, y: 0.16 }],
  [`symmetric`, { x: 1, y: 0.562 }],
]

describe(`createCorner`, () => {
  it(`creates an equivalent to round`, () => {
    const roundFromCreate = createCorner(RoundedSpec)
    const pointA = { x: 90, y: 0 }
    const pointB = { x: 100, y: 10 }
    expect(round(pointA, pointB, 0)).toEqual(roundFromCreate(pointA, pointB, 0))
  })
})
