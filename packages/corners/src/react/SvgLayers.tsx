import type { ReactNode } from "react"

import { DEFAULT_LAYER } from "~/packages/corners/src/constants/empties"

import type { Layer, Pathfinder, Scraps } from ".."
import { harvest } from ".."

export type SvgLayersProps = {
	pathfinder: Pathfinder
	above: Scraps<Layer>
	below: Scraps<Layer>
	base: {
		height: number
		width: number
		cornerSize: number
	}
}

export const SvgLayers = ({
	pathfinder,
	above,
	below,
	base,
}: SvgLayersProps): ReactNode => {
	return (
		<>
			{[below, above].map((layerScraps, idx) => {
				const layers: Layer[] = harvest(DEFAULT_LAYER)(layerScraps)
				return layers.map(
					({ spread, color, blur, offset, stroke, className }) => {
						const height = Math.max(base.height + spread, 0)
						const width = Math.max(base.width + spread, 0)
						const cornerSize = Math.max(base.cornerSize + spread, 1)
						const strokeWidth = stroke?.width ?? 0
						const viewBox = [
							-0.5 * strokeWidth,
							-0.5 * strokeWidth,
							width + strokeWidth,
							height + strokeWidth,
						]
						const d = pathfinder(height, width, cornerSize)
						return (
							// biome-ignore lint/a11y/noSvgWithoutTitle: this is a decorative element
							<svg
								key={`${idx === 0 ? `below` : `above`}-${offset.x}-${
									offset.y
								}-${spread}-${color}-${blur}-${stroke?.width}`}
								width={width + strokeWidth}
								height={height + strokeWidth}
								viewBox={viewBox.join(` `)}
								fillRule="evenodd"
								className={className}
								style={{
									position: `absolute`,
									top: -0.5 * (spread + strokeWidth) - offset.y,
									left: -0.5 * (spread + strokeWidth) + offset.x,
									pointerEvents: `none`,
									zIndex: idx === 0 ? -1 : 1,
									filter: blur ? `blur(${blur}px)` : undefined,
								}}
							>
								<path
									d={d}
									fill={color}
									stroke={stroke?.color}
									strokeDasharray={stroke?.dashArray?.join(` `)}
									strokeWidth={stroke?.width}
								/>
							</svg>
						)
					},
				)
			})}
		</>
	)
}
