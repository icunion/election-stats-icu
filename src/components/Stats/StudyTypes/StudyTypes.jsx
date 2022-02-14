import React from 'react'

import StudyType from './StudyType'

import styles from './StudyTypes.module.scss'

const StudyTypes = (props) => {
  return (
    <div className={styles.container}>
      <StudyType type='UG' source={props.source} />
      <StudyType type='PGR' source={props.source} />
      <StudyType type='PGT' source={props.source} />
    </div>
  )
}

export default StudyTypes
