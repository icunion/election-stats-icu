import React, { useState } from 'react'

import Button from './Button'

import styles from './RollingTimeFrame.module.scss'

const RollingTimeFrame = (props) => {
  const timeframeOptions = [
    {
      key: '5m',
      text: '5 min'
    },
    {
      key: '1h',
      text: '1 hr'
    },
    {
      key: '1d',
      text: '24 hr'
    },
    {
      key: 'total',
      text: 'Whole'
    }
  ]

  const [isActive, setActive] = useState('total')

  const buttonChangeHandler = (e, key) => {
    setActive(key)
    props.setActive(key)
    console.log(key)
    //this.props.onChangeRolling(e.target.value);
  }

  console.log('active ' + isActive)

  return (
    <div className={styles.container}>
      {timeframeOptions.map((timeframe) => (
        <button
          name={timeframe.key}
          key={timeframe.key}
          className={isActive === timeframe.key ? styles['btn' && 'active'] : styles['btn']}
          onClick={(e) => buttonChangeHandler(e, timeframe.key)}
        >
          {timeframe.text}
        </button>
        // <Button
        //   type='timeframe'
        //   name={timeframe.key}
        //   key={timeframe.key}
        //   // className={isActive === timeframe.key ? 'active' : ''}
        //   className='small'
        //   onClick={(e) => buttonChangeHandler(e, timeframe.key)}
        // >
        //   {timeframe.text}
        // </Button>
      ))}
    </div>
  )
}

export default RollingTimeFrame
