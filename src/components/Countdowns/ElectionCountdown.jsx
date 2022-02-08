import React, { useState } from 'react'
import Countdown from 'react-countdown'

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className='countdown-time-row'>
      <div className='countdown-time'>
        <div className='time-count days'>{days}</div>
        <div className='time-label'>days</div>
      </div>
      <div className='countdown-time'>
        <div className='time-count hours'>{hours}</div>
        <div className='time-label'>hours</div>
      </div>
      <div className='countdown-time'>
        <div className='time-count minutes'>{minutes}</div>
        <div className='time-label'>minutes</div>
      </div>
      <div className='countdown-time'>
        <div className='time-count'>{seconds}</div>
        <div className='time-label'>seconds</div>
      </div>
    </div>
  )
}

const ElectionCountDown = (props) => {
  const [countdownCompleted, setCountdownCompleted] = useState(false)

  const countdownCompleteHandler = () => {
    setCountdownCompleted(true)
    props.onComplete && props.onComplete()
  }

  return (
    <div className='countdown'>
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
