import { rounded } from "corners"

const RoundedDiv30 = rounded.div.with({ cornerSize: 30 })

export function ProblematicUseOfCssBorder(): JSX.Element {
  return (
    <RoundedDiv30
      style={{
        color: `red`,
        textAlign: `center`,
        borderWidth: `3px`,
        borderColor: `red`,
        borderStyle: `solid`,
        fontSize: `5vmin`,
        padding: `30px`,
      }}
    >
      My border looks wrong... ☹️
    </RoundedDiv30>
  )
}
