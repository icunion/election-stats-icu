import React from 'react'

import Plot from 'react-plotly.js'

import { useSources, useTimedStat } from '../../../arithmospora/hooks'
import * as yearData from '../../../definitions/election-year-metadata'

const Graph = (props) => {
  // Ensure stat sources get connected
  useSources([props.source, props.prevYearSource])

  // generate datetime sequence for the x-axis using the startTime and endTime
  const getDatesBetween = (startTime, endTime) => {
    const dates = []
    while (startTime < endTime) {
      startTime = startTime + 300000
      dates.push(new Date(startTime))
    }
    return dates
  }

  //get start and end times from election-year-metadata
  const startTime = yearData.yearData[props.source].minTime
  const endTime = yearData.yearData[props.source].maxTime
  const dateArray = getDatesBetween(startTime, endTime)

  //add offsets to the x values and get cumulative data
  const getChartData = (id, traceValue, traceYear) => {
    const cumulative = id.includes('cumulative')
    const chartPoints = Object.values(traceValue)
    const chartYear = traceYear
    const maxPlotPoints = Math.floor(
      (Number(yearData.yearData[props.source].years[chartYear].periodLength) *
        3600) /
        300
    )

    while (chartPoints.length < maxPlotPoints) {
      chartPoints.push(0)
    }

    for (let i = 0; i < Math.floor((Number(yearData.yearData[props.source].years[chartYear].offset) * 3600) / 300) + 1; i++) {
      chartPoints.unshift(0)
    }

    // calculate the cumulative points for the Cumulative Chart
    if (cumulative) {
      const actualPlotPoints = Math.floor(
        ((Number(yearData.yearData[props.source].years[chartYear].actualLength) + Number(yearData.yearData[props.source].years[chartYear].offset) + 1) *
          3600) /
          300
      )
      const cumul = chartPoints.reduce(
        (acc, val, i) => {
          let { sum, res } = acc
            sum += val
            res.push(sum)
          return { sum, res }
        },
        {
          sum: 0,
          res: []
        }
      )
      // cut the graph to the actual end of the voting period and fill with 0s
      cumul.res.fill(0, actualPlotPoints)
      return cumul.res
    } else {
      return chartPoints
    }
  }

  //Return selected graph's x and y values and traces
  const graphInfo = [
    {
      id: 'votesGraph',
      mainTitle: 'Votes Cast per 5 Minutes',
      ytitle: 'Number of Votes',
      traceOne: useTimedStat(props.prevYearSource, 'votes', '300'),
      traceTwo: useTimedStat(props.source, 'votes', '300')
    },
    {
      id: 'votersGraph',
      mainTitle: 'New Voters per 5 Minutes',
      ytitle: 'Number of Voters',
      traceOne: useTimedStat(props.prevYearSource, 'turnout', '300'),
      traceTwo: useTimedStat(props.source, 'turnout', '300')
    },
    {
      id: 'cumulativeGraph',
      mainTitle: 'Cumulative Voters',
      ytitle: 'Number of Voters',
      traceOne: useTimedStat(props.prevYearSource, 'turnout', '300'),
      traceTwo: useTimedStat(props.source, 'turnout', '300')
    }
  ]

  // check which graph to show according to the button selected
  const result = graphInfo.find((x) => x.id === props.graphData)

  const trace1 = {
    x: dateArray, //time/date
    y: getChartData(result.id, result.traceOne, props.prevYear),
    name: props.prevYear,
    mode: 'lines',
    type: 'scattergl',
    line: {
      color: yearData.yearData[props.source].years[props.prevYear].colour
    },
    fill: 'tozeroy',
    hovertemplate:
      '<span style="font-size:10px"> %{x} </span><br>'+
      '<span style="color:#45a5ad">%{meta}: </span>'+
      '<span style="font-weight:bold" dx="3">%{y}</span><extra></extra>',
    meta: props.prevYear
  }
  const trace2 = {
    x: dateArray,
    y: getChartData(result.id, result.traceTwo, props.year), // number of votes
    name: props.year,
    mode: 'lines',
    type: 'scattergl',
    line: {
      color: yearData.yearData[props.source].years[props.year].colour
    },
    fill: 'tozeroy',
    hovertemplate:
      '<span style="font-size:10px"> %{x} </span><br>'+
      '<span style="color:#45a5ad">%{meta}: </span>'+
      '<span style="font-weight:bold" dx="3">%{y}</span><extra></extra>',
    meta: props.year
  }

  const data = [trace1, trace2]

  const layout = {
    xaxis: {
      type: 'date'
    },
    yaxis: {
      title: result.ytitle
    },
    title: result.mainTitle,
    // height: '100%',
    // width: '100%',
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.2,
      xanchor: 'center'
    },
    // autosize: true
  }

  const config = {responsive: true}

  return (
    <div>
      <h3>{yearData.yearData[props.source].votingPeriodText}</h3>
      <Plot data={data} layout={layout} config={config} useResizeHandler
     style={{ width: "100%", height: "100%" }}/>
    </div>
  )
}

export default Graph
