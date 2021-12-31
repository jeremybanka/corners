/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import * as React from "react"

import useLayoutEffect from "@react-hook/passive-layout-effect"
import rafSchd from "raf-schd"

import useLatest from "./useLatest"

const { ResizeObserver } = window

function useResizeObserver<T extends HTMLElement>(
  target: React.RefObject<T> | T | null,
  callback: UseResizeObserverCallback
) {
  const resizeObserver = getResizeObserver()
  const storedCallback = useLatest(callback)

  useLayoutEffect(() => {
    let didUnsubscribe = false
    const targetEl = target && `current` in target ? target.current : target
    if (!targetEl) return () => undefined

    function cb(entry: ResizeObserverEntry, observer: ResizeObserver) {
      if (didUnsubscribe) return
      storedCallback.current(entry, observer)
    }

    resizeObserver.subscribe(targetEl as HTMLElement, cb)

    return () => {
      didUnsubscribe = true
      resizeObserver.unsubscribe(targetEl as HTMLElement, cb)
    }
  }, [target, resizeObserver, storedCallback])

  return resizeObserver.observer
}

function createResizeObserver() {
  const callbacks: Map<Element, Array<UseResizeObserverCallback>> = new Map()
  const observer = new ResizeObserver(
    rafSchd((entries, obs) => {
      for (const entry of entries) {
        const cbs = callbacks.get(entry.target)
        cbs?.forEach((cb) => cb(entry, obs))
      }
    })
  )

  return {
    observer,
    subscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      observer.observe(target, { box: `border-box` })
      const cbs = callbacks.get(target) ?? []
      cbs.push(callback)
      callbacks.set(target, cbs)
    },
    unsubscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      const cbs = callbacks.get(target) ?? []
      if (cbs.length === 1) {
        observer.unobserve(target)
        callbacks.delete(target)
        return
      }
      const cbIndex = cbs.indexOf(callback)
      if (cbIndex !== -1) cbs.splice(cbIndex, 1)
      callbacks.set(target, cbs)
    },
  }
}

let _resizeObserver: ReturnType<typeof createResizeObserver>

const getResizeObserver = () =>
  !_resizeObserver ? (_resizeObserver = createResizeObserver()) : _resizeObserver

export type UseResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver
) => unknown

export default useResizeObserver
