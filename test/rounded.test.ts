import type { CornerSpec } from "~/utils/svg"
import { createCorner, round } from "~/utils/svg"

const RoundedSpec: CornerSpec = [
  [`curve`, { x: 0.438, y: 0 }, { x: 0.68, y: 0 }, { x: 0.84, y: 0.16 }],
  [`symmetric`, { x: 1, y: 0.562 }],
]

describe(`createCorner`, () => {
  it(`creates an equivalent to round`, () => {
    const roundFromCreate = createCorner(RoundedSpec)
    const pointA = { x: 90, y: 0 }
    const pointB = { x: 100, y: 10 }
    // const findRounded10FromCreate = createPathfinder(10, roundFromCreate)
    // const findRounded10 = createPathfinder(10, round)
    expect(round(pointA, pointB, 0)).toEqual(roundFromCreate(pointA, pointB, 0))
    // expect(findRounded10FromCreate(400, 300)).toEqual(findRounded10(400, 300))
  })
})
