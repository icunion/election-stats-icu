import React, { useState } from 'react'
import { useLocalStorage } from 'election-stats-icu'

import { Toolbar } from './Toolbar'

import { Banner } from 'election-stats-icu'
import { DashboardLE2022 } from 'election-stats-icu'
import { StepByStepLE2022 } from 'election-stats-icu'

import 'election-stats-icu/dist/index.css'

const App = () => {
  const [showToolbar, setShowToolbar] = useState(true)
  const [appToRender, setAppToRender] = useLocalStorage('appToRender', 'Banner')

  const selectApp = (app) => {
    setAppToRender(app)
  }

  const closeToolbar = () => {
    setShowToolbar(false)
  }

  return (
    <React.Fragment>
      {showToolbar && (
        <Toolbar selected={appToRender} selectHandler={selectApp} closeHandler={closeToolbar} />
      )}
      {appToRender === 'Banner' && (
        <Banner votingCloseDate={Date.now() + 15000} mainSource='le2022' />
      )}
      {appToRender === 'DashboardLE2022' && (
        <DashboardLE2022
          votingCloseDate={Date.now() + 15000}
          mainSource='le2022'
          cspsSource='le2022csps'
        />
      )}
      {appToRender === 'DashboardLE2022.maxWidth' && (
        <DashboardLE2022
          votingCloseDate={Date.now() + 15000}
          mainSource='le2022'
          cspsSource='le2022csps'
          maxWidth='1170'
        />
      )}
      {appToRender === 'StepByStepLE2022.maxWidth' && (
        <StepByStepLE2022
          votingCloseDate={Date.now() + 15000}
          mainSource='le2022'
          prevYearSource="le2021"
          thisYear="2022"
          prevYear="2021"
          maxWidth='1170'
        />
      )}
    </React.Fragment>
  )
}

export default App
