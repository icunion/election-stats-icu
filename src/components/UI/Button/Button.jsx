import React from 'react'

import styles from './Button.module.scss'

const Button = (props) => {
  return (
    <a
      className={`${styles.button} ${styles[props.className] || ''}`}
      href={props.href}
      target={props.target}
    >
      {props.children}
    </a>
  )
}

export default Button
