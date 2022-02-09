import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import connectSources from '../arithmospora'
import {
  arithmosporaSelector,
  proportionStatSelector
} from '../arithmospora/selectors'

import ElectionCountdown from '../components/Countdowns/ElectionCountdown'
import Button from '../components/UI/Button/Button'

import styles from './Banner.module.scss'

const Banner = (props) => {
  // Gets data from redux state
  const totalVotes = useSelector((state) =>
    arithmosporaSelector(
      state,
      props.mainSource,
      'other',
      'totalvotes',
      (stat) => stat.data.totalvotes
    )
  )
  const totalVoters = useSelector((state) =>
    proportionStatSelector(state, props.mainSource, 'proportion', 'total')
  )

  // Use a state property to determine whether the countdown has completed.
  // If the close date is already in the past, we want the state to be set
  // to true from the outset.
  const [countdownCompleted, setCountdownCompleted] = useState(props.votingCloseDate < Date.now())

  const bannerCountdownCompleteHandler = () => {
    setCountdownCompleted(true)
  }

  // Connect the stats source
  connectSources([props.mainSource])

  return (
    <div className={`election-stats-icu ${styles.banner} ${styles[props.mainSource] || ''}`}>
      <div className='logo-link'>
        <a href='https://vote.union.ic.ac.uk'>Leadership Elections 2022</a>
      </div>
      <ElectionCountdown
        date={props.votingCloseDate}
        onComplete={bannerCountdownCompleteHandler}
        className={props.mainSource}
      >
        <p className={styles.countdownCompleted}>Thank you for voting!</p>
      </ElectionCountdown>
      <div className={styles.stats}>
        <div className={styles.turnout}>
          <div className={styles.label}>turnout</div>
          <div className={styles.data}>{totalVoters.percentage.toFixed(2)}%</div>
        </div>
        <div className={styles.votes}>
          <div className={styles.label}>votes cast</div>
          <div className={styles.data}>{totalVotes}</div>
        </div>
        <div className={styles.voters}>
          <div className={styles.label}>voters</div>
          <div className={styles.data}>{totalVoters.current}</div>
        </div>
      </div>
      {!countdownCompleted && <div><Button href="https://vote.union.ic.ac.uk" target="_blank">Vote Now</Button></div>}
    </div>
  )
}

export default Banner
