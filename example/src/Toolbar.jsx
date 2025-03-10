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
          <option value='Banner.autumn'>Banner Autumn</option>
          <option value='DashboardLE2025'>DashboardLE2025</option>
          <option value='DashboardLE2025.maxWidth'>
            DashboardLE2025 with maxWidth set
          </option>
          <option value='StepByStepLE2025.maxWidth'>
            Step By Step 2025 with maxWidth set
          </option>
          <option value='DashboardLE2024'>DashboardLE2024</option>
          <option value='DashboardLE2024.maxWidth'>
            DashboardLE2024 with maxWidth set
          </option>
          <option value='StepByStepLE2024.maxWidth'>
            Step By Step 2024 with maxWidth set
          </option>
          <option value='DashboardLE2023'>DashboardLE2023</option>
          <option value='DashboardLE2023.maxWidth'>
            DashboardLE2023 with maxWidth set
          </option>
          <option value='StepByStepLE2023.maxWidth'>
            Step By Step 2023 with maxWidth set
          </option>
          <option value='DashboardLE2022'>DashboardLE2022</option>
          <option value='DashboardLE2022.maxWidth'>
            DashboardLE2022 with maxWidth set
          </option>
          <option value='StepByStepLE2022.maxWidth'>
            Step By Step with maxWidth set
          </option>
        </select>
      </label>
      {' '}
      <button onClick={closeHandler}>Hide toolbar</button>
    </div>
  )
}
