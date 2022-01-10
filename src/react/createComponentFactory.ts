import type { AllHTMLAttributes, FC, ForwardRefExoticComponent } from "react"

import type { HTMLTagName } from "~/constants/html"
import { HTML_TAG_NAMES } from "~/constants/html"

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
  defaultCornerSize: number,
  ...corners: (DrawCorner | null)[]
): typeof componentFactory & {
  [K in HTMLTagName]: ReturnType<typeof componentFactory> & {
    with: (cornerSize: number) => ReturnType<typeof componentFactory>
  }
} => {
  const componentFactory = <P>(
    WrappedComponent: ForwardRefExoticComponent<P> | string,
    cornerSize?: number
  ): FC<AllHTMLAttributes<any> & P> =>
    withCorners(WrappedComponent, cornerSize ?? defaultCornerSize, ...corners)

  const componentFactoryWithTagProps =
    componentFactory as typeof componentFactory & {
      [K in HTMLTagName]: ReturnType<typeof componentFactory> & {
        with: (cornerSize: number) => ReturnType<typeof componentFactory>
      }
    }

  // HTML_TAG_NAMES.forEach((name) => {
  //   componentFactoryWithTagProps[name] = componentFactory(name)
  // })

  // const proxy = new Proxy(componentFactoryWithTagProps, {
  //   get(target, name: HTMLTagName) {
  //     return target(name)
  //   },
  // })

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
        return (size: number) => componentFactory(name, size)
      },
    })
  })

  // rounded.div
  // or
  // rounded.div.with({ cornerSize: 10, shadow: { blur: 2, color: "blue" } })

  return componentFactoryWithTagProps
}
