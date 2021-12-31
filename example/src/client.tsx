import React, { CSSProperties, forwardRef, useEffect, useState } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { render } from "react-dom"

import { chamfered, rounded, semiChamfered } from "~/index"

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
  background: black;
  display: flex;
  font-size: 5vmin;
  font-family: Charter;
  justify-content: center;
  align-items: center;
  padding: 30px;
  min-height: 500px;
`

const StyledDiv = styled.div(BoxStyles)

const MagicBox = forwardRef<HTMLDivElement, { style?: CSSProperties }>(
  ({ children, style }, ref) => {
    const [width, setWidth] = useState(`100%`)
    // useEffect(() => {
    //   setWidth(`50%`)
    //   const interval = setInterval(() => {
    //     setWidth((width) => (width === `100%` ? `50%` : `100%`))
    //   }, 2000)
    //   return () => clearInterval(interval)
    // }, [])
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

const RoundedDiv = styled(rounded(`div`))(BoxStyles)
const ChamferedSpan = styled(chamfered.span)(BoxStyles)
const SemiChamferedBox = styled(semiChamfered(MagicBox))(BoxStyles)

render(
  <Main>
    <StyledDiv style={{ borderRadius: `10px` }}>border-radius</StyledDiv>
    <RoundedDiv>rounded clip-path</RoundedDiv>
    <ChamferedSpan>chamfered clip-path</ChamferedSpan>
    <SemiChamferedBox>semi-chamfered clip-path</SemiChamferedBox>
  </Main>,
  document.getElementById(`root`)
)
