import * as cuDefs from '../../../definitions/constituent-unions'

const getCUName = (key) =>
  key in cuDefs.displayNames ? cuDefs.displayNames[key] : key

export const getCUsSortedByTurnout = (statData) => {
  return Object.entries(statData.dataPoints)
  .flatMap(([key, data]) => {
      if (key == 'GSU') {
        return []
      }
      return { ...data, id: key, name: getCUName(key) }
    }
  )
  .sort((a, b) => b.proportion - a.proportion)
}
