import type { AllHTMLAttributes, FC, ForwardRefExoticComponent } from "react"

import { DEFAULT_OPTIONS } from "~/constants/empties"
import type { HTMLTagName } from "~/constants/html"
import { HTML_TAG_NAMES } from "~/constants/html"

import { withCorners } from "./withCorners"
import type { CornerOptions, DrawCorner } from ".."

export const createComponentFactory = (
  baseOptions: Partial<CornerOptions> = {},
  ...corners: (DrawCorner | null)[]
): typeof componentFactory & {
  [K in HTMLTagName]: ReturnType<typeof componentFactory> & {
    with: (
      options: Partial<CornerOptions>
    ) => ReturnType<typeof componentFactory>
  }
} => {
  // rounded("div") or rounded(myForwardRefExoticComponent)
  const componentFactory = <P>(
    WrappedComponent: ForwardRefExoticComponent<P> | string,
    additionalOptions?: Partial<CornerOptions>
  ): FC<AllHTMLAttributes<any> & P> => {
    const options = { ...DEFAULT_OPTIONS, ...baseOptions, ...additionalOptions }
    // @ts-expect-error union type too complex. it's okay; this is internal
    return withCorners(WrappedComponent, options, ...corners)
  }

  // rounded.div
  // or
  // rounded.div.with({ cornerSize: 10, below: [{ blur: 2, color: "blue" }] })
  const componentFactoryWithTagProps =
    componentFactory as typeof componentFactory & {
      [K in HTMLTagName]: ReturnType<typeof componentFactory> & {
        with: (
          options: Partial<CornerOptions>
        ) => ReturnType<typeof componentFactory>
      }
    }
  HTML_TAG_NAMES.forEach((name) => {
    // @ts-expect-error our little secret 🤫
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

  return componentFactoryWithTagProps
}
