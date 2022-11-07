import type {
  AllHTMLAttributes,
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
} from "react"
import { createElement, useRef } from "react"

import type { Layer, Scraps } from ".."
import type { Pathfinder } from "../utils/svg/createPathfinder"
import { SvgLayers } from "./Layers"
import { useSize } from "./useSize"

export function withLayers<P extends { style?: CSSProperties }>(
  Component: ForwardRefExoticComponent<P> | string,
  above: Scraps<Layer>,
  below: Scraps<Layer>,
  pathfinder: Pathfinder
): FC<AllHTMLAttributes<any> & P> {
  // const { cornerSize, noClipping, above, below } = options
  // const clipPathfinder = noClipping
  //   ? null
  //   : createClipPathfinder(cornerSize, ...corners)
  // const pathfinder =
  //   above || below ? createPathfinder(cornerSize, ...corners) : null

  const LayeredComponent: FC<P> = (props) => {
    const nodeRef = useRef<HTMLElement>(null)
    const { height, width } = useSize(nodeRef)
    const d = pathfinder(height, width)

    return createElement(
      Component,
      {
        ...props,
        ref: nodeRef,
        style: {
          position: `relative`,
          zIndex: 0,
          ...props.style,
          background: `none`,
        },
      },
      SvgLayers({
        drawn: d,
        above,
        below,
      }),
      props.children
    )
  }
  return LayeredComponent
}
