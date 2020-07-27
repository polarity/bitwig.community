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
      <Link to='/forum/' className={styles.NavLinks}>Overview</Link>
      &nbsp;| <Link to='/forum/add/' className={styles.NavLinks}>New Topic</Link>
    </Typography>
  </header>
)
