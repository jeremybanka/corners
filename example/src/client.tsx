import type { CSSProperties } from "react"
import React, { forwardRef, useEffect, useState } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { createRoot } from "react-dom"

import corners, { chamfered, rounded, semiChamfered } from "~/index"
import type { CornerSpec } from "~/utils/svg"
import { createCorner } from "~/utils/svg"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(to right, #333, #ccc),
    url(https://grainy-gradients.vercel.app/noise.svg);
  // filter: contrast(170%) brightness(1000%);
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  align-items: stretch;
`

const BoxStyles = css`
  box-sizing: border-box;
  width: 100%;
  color: white;
  background: #222a;
  display: flex;
  font-size: 5vmin;
  font-family: Charter;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const StyledDiv = styled.div(BoxStyles)

const MagicBox = forwardRef<HTMLDivElement, { style?: CSSProperties }>(
  ({ children, style }, ref) => {
    const [width, setWidth] = useState(`100%`)
    useEffect(() => {
      setWidth(`50%`)
      const interval = setInterval(() => {
        setWidth((width) => (width === `100%` ? `50%` : `100%`))
      }, 2000)
      return () => clearInterval(interval)
    }, [])
    return (
      <StyledDiv
        ref={ref}
        style={{
          ...style,
          transitionProperty: `width`,
          transitionTimingFunction: `ease-in-out`,
          transitionDuration: `1.8s`,
          width,
        }}
      >
        {children}
      </StyledDiv>
    )
  }
)
MagicBox.displayName = `MagicBox`

const RoundedSpec: CornerSpec = [
  [`curve`, { x: 0.438, y: 0 }, { x: 0.68, y: 0 }, { x: 0.84, y: 0.16 }],
  [`symmetric`, { x: 1, y: 0.562 }],
]
const roundFromCreate = createCorner(RoundedSpec)
const rounded2 = corners(roundFromCreate).size(20)

const RoundedDiv = styled(rounded(`div`))(BoxStyles)
const RoundedDiv2 = styled(rounded2(`div`))(BoxStyles)

const ChamferedSpan = styled(chamfered.span)(BoxStyles)
const SemiChamferedBox = styled(semiChamfered(MagicBox))(BoxStyles)

const rootElement = document.getElementById(`root`)
if (!rootElement) throw new Error(`Failed to find the root element`)
const root = createRoot(rootElement)
root.render(
  <Main>
    <StyledDiv style={{ borderRadius: `10px` }}>border-radius</StyledDiv>
    <RoundedDiv>rounded clip-path</RoundedDiv>
    <RoundedDiv2>rounded clip-path</RoundedDiv2>
    <ChamferedSpan>chamfered clip-path</ChamferedSpan>
    <SemiChamferedBox>semi-chamfered clip-path</SemiChamferedBox>
  </Main>
)
