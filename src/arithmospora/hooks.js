import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import connectSources from './index'
import { arithmosporaSelector, proportionStatSelector } from './selectors'

export const useSources = (sources) => {
  useEffect(() => {
    connectSources(sources)
  }, [sources])
}

export const useStat = (source, group, stat, statSelector = (stat) => stat) => {
  return useSelector((state) =>
    arithmosporaSelector(source, group, stat, statSelector)
  )
}

export const useProportionStat = (
  source,
  group,
  stat,
  statSelector = (stat) => stat
) => {
  return useSelector((state) =>
    proportionStatSelector(state, source, group, stat, statSelector)
  )
}

export default useSources
