export const isPlainObject = (
	input: unknown,
): input is Record<keyof any, unknown> =>
	typeof input === `object` &&
	input !== null &&
	Object.getPrototypeOf(input) === Object.prototype

// if you found what you were looking for, return true and break
export type InspectionResult = Partial<{
	pathComplete: true
	jobComplete: true
}>
export type InspectNode = (
	path: string,
	node: unknown,
) => InspectionResult | void

export const sprawl = (
	tree: Array<unknown> | object,
	inspector: InspectNode,
): void => {
	const walk = (path: string, node: unknown): InspectionResult | null => {
		const inspect = (path: string, node: unknown): InspectionResult | null => {
			const result = inspector(path, node)
			if (result) return result
			return null
		}
		const result = inspect(path, node)
		if (result?.jobComplete || result?.pathComplete) {
			return result
		}
		const subNodes = Array.isArray(node)
			? node.map((v, i) => [i, v])
			: isPlainObject(node)
			  ? Object.entries(node)
			  : []
		for (const [k, v] of subNodes) {
			const subResult = walk(`${path}/${k}`, v)
			if (subResult?.jobComplete) {
				return subResult
			}
		}
		return null
	}
	walk(``, tree)
}
