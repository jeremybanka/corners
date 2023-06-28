import { css } from "@emotion/react"
import { rounded } from "corners"
import Link from "next/link"

const ButtonStyles = css`
  width: 100%;
  border: none;
  background: #e3e3e3;
  color: black;
  font-size: 5vmin;
  padding: 10px;
  cursor: pointer;
`
const bubble = {
  link: rounded(Link, {
    cornerSize: 30,
    useClipPath: true,
    above: { color: `transparent`, stroke: { color: `green`, width: 1 } },
  }),
}

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
/// <reference types="@emotion/react/types/css-prop" />

const Home: React.FC = () => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
    `}
  >
    <bubble.link href={`/docs/presets`} />

    <header>
      <h1>Home</h1>
    </header>
    <main>
      <p>Home page content</p>
    </main>
  </div>
)

export default Home
