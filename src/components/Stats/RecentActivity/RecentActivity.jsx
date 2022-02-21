import React from 'react'

import { useSources, useTimedStat } from '../../../arithmospora/hooks'

import useD3 from '../../../hooks/use-d3'

import renderPerMinuteChart from './d3-per-minute-chart'
import styles from './RecentActivity.module.scss'

const RecentActivity = (props) => {
  // Ensure stat sources get connected
  useSources([props.source])

  // Get timed stats data
  const votesData = useTimedStat(props.source, 'votes', '60')
  const turnoutData = useTimedStat(props.source, 'turnout', '60')

  // Render the chart with d3 and get the ref d3 will work with
  const chartRef = useD3(renderPerMinuteChart, [votesData, turnoutData])

  return (
    <div className={styles.container}>
      <div className={styles.chartKey}>
        <dl>
          <dt className={`show-for-sr ${styles.votes}`}>Indigo bar:</dt> <dd className={styles.votes}>Votes cast</dd>
          <dt className={`show-for-sr ${styles.voters}`}>Red bar:</dt> <dd className={styles.voters}>New voters</dd>
        </dl>
      </div>

      <svg ref={chartRef}>
        <g className='container'>
          <g className='x axis'></g>
          <g className='y axis'></g>
        </g>
      </svg>
    </div>
  )
}

export default RecentActivity
