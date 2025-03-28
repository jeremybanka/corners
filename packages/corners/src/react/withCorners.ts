import type {
	AllHTMLAttributes,
	ComponentType,
	CSSProperties,
	FC,
	ReactNode,
} from "react"
import { createElement, useId, useRef } from "react"

import type { CornerOptions, DrawCorner } from ".."
import {
	createClipPathfinder,
	createPathfinder,
} from "../utils/svg/createPathfinder"
import { SvgClippingPath } from "./ClippingPath"
import { SvgLayers } from "./SvgLayers"
import { useSize } from "./useSize"

export function withCorners<
	P extends { style?: CSSProperties; children?: ReactNode },
>(
	WrappedComponent: ComponentType<P> | string,
	options: CornerOptions,
	...corners: (DrawCorner | null)[]
): FC<AllHTMLAttributes<any> & P> {
	const { cornerSize, useClipPath, above, below } = options
	const clipPathfinder = useClipPath
		? createClipPathfinder(cornerSize, ...corners)
		: null
	const pathfinder =
		above || below ? createPathfinder(cornerSize, ...corners) : null

	const WithCorners: FC<P> = (props) => {
		const pathId = useId ? useId() : Math.random().toString()
		const nodeRef = useRef<HTMLElement>(null as any)
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
			`children` in props ? props.children : null,
		)
	}
	return WithCorners
}
