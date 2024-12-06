import { chamfered } from "corners"

export default function NowIsAlmostTheTime(): React.ReactNode {
	return (
		<chamfered.div
			style={{
				fontFamily: `Copperplate`,
				background: `#db9`,
				color: `#ca8`,
				fontSize: `7vmax`,
				padding: `3vmax`,
				margin: `0 auto`,
			}}
		>
			now is almost the time
		</chamfered.div>
	)
}
