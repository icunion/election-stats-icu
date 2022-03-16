import React from 'react'

import useLocalStorage from '../../../hooks/use-local-storage'

import Button from './Button'

import styles from './RollingTimeFrame.module.scss'

const GraphOption = (props) => {
  const graphOptions = [
    {
      id: 'votesGraph',
      key: 'votesGraph',
      title: 'Votes Cast'
    },
    {
      id: 'votersGraph',
      key: 'votersGraph',
      title: 'New Voters'
    },
    {
      id: 'cumulativeGraph',
      key: 'cumulativeGraph',
      title: 'Cumulative Voters'
    }
  ]

  const [isActive, setActive] = useLocalStorage('option', 'votesGraph')

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
