import { rounded } from "corners"

const RoundedDiv30 = rounded.div.with({
	cornerSize: 30,
	above: {
		stroke: { color: `cornflowerblue`, width: 6 },
	},
})

export function SuccessfulUseOfLayerStroke(): React.ReactNode {
	return (
		<RoundedDiv30
			style={{
				color: `cornflowerblue`,
				textAlign: `center`,
				fontSize: `5vmin`,
				padding: `30px`,
			}}
		>
			My border looks great! 😃
		</RoundedDiv30>
	)
}
