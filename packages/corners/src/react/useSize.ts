import type { RefObject } from "react"
import { useLayoutEffect, useState } from "react"

import useResizeObserver from "@react-hook/resize-observer"

type Scale2d = {
	width: number
	height: number
}

export const useSize = (target: RefObject<HTMLElement>): Scale2d => {
	const [size, setSize] = useState<Scale2d>({
		width: 0,
		height: 0,
	})

	useLayoutEffect(() => {
		if (target?.current) {
			const boundingRect = target.current.getBoundingClientRect()
			setSize(boundingRect)
		}
	}, [target])

	useResizeObserver(target, (entry) => {
		setSize({
			height: entry.borderBoxSize[0].blockSize,
			width: entry.borderBoxSize[0].inlineSize,
		})
	})
	return size
}
