import React, { useState } from 'react'

import Button from './Button'

import styles from './RollingTimeFrame.module.scss'

const GraphOption = (props) => {
  const graphOptions = [
    {
      id: 'votesGraph',
      key: 'votesGraph',
      title: 'Votes Cast',
      // text: 'The graph shows the total number of votes cast in each 5 minute period',
    },
    {
      id: 'votersGraph',
      key: 'votersGraph',
      title: 'New Voters',
      // text: 'The graph shows the number of new voters in each 5 minute period',
    },
    {
      id: 'cumulativeGraph',
      key: 'cumulativeGraph',
      title: 'Cumulative Voters',
      // text: "The final graph shows the cumulative number of voters versus the previous year, allowing you to see whether we're ahead or behind."
    }
  ]

  const [isActive, setActive] = useState('votesGraph')

  const buttonChangeHandler = (e, key) => {
    setActive(key)
    props.onSetActive(key)
  }


  return (
    <div className={styles.container}>
      {graphOptions.map((option) => (
        <Button
          type='options'
          key={option.id}
          className={isActive === option.key ? styles['btn' && 'active'] : styles['btn']}
          onClick={(e) => buttonChangeHandler(e, option.key)}
        >
          {option.title}
        </Button>
      ))}
    </div>
  )
}

export default GraphOption
