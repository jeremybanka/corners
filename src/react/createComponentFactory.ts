import type { AllHTMLAttributes, FC, ForwardRefExoticComponent } from "react"

import { DEFAULT_OPTIONS } from "~/constants/empties"
import type { HTMLTagName } from "~/constants/html"
import { HTML_TAG_NAMES } from "~/constants/html"

import type { CornerOptions, DrawCorner } from ".."
import { withCorners } from "./withCorners"

export interface ICorners {
  (...cornerFns: (DrawCorner | null)[]): {
    options: (
      opts: Partial<CornerOptions>
    ) => ReturnType<typeof createComponentFactory>
    size: (s: number) => ReturnType<typeof createComponentFactory>
  }
}

export const corners: ICorners = (...cornerFns) => ({
  options: (opts) => createComponentFactory(opts, ...cornerFns),
  size: (cornerSize) => createComponentFactory({ cornerSize }, ...cornerFns),
})

const createComponentFactory = (
  baseOptions: Partial<CornerOptions> = {},
  ...corners: (DrawCorner | null)[]
): typeof componentFactory & {
  [K in HTMLTagName]: ReturnType<typeof componentFactory> & {
    with: (
      options: Partial<CornerOptions>
    ) => ReturnType<typeof componentFactory>
  }
} => {
  const componentFactory = <P>(
    WrappedComponent: ForwardRefExoticComponent<P> | string,
    additionalOptions?: Partial<CornerOptions>
  ): FC<AllHTMLAttributes<any> & P> => {
    const options = { ...DEFAULT_OPTIONS, ...baseOptions, ...additionalOptions }
    return withCorners(WrappedComponent, options, ...corners)
  }

  const componentFactoryWithTagProps =
    componentFactory as typeof componentFactory & {
      [K in HTMLTagName]: ReturnType<typeof componentFactory> & {
        with: (
          options: Partial<CornerOptions>
        ) => ReturnType<typeof componentFactory>
      }
    }

  HTML_TAG_NAMES.forEach((name) => {
    // @ts-expect-error our little secret
    componentFactoryWithTagProps[`__` + name] = componentFactory(name)
    Object.defineProperty(componentFactoryWithTagProps, name, {
      get() {
        return componentFactoryWithTagProps[`__` + name]
      },
    })
    Object.defineProperty(componentFactoryWithTagProps[name], `with`, {
      get() {
        return (options: Partial<CornerOptions>) =>
          componentFactory(name, options)
      },
    })
  })

  // rounded.div
  // or
  // rounded.div.with({ cornerSize: 10, shadow: { blur: 2, color: "blue" } })

  return componentFactoryWithTagProps
}
