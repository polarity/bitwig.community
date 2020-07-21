import React from 'react'
import styles from './styles.module.css'
import { mapper } from '@reduxless/react'
import Typography from '../typography'
import { Link } from 'gatsby'

const Mapped = mapper({
  loggedInUser: store => store.get('loggedInUser')
}, {
})

export default Mapped(({ children, loggedInUser }) =>
  <header className={styles.wrapper}>
    <span className={styles.logo} />
    <Typography>
      <Link to='/presets/' className={styles.NavLinks}>Featured Presets</Link>
      &nbsp;| <Link to='/presets-all/' className={styles.NavLinks}>All Presets</Link>
    </Typography>
  </header>
)
