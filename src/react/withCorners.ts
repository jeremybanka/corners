import type {
  AllHTMLAttributes,
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
} from "react"
import { createElement, useId, useRef } from "react"

import type { DrawCorner } from ".."
import { createClipPathfinder } from "../utils/svg/createPathfinder"
import { useSize } from "./useSize"

export function withCorners<P extends { style?: CSSProperties }>(
  WrappedComponent: ForwardRefExoticComponent<P> | string,
  cornerSize: number,
  ...corners: (DrawCorner | null)[]
): FC<AllHTMLAttributes<any> & P> {
  const clipPathfinder = createClipPathfinder(cornerSize, ...corners)
  const WithCorners: FC<P> = (props) => {
    const pathId = useId ? useId() : Math.random().toString()
    const nodeRef = useRef<HTMLElement>(null)
    const { height, width } = useSize(nodeRef)

    const d = clipPathfinder(height, width, cornerSize)

    return createElement(
      WrappedComponent,
      {
        ...props,
        ref: nodeRef,
        style: {
          ...props.style,
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
