import { MyResource } from "../src/MyResource"

describe(`dumb tests`, () => {
  it(`dumb test`, () => {
    const resource = new MyResource(1, 2)
    const result = resource.execute()
    expect(result).toBeCloseTo(3)
  })
})
