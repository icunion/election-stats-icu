import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import connectSources from './index'
import {
  makeProportionStatSelector,
  makeRollingStatSelector,
  makeStatSelector,
  makeTimedStatSelector
} from './selectors'

/**
 * Make a set of stats source available. Use this hook in all components that
 * needs to access stats data to ensure the relevant sources are connected and
 * providing data.
 * @param {string[]} statsSources - Array of stats source names corresponding
 *     to sources defined in config.
 * @see connectSources
 * @see ../config
 */
export const useSources = (sources) => {
  useEffect(() => {
    connectSources(sources)
  }, [sources])
}

/**
 * Callback function that can be passed to useStat, useProportionStat, etc to
 * perform a selection or transformation on the processed stat object retrieved
 * from state.
 * @callback statSelector
 * @param {Object} stateStat - The stat data object retrieved from state
 * @returns {*} - The desired information derived from the state data object
 */

/**
 * Retrieves data for a specific stat. Can be used to retrieve data for any
 * stat in a generic way, but us primarily intended for stats in the 'other'
 * group which don't have any defined structure (as they're generally single
 * value counters).
 * @example
 * // returns e.g. 12345
 * const totalVotes = useStat(
 *   props.source,
 *   'other',
 *   'totalvotes',
 *   (stat) => stat.data.totalvotes
 * )
 * @param {string} source - The name of the stats source to retrieve from
 * @param {string} group - The name of the group the stat belongs to, one of
 *     'other', 'proportion', 'rolling', or 'timed'. Normally you would only
 *     use this function to retrieve from the 'other' group as the proportion,
 *     rolling, and timed groups have their own dedicated hooks tailored to
 *     their specific needs.
 * @param {string} stat - The name of the stat to retrieve.
 * @param {statSelector} [statSelector = (stateStat) => stateStat] - Optional
 *     callback to select desired data from the retrieved stat object.
 * @returns
 */
export const useStat = (
  source,
  group,
  stat,
  statSelector = (stateStat) => stateStat
) => {
  const statSelectorMemoized = useMemo(
    () => makeStatSelector(statSelector),
    [source, group, stat, statSelector]
  )
  return useSelector((state) =>
    statSelectorMemoized(state, source, group, stat)
  )
}

/**
 * Retrieves data for a proportion stat. This hook ensures a default
 * proportion stat structure is returned if the stat hasn't loaded from the
 * source yet. Note that for proportion stats that have nested dataPoints,
 * the top level current and totals are not usually populated, as they would
 * be aggregating all the child dataPoints and would be the same as the total
 * stat.
 * @example
 * // returns e.g.
 * // {
 * //   current: 2000,
 * //   total: 20000,
 * //   proportion: 0.1,
 * //   percentage: 10.0,
 * //   dataPoints: { ... }
 * // }
 * const totalVoters = useProportionStat(props.source, 'proportion', 'total')
 * @param {string} source - The name of the stats source to retrieve from
 * @param {string} stat - The name of the stat to retrieve.
 * @param {statSelector} [statSelector = (stateStat) => stateStat] - Optional
 *     callback to select desired data from the retrieved stat object.
 * @returns
 */
export const useProportionStat = (
  source,
  stat,
  statSelector = (stateStat) => stateStat
) => {
  const proportionStatSelectorMemoized = useMemo(
    () => makeProportionStatSelector(statSelector),
    [source, stat, statSelector]
  )

  return useSelector((state) =>
    proportionStatSelectorMemoized(state, source, stat)
  )
}

/**
 * Retrieves data for a rolling stat. This hook ensures a default
 * rolling proportion stat structure is returned if the stat hasn't loaded
 * from the source yet. Note that for stats that have nested dataPoints,
 * the top level current and totals are not usually populated, as they would
 * be aggregating all the child dataPoints and would be the same as the total
 * stat. If an unknown interval is supplied and a corresponding proportion
 * stat for the whole election exists, the proportion stat will be returned,
 * facilitating the 'choose a rolling interval or whole election' pattern.
 * @example
 * // returns e.g.
 * // {
 * //   current: 20,
 * //   total: 20000,
 * //   proportion: 0.01,
 * //   percentage: 1.0,
 * //   peak: 60,
 * //   peakProportion: 0.03,
 * //   peakPercentage: 3.0,
 * //   dataPoints: { ... }
 * // }
 * const totalVotersData = useRollingStat(props.source, props.interval, 'total')
 * @param {string} source - The name of the stats source to retrieve from
 * @param {string} interval - The rolling interval we want to retrieve for.
 *     Usually one of '5m', '1h', '6h', or '1d', but beware that some stats
 *     sources might provide only some (or even none) of these intervals. If
 *     an unknown interval is provided, the corresponding whole election
 *     proportion stat is returned if available.
 * @param {string} stat - The name of the stat to retrieve.
 * @param {statSelector} [statSelector = (stateStat) => stateStat] - Optional
 *     callback to select desired data from the retrieved stat object.
 * @returns
 */
 export const useRollingStat = (
  source,
  interval,
  stat,
  statSelector = (stateStat) => stateStat
) => {
  const rollingStatSelectorMemoized = useMemo(
    () => makeRollingStatSelector(statSelector),
    [source, interval, stat, statSelector]
  )

  return useSelector((state) =>
    rollingStatSelectorMemoized(state, source, interval, stat)
  )
}

/**
 * Retrieves data for a timed stat. Timed stats dataset consist of an object
 * keyed by time buckets (which are calculated as unixtime % interval size in
 * seconds ). The default returned for when a stat hasn't loade yet is an empty
 * object.
 * @example
 * // returns e.g.
 * // {
 * //   '27427373': 3,
 * //   '27427374': 0,
 * //   '27427375': 5,
 * //   ...
 * // }
 * const votesData = useTimedStat(props.source, 'votes', '60')
 * @param {string} source - The name of the stats source to retrieve from
 * @param {string} stat - The name of the stat to retrieve.
 * @param {string} dataPoint - The timed stat dataPoint we want to retrieve,
 *     usually one of 60, 300, or 3600.
 * @param {statSelector} [statSelector = (stateStat) => stateStat] - Optional
 *     callback to select desired data from the retrieved stat object.
 * @returns
 */
 export const useTimedStat = (
  source,
  stat,
  dataPoint,
  statSelector = (stateStat) => stateStat
) => {
  const timedStatSelectorMemoized = useMemo(
    () => makeTimedStatSelector(statSelector),
    [source, stat, dataPoint, statSelector]
  )

  return useSelector((state) =>
    timedStatSelectorMemoized(state, source, stat, dataPoint)
  )
}

export default useSources
