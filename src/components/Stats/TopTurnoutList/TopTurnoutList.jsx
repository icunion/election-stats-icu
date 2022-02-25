import React from 'react'

import { useSources, useProportionStat } from '../../../arithmospora/hooks'

import TopTurnoutEntry from './TopTurnoutEntry'

import { getListSortedByTurnout, top } from './top-turnout-helpers'
import styles from './TopTurnoutList.module.scss'

const TopTurnoutList = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  const statsData = useProportionStat(
    props.source,
    props.stat,
    getListSortedByTurnout(props.stat)
  )
  console.log(statsData)

  return (
    <div className={styles.container}>
      <ol>
        {top(statsData, 5, props.stat).map(item => (
          <TopTurnoutEntry key={item.id} {...item} />
        ))}
      </ol>
    </div>
  )
}

export default TopTurnoutList
