type ArgumentsOf<T> = T extends (...args: infer U) => unknown ? U : never

type ScheduledFn<T extends VoidFunction> = T & { cancel(): void }

const throttle = <T extends VoidFunction>(fn: T): ScheduledFn<T> => {
  let lastArgs: ArgumentsOf<T> | [] = []
  let frameId: number | null = null

  const wrapperFn = (...args: ArgumentsOf<T>) => {
    // Always capture the latest value
    lastArgs = args

    // There is already a frame queued
    if (frameId) {
      return
    }

    // Schedule a new frame
    frameId = requestAnimationFrame(() => {
      frameId = null
      // @ts-expect-error lastArgs is always appropriate for this purpose
      fn(...lastArgs)
    })
  }

  // Adding cancel property to result function
  wrapperFn.cancel = () => {
    if (!frameId) {
      return
    }

    cancelAnimationFrame(frameId)
    frameId = null
  }

  return wrapperFn as ScheduledFn<T>
}

export default throttle
