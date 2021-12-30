type Interpolate = (from: number, to: number, completionRatio: number) => number

export const interpolate: Interpolate = (from, to, completionRatio = 0.5) =>
  from + completionRatio * (to - from)
