import { useState } from "react"

import { css } from "@emotion/react"
import { semiChamfered } from "corners"

const ButtonStyles = css`
  width: 100%;
  border: none;
  color: white;
  font-size: 5vmin;
  padding: 10px;
`

export default function SemiChamforedButton(): React.ReactNode {
  const [clicked, setClicked] = useState(false)

  const ChamferedButton = semiChamfered.button.with({
    cornerSize: 20,
    noClipping: true,
    above: [{ color: `transparent`, stroke: { color: `green`, width: 1 } }],
    below: [{ color: clicked ? `red` : `teal` }],
  })

  return (
    <ChamferedButton onClick={() => setClicked(true)} css={ButtonStyles}>
      {clicked ? `CLICKED` : `Click me!`}
    </ChamferedButton>
  )
}
