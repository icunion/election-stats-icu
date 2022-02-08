const checkStatExists = (state, source, group, stat) => {
  return (
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

export const proportionStatSelector = (state, source, group, stat) => {
  if (checkStatExists(state, source, group, stat)) {
    return makeProportionStat(state.stats.sources[source][group][stat])
  } else {
    return {
      current: 0,
      total: 0,
      proportion: 0,
      percentage: 0
    }
  }
}
