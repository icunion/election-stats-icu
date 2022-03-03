import React, { useState } from 'react'

import Button from './Button'

import styles from './RollingTimeFrame.module.scss'

const RollingTimeFrame = (props) => {
  const timeframeOptions = [
    {
      id: '5m',
      key: '5m',
      text: '5 min'
    },
    {
      id: '1h',
      key: '1h',
      text: '1 hr'
    },
    {
      id: '1d',
      key: '1d',
      text: '24 hr'
    },
    {
      id: 'total',
      key: 'total',
      text: 'Whole'
    }
  ]

  const [isActive, setActive] = useState('total')

  const buttonChangeHandler = (e, key) => {
    setActive(key)
    props.onSetActive(key)
  }

  return (
    <div className={styles.container}>
      {timeframeOptions.map((timeframe) => (
        // <button
        //   name={timeframe.key}
        //   key={timeframe.key}
        //   className={isActive === timeframe.key ? styles['btn' && 'active'] : styles['btn']}
        //   onClick={(e) => buttonChangeHandler(e, timeframe.key)}
        // >
        //   {timeframe.text}
        // </button>
        <Button
          type='timeframe'
          key={timeframe.id}
          className={isActive === timeframe.key ? styles['btn' && 'active'] : styles['btn']}
          onClick={(e) => buttonChangeHandler(e, timeframe.key)}
        >
          {timeframe.text}
        </Button>
      ))}
    </div>
  )
}

export default RollingTimeFrame
