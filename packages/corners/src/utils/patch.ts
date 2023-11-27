import { isPlainObject, sprawl } from "./sprawl"

export type Fragment<T> = { [K in keyof T]?: Fragment<T[K]> }

export const key =
	<T extends object>(k: keyof T) =>
	(obj: Exclude<object, null>): unknown =>
		(obj as Record<keyof any, any>)[k]

export const patch = <Base extends object>(
	base: Base,
	update: Fragment<Base>,
): Base => {
	const result = { ...base }
	sprawl(update, (path, node) => {
		if (path === ``) return
		const [_, ...pathParts] = path.split(`/`)
		const childKey = pathParts.pop()
		if (childKey === undefined) return
		const targetParent = pathParts.reduce<Record<keyof any, any>>(
			(acc, part) => (acc as Record<keyof any, any>)?.[part],
			result,
		)
		if (Array.isArray(targetParent[childKey]) && Array.isArray(node)) {
			targetParent[childKey] = [...targetParent[childKey], ...node]
		} else if (isPlainObject(targetParent[childKey]) && isPlainObject(node)) {
			targetParent[childKey] = { ...targetParent[childKey], ...node }
		} else {
			const nodeCopy = Array.isArray(node)
				? [...node]
				: typeof node === `object` && node !== null
				  ? { ...node }
				  : node
			targetParent[childKey] = nodeCopy
		}
	})
	return result
}
