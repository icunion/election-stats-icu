import React, { useEffect, useState } from 'react'
import AnimatedNumber from 'animated-number-react'

import {
  useSources,
  useStat,
  useRollingStat
} from '../../../arithmospora/hooks'
import usePrevious from '../../../hooks/use-previous'

import styles from './TimeLineEntry.module.scss'

const TimeLineEntry = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const totalVotes = useStat(
    props.source,
    'other',
    `${props.interval}:totalvotes`,
    (stat) => stat.data.totalvotes
  )

  const totalVotersData = useRollingStat(props.source, props.interval, 'total')
  const prevTotalVotersCurrent = usePrevious(totalVotersData.current)

  const [change, setChange] = useState(false)

  useEffect(() => {
    if (change) {
      const timer = setTimeout(() => {
        setChange(false)
      }, 500)
      return () => clearTimeout(timer)
    } else if (totalVotersData.current != prevTotalVotersCurrent) {
      setChange(
        (totalVotersData.current > prevTotalVotersCurrent && 'rising') ||
          (totalVotersData.current < prevTotalVotersCurrent && 'falling')
      )
    }
  }, [change, totalVotersData])

  return (
    <div className={`${styles.timeLineEntry} ${styles[change] || ''}`}>
      <div className={styles.intervalLabel}>{props.title}</div>
      <div className={styles.countContainer}>
        <AnimatedNumber
          className={styles.count}
          duration='750'
          formatValue={(value) => `${value.toFixed(0)}`}
          value={totalVotes}
        />{' '}
        <span className={styles.countLabel}>votes</span>
      </div>
      <div className={styles.countContainer}>
        <AnimatedNumber
          className={styles.count}
          duration='750'
          formatValue={(value) => `${value.toFixed(0)}`}
          value={totalVotersData.current}
        />{' '}
        <span className={styles.countLabel}>voters</span>
      </div>
    </div>
  )
}

export default TimeLineEntry
