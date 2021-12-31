import type { FC, ForwardRefExoticComponent } from "react"
import { useRef, createElement, useId } from "react"

import { HTMLElementName, HTML_ELEMENT_NAMES } from "./constants/html"
import { useSize } from "~/hooks/useSize"
import {
  chamfer,
  createPathfinder,
  DrawCorner,
  Pathfinder,
  round,
} from "~/utils/svg"

export function withCorners<P>(
  pathfinder: Pathfinder,
  WrappedComponent: ForwardRefExoticComponent<P> | string,
  cornerSize?: number
): FC<P> {
  const WithCorners: FC<P> = (props) => {
    const pathId = useId ? useId() : Math.random().toString()
    const nodeRef = useRef<HTMLElement>(null)
    const size = useSize(nodeRef)
    console.log(pathId, size)
    const d = pathfinder(size.height, size.width, cornerSize)

    return createElement(
      WrappedComponent,
      {
        ...props,
        ref: nodeRef,
        style: {
          clipPath: `url(#${pathId})`,
        },
      },
      [
        createElement(
          `svg`,
          {
            width: `10`,
            height: `10`,
            viewBox: `0 0 10 10`,
            style: { position: `absolute`, opacity: 0, pointerEvents: `none` },
          },
          [
            createElement(
              `clipPath`,
              { id: pathId, clipPathUnits: `objectBoundingBox` },
              [createElement(`path`, { d })]
            ),
          ]
        ),
        props.children,
      ]
    )
  }
  return WithCorners
}

const enhanceComponentFactory = (
  cornerFunction: <P>(
    WrappedComponent: ForwardRefExoticComponent<P> | string,
    cornerSize?: number
  ) => FC<P>
): typeof cornerFunction & {
  [K in HTMLElementName]: ReturnType<typeof cornerFunction>
} => {
  const enhancedCornerFunction = cornerFunction as typeof cornerFunction & {
    [K in HTMLElementName]: ReturnType<typeof cornerFunction>
  }
  HTML_ELEMENT_NAMES.forEach((name) => {
    enhancedCornerFunction[name] = cornerFunction(name)
  })
  return enhancedCornerFunction
}

const createComponentFactory = (
  cornerSize: number,
  ...corners: (DrawCorner | null)[]
): typeof componentFactory & {
  [K in HTMLElementName]: ReturnType<typeof componentFactory>
} => {
  const pathfinder = createPathfinder(cornerSize, ...corners)
  const componentFactory = function <P>(
    WrappedComponent: ForwardRefExoticComponent<P> | string,
    cornerSize?: number
  ): FC<P> {
    return withCorners(pathfinder, WrappedComponent, cornerSize)
  }
  return enhanceComponentFactory(componentFactory)
}

interface ICorners {
  (...cornerFns: (DrawCorner | null)[]): {
    size: (s: number) => ReturnType<typeof createComponentFactory>
  }
}

const corners: ICorners = (...cornerFns) => ({
  size: (s) => createComponentFactory(s, ...cornerFns),
})

export const rounded = corners(round).size(20)
export const chamfered = corners(chamfer).size(20)
export const semiChamfered = corners(null, chamfer).size(20)
export const demiChamfered = corners(chamfer, null).size(20)
