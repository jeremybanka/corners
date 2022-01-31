import type {
  AllHTMLAttributes,
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
} from "react"
import { createElement, useId, useRef } from "react"

import type { CornerOptions, DrawCorner } from ".."
import {
  createClipPathfinder,
  createPathfinder,
} from "../utils/svg/createPathfinder"
import { ClipContainer } from "./ClipContainer"
import { SVGLayers } from "./SVGLayers"
import { useSize } from "./useSize"

export function withCorners<P extends { style?: CSSProperties }>(
  WrappedComponent: ForwardRefExoticComponent<P> | string,
  options: CornerOptions,
  ...corners: (DrawCorner | null)[]
): FC<AllHTMLAttributes<any> & P> {
  const { cornerSize, noClipping, above, below } = options
  const clipPathfinder = noClipping
    ? null
    : createClipPathfinder(cornerSize, ...corners)
  const pathfinder =
    above || below ? createPathfinder(cornerSize, ...corners) : null

  const WithCorners: FC<P> = (props) => {
    const pathId = useId ? useId() : Math.random().toString()
    const nodeRef = useRef<HTMLElement>(null)
    const { height, width } = useSize(nodeRef)

    return createElement(
      WrappedComponent,
      {
        ...props,
        ref: nodeRef,
        style: {
          position: `relative`,
          zIndex: 0,
          ...props.style,
          clipPath: clipPathfinder ? `url(#${pathId})` : undefined,
          background: noClipping ? `none` : props.style?.background,
        },
      },
      clipPathfinder &&
        ClipContainer({
          pathId,
          clipPath: clipPathfinder(height, width, cornerSize),
        }),
      pathfinder &&
        SVGLayers({
          base: {
            height,
            width,
            cornerSize,
          },
          pathfinder,
          above,
          below,
        }),
      props.children
    )
  }
  return WithCorners
}
