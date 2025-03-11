import React from 'react'

import TimeLineEntry from './TimeLineEntry'

import styles from './TimeLine.module.scss'

const TimeLine = (props) => {
  return (
    <div className={styles.container}>
      {/* <h2>Time line</h2> */}
      <TimeLineEntry title="Last 5 min" interval='5m' source={props.source} />
      <TimeLineEntry title="Last hour" interval='1h' source={props.source} />
      <TimeLineEntry title="Last day" interval='1d' source={props.source} />
    </div>
  )
}

export default TimeLine
