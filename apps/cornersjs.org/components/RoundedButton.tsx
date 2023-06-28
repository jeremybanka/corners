import { useState } from "react"

import { css } from "@emotion/react"
import { rounded } from "corners"

const ButtonStyles = css`
  width: 100%;
  border: none;
  background: #e3e3e3;
  color: black;
  font-size: 5vmin;
  padding: 10px;
`

export default function RoundedButton(): React.ReactNode {
  const [clicked, setClicked] = useState(false)

  const RoundedButton = rounded.button.with({
    cornerSize: 30,
    above: { stroke: { color: `green`, width: 1 } },
  })

  return (
    <RoundedButton onClick={() => setClicked(true)} css={ButtonStyles}>
      {clicked ? `CLICKED` : `Click me!`}
    </RoundedButton>
  )
}
