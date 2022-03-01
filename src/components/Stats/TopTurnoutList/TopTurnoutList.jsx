import React, { useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'

import { useSources, useRollingStat } from '../../../arithmospora/hooks'

import TopTurnoutEntry from './TopTurnoutEntry'
import RollingTimeFrame from '../../UI/Button/RollingTimeFrame'

import { getListSortedByTurnout, filteredList } from './top-turnout-helpers'
import styles from './TopTurnoutList.module.scss'

const TopTurnoutList = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const [timeframe, setSelectedTimeFrame] = useState('total')

  const RollingTimeFrameHandler = (selectedTimeFrame) => {
    setSelectedTimeFrame(selectedTimeFrame)
  }

  const statsData = useRollingStat(
    props.source,
    timeframe,
    props.stat,
    getListSortedByTurnout(props.stat)
  )

  const flipKey = statsData.map((item) => item.id).join('')

  return (
    <div className={styles.container}>
      <Flipper flipKey={flipKey}>
        <ol className={styles.entrylist}>
          {filteredList(statsData, props.stat).map((item) => (
            <Flipped key={item.id} flipId={item.id}>
              {(flippedProps) => (
                <TopTurnoutEntry flippedProps={flippedProps} {...item} />
              )}
            </Flipped>
          ))}
        </ol>
      </Flipper>
      <div className={styles.buttonsContainer}>
        <RollingTimeFrame onSetActive={RollingTimeFrameHandler} />
      </div>
    </div>
  )
}

export default TopTurnoutList
