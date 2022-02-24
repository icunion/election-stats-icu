import React from 'react'
import AnimatedNumber from 'animated-number-react'

const TopTurnoutEntry = (props) => {
  return (
    <li>
      <span>{props.name}</span>{' '}
      <AnimatedNumber
        duration='750'
        formatValue={(value) => `${value.toFixed(1)}%`}
        value={props.percentage}
      />
    </li>
  )
}

export default TopTurnoutEntry
