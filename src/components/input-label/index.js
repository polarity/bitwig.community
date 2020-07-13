import React from 'react'
import styles from './styles.module.css'

export default ({ children, ...keyvals }) =>
  <label {...keyvals} className={styles.label}>
    {children}
  </label>
