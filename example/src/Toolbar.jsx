import React from 'react'

import styles from './Toolbar.module.css'

export const Toolbar = ({ selected, selectHandler, closeHandler }) => {
  const selectOnChange = (event) => {
    selectHandler(event.target.value)
  }

  return (
    <div className={styles.toolbar}>
      <label>
        Show:{' '}
        <select value={selected} onChange={selectOnChange}>
          <option value='Banner'>Banner</option>
          <option value='DashboardLE2022'>DashboardLE2022</option>
          <option value='DashboardLE2022.maxWidth'>
            DashboardLE2022 with maxWidth set
          </option>
        </select>
      </label>
      {' '}
      <button onClick={closeHandler}>Hide toolbar</button>
    </div>
  )
}
