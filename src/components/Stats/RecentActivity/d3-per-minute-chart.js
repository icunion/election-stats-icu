import d3 from '../../../d3-import'

const prepareChartData = (votesData, turnoutData) => {
  let chartData = []

  // Prepare time slices
  for (const [key, value] of Object.entries(votesData)) {
    chartData.push({
      timeSlice: Number(key),
      timedTypes: [
        { name: 'Votes', value: value },
        { name: 'Voters', value: key in turnoutData ? turnoutData[key] : 0 }
      ]
    })
  }

  // Sort array by timeslice
  chartData.sort((a, b) => {
    return a.timeSlice - b.timeSlice
  })

  // Add names
  chartData = chartData.map((element, index, chartDataOrig) => {
    element.name = index - chartDataOrig.length
    return element
  })

  // Return the most recent 20 minutes
  return chartData.reverse().slice(0, 20).reverse()
}

const renderPerMinuteChart = (svg, [votesData, turnoutData]) => {
  // Don't attmept to render the SVG if data hasn't loaded yet.
  if (
    Object.keys(votesData).length === 0 ||
    Object.keys(turnoutData).length === 0
  ) {
    return
  }

  // Setup dimension related constants.
  const graphDimensions = {
      width: 520,
      height: 170
    },
    margin = { top: 12, right: 18, bottom: 24, left: 18 },
    width = graphDimensions.width - margin.left - margin.right,
    height = graphDimensions.height - margin.top - margin.bottom

  // Setup axis scales.
  let x0 = d3.scaleBand().rangeRound([0, width]).padding(0.6)
  let x1 = d3.scaleBand()
  let y = d3.scaleLinear().range([height, 0])

  // Bar colours: Votes: indigo; Voters: red.
  let fillColour = d3.scaleOrdinal().range(['#E8EE2F', '#EE6128'])

  // Setup axes.
  let xAxis = d3.axisBottom(x0).tickSize(0, 0).tickPadding(6)
  let yAxis = d3
    .axisRight(y)
    .ticks(5)
    .tickSize(width)
    .tickFormat(d3.format(',.0f'))

  // Setup svg viewBox and preserve aspect ratio.
  svg.attr('preserveAspectRatio', 'xMidYMid meet')
  svg.attr('viewBox', `0 0 ${graphDimensions.width} ${graphDimensions.height}`)

  // Get the container group and ensure margin transform is applied.
  // Yes, I did give it a really derpy variable name #SorryNotSorry
  let svgg = svg
    .select('g.container')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // Prepare the data for creating the bars.
  const data = prepareChartData(votesData, turnoutData)
  const timedTypes = ['Votes', 'Voters']

  // Set axis domains based on current data.
  x0.domain(data.map((d) => d.name))
  x1.domain(timedTypes).rangeRound([0, x0.bandwidth()])
  y.domain([
    0,
    Math.ceil(
      (d3.max(data, (d) => d3.max(d.timedTypes, (d) => d.value)) + 1) / 10
    ) * 10
  ])

  // Remove existing x axis elements.
  svgg.selectAll('.x.axis *').remove()

  // Add new x axis elements.
  svgg
    .select('.x.axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .append('text')
    .attr('y', 9)
    .attr('x', width)
    .attr('dy', '.71em')
    .attr('fill', 'currentColor')
    .style('text-anchor', 'middle')
    .text('min')
  svgg.selectAll('.x.axis g text').attr('y', 9)

  // Remove existing y axis elements and add new y axis.
  svgg.selectAll('.y.axis *').remove()
  svgg.select('.y.axis').call(yAxis)

  // Apply minor class to all y axis ticks apart from the first.
  svgg
    .selectAll('.y.axis g')
    .filter((d) => d) // Excludes first line as 0 is false
    .classed('minor', true)

  svgg.selectAll('.y.axis g text').attr('x', 0).attr('dy', -4)

  // Remove existing bands.
  svgg.selectAll('.band').remove()

  // Create new bands using prepared data.
  let band = svgg
    .selectAll('.band')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'band')
    .attr('transform', function (d) {
      return 'translate(' + x0(d.name) + ',0)'
    })

    // Setup bar groups
    let barGroup = band
    .selectAll('g')
    .data(function (d) {
      return d.timedTypes
    })
    .enter()
    .append('g')
    .attr('class', 'bar')

  // Main bar rectangle has rounded corners for the the bar top cap.
  barGroup
    .append('rect')
    .attr('width', x0.bandwidth())
    .attr('x', function (d) {
      return x0(d.name)
    })
    .attr('y', function (d) {
      return y(d.value)
    })
    .attr('rx', x0.bandwidth() / 2)
    .attr('ry', x0.bandwidth() / 2)
    .attr('height', function (d) {
      return d3.max([height - y(d.value) - 1, 0])
    })
    .style('fill', function (d) {
      return fillColour(d.name)
    })
    .append('title')
    .text(function (d) {
      return d.name + ': ' + d.value
    })

  // Secondary bar covers the bottom rounded corners of the main bar.
  barGroup
    .append('rect')
    .attr('width', x0.bandwidth())
    .attr('x', function (d) {
      return x0(d.name)
    })
    .attr('y', function (d) {
      return (
        height - d3.min([(height - y(d.value)) / 2, x0.bandwidth() / 2]) - 1
      )
    })
    .attr('height', function (d) {
      return d3.min([(height - y(d.value)) / 2, x0.bandwidth() / 2])
    })
    .style('fill', function (d) {
      return fillColour(d.name)
    })
}

export default renderPerMinuteChart
