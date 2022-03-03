import React, { useEffect, useState } from 'react'
import AnimatedNumber from 'animated-number-react'

import useLocalStorage from '../hooks/use-local-storage'

import {
  useSources,
  useStat,
  useProportionStat
} from '../arithmospora/hooks'

import ElectionCountdown from '../components/Countdowns/ElectionCountdown'
import Button from '../components/UI/Button/Button'
import logoBanner from 'banner-logo2022.svg'

import styles from './Banner.module.scss'

const sourceOptions = {
  only: {
    'other:totalvotes': true,
    'proportion:total': true
  }
}

const Banner = (props) => {
  // Ensure stats source connected
  useSources([props.mainSource], sourceOptions)

  // Gets data from redux state
  const totalVotes = useStat(
    props.mainSource,
    'other',
    'totalvotes',
    (stat) => stat.data.totalvotes
  )
  const totalVoters = useProportionStat(props.mainSource, 'total')

  // Use a state property to determine whether the countdown has completed.
  // If the close date is already in the past, we want the state to be set
  // to true from the outset.
  const [countdownCompleted, setCountdownCompleted] = useState(
    props.votingCloseDate < Date.now()
  )

  const bannerCountdownCompleteHandler = () => {
    setCountdownCompleted(true)
  }

  // Number animation: we want all the numbers to animate the first time we
  // load the page and whenever stats change, but we don't want to spin the
  // numbers on every page refresh, as this gets very distracting when
  // browsing the site and doing lots of page loads.
  const [animateNumbersStorage, setAnimateNumbersStorage] = useLocalStorage('animateNumbers', true, {ttl: 3600})
  const [animateNumbers, setAnimateNumbers] = useState(animateNumbersStorage)

  useEffect(() =>{
    if (animateNumbersStorage) {
      setAnimateNumbersStorage(false)
    }
    // We enable number animation after a short timeout to prevent unrelated
    // re-renders triggering the animation straight away (i.e. countdown tick)
    setTimeout(() =>{
      setAnimateNumbers(true)
    }, 1500)
  }, [animateNumbersStorage])

  return (
    <div
      className={`election-stats-icu ${countdownCompleted ? styles.completed : ''} ${styles.banner} ${
        styles[props.mainSource] || ''
      }`}
    >
      <div className={styles.electionLogo}>
        <a href='https://vote.union.ic.ac.uk' target='_blank'>
        <img src={logoBanner} alt="Leadership Elections 2022" />
        </a>
      </div>
      <div className={styles.countdown}>
        <ElectionCountdown
          date={props.votingCloseDate}
          onComplete={bannerCountdownCompleteHandler}
          className={props.mainSource}
        >
          <p className={styles.countdownCompleted}>Thank you for voting!</p>
        </ElectionCountdown>
      </div>
      <div className={styles.stats}>
        <div className={styles.turnout}>
          <div className={styles.label}>turnout</div>
          <div className={styles.data}>
            <AnimatedNumber
              duration={animateNumbers ? 750 : 0}
              formatValue={(value) => `${value.toFixed(2)}%`}
              value={totalVoters.percentage}
            />
          </div>
        </div>
        <div className={styles.votes}>
          <div className={styles.label}>votes cast</div>
          <div className={styles.data}>
            <AnimatedNumber
              duration={animateNumbers ? 750 : 0}
              formatValue={(value) => value.toFixed(0)}
              value={totalVotes}
            />
          </div>
        </div>
        <div className={styles.voters}>
          <div className={styles.label}>voters</div>
          <div className={styles.data}>
          <AnimatedNumber
              duration={animateNumbers ? 750 : 0}
              formatValue={(value) => value.toFixed(0)}
              value={totalVoters.current}
            />
          </div>
        </div>
      </div>
      {!countdownCompleted && (
        <div className={styles.voteButton}>
          <Button href='https://vote.union.ic.ac.uk' target='_blank' className="vote">
            Vote
          </Button>
        </div>
      )}
    </div>
  )
}

export default Banner
