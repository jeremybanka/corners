import { css } from "@emotion/react"
import { chamfered } from "corners"

const BoxStyles = css`
  box-sizing: border-box;
  width: 100%;
  color: red;
  background: #e3e3e3;
  display: flex;
  font-size: 5vmin;
  font-family: Charter;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

const ChamferedDivWithStroke = chamfered.div.with({
  cornerSize: 10,
})

// eslint-disable-next-line
export default function Foo(): React.ReactNode {
  return (
    <ChamferedDivWithStroke css={BoxStyles}>
      Now is the time
    </ChamferedDivWithStroke>
  )
}
