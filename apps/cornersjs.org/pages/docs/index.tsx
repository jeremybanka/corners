import { css } from "@emotion/react"

import { link } from "../../shared/link"

export default function DocRoot(): React.ReactNode {
	return (
		<>
			<h1>Docs</h1>
			{/* links to all the docs */}
			<ul
				css={css`
					display: flex;
					flex-flow: column nowrap;
					gap: 10px;
					li {
						list-style: none;
						display: flex;
						width: 100%;
						a {
							width: 100%;
							height: 80px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				`}
			>
				<li>
					<link.left href={`/docs/presets`}>Presets</link.left>
				</li>
				<li>
					<link.center href={`/docs/add-a-layer`}>Add a Layer</link.center>
				</li>
				<li>
					<link.right href={`/docs/use-clip-path`}>Use Clip Path</link.right>
				</li>
			</ul>
		</>
	)
}
