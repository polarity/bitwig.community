import React from 'react'
import styles from './styles.module.css'

export default ({ children, ...keyvals }) => {
  return (
    <input
      {...keyvals}
      type='file'
      className={styles.input}
    />

  )
}
