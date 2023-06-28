import Emotion from "@emotion/styled"
import { semiChamfered } from "corners"

const styled = {
  semiChamferedDiv: Emotion(semiChamfered.div.with({ cornerSize: 30 })),
}

export default styled.semiChamferedDiv`
  background: #e3e3e3;
  font-size: 5vmin;
  font-family: Charter;
  padding: 30px;
`
