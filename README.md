<hr>

<div align="center">
  <img alt="corners logo" src="https://raw.githubusercontent.com/jeremybanka/corners/main/corners.png"/>
</div>

<br>

<p align="center">
  <a href="https://bundlephobia.com/result?p=corners">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/corners?style=for-the-badge&labelColor=333">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/corners">
    <img alt="Types" src="https://img.shields.io/npm/types/corners?style=for-the-badge&labelColor=333">
  </a>
  <a aria-label="Build status" href="https://github.com/jeremybanka/corners/actions/workflows/integration.yml">
    <img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/jeremybanka/corners/integration.yml?branch=main&style=for-the-badge&labelColor=333">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/corners">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/corners?style=for-the-badge&labelColor=333">
  </a>
  <a aria-label="License" href="https://github.com/jeremybanka/corners/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/jeremybanka/corners?style=for-the-badge&labelColor=333">
  </a>
</p>

```shell
npm i corners
```
```shell
pnpm add corners
```
<hr>

Create react components with angled or smooth-rounded corners.

* [Features](#features)
* [API](#api)
* [Examples](#examples)

## Features

- [x] premade component factories: 
  ```
  const MyRoundedButton = rounded.button
  ```
- [x] make your own factory: 
  ```
  const dogEared = corners(chamfer, null, null, null).size(40)
  const MyDogEaredButton = dogEared.button
  ```
- [x] CSS clip-path ensures corners are rendered as empty space
- [x] Components may be dynamically sized: a resize observer is used to detect changes to component size and update the clip-path
- [x] Specify the corner size when calling a factory (e.g. `rounded.size(10).div`)
- [x] Support for drop shadows (e.g. `corners(round).options({shadow: {...}}).div`)
- [x] Support for positioning elements outside of the target element
- [ ] Clipping Paths that are inset (or spread ?) from the target element
- [ ] Layers that are inset or spread from the target element
- [ ] Simultaneous use of clipping path and layers

## API

### corners
```ts
corners(...cornerFns).with({ cornerSize, useClipPath, above, below }) => ComponentFactory
```

Creates a new component factory with the given corner functions. The corner functions are applied in the order they are given.

| Argument    | Type                                               | Required? | Description                                                                       |
| ----------- | -------------------------------------------------- | --------- | --------------------------------------------------------------------------------- |
| cornerFns   | <code>Nullable<[DrawCorner](#drawcorner)>[]</code> | Yes       | 1, 2, or 4 functions that specify the corners for this factory in clockwise order |
| cornerSize  | `number`                                           | No        | Equivalent to `N` in css `border-radius: Npx`                                     |
| useClipPath | `boolean`                                          | No        | `true` is equivalent to css `overflow: hidden`                                    |
| above       | <code>Partial<[Layer](#layer)>[]</code>            | No        | Layers with the same shape as the component, but rendered above the component     |
| below       | <code>Partial<[Layer](#layer)>[]</code>            | No        | Layers with the same shape as the component, but rendered below the component     |

| Returns          | Type                                               | Description                                                                  |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| ComponentFactory | <code>[ComponentFactory](#componentfactory)</code> | A new component factory with the given corner functions and options applied. |

### DrawCorner 
#### (p1, p2, idx) => pathPoints

A function that draws a corner

| Argument | Type                        | Required? | Description                                                                                      |
| -------- | --------------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| p1       | `{ x: number; y: number; }` | Yes       | The first point of the corner                                                                    |
| p2       | `{ x: number; y: number; }` | Yes       | The second point of the corner                                                                   |
| idx      | `number`                    | Yes       | The index of the corner. `0` = top right, `1` = bottom right, `2` = bottom left, `3` = top left. |

| Returns    | Type       | Description       |
| ---------- | ---------- | ----------------- |
| pathPoints | `string[]` | svg path commands |

### Layer

A layer takes the same shape as the component it is applied to.

| Property | Type                | Required? | Description                    |
| -------- | ------------------- | --------- | ------------------------------ |
| color    | string              | Yes       | The color of the layer         |
| x        | number              | Yes       | The x offset of the layer      |
| y        | number              | Yes       | The y offset of the layer      |
| blur     | number              | Yes       | The blur radius of the layer   |
| spread   | number              | Yes       | The spread radius of the layer |
| stroke   | <code>Stroke</code> | No        | The stroke of the layer        |

## Examples

### Make a "dog-eared" component

```
 /¯¯¯¯¯¯¯¯¯|
/          |
|          |
|__________|
```

(it should look like a dog-eared page)


```jsx harmony
import type { FC } from "react"
import corners, { chamfer } from "corners"

const upperLeftDogeared = corners(null, null, null, chamfer).with({ cornerSize: 20 })

const DogearedDiv = upperLeftDogeared.div

const MyComponent: FC = () => (
  <DogEaredDiv style={{ background: "black" }}>
    Hello, World!
  </DogEaredDiv>
)
```

### Make a "squircled" component with a drop shadow



```jsx harmony
import type { FC } from "react"
import { rounded } from "corners"

const LAYER: Record<string, Partial<Layer>> = {
  FAINT_SHADOW: { color: `#0003`, spread: -4, blur: 12, y: -4 },
  LIGHT_FILL: { color: `#f3f3f3` },
}
const RoundedSpanWithShadow = rounded.span.with({
  cornerSize: 15,
  below: [LAYER.LIGHT_FILL, LAYER.FAINT_SHADOW],
  useClipPath: false,
})

const MyComponent: FC = () => (
  <RoundedSpanWithShadow>
    Hello, World!
  </RoundedSpanWithShadow>
)
```


## LICENSE

MIT
