import React, { CSSProperties, forwardRef } from "react"

import styled from "@emotion/styled"
import { render } from "react-dom"

import { withChamferedCorners, withRoundedCorners } from "~/index"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const StyledBox = styled.div`
  width: 100%;
  height: 500px;
  color: white;
  background: black;
  display: flex;
  font-size: 5vmin;
  font-family: Charter;
  justify-content: center;
  align-items: center;
`

const Box = forwardRef<HTMLDivElement, { style?: CSSProperties }>(
  ({ children, style }, ref) => {
    return (
      <StyledBox ref={ref} style={style}>
        {children}
      </StyledBox>
    )
  }
)
Box.displayName = `Box`

const RoundedBox = withRoundedCorners(Box, 50)
const ChamferedBox = withChamferedCorners(Box, 50)

render(
  <Main>
    <StyledBox style={{ borderRadius: `25px` }}>border-radius</StyledBox>
    <RoundedBox>rounded clip-path</RoundedBox>
    <ChamferedBox>chamfered clip-path</ChamferedBox>
  </Main>,
  document.getElementById(`root`)
)
