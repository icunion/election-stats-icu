import React, { useState } from 'react'
import Countdown from 'react-countdown'
import styles from './ElectionCountdown.module.scss'

const renderer = ({ days, hours, minutes, seconds, props }) => {
  return (
    <div className={`${styles.timeRow} ${styles[props.className] || ''}`}>
      <p className={styles.header}>Voting closes in</p>
      <div className={styles.time}>
        <span className={styles.count}>{days}</span>
        <span className={styles.label}>day{days == 1 ? '' : 's'}</span>
      </div>
      <div className={styles.time}>
        <span className={styles.count}>{hours}</span>
        <span className={styles.label}>hour{hours == 1 ? '' : 's'}</span>
      </div>
      <div className={styles.time}>
        <span className={styles.count}>{minutes}</span>
        <span className={styles.label}>min{minutes == 1 ? '' : 's'}</span>
      </div>
      <div className={styles.time}>
        <span className={styles.count}>{seconds}</span>
        <span className={styles.label}>sec{seconds == 1 ? '' : 's'}</span>
      </div>
    </div>
  )
}

const ElectionCountDown = (props) => {
  const [countdownCompleted, setCountdownCompleted] = useState(props.date < Date.now())

  const countdownCompleteHandler = () => {
    setCountdownCompleted(true)
    props.onComplete && props.onComplete()
  }

  return (
    <div className={`${styles.countdown} ${styles[props.className] || ''}`}>
      {!countdownCompleted && (
        <Countdown
          date={props.date}
          renderer={renderer}
          onComplete={countdownCompleteHandler}
        />
      )}
      {countdownCompleted && props.children}
    </div>
  )
}

export default ElectionCountDown
