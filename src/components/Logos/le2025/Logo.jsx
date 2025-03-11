import React from 'react'

import styles from './Logo.module.scss'
import dashboardLogo from 'dashboard-logo.svg'

const Logo = (props) => {
  return (
    <div className={styles.container}>
      <a href="https://www.imperialcollegeunion.org/representation/elections/leadership-elections">
        <img src={dashboardLogo} alt="Leadership Elections 2024: 12 February - 14 March" />
      </a>
    </div>
  )
}

export default Logo
