import type { FC, ForwardRefExoticComponent } from "react"
import { createElement, useId, useRef } from "react"

import type { DrawCorner } from ".."
import { createPathfinder } from "../utils/svg/createPathfinder"
import { useSize } from "./useSize"

export function withCorners<P>(
  WrappedComponent: ForwardRefExoticComponent<P> | string,
  cornerSize: number,
  ...corners: (DrawCorner | null)[]
): FC<P> {
  const pathfinder = createPathfinder(cornerSize, ...corners)
  const WithCorners: FC<P> = (props) => {
    const pathId = useId ? useId() : Math.random().toString()
    const nodeRef = useRef<HTMLElement>(null)
    const { height, width } = useSize(nodeRef)

    const d = pathfinder(height, width, cornerSize)

    return createElement(
      WrappedComponent,
      {
        ...props,
        ref: nodeRef,
        style: {
          clipPath: `url(#${pathId})`,
        },
      },
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
          createElement(`path`, { d })
        )
      ),
      props.children
    )
  }
  return WithCorners
}
