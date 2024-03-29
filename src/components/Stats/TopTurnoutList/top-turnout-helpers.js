import * as deptDefs from '../../../definitions/departments'
import * as hallsDefs from '../../../definitions/halls'

const getDeptName = (key) => {
  if (key in deptDefs.displayNames) {
    return 'midName' in deptDefs.displayNames[key]
      ? deptDefs.displayNames[key].midName
      : deptDefs.displayNames[key].shortName
  } else {
    return key
  }
}

const getHallName = (key) => {
  if (key in hallsDefs.displayNames) {
    return 'midName' in hallsDefs.displayNames[key]
      ? hallsDefs.displayNames[key].midName
      : hallsDefs.displayNames[key].shortName
  } else {
    return key
  }
}

const getCSPName = (dpName) => {
  const cutOffLength = 21
  const regex = new RegExp('^(.{' + (cutOffLength - 3) + ',}?)\\s.+$')
  let topThreeName = dpName.replace(regex, '$1')
  if (topThreeName.length > cutOffLength)
    topThreeName = topThreeName.substr(0, cutOffLength)
  return topThreeName + (topThreeName !== dpName ? ' ...' : '')
}

export const getListSortedByTurnout = (statName) => {
  return (statData) => {
    return Object.entries(statData.dataPoints)
      .flatMap(([key, data]) => {
        switch (statName) {
          case 'departments':
            return { ...data, id: key, name: getDeptName(key) }
          case 'halls':
            return { ...data, id: key, name: getHallName(key) }
          case 'cspgroups':
            return Object.entries(data.dataPoints).map(
              ([nestedKey, nestedData]) => ({
                ...nestedData,
                id: nestedKey,
                name: getCSPName(nestedKey)
              })
            )
        }
      })
      .sort((a, b) => {
        switch (statName) {
          case 'cspgroups':
            if (a.proportion < b.proportion) return +1
            if (a.proportion > b.proportion) return -1
            if (a.name > b.name) return +1
            if (a.name < b.name) return -1
            return 0
          default:
            return b.proportion - a.proportion
        }
      })
  }
}

/**
 * Apply stat specific filtering to the list
 * @param {Object[]} statData - List of data objects
 * @param {string} statName - Name of the stat
 * @returns
 *   The filtered entries.
 */
export const filteredList = (statData, statName) => {
  return statData.filter((item) => {
    switch (statName) {
      case 'departments':
        return !['OT', 'OTSA', 'IC'].includes(item.id)
      case 'halls':
        return item.id != ''
      default:
        return true
    }
  })
}
