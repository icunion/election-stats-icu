const checkStatExists = (state, source, group, stat) => {
  return (
    'stats' in state &&
    source in state.stats.sources &&
    group in state.stats.sources[source] &&
    stat in state.stats.sources[source][group] &&
    Object.keys(state.stats.sources[source][group][stat]).length !== 0
  )
}

export const arithmosporaSelector = (
  state,
  source,
  group,
  stat,
  statSelector = (stat) => stat
) => {
  if (checkStatExists(state, source, group, stat)) {
    return statSelector(state.stats.sources[source][group][stat])
  } else {
    return undefined
  }
}

const makeProportionStat = (stateStat) => {
  let proportionStat = { ...stateStat.data }
  if (Object.keys(stateStat.dataPoints).length !== 0) {
    proportionStat.dataPoints = {}
    for (const dpKey in stateStat.dataPoints) {
      proportionStat.dataPoints[dpKey] = makeProportionStat(
        stateStat.dataPoints[dpKey]
      )
    }
  }
  return proportionStat
}

export const proportionStatSelector = (
  state,
  source,
  group,
  stat,
  statSelector = (stat) => stat
) => {
  if (checkStatExists(state, source, group, stat)) {
    return statSelector(
      makeProportionStat(state.stats.sources[source][group][stat])
    )
  } else {
    return statSelector({
      current: 0,
      total: 0,
      proportion: 0,
      percentage: 0,
      dataPoints: {}
    })
  }
}

export const rollingStatSelector = (
  state,
  source,
  interval,
  stat,
  statSelector = (stat) => stat
) => {
  const rollingStat = `${interval}:${stat}`
  if (checkStatExists(state, source, 'rolling', rollingStat)) {
    return statSelector(
      makeProportionStat(state.stats.sources[source]['rolling'][rollingStat])
    )
  } else {
    return statSelector({
      current: 0,
      total: 0,
      proportion: 0,
      percentage: 0,
      peakProportion: 0,
      peakPercentage: 0,
      dataPoints: {}
    })
  }
}

export const timedStatSelector = (
  state,
  source,
  stat,
  dataPoint,
  statSelector = (stat) => stat
) => {
  if (
    checkStatExists(state, source, 'timed', stat) &&
    dataPoint in state.stats.sources[source]['timed'][stat].dataPoints
  ) {
    return statSelector(state.stats.sources[source]['timed'][stat].dataPoints[dataPoint].data)
  } else {
    return statSelector({})
  }
}
