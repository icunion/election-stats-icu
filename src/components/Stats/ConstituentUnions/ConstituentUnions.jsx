import React, { useState } from 'react'

import {
  useSources,
  useRollingStat
} from '../../../arithmospora/hooks'

import ConstituentUnion from './ConstituentUnion'
import RollingTimeFrame from '../../UI/Button/RollingTimeFrame'

import { getCUsSortedByTurnout } from './constituent-union-helpers'
import styles from './ConstituentUnions.module.scss'

const ConstituentUnions = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const [timeframe, setSelectedTimeFrame] = useState('total');

  const RollingTimeFrameHandler = (selectedTimeFrame) => {
    setSelectedTimeFrame(selectedTimeFrame) ;
  };

  const interval = timeframe;


  const statsData = useRollingStat(
    props.source,
    interval,
    'cus',
    getCUsSortedByTurnout
  )

  return (
    <div className={styles.container}>
      <ol className={styles.list}>
        {statsData.map((item) => (
          <ConstituentUnion key={item.id} {...item} />
        ))}
      </ol>
      <div className={styles.buttonsContainer}>
        <RollingTimeFrame setActive={RollingTimeFrameHandler}/>
        {/* <RollingTimeFrame /> */}
      </div>
    </div>
  )
}

export default ConstituentUnions
