import { useRef, useEffect } from "react"

const useLatest = <T>(current: T) => {
  const storedValue = useRef(current)
  useEffect(() => {
    storedValue.current = current
  })
  return storedValue
}

export default useLatest
