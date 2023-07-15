import { bubble } from "../../shared/containers"

export default function DocRoot(): React.ReactNode {
  return (
    <>
      <h1>Docs</h1>
      {/* links to all the docs */}
      <ul>
        <li>
          <bubble.link href={`/docs/presets`}>Presets</bubble.link>
        </li>
        <li>
          <bubble.link href={`/docs/add-a-layer`}>Add a Layer</bubble.link>
        </li>
        <li>
          <bubble.link href={`/docs/use-clip-path`}>Use Clip Path</bubble.link>
        </li>
      </ul>
    </>
  )
}
