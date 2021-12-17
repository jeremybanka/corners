import type { MutableRefObject } from "react"
import { useState, useLayoutEffect } from "react"

import useResizeObserver from "@react-hook/resize-observer"

export const useSize = (
  target: MutableRefObject<HTMLElement | null>
): DOMRect => {
  const [size, setSize] = useState<DOMRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
  })

  useLayoutEffect(() => {
    if (target?.current) setSize(target.current.getBoundingClientRect())
  }, [target])

  useResizeObserver(target, (entry) => setSize(entry.contentRect))
  return size
}
