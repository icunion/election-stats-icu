import { useEffect, useRef } from 'react'

/**
 * Retrieve the previous version of a given value.
 * @param {*} value - The value to store across renders
 * @returns - The previously stored value
 * @see https://blog.logrocket.com/accessing-previous-props-state-react-hooks/
 */
const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value // Assign the value of ref to the argument
  }, [value]) // This code will run when the value of 'value' changes
  return ref.current // In the end, return the current ref value.
}

export default usePrevious
