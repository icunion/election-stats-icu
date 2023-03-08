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
          <option value='StepByStepLE2022.maxWidth'>
            Step By Step with maxWidth set
          </option>
          <option value='DashboardLE2023'>
            DashboardLE2023
          </option>
          <option value='StepByStepLE2023.maxWidth'>
            Step By Step 2023 with maxWidth set
          </option>
        </select>
      </label>
      {' '}
      <button onClick={closeHandler}>Hide toolbar</button>
    </div>
  )
}
