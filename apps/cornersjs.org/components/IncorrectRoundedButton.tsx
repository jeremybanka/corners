import Emotion from "@emotion/styled"
import { rounded } from "corners"

const styled = {
  roundedButton: Emotion(rounded.button.with({ cornerSize: 30 })),
}

export default styled.roundedButton`
  background: #e3e3e3;
  border-width: 3px;
  border-color: #000000;
  border-style: solid;
  font-size: 5vmin;
  padding: 30px;
`
