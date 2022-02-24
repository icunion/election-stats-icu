import * as deptDefs from '../../../definitions/departments'
import * as hallsDefs from '../../../definitions/halls'

const getDeptName = (key) => (key in deptDefs.displayNames ? deptDefs.displayNames[key].shortName : key)
const getHallName = (key) => (key in hallsDefs.displayNames ? hallsDefs.displayNames[key].shortName : key)

export const getListSortedByTurnout = (statName) => {
  return (statData) => {
    return Object.entries(statData.dataPoints)
    .map(([key, data]) => {
      switch (statName) {
        case 'departments':
          return { ...data, id: key, name: getDeptName(key) }
        case 'halls':
          return { ...data, id: key, name: getHallName(key) }
        }
    })
    .sort((a, b) => b.proportion - a.proportion)
  }
}

export const top = (statData, quantity, statName) => {
  return statData.filter(item => {
    switch (statName) {
      case 'departments':
        return !(['OT', 'IC'].includes(item.id))
      default:
        return true
    }
  }).slice(0, quantity)
}
