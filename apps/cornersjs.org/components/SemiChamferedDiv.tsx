import { semiChamfered } from "corners"

export default function NowIsTheTime(): JSX.Element {
  return (
    <semiChamfered.div
      style={{
        fontFamily: `Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif`,
        background: `repeating-linear-gradient(
          45deg,
          #fd0,
          #fd0 10px,
          #fe0 10px,
          #fe0 20px
        )`,
        color: `black`,
        fontSize: `5vmin`,
        padding: `30px`,
        margin: `0 auto`,
      }}
    >
      now is the time
    </semiChamfered.div>
  )
}
