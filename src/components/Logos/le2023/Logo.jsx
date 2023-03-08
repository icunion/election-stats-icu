import React from 'react'

import styles from './Logo.module.scss'
import dashboardLogo from 'dashboard-logo.svg'

const Logo = (props) => {
  return (
    <div className={styles.container}>
      <a href="https://www.imperialcollegeunion.org/your-union/leadership-elections-2022">
        <img src={dashboardLogo} alt="Leadership Elections 2023: 7 February - 18 March" />
      </a>
    </div>
  )
}

export default Logo
