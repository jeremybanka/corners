import type { FC } from "react"

import { DEFAULT_LAYER } from "~/constants/empties"

import type { Layer, Pathfinder, Scraps } from ".."
import { harvest } from ".."

export const SvgLayers: FC<{
  pathfinder: Pathfinder
  above: Scraps<Layer>
  below: Scraps<Layer>
  base: {
    height: number
    width: number
    cornerSize: number
  }
}> = ({ pathfinder, above, below, base }) => {
  return (
    <>
      {[below, above].map((layerScraps, idx) => {
        const layers: Layer[] = harvest(DEFAULT_LAYER)(layerScraps)
        return layers.map(({ spread, color, blur, offset, stroke }) => {
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
            <svg
              key={`${idx === 0 ? `below` : `above`}-${offset.x}-${
                offset.y
              }-${spread}-${color}-${blur}-${stroke}`}
              width={width + strokeWidth}
              height={height + strokeWidth}
              viewBox={viewBox.join(` `)}
              fillRule="evenodd"
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
        })
      })}
    </>
  )
}
