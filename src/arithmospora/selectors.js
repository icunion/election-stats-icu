import { createSelector } from "@reduxjs/toolkit"

const checkStatExists = (state, source, group, stat) => {
  return (
    state &&
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
  let proportionStat = { ...stateStat.data, dataPoints: {} }
  if ('dataPoints' in stateStat && Object.keys(stateStat.dataPoints).length !== 0) {
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
  stat,
  statSelector = (stat) => stat
) => {
  if (checkStatExists(state, source, 'proportion', stat)) {
    return statSelector(
      makeProportionStat(state.stats.sources[source]['proportion'][stat])
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

export const makeStatSelector = (statSelector = (stateStat) => stateStat) => createSelector(
  (state, source, group, stat) => {
    if (checkStatExists(state, source, group, stat)) {
      return state.stats.sources[source][group][stat]
    } else {
      return undefined
    }
  },
  (stateStat) => {
    return stateStat ? statSelector(stateStat) : stateStat
  }
)

const proportionStatDefault = {
  data: {
    current: 0,
    total: 0,
    proportion: 0,
    percentage: 0
  },
  dataPoints: {}
}

export const makeProportionStatSelector = (statSelector = (stateStat) => stateStat) => createSelector(
  (state, source, stat) => {
    if (checkStatExists(state, source, 'proportion', stat)) {
      return state.stats.sources[source]['proportion'][stat]
    } else {
      return proportionStatDefault
    }
  },
  (stateStat) => {
    return statSelector(
      makeProportionStat(stateStat)
    )
  }
)

const rollingStatDefault = {
  data: {
    current: 0,
    total: 0,
    proportion: 0,
    percentage: 0,
    peakProportion: 0,
    peakPercentage: 0
    },
  dataPoints: {}
}

export const makeRollingStatSelector = (statSelector = (stateStat) => stateStat) => createSelector(
  (state, source, interval, stat) => {
    const rollingStat = `${interval}:${stat}`
    if (['5m', '1h', '6h', '1d'].includes(interval) && checkStatExists(state, source, 'rolling', rollingStat)) {
      return state.stats.sources[source]['rolling'][rollingStat]
    } else if (!['5m', '1h', '6h', '1d'].includes(interval) && checkStatExists(state, source, 'proportion', stat)) {
      return state.stats.sources[source]['proportion'][stat]
    } else {
      return rollingStatDefault
    }
  },
  (stateStat) => {
    return statSelector(
      makeProportionStat(stateStat)
    )
  }
)

const timedStatDefault = {}

export const makeTimedStatSelector = (statSelector = (stateStat) => stateStat) => createSelector(
  (state, source, stat, dataPoint) => {
    if (
      checkStatExists(state, source, 'timed', stat) &&
      dataPoint in state.stats.sources[source]['timed'][stat].dataPoints
    ) {
      return state.stats.sources[source]['timed'][stat].dataPoints[dataPoint].data
    } else {
      return timedStatDefault
    }
  },
  (stateStat) => {
    return statSelector(stateStat)
  }
)
