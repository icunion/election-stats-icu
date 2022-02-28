import React from 'react'

import {
  useSources,
  useRollingStat
} from '../../../arithmospora/hooks'

import ConstituentUnion from './ConstituentUnion'
// import RollingTimeFrame from '../../UI/Button/RollingTimeFrame'

import { getCUsSortedByTurnout } from './constituent-union-helpers'
import styles from './ConstituentUnions.module.scss'

const ConstituentUnions = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const interval = 'whole'

  const statsData = useRollingStat(
    props.source,
    interval,
    'cus',
    getCUsSortedByTurnout
  )

  const RollingTimeFrameHandler = (selectedTimeFrame) => {
    console.log(selectedTimeFrame)
  }

  return (
    <div className={styles.container}>
      <ol className={styles.list}>
        {statsData.map((item) => (
          <ConstituentUnion key={item.id} {...item} />
        ))}
      </ol>
      <div className={styles.buttonsContainer}>
        {/* <RollingTimeFrame onChangeRolling={RollingTimeFrameHandler} /> */}
        {/* <RollingTimeFrame /> */}
      </div>
    </div>
  )
}

export default ConstituentUnions
