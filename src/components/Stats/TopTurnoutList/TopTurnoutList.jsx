import React, { useState } from 'react'

import { useSources, useRollingStat } from '../../../arithmospora/hooks'

import TopTurnoutEntry from './TopTurnoutEntry'
import RollingTimeFrame from '../../UI/Button/RollingTimeFrame'

import { getListSortedByTurnout, top } from './top-turnout-helpers'
import styles from './TopTurnoutList.module.scss'

const TopTurnoutList = (props) => {
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
    props.stat,
    getListSortedByTurnout(props.stat)
  )

  return (
    <div className={styles.container}>
      <ol className={styles.entrylist}>
        {top(statsData, 5, props.stat).map(item => (
          <TopTurnoutEntry key={item.id} {...item} />
        ))}
      </ol>
      <div className={styles.buttonsContainer}>
        <RollingTimeFrame setActive={RollingTimeFrameHandler}/>
        {/* <RollingTimeFrame /> */}
      </div>
    </div>
  )
}

export default TopTurnoutList
