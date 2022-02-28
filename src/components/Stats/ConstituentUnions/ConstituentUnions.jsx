import React from 'react'

import ConstituentUnion from './ConstituentUnion'
import RollingTimeFrame from '../../UI/Button/RollingTimeFrame'

import styles from './ConstituentUnions.module.scss'

const ConstituentUnions = (props) => {
  const RollingTimeFrameHandler = (selectedTimeFrame) => {
    console.log(selectedTimeFrame)
  };

  return (
    <div className={styles.container}>
      <ol className={styles.list}>
        <ConstituentUnion type='CGCU' source={props.source} />
        <ConstituentUnion type='ICSMSU' source={props.source} />
        <ConstituentUnion type='RCSU' source={props.source} />
        <ConstituentUnion type='RSMU' source={props.source} />
      </ol>
      <div className={styles.buttonsContainer}>
        <RollingTimeFrame onChangeRolling={RollingTimeFrameHandler}/>
        {/* <RollingTimeFrame /> */}
      </div>
    </div>
  )
}

export default ConstituentUnions
