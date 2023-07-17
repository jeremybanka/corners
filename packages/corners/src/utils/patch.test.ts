import { patch } from "./patch"

describe(`patch`, () => {
	it(`should patch a simple object`, () => {
		expect(patch({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
	})
	it(`should patch a nested object`, () => {
		expect(patch({ a: { b: 1 } }, { a: { b: 2 } })).toEqual({ a: { b: 2 } })
	})
	it(`should patch a nested object with a null`, () => {
		expect(
			patch<{ a: { b: number } | null }>({ a: { b: 1 } }, { a: null }),
		).toEqual({
			a: null,
		})
	})
	it(`should write over a nullish stub with a path from the patch`, () => {
		expect(
			patch<{ a: number[] | null }>(
				{
					a: null,
				},
				{ a: [2] },
			),
		).toEqual({
			a: [2],
		})
		expect(patch<{ a?: number[] }>({}, { a: [2] })).toEqual({ a: [2] })
	})
})
