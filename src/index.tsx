import type { FC, ForwardRefExoticComponent } from "react"
import React, { useRef } from "react"

import styled from "@emotion/styled"

// import type { HTMLElementName } from "~/constants/html"
// import { HTML_ELEMENT_NAMES } from "~/constants/html"
import { useSize } from "~/hooks/useSize"
import { drawChamferedBox, DrawPath, drawRoundedBox } from "~/utils/svg"

export function withCorners<P>(
  pathFunction: DrawPath,
  WrappedComponent: ForwardRefExoticComponent<P>,
  cornerSize: number
): FC<P> {
  const pathId = `Box+${pathFunction.name}`

  const StyledWrappedComponent = styled(WrappedComponent)`
    clip-path: url(#${pathId});
  `

  const WithRoundedCorners: FC<P> = (props) => {
    const nodeRef = useRef<HTMLElement>(null)
    const size = useSize(nodeRef)
    const d = pathFunction(size.height, size.width, cornerSize)
    console.log(props.children)
    return (
      <>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          style={{ position: `absolute`, opacity: 0, pointerEvents: `none` }}
        >
          <clipPath id={pathId} clipPathUnits="objectBoundingBox">
            <path fill="red" stroke="none" d={d} />
          </clipPath>
        </svg>
        <StyledWrappedComponent
          {...props}
          ref={nodeRef}
          style={{
            clipPath: `url(#${pathId})`,
            filter: `drop-shadow(30px 10px 4px #4444dd);`,
          }}
        >
          {props.children}
        </StyledWrappedComponent>
      </>
    )
  }
  return WithRoundedCorners
}

export function withRoundedCorners<P>(
  WrappedComponent: ForwardRefExoticComponent<P>,
  cornerSize: number
): FC<P> {
  return withCorners(drawRoundedBox, WrappedComponent, cornerSize)
}

export function withChamferedCorners<P>(
  WrappedComponent: ForwardRefExoticComponent<P>,
  cornerSize: number
): FC<P> {
  return withCorners(drawChamferedBox, WrappedComponent, cornerSize)
}

// interface Rounded extends Record<HTMLElementName, CallableFunction> {
//   (component: HTMLElementName): number
// }

// function makeRounded(component: HTMLElementName): number {
//   return component.length
// }

// const roundedMethods: Record<HTMLElementName, CallableFunction> = ((
//   HTML_ELEMENTS: Readonly<HTMLElementName[]>
// ): Record<string, CallableFunction> => {
//   const methods = {} as Record<string, CallableFunction>
//   for (const key of HTML_ELEMENTS) {
//     methods[key] = () => makeRounded(key)
//   }
//   return methods
// })(HTML_ELEMENT_NAMES)

// export const rounded: Rounded = Object.assign(makeRounded, roundedMethods)
