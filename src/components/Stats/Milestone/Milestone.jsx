import React, { useEffect, useState } from 'react'

import styles from './Milestone.module.scss'

let loadedTimeout = null
let finishedTimeout = null

const Milestone = ({ source, name, message, holdFor }) => {
  const [loaded, setLoaded] = useState(false)
  const [finished, setFinished] = useState(false)

  const milestoneIdentifier = `${source}:${name}`

  // We reset the timeouts if the milestone changes while the
  // previous one is displayed. We don't cleanup timeouts here as
  // this effect will fire whenever milestoneIdentifier changes.
  // Instead, we reset loaded back to false so the loaded effect
  // is applied on the new milestone.
  useEffect(() => {
    clearTimeout(loadedTimeout)
    clearTimeout(finishedTimeout)
    loadedTimeout = setTimeout(() => setLoaded(true), 20)
    finishedTimeout = setTimeout(() => setFinished(true), (holdFor || 8000) - 1000)
    return () => setLoaded(false)
  }, [milestoneIdentifier])

  // Ensure timeouts are cleared on unmount.
  useEffect(() => {
    return () => {
      clearTimeout(loadedTimeout)
      clearTimeout(finishedTimeout)
    }
  }, [])

  return (
    <div className={`${styles.container} ${finished && styles.finished}`}>
      <div className={`${styles.loadEffect} ${loaded && styles.loaded}`}>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  )
}

export default Milestone
