import * as deptDefs from '../../../definitions/departments'
import * as hallsDefs from '../../../definitions/halls'

const getDeptName = (key) =>
  key in deptDefs.displayNames ? deptDefs.displayNames[key].shortName : key

const getHallName = (key) =>
  key in hallsDefs.displayNames ? hallsDefs.displayNames[key].shortName : key

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

export const top = (statData, quantity, statName) => {
  return statData
    .filter((item) => {
      switch (statName) {
        case 'departments':
          return !['OT', 'IC'].includes(item.id)
        default:
          return true
      }
    })
    .slice(0, quantity)
}
