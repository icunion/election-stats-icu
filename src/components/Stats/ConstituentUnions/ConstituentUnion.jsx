import React from 'react'
import AnimatedNumber from 'animated-number-react'

import styles from './ConstituentUnion.module.scss'

const ConstituentUnion = (props) => {
  return (
    <li className={styles.cus}>
      <div className={styles.content}>
        <div className={styles.barcontainer}>
          <div
            className={styles.bar}
            style={{ width: `${props.percentage}%` }}
          ></div>
          <div className={styles.info}>
            <span className={styles.label}>{props.name}</span>
          </div>

        </div>
        <div className={styles.percentage}>
          <AnimatedNumber
            duration='750'
            formatValue={(value) => `${value.toFixed(1)}%`}
            value={props.percentage}
          />
        </div>
        <div className={styles.icon}><svg></svg></div>
      </div>
    </li>
  )
}

export default ConstituentUnion
