import React from 'react'

import styles from './Button.module.scss'

const Button = (props) => {
  if (props.type == 'button') {
    return (
      <button
        className={`${styles.button} ${styles[props.className] || ''}`}
        type="button"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    )
  } else if (props.type == 'options') {
    return (
      <button
        type="button"
        onClick={props.onClick}
        className={props.className}
        id={props.id}
      >
        {props.children}
      </button>
    )
  } else {
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
}

export default Button
