import React, { useState } from 'react'
import { useLocalStorage } from 'election-stats-icu'

import { Toolbar } from './Toolbar'

import { Banner } from 'election-stats-icu'
import { DashboardLE2022, DashboardLE2023, DashboardLE2024, DashboardLE2025, DashboardLE2026 } from 'election-stats-icu'
import { StepByStepLE2022, StepByStepLE2023, StepByStepLE2024, StepByStepLE2025, StepByStepLE2026 } from 'election-stats-icu'

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

      {appToRender === 'StepByStepLE2022' && (
        <StepByStepLE2022
          votingCloseDate={Date.now() + 15000}
          mainSource='le2022'
          prevYearSource="le2021"
          thisYear="2022"
          prevYear="2021"
        />
      )}
      {appToRender === 'DashboardLE2023' && (
        <DashboardLE2023
        votingCloseDate={Date.now() + 15000}
        mainSource='le2023'
        cspsSource='le2023csps'
      />
      )}

      {appToRender === 'StepByStepLE2023' && (
        <StepByStepLE2023
          votingCloseDate={Date.now() + 15000}
          mainSource='le2023'
          prevYearSource="le2022"
          thisYear="2023"
          prevYear="2022"
        />
      )}
      {appToRender === 'DashboardLE2024' && (
        <DashboardLE2024
        votingCloseDate={Date.now() + 15000}
        mainSource='le2024'
        cspsSource='le2024csps'
      />
      )}
 
      {appToRender === 'StepByStepLE2024' && (
        <StepByStepLE2024
          votingCloseDate={Date.now() + 15000}
          mainSource='le2024'
          prevYearSource="le2023"
          thisYear="2024"
          prevYear="2023"
        />
      )}
      {appToRender === 'DashboardLE2025' && (
        <DashboardLE2025
        votingCloseDate={Date.now() + 15000}
        mainSource='le2025'
        cspsSource='le2025csps'
      />
      )}
      {appToRender === 'StepByStepLE2025' && (
        <StepByStepLE2025
          votingCloseDate={Date.now() + 15000}
          mainSource='le2025'
          prevYearSource="le2024"
          thisYear="2025"
          prevYear="2024"
        />
      )}
      {appToRender === 'DashboardLE2026' && (
        <DashboardLE2026
          votingCloseDate={Date.now() + 15000}
          mainSource='le2026'
          cspsSource='le2026csps'
      />
      )}
      {appToRender === 'StepByStepLE2026' && (
        <StepByStepLE2026
          votingCloseDate={Date.now() + 15000}
          mainSource='le2026'
          prevYearSource="le2025"
          thisYear="2026"
          prevYear="2025"
        />
      )}
    </React.Fragment>
  )
}

export default App
