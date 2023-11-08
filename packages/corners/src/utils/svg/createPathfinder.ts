import type { DrawCorner, PointPair } from "~/packages/corners/src"
import { straight } from "~/packages/corners/src/preset/corners"

import type { FindCornerPoints } from "./findCornerPoints"
import {
	findCornerPointsForClipPath,
	findCornerPointsForPath,
} from "./findCornerPoints"

type SvgPathString = string

export type Pathfinder = (
	height: number,
	width: number,
	cornerSize?: number,
) => SvgPathString

export type CreatePathfinder = (
	defaultCornerSize: number,
	...corners: (DrawCorner | null)[]
) => Pathfinder

const createPathfinderCore =
	(findCornerPoints: FindCornerPoints): CreatePathfinder =>
	(defaultCornerSize, ...corners) => {
		const fourCorners = expandCorners(...corners)
		return (height, width, cornerSize = defaultCornerSize) => {
			if ([height, width, cornerSize].includes(0)) {
				return ``
			}
			const cornerPoints = findCornerPoints(cornerSize, height, width)
			return findPath(cornerPoints, fourCorners)
		}
	}

export const createPathfinder = createPathfinderCore(findCornerPointsForPath)

export const createClipPathfinder = createPathfinderCore(
	findCornerPointsForClipPath,
)

type ExpandCorners = (
	...corners: (DrawCorner | null)[]
) => [DrawCorner, DrawCorner, DrawCorner, DrawCorner]

const expandCorners: ExpandCorners = (...corners) => {
	if ([1, 2, 4].includes(corners.length) === false) {
		throw new Error(`Expected 1, 2, or 4 corners, got ${corners.length}`)
	}
	const A = corners[0] ?? straight
	const B = 1 in corners ? corners[1] ?? straight : A
	const C = 2 in corners ? corners[2] ?? straight : A
	const D = 3 in corners ? corners[3] ?? straight : 1 in corners ? B : A
	return [A, B, C, D]
}

export const findPath = (
	cornerPoints: [PointPair, PointPair, PointPair, PointPair],
	corners: [DrawCorner, DrawCorner, DrawCorner, DrawCorner],
): SvgPathString =>
	cornerPoints.reduce((acc, { p1, p2 }, idx) => {
		const drawCorner = corners[idx]
		return acc + drawCorner(p1, p2, idx).join(`\n`) + `\n`
	}, ``) + `Z`
