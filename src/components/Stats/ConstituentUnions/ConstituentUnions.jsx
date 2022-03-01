import React, { useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'

import { useSources, useRollingStat } from '../../../arithmospora/hooks'

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

  const statsData = useRollingStat(
    props.source,
    timeframe,
    'cus',
    getCUsSortedByTurnout
  )

  const flipKey = statsData.map((item) => item.id).join('')

  return (
    <div className={styles.container}>
      <Flipper flipKey={flipKey}>
        <ol className={styles.list}>
          {statsData.map((item) => (
            <Flipped key={item.id} flipId={item.id}>
              {(flippedProps) => <ConstituentUnion flippedProps={flippedProps} {...item} />}
            </Flipped>
          ))}
        </ol>
      </Flipper>
      <div className={styles.buttonsContainer}>
        <RollingTimeFrame onSetActive={RollingTimeFrameHandler}/>
      </div>
    </div>
  )
}

export default ConstituentUnions
