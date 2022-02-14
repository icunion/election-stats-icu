import React from 'react'

import styles from './Panel.module.scss'

const Panel = (props) => {
  return (
    <div className={`${styles.panel} ${styles[props.className] || ''}`}>
      <h2>{props.title}</h2>
      <div className={styles.children}>
        {props.children}
      </div>
    </div>
  )
}

export default Panel
