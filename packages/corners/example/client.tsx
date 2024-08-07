import { css } from "@emotion/react"
import styled from "@emotion/styled"
import type { CSSProperties, ReactNode } from "react"
import { forwardRef, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import type { Layer } from "~/packages/corners/src/index"
import { chamfered, rounded, semiChamfered } from "~/packages/corners/src/index"
import type { Fragment } from "~/packages/corners/src/utils/patch"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #eee;
  /* background: linear-gradient(to right, #333, #ccc),
    url(https://grainy-gradients.vercel.app/noise.svg); */
  // filter: contrast(170%) brightness(1000%);
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  align-items: stretch;
`

const BoxStyles = css`
  box-sizing: border-box;
  width: 100%;
  color: grey;
  display: flex;
  font-size: 5vmin;
  font-family: Charter;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const StyledDiv = styled.div(BoxStyles)

const MagicBox = forwardRef<
	HTMLDivElement,
	{ style?: CSSProperties; children?: ReactNode }
>(({ children, style }, ref) => {
	const [width, setWidth] = useState(`100%`)
	useEffect(() => {
		setWidth(`50%`)
		const interval = setInterval(() => {
			setWidth((w) => (w === `100%` ? `50%` : `100%`))
		}, 2000)
		return () => {
			clearInterval(interval)
		}
	}, [])
	return (
		<StyledDiv
			ref={ref}
			style={{
				...style,
				transitionProperty: `all`,
				transitionTimingFunction: `ease-in-out`,
				transitionDuration: `1.8s`,
				width,
			}}
		>
			{children}
		</StyledDiv>
	)
})
MagicBox.displayName = `MagicBox`

const RoundedDiv = styled(rounded.div)(BoxStyles)

const LAYER: Record<string, Fragment<Layer>> = {
	FAINT_SHADOW: { color: `#0003`, spread: -4, blur: 12, offset: { y: -4 } },
	LIGHT_FILL: { color: `#f3f3f3` },
	SOLID_STROKE: {
		color: `transparent`,
		stroke: { color: `#888`, width: 2 },
		className: `solid-stroke`,
	},
	DOTTED_STROKE: {
		color: `transparent`,
		stroke: { color: `#555`, width: 2, dashArray: [4, 8] },
		className: `dotted-stroke`,
	},
}

const ChamferedDivWithStroke = styled(
	chamfered.div.with({
		cornerSize: 10,
		below: LAYER.SOLID_STROKE,
		useClipPath: true,
	}),
)(BoxStyles)

const SemiChamferedSpanWithShadow = styled(
	semiChamfered.span.with({
		cornerSize: 15,
		below: [LAYER.FAINT_SHADOW, LAYER.LIGHT_FILL, LAYER.SOLID_STROKE],
		useClipPath: false,
	}),
)(BoxStyles)
const RoundedSectionWithShadow = styled(
	rounded.section.with({
		cornerSize: 15,
		below: [LAYER.LIGHT_FILL, LAYER.DOTTED_STROKE],
		useClipPath: false,
	}),
)(BoxStyles)
const SemiChamferedBox = styled(semiChamfered(MagicBox))(BoxStyles)

const rootElement = document.getElementById(`root`)
if (!rootElement) throw new Error(`Failed to find the root element`)
const root = createRoot(rootElement)
root.render(
	<Main>
		<StyledDiv style={{ background: `#ddd`, borderRadius: `10px` }}>
			border-radius
		</StyledDiv>
		<RoundedDiv
			style={{
				background: `#ddd`,
			}}
		>
			rounded, clip-path
		</RoundedDiv>
		<ChamferedDivWithStroke>
			chamfered, stroke layer below
		</ChamferedDivWithStroke>
		<SemiChamferedSpanWithShadow>
			semi-chamfered, solid stroke with fill & shadow layers below
		</SemiChamferedSpanWithShadow>
		<RoundedSectionWithShadow>
			rounded, dotted stroke with fill layer below
		</RoundedSectionWithShadow>
		<SemiChamferedBox
			style={{
				background: `#ddd`,
			}}
		>
			semi-chamfered clip-path
		</SemiChamferedBox>
	</Main>,
)
