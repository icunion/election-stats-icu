import React from 'react'
import AnimatedNumber from 'animated-number-react'

import styles from './ConstituentUnion.module.scss'

import cgcuLogo from 'cus-cgcu.svg'
import icsmsuLogo from 'cus-icsmsu.svg'
import rcsuLogo from 'cus-rcsu.svg'
import rsmuLogo from 'cus-rsmu.svg'

const cusLogos = {
  'CGCU' : cgcuLogo,
  'ICSMSU' : icsmsuLogo,
  'RCSU' : rcsuLogo,
  'RSMU' : rsmuLogo
}

const rollingBarScales = {
  '5m': 42,
  '1h': 5,
  '1d': 1.2
}

const calculateBarWidth = (percentage, timeframe) => {
  if (timeframe in rollingBarScales) {
    return (80 * (1 - 1 / Math.pow(rollingBarScales[timeframe], percentage)))
  } else {
    return percentage
  }
}

const ConstituentUnion = (props) => {


  return (
    <li {...props.flippedProps} className={styles.cus}>
      <div className={styles.content}>
        <div className={styles.barcontainer}>
          <div
            className={styles.bar}
            style={{ width: `${calculateBarWidth(props.percentage, props.timeframe)}%` }}
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
        <div className={styles.icon}>
          <img src={cusLogos[props.id]} alt={props.name + ' Logo'}/>
        </div>
      </div>
    </li>
  )
}

export default ConstituentUnion
