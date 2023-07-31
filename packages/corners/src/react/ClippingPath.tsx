export type SvgClippingPathProps = {
	id: string
	d: string
}

export const SvgClippingPath = ({
	id,
	d,
}: SvgClippingPathProps): JSX.Element => (
	// rome-ignore lint/a11y/noSvgWithoutTitle: this is a decorative element
	<svg
		width="10"
		height="10"
		viewBox="0 0 10 10"
		style={{ position: `absolute`, opacity: 0, pointerEvents: `none` }}
	>
		<clipPath id={id} clipPathUnits="objectBoundingBox">
			<path d={d} />
		</clipPath>
	</svg>
)
