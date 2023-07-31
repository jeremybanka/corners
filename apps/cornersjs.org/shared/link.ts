import { css } from "@emotion/react"
import Emotion from "@emotion/styled"
import corners, { chamfer } from "corners"
import { motion } from "framer-motion"
import Link from "next/link"

const shape = (...params: Parameters<typeof corners>) =>
	Emotion(
		corners(...params).options({
			cornerSize: 12,
			useClipPath: false,
			below: [
				{ stroke: { color: `var(--fg-color)`, width: 1 }, className: `stroke` },
			],
		})(motion(Link)),
	)

const styled = {
	linkLeft: shape(null, null, null, chamfer),
	linkCenter: shape(null),
	linkRight: shape(null, chamfer, null, null),
	anchorRight: Emotion(
		corners(null, chamfer, null, null).options({
			cornerSize: 12,
			useClipPath: false,
			below: [
				{ color: `var(--bg-color)`, className: `fill` },
				{ stroke: { color: `var(--fg-color)`, width: 1 }, className: `stroke` },
			],
		})(`a`),
	),
	linkMain: Emotion(
		corners(null, chamfer, null, null).options({
			cornerSize: 12,
			useClipPath: false,
			below: [
				{ color: `var(--hyperlink-color)`, className: `fill` },
				{ stroke: { color: `var(--fg-color)`, width: 2 }, className: `stroke` },
			],
		})(motion(Link)),
	),
}

const commonCss = css`
	font-family: manufab;
	font-variation-settings: "wght" 600;
	font-size: 24px;
	padding: 10px 20px 8px;
	background: none;
	border: none;
	color: var(--bg-color);
	&:hover {
		transform: scale(1.025);
	}
	&:active {
		transform: scale(0.975);
		
	}
`

export const link = {
	left: styled.linkLeft`
		${commonCss}
		color: var(--fg-color);
	`,
	center: styled.linkCenter`
		${commonCss}
		color: var(--fg-color);
	`,
	right: styled.linkRight`
		${commonCss}
		color: var(--fg-color);
	`,

	main: styled.linkMain`
		${commonCss}
		svg.fill > path {
			fill: var(--fg-color);
		}
	`,
}

export const anchor = {
	right: styled.anchorRight`
		${commonCss}
		color: var(--fg-color);
	`,
}
