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
}> = ({ pathfinder, base, above, below: belowOriginal }) => {
  const below = belowOriginal
    ? [...(normalizeLayers(belowOriginal) as Layer[])].reverse()
    : null
  return (
    <>
      {[below, above].map((layers, idx) =>
        normalizeLayers(layers)?.map(
          ({ spread, color, blur, x, y, stroke, blendMode }) => {
            const height = Math.max(base.height + spread, 0)
            const width = Math.max(base.width + spread, 0)
            const cornerSize = Math.max(base.cornerSize + spread, 1)
            const strokeWidth = stroke?.width ?? 0
            // const viewBox = [0, 0, width, height]
            const viewBox = [
              -0.5 * strokeWidth,
              -0.5 * strokeWidth,
              width + strokeWidth,
              height + strokeWidth,
            ]
            return (
              <svg
                key={`${
                  idx === 0 ? `below` : `above`
                }-${x}-${y}-${spread}-${color}-${blur}-${stroke}`}
                width={width + strokeWidth}
                height={height + strokeWidth}
                viewBox={viewBox.join(` `)}
                fillRule="evenodd"
                style={{
                  position: `absolute`,
                  top: -0.5 * (spread + strokeWidth) - y,
                  left: -0.5 * (spread + strokeWidth) + x,
                  pointerEvents: `none`,
                  zIndex: idx === 0 ? -1 : 1,
                  filter: blur ? `blur(${blur}px)` : undefined,
                  mixBlendMode: blendMode,
                }}
              >
                <path
                  d={pathfinder(height, width, cornerSize)}
                  fill={color}
                  stroke={stroke?.color}
                  strokeDasharray={stroke?.dashArray?.join(` `)}
                  strokeWidth={stroke?.width}
                />
                {/* {stroke && (
                  <path
                    d={pathfinder(
                      height - stroke * 2,
                      width - stroke * 2,
                      Math.max(cornerSize - stroke * 2, 1)
                    )}
                    //fill="none"
                  />
                )} */}
              </svg>
            )
          }
        )
      )}
    </>
  )
}
