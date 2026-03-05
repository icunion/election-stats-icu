import React from 'react'

import styles from './Logo.module.scss'
import dashboardLogo from 'dashboard-logo.png'

const Logo = (props) => {
  return (
    <div className={styles.container}>
      <a href="https://www.imperialcollegeunion.org/representation/elections/leadership-elections">
        <img src={dashboardLogo} alt="Leadership Elections 2026" />
      </a>
    </div>
  )
}

export default Logo
