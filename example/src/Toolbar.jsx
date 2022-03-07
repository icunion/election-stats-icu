import React from 'react'

export const Toolbar = ({ selectHandler, closeHandler }) => {
  const selectOnChange = (event) => {
    selectHandler(event.target.value)
  }

  return (
    <div>
      <label>
        Show:{' '}
        <select onChange={selectOnChange}>
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
