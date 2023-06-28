import Emotion from "@emotion/styled"
import { rounded } from "corners"

const styled = {
  roundedDiv: Emotion(rounded.div.with({ cornerSize: 30 })),
}

export default styled.roundedDiv`
  background: #e3e3e3;
  font-size: 5vmin;
  font-family: Charter;
  padding: 30px;
`
