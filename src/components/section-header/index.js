import React from 'react'
import styles from './styles.module.css'

export default ({ children, h }) => (
  <div className={styles.wrapper}>
    <h2 className={styles.heading}>{h}</h2>
    <p className={styles.sub}>{children}</p>
  </div>
)
