import React from 'react'
import AnimatedNumber from 'animated-number-react'

import { useSources, useProportionStat } from '../../../arithmospora/hooks'

import styles from './StudyType.module.scss'

const StudyType = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const statsData = useProportionStat(
    props.source,
    'proportion',
    'studytypes',
    (stat) => {
      if (Object.keys(stat.dataPoints).length === 0) {
        return stat
      }
      switch (props.type) {
        case 'UG':
          return stat.dataPoints.UG
        case 'PGR':
          return stat.dataPoints.PG.dataPoints.R
        case 'PGT':
          return stat.dataPoints.PG.dataPoints.T
        default:
          return stat
      }
    }
  )

  return (
    <div class={styles.studyType}>
      <div class={styles.barContainer}>
        <div class={styles.bar} style={{width: `${statsData.percentage}%`}}></div>
      </div>
      <div class={styles.label}>
        <span>{props.type}</span>
        <AnimatedNumber
          duration='750'
          formatValue={(value) => `${value.toFixed(1)}%`}
          value={statsData.percentage}
        />
      </div>
    </div>
  )
}

export default StudyType
