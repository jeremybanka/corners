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

export default function UnclippedRoundedButton(): React.ReactNode {
  const [clicked, setClicked] = useState(false)

  const AdvancedButton = rounded.button.with({
    cornerSize: 30,
    useClipPath: false,
    above: { color: `transparent`, stroke: { color: `green`, width: 10 } },
    below: { color: `#e3e3e3` },
  })

  return (
    <AdvancedButton onClick={() => setClicked(true)} css={ButtonStyles}>
      {clicked ? `CLICKED` : `Click me!`}
    </AdvancedButton>
  )
}
