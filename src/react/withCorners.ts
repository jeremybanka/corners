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
import { SvgClippingPath } from "./SvgClippingPath"
import { SvgLayers } from "./SvgLayers"
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
        SvgClippingPath({
          id: pathId,
          d: clipPathfinder(height, width, cornerSize),
        }),
      pathfinder &&
        SvgLayers({
          pathfinder,
          above,
          below,
          base: { width, height, cornerSize },
        }),
      props.children
    )
  }
  return WithCorners
}
