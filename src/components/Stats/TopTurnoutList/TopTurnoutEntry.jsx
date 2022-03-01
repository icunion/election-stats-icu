import React from 'react'
import AnimatedNumber from 'animated-number-react'

import styles from './TopTurnoutEntry.module.scss'

const TopTurnoutEntry = (props) => {
  return (
    <li {...props.flippedProps} className={styles.entry}>
      <div className={styles.label}>
        <span>{props.name}</span>{' '}
      </div>
      <div className={styles.percentage}>
        <AnimatedNumber
          duration='750'
          formatValue={(value) => `${value.toFixed(1)}%`}
          value={props.percentage}
        />
      </div>
    </li>
  )
}

export default TopTurnoutEntry
