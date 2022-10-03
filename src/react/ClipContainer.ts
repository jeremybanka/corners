import type { FC } from "react"
import { createElement } from "react"

export const ClipContainer: FC<{
  pathId: string
  clipPath: string
}> = ({ pathId, clipPath }) =>
  createElement(
    `svg`,
    {
      width: `10`,
      height: `10`,
      viewBox: `0 0 10 10`,
      style: { position: `absolute`, opacity: 0, pointerEvents: `none` },
    },
    createElement(
      `clipPath`,
      { id: pathId, clipPathUnits: `objectBoundingBox` },
      createElement(`path`, { d: clipPath })
    )
  )
