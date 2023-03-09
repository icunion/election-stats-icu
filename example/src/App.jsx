import React, { useState } from 'react'
import { useLocalStorage } from 'election-stats-icu'

import { Toolbar } from './Toolbar'

import { Banner } from 'election-stats-icu'
import { DashboardLE2022, DashboardLE2023 } from 'election-stats-icu'
import { StepByStepLE2022, StepByStepLE2023 } from 'election-stats-icu'

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
        <Banner votingCloseDate={Date.now() + 15000} mainSource='le2023' />
      )}
      {appToRender === 'Banner.autumn' && (
        <Banner votingCloseDate={Date.now() + 15000} mainSource='ae2022' season='autumn' />
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
      {appToRender === 'DashboardLE2023' && (
        <DashboardLE2023
        votingCloseDate={Date.now() + 15000}
        mainSource='le2023'
        cspsSource='le2023csps'
      />
      )}
      {appToRender === 'DashboardLE2023.maxWidth' && (
        <DashboardLE2023
        votingCloseDate={Date.now() + 15000}
        mainSource='le2023'
        cspsSource='le2023csps'
        maxWidth='1170'
        />
      )}
      {appToRender === 'StepByStepLE2023.maxWidth' && (
        <StepByStepLE2023
          votingCloseDate={Date.now() + 15000}
          mainSource='le2023'
          prevYearSource="le2022"
          thisYear="2023"
          prevYear="2022"
          maxWidth='1170'
        />
      )}
    </React.Fragment>
  )
}

export default App
