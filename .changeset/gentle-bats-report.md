---
"corners": patch
---

💄✨ Layers created using the layers API can now include className. The idea is to make it more convenient to target layers with styling changes.
  
  ```tsx
  // src/components/containers/LAYER.ts
  export const LAYER: Record<string, Layer> = {
    DOTTED_STROKE: {
      className: "dotted-stroke",                   // <--- new
      stroke: {
        color: "black",
        width: 1,
        dashPattern: [2, 2],
      }
    }
    SOFT_SPREAD_SHADOW: {
      className: "soft-spread-shadow",              // <--- new
      shadow: {
        color: "black",
        spread: 2,
        blur: 20,
        offset: { x: 0, y: 2 },
      }
    }
  } as const 
  // src/components/containers/button.ts
  import Emotion from "@emotion/styled"
  import { rounded } from "corners"

  import { LAYER } from "./LAYER"

  const styled = {
    dottedStrokeButton: Emotion(
      rounded.button, {
        noClipping: true,
        below: [
          LAYER.SOFT_SPREAD_SHADOW,
          LAYER.DOTTED_STROKE,
        ],
      }
    ),
  }
  export const button = {
    softDottedStroke: styled.dottedStrokeButton`
      &:hover {
        > svg.dotted-stroke > path {                // <--- permits targeting!
          // ... //
        }
        > svg.soft-spread-shadow > path {           // <--- permits targeting!
          // ... //
        }
      }
    `
  }
  // src/components/Component.tsx
  import { button } from "./containers/button"

  const Component = () => (
    <button.softDottedStroke>
      This renders a {`<button>`} node with {`<svg>`} nodes inside it, sized to fit the button.
    </button.softDottedStroke>
  )
  ```
