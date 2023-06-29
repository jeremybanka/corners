import { rounded } from "corners"

const RoundedDiv60 = rounded.div.with({ cornerSize: 77 })

export default function RoundedDiv(): JSX.Element {
  return (
    <RoundedDiv60
      style={{
        fontFamily: `Manufab`,
        fontWeight: 500,
        textAlign: `center`,
        background: `#eee3`,
        color: `var(--bg-color)`,
        fontSize: `3vmin`,
        padding: `12px`,
        margin: `0 auto`,
        minHeight: `33vh`,
        minWidth: `77vw`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
    >
      ♥️ <br />
      corners.js
    </RoundedDiv60>
  )
}
