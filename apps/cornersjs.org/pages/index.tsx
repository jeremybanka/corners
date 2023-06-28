import { css } from "@emotion/react"
import { rounded } from "corners"
import Link from "next/link"

import {
  Animated,
  Basic,
  bounce,
  Combined,
  Pink,
  BasicExtended,
  ComponentSelectorsExtended,
} from "../shared/styles"

const ButtonStyles = css`
  width: 100%;
  border: none;
  background: #e3e3e3;
  color: black;
  font-size: 5vmin;
  padding: 10px;
  cursor: pointer;
`

function RoundedButton(): React.ReactNode {
  const RoundedButton = rounded.button.with({
    cornerSize: 30,
    useClipPath: true,
    above: { color: `transparent`, stroke: { color: `green`, width: 1 } },
  })

  return (
    <Link href="/docs/presets">
      <RoundedButton css={ButtonStyles}>Get Started!</RoundedButton>
    </Link>
  )
}

const Home = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}
  >
    <RoundedButton />
    <Basic>Cool Styles</Basic>
    <Pink>Pink text</Pink>
    <Combined>
      With <code>:hover</code>.
    </Combined>
    <Animated animation={bounce}>Let's bounce.</Animated>
    <ComponentSelectorsExtended>
      <BasicExtended>Nested</BasicExtended>
    </ComponentSelectorsExtended>
  </div>
)

export default Home
