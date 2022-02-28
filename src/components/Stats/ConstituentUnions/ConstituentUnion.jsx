import React from 'react'
import AnimatedNumber from 'animated-number-react'

import {
  useSources,
  useProportionStat,
  useRollingStat
} from '../../../arithmospora/hooks'
import usePrevious from '../../../hooks/use-previous'

import styles from './ConstituentUnion.module.scss'

const ConstituentUnion = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const statsData = useProportionStat(
    props.source,
    'proportion',
    'cus',
    (stat) => {
      if (Object.keys(stat.dataPoints).length === 0) {
        return stat
      }
      switch (props.type) {
        case 'CGCU':
          return stat.dataPoints.CGCU
        case 'ICSMSU':
          return stat.dataPoints.ICSMSU
        case 'RCSU':
          return stat.dataPoints.RCSU
        case 'RSMU':
          return stat.dataPoints.RSMU
        default:
          return stat
      }
    }
  )

  const totalCUS= useRollingStat(props.source, props.interval, 'total')

  return (
    //   <div className={styles.container}>
    <li className={styles.cus}>
      <div className={styles.content}>
        <div className={styles.barcontainer}>
          <div
            className={styles.bar}
            style={{ width: `${statsData.percentage}%` }}
          ></div>
          <div className={styles.info}>
            <span className={styles.label}>{props.type}</span>
          </div>

        </div>
        <div className={styles.percentage}>
          <AnimatedNumber
            duration='750'
            formatValue={(value) => `${value.toFixed(1)}%`}
            value={statsData.percentage}
          />
        </div>
        <div className={styles.icon}><svg></svg></div>
      </div>
    </li>

    //   </div>
  )
}

export default ConstituentUnion
