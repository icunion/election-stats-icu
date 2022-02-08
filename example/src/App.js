import React, { useContext } from 'react'

import { Banner } from 'election-stats-icu'
import 'election-stats-icu/dist/index.css'

const App = () => {
  return <Banner votingCloseDate={Date.now() + 5000} mainSource="le2022"/>
}

export default App
