import React from 'react'
import styles from './styles.module.css'

export default ({ children }) => (
  <header className={styles.wrapper}>
    <a href='https://bitwig.community'><img alt='Bitwig Community Logo by Amadeus Paulussen' src='bitwig-logo.png' className={styles.img} /></a>
  </header>
)
