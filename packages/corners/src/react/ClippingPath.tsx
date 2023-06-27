import type { FC } from "react"

export const SvgClippingPath: FC<{
  id: string
  d: string
}> = ({ id, d }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    style={{ position: `absolute`, opacity: 0, pointerEvents: `none` }}
  >
    <clipPath id={id} clipPathUnits="objectBoundingBox">
      <path d={d} />
    </clipPath>
  </svg>
)
