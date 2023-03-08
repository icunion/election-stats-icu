import React, { useState } from 'react'
import useLocalStorage from '../../hooks/use-local-storage'

import Graph from '../../components/Stats/Graphs/Graph'
import GraphOption from '../../components/UI/Button/GraphOption.jsx'

import styles from './StepByStep.module.scss'

const StepByStep = (props) => {
  // TODO: use local storage to set the state
  // const [option, setSelectedGraph] = useState('votesGraph')
  const [option, setSelectedGraph] = useLocalStorage('option','votesGraph')

  const GraphOptionHandler = (selectedGraph) => {
    setSelectedGraph(selectedGraph)
  }

  const graphText = {
    votesGraph:
      'The graph shows the total number of votes cast in each 5 minute period',
    votersGraph:
      'The graph shows the number of new voters in each 5 minute period',
    cumulativeGraph:
      "The final graph shows the cumulative number of voters versus the previous year, allowing you to see whether we're ahead or behind."
  }

  return (
    <div className={`election-stats-icu ${styles.stepContainer}`}>

      <div style={{ height: "450px" }}>
        <Graph
          source={props.mainSource}
          prevYearSource={props.prevYearSource}
          year={props.thisYear}
          prevYear={props.prevYear}
          graphData={option}
        />
      </div>
      <div>
        <div className={styles.paragraph}>
          <p>{graphText[option]}</p>
        </div>
        <GraphOption onSetActive={GraphOptionHandler} />
      </div>
    </div>
  )
}

export default StepByStep
