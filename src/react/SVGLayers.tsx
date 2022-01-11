import type { FC } from "react"
import React from "react"

import { DEFAULT_LAYER } from "~/constants/empties"

import type { Layer, Pathfinder } from ".."

const normalizeLayers = (
  layers: Partial<Layer> | Partial<Layer>[] | null
): Layer[] | null => {
  if (layers === null) return null
  const layersArray = Array.isArray(layers) ? layers : [layers]
  return layersArray.map((layer) => ({ ...DEFAULT_LAYER, ...layer }))
}

export const SVGLayers: FC<{
  pathfinder: Pathfinder
  above: Partial<Layer> | Partial<Layer>[] | null
  below: Partial<Layer> | Partial<Layer>[] | null
  base: {
    height: number
    width: number
    cornerSize: number
  }
}> = ({ pathfinder, base, above, below }) => {
  return (
    <>
      {[below, above].map((layers, idx) =>
        normalizeLayers(layers)?.map(({ spread, color, blur, x, y, stroke }) => {
          const height = base.height + spread
          const width = base.width + spread
          const cornerSize = base.cornerSize + spread
          return (
            <svg
              key={`${
                idx === 0 ? `below` : `above`
              }-${x}-${y}-${spread}-${color}-${blur}-${stroke}`}
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              style={{
                position: `absolute`,
                top: -0.5 * spread,
                left: -0.5 * spread,
                pointerEvents: `none`,
                zIndex: idx === 0 ? -1 : 1,
              }}
            >
              <path d={pathfinder(height, width, cornerSize)} fill={color} />
            </svg>
          )
        })
      )}
    </>
  )
}
