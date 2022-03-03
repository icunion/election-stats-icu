import React, { useEffect, useState } from 'react'

import { useSources, useProportionStat } from '../../../arithmospora/hooks'
import * as progressDefs from '../../../definitions/election-progress'

import styles from './ElectionProgress.module.scss'

// Generate tick markers up to 60% and scale all our bar widths and marker
// positions to be full width at 65% (to allow for some overflow of the box)
const tickMarkers = [...Array(7)].map((_, i) => {
  return {
    name: `${i * 10}%`,
    percentage: i * 10,
    className: 'tick'
  }
})
const scaleTo = 65 / 100

const getMarkers = (source) => {
  return [
    ...tickMarkers,
    ...progressDefs.markers[source]
  ].sort((a, b) => a.percentage - b.percentage)
}

const ElectionProgress = ({ source }) => {
  // Ensure stat sources get connected
  useSources([source])

  // Get timed stats data
  const totalData = useProportionStat(source, 'total')

  // Track first load to allow us to animate markers
  const [firstLoad, setFirstLoad] = useState(true)
  useEffect(() => {
    const firstLoadTimeOut = setTimeout(() => {
      setFirstLoad(false)
    }, 10)
    return () => clearTimeout(firstLoadTimeOut)
  }, [])

  return (
    <div className={styles.container}>
      <ul className={styles.markers}>
        {getMarkers(source).map((marker) => (
          <li
            key={marker.name}
            className={styles[marker.className] || ''}
            data-tooltip={marker.description}
            aria-haspopup={'description' in marker}
            style={{ width: `${firstLoad && marker.className != "tick" ? 0 : marker.percentage / scaleTo }%` }}
          >
            <span>{marker.name}</span>
          </li>
        ))}
      </ul>
      <div
        className={styles.currentYear}
        style={{ width: `${totalData.percentage / scaleTo}%` }}
      ></div>
    </div>
  )
}

export default ElectionProgress
