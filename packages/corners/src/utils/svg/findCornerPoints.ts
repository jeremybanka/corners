import type { PointPair } from "~/packages/corners/src/index"

export type FindCornerPoints = (
	cornerSize: number,
	height: number,
	width: number,
) => [PointPair, PointPair, PointPair, PointPair]

export const findCornerPointsForClipPath: FindCornerPoints = (
	cornerSize: number,
	height: number,
	width: number,
) => {
	const maxCornerSize = Math.min(cornerSize, Math.min(height, width) / 2)
	const cornerHeight = maxCornerSize / height
	const cornerWidth = maxCornerSize / width

	return [
		{ p1: { x: 1 - cornerWidth, y: 0 }, p2: { x: 1, y: cornerHeight } },
		{ p1: { x: 1, y: 1 - cornerHeight }, p2: { x: 1 - cornerWidth, y: 1 } },
		{ p1: { x: cornerWidth, y: 1 }, p2: { x: 0, y: 1 - cornerHeight } },
		{ p1: { x: 0, y: cornerHeight }, p2: { x: cornerWidth, y: 0 } },
	]
}

export const findCornerPointsForPath: FindCornerPoints = (
	cornerSize: number,
	h: number,
	w: number,
) => {
	const c = Math.min(cornerSize, Math.min(h, w) / 2)

	return [
		{ p1: { x: w - c, y: 0 }, p2: { x: w, y: c } },
		{ p1: { x: w, y: h - c }, p2: { x: w - c, y: h } },
		{ p1: { x: c, y: h }, p2: { x: 0, y: h - c } },
		{ p1: { x: 0, y: c }, p2: { x: c, y: 0 } },
	]
}
