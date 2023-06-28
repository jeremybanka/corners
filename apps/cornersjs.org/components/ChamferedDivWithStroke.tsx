import Emotion from "@emotion/styled"
import { chamfered } from "corners"

const styled = {
  chamferedDiv: Emotion(chamfered.div.with({ cornerSize: 30 })),
}

export default styled.chamferedDiv`
  box-sizing: border-box;
  width: 100%;
  color: red;
  background: #e3e3e3;
  display: flex;
  font-size: 5vmin;
  font-family: Charter;
  justify-content: center;
  align-items: center;
  padding: 30px;
`
