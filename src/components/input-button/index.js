import React from 'react'
import styles from './styles.module.css'

export default ({ children, onClick }) =>
  <button
    onClick={onClick}
    className={styles.button}>
    {children}
  </button>
