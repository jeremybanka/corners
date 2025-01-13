import type { AllHTMLAttributes, ComponentType } from "react"

import { DEFAULT_OPTIONS } from "~/packages/corners/src/constants/empties"
import type { HTMLTagName } from "~/packages/corners/src/constants/html"
import { HTML_TAG_NAMES } from "~/packages/corners/src/constants/html"

import type { CornerOptions, DrawCorner } from ".."
import { withCorners } from "./withCorners"

export const createComponentFactory = (
	baseOptions: Partial<CornerOptions> = {},
	...corners: (DrawCorner | null)[]
): typeof componentFactory & {
	[K in HTMLTagName]: ReturnType<typeof componentFactory> & {
		with: (
			options: Partial<CornerOptions>,
		) => ReturnType<typeof componentFactory>
	}
} => {
	// rounded("div") or rounded(myForwardRefExoticComponent)
	const componentFactory = <P>(
		WrappedComponent: ComponentType<P> | string,
		additionalOptions?: Partial<CornerOptions>,
	): ComponentType<AllHTMLAttributes<any> & P> => {
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
					options: Partial<CornerOptions>,
				) => ReturnType<typeof componentFactory>
			}
		}
	for (const name of HTML_TAG_NAMES) {
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
	}

	return componentFactoryWithTagProps
}
