import { css } from "@emotion/react"
import { rounded } from "corners"
import { useState } from "react"

const ButtonStyles = css`
  width: 100%;
  border: none;
  color: black;
  font-size: 5vmin;
  padding: 10px;
  background: transparent;
`

export default function UnclippedRoundedButton(): React.ReactNode {
	const [clicked, setClicked] = useState(false)

	const AdvancedButton = rounded.button.with({
		cornerSize: 30,
		useClipPath: false,
		above: { color: `transparent`, stroke: { color: `green`, width: 1 } },
		below: { color: `#e3e3e3` },
	})

	return (
		<AdvancedButton onClick={() => setClicked(true)} css={ButtonStyles}>
			{clicked ? `CLICKED` : `Click me!`}
		</AdvancedButton>
	)
}
