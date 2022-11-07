import type {
  AllHTMLAttributes,
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
} from "react"
import { createElement, useId, useRef } from "react"

import type { Pathfinder } from "../utils/svg/createPathfinder"
import { SvgClippingPath } from "./ClippingPath"
import { useSize } from "./useSize"

export function withClippingPath<P extends { style?: CSSProperties }>(
  Component: ForwardRefExoticComponent<P> | string,
  pathfinder: Pathfinder
): FC<AllHTMLAttributes<any> & P> {
  const ClippedComponent: FC<P> = (props) => {
    const id = useId()
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
          clipPath: `url(#${id})`,
        },
      },
      SvgClippingPath({ id, d }),
      props.children
    )
  }
  return ClippedComponent
}
