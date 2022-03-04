import React, { useEffect, useRef, useState } from 'react'
import AnimatedNumber from 'animated-number-react'

import useLocalStorage from '../../../hooks/use-local-storage'

import {
  useSources,
  useStat,
  useProportionStat,
  useConnectionStatus
} from '../../../arithmospora/hooks'

import styles from './TotalStats.module.scss'

const TotalStats = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const totalVotes = useStat(
    props.source,
    'other',
    'totalvotes',
    (stat) => stat.data.totalvotes
  )

  const totalVoters = useProportionStat(props.source, 'total')

  // Number animation: we want all the numbers to animate the first time we
  // load the page and whenever stats change, but we don't want to spin the
  // numbers on every page refresh, as this gets very distracting when
  // browsing the site and doing lots of page loads.
  const [animateNumbersStorage, setAnimateNumbersStorage] = useLocalStorage(
    'animateNumbers',
    true,
    { ttl: 3600 }
  )
  const [animateNumbers, setAnimateNumbers] = useState(animateNumbersStorage)

  useEffect(() => {
    if (animateNumbersStorage) {
      setAnimateNumbersStorage(false)
    }
    // We enable number animation after a short timeout to prevent unrelated
    // re-renders triggering the animation straight away (i.e. countdown tick)
    setTimeout(() => {
      setAnimateNumbers(true)
    }, 1500)
  }, [animateNumbersStorage])

  // Connection status: we want to show the connection status for the source
  // when disconnected and for a short time after (re)connection
  const connectionStatusTimeoutRef = useRef(null)
  const sourceConnected = useConnectionStatus(props.source)
  const [showConnectionStatus, setShowConnectionStatus] = useState(
    !sourceConnected
  )

  useEffect(() => {
    clearTimeout(connectionStatusTimeoutRef.current)
    if (sourceConnected) {
      clearTimeout(connectionStatusTimeoutRef.current)
      connectionStatusTimeoutRef.current = setTimeout(() => {
        setShowConnectionStatus(false)
      }, 1000)
    } else {
      setShowConnectionStatus(true)
    }
  }, [props.source, sourceConnected])

  // Ensure timeout cleared on unmount
  useEffect(() => {
    return () => clearTimeout(connectionStatusTimeoutRef.current)
  }, [])

  return (
    <div className={`${styles.totalStat} ${styles[props.className] || ''}`}>
      <div className={styles.percentage}>
        <AnimatedNumber
          duration='750'
          formatValue={(value) => `${value.toFixed(2)}%`}
          value={totalVoters.percentage}
        />
      </div>
      <div className={styles.countContainer}>
        <div className={styles.countInner}>
          <AnimatedNumber
            className={styles.count}
            duration='750'
            formatValue={(value) => `${value.toFixed(0)}`}
            value={totalVoters.current}
          />{' '}
          <span className={styles.countLabel}>voters</span>
        </div>
        <div className={styles.countInner}>
          <AnimatedNumber
            className={styles.count}
            duration='750'
            formatValue={(value) => `${value.toFixed(0)}`}
            value={totalVotes}
          />{' '}
          <span className={styles.countLabel}>votes</span>
        </div>
      </div>
      {showConnectionStatus && (
        <div
          className={`${styles.connectionStatus} ${
            styles[sourceConnected ? 'connected' : 'disconnected']
          }`}
        ></div>
      )}
    </div>
  )
}

export default TotalStats
