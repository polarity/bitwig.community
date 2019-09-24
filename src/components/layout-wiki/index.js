import React from 'react'
import Typography from '../typography'
import styles from './styles.module.css'

export default ({ children }) =>
  <Typography className={styles.Typo}>
    {children}
  </Typography>
