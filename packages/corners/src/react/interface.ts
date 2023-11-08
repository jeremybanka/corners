import type { CornerOptions, DrawCorner } from ".."
import { createComponentFactory } from "./createComponentFactory"

export interface Corners {
	(...cornerFns: (DrawCorner | null)[]): {
		options: (
			opts: Partial<CornerOptions>,
		) => ReturnType<typeof createComponentFactory>
		size: (s: number) => ReturnType<typeof createComponentFactory>
	}
}

export const corners: Corners = (...cornerFns) => ({
	options: (opts) => createComponentFactory(opts, ...cornerFns),
	size: (cornerSize) => createComponentFactory({ cornerSize }, ...cornerFns),
})
