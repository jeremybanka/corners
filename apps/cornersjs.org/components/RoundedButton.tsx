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

export default function SemiChamferedButton(): React.ReactNode {
  const [clicked, setClicked] = useState(false)

  const ChamferedButton = rounded.button.with({
    cornerSize: 30,
    noClipping: true,
    above: { color: `transparent`, stroke: { color: `green`, width: 1 } },
  })

  return (
    <ChamferedButton onClick={() => setClicked(true)} css={ButtonStyles}>
      {clicked ? `CLICKED` : `Click me!`}
    </ChamferedButton>
  )
}
