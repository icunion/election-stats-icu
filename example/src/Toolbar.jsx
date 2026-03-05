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
          <option value='DashboardLE2026'>2026 Dashboard</option>
          <option value='StepByStepLE2026'>2026 Step By Step</option>
          <option value='DashboardLE2025'>2025 Dashboard</option>
          <option value='StepByStepLE2025'>2025 Step By Step</option>
          <option value='DashboardLE2024'>2024 Dashboard</option>
          <option value='StepByStepLE2024'>2024 Step By Step</option>
          <option value='DashboardLE2023'>2023 Dashboard</option>
          <option value='StepByStepLE2023'>2023 Step By Step</option>
          <option value='DashboardLE2022'>2022 Dashboard</option>
          <option value='StepByStepLE2022'>2022 Step By Step</option>
        </select>
      </label>{' '}
      <button onClick={closeHandler}>Hide toolbar</button>
    </div>
  )
}
