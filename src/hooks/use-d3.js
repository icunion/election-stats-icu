import { useEffect, useRef } from 'react'
import d3 from '../d3-import'

export const useD3 = (renderChartFunction, dependencies) => {
  const ref = useRef()

  useEffect(() => {
    renderChartFunction(d3.select(ref.current), dependencies)
    return () => {}
  }, dependencies)

  return ref
}

export default useD3
