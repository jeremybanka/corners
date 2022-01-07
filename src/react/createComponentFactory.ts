import type { AllHTMLAttributes, FC, ForwardRefExoticComponent } from "react"

import type { HTMLElementName } from "~/constants/html"
import { HTML_ELEMENT_NAMES } from "~/constants/html"

import type { DrawCorner } from ".."
import { withCorners } from "./withCorners"

export interface ICorners {
  (...cornerFns: (DrawCorner | null)[]): {
    // (options: CornerOptions): ReturnType<typeof componentFactory>
    size: (s: number) => ReturnType<typeof createComponentFactory>
  }
}

export const corners: ICorners = (...cornerFns) => ({
  size: (s) => createComponentFactory(s, ...cornerFns),
})

const createComponentFactory = (
  cornerSize: number,
  ...corners: (DrawCorner | null)[]
): typeof componentFactory & {
  [K in HTMLElementName]: ReturnType<typeof componentFactory>
} => {
  const componentFactory = function <P>(
    WrappedComponent: ForwardRefExoticComponent<P> | string
  ): FC<AllHTMLAttributes<any> & P> {
    return withCorners(WrappedComponent, cornerSize, ...corners)
  }

  const enhancedComponentFactory =
    componentFactory as typeof componentFactory & {
      [K in HTMLElementName]: ReturnType<typeof componentFactory>
    }

  HTML_ELEMENT_NAMES.forEach((name) => {
    enhancedComponentFactory[name] = componentFactory(name)
  })

  return enhancedComponentFactory
}
