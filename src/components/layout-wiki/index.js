import React from 'react'
import Typography from '../typography'
import styles from './styles.module.css'

export default ({ children }) =>
  <div className={styles.Typo}>
    <Typography>
      {children}
    </Typography>
  </div>
