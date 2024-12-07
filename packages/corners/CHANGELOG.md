# corners

## 0.1.1

### Patch Changes

- b34d125: ✨ Compatibility with React 19.

## 0.1.0

### Minor Changes

- a0b5fe3: 💥 BREAKING CHANGE: Backgrounds of layers no longer default to ⬛ `black` but to 🏁 `transparent` instead.
- 8479511: 💥 BREAKING CHANGE: When `useClipPath` is `false`, css `background` is no longer automatically made 🏁 `transparent`.
- 8479511: 💥 BREAKING CHANGE: The use of `clip-path` remains on by default. however, the flag has been renamed from `noClipping` to `useClipPath`. `useClipPath: false` overrides the default behavior in the same way `noClipping: true` did previously.

## 0.0.14

### Patch Changes

- 8700300: ✨ Export `interpolate` utility for drawing corners. It's a simple utility, useful for placing a point partway between two other points. (e.g., `x: interpolate(p1.x, p2.x, 0.5)`)
- 8e4172b: 💄✨ Layers created using the layers API can now include className. The idea is to make it more convenient to target layers with styling changes.

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

## 0.0.13

### Patch Changes

- 7a7b67b: fix import bug
- ada3996: change build

## 0.0.12

### Patch Changes

- 0766edb: don't break builds with weird custom paths

## 0.0.11

### Patch Changes

- 2587a41: Internal cleanup

  I changed the `package.json` file to organize dependencies better.

## 0.0.10

### Patch Changes

- c87c74d: Internal Refactoring of the Layers System

## 0.0.9

### Patch Changes

- c74b24d: Layers API

  The Layers API is a new fluent API that provides an alternative to svg clipping paths.

  It is meant for adding shadows and strokes to your corner component that can extend beyond its original boundaries.

## 0.0.8

### Patch Changes

- d4e10a5: Shadow, Stroke, and Fill Layers without clip-path
