import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ElectionCountdown from '../components/Countdowns/ElectionCountdown'
import connectSources from '../arithmospora'
import {
  arithmosporaSelector,
  proportionStatSelector
} from '../arithmospora/selectors'

const Banner = (props) => {
  const dispatch = useDispatch
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
  const [countdownCompleted, setCountdownCompleted] = useState(false)

  const bannerCountdownCompleteHandler = () => {
    setCountdownCompleted(true)
  }

  connectSources([props.mainSource], dispatch)
  //  connectSources(props.sources)

  return (
    <div>
      <div className='logo-link'>
        <a href='https://vote.union.ic.ac.uk'>Leadership Elections 2022</a>
      </div>
      <ElectionCountdown
        date={props.votingCloseDate}
        onComplete={bannerCountdownCompleteHandler}
      >
        <p className='countdown-completed'>Thank you for voting!</p>
      </ElectionCountdown>
      <div className='stats'>
        <div className='stats-turnout'>
          <div className='stats-label'>turnout</div>
          <div className='stats-data'>
            <span id='elections-live-turnout' data-live='percentage'>
              {totalVoters.percentage.toFixed(2)}
            </span>
            %
          </div>
        </div>
        <div className='stats-votes'>
          <div className='stats-label'>votes cast</div>
          <div className='stats-data'>
            <span id='elections-live-votes' data-live='totalvotes'>
              {totalVotes}
            </span>
          </div>
        </div>
        <div className='stats-voters'>
          <div className='stats-label'>voters</div>
          <div className='stats-data'>
            <span id='elections-live-voters' data-live='current'>
              {totalVoters.current}
            </span>
          </div>
        </div>
      </div>
      {!countdownCompleted && <div>Vote Now</div>}
    </div>
  )
}

export default Banner
