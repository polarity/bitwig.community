import React from 'react'
import styles from './styles.module.css'
import Login from '../login'
import { mapper } from '@reduxless/react'
import Typography from '../typography'
import Logout from '../logout'

const Mapped = mapper({
  loggedInUser: store => store.get('loggedInUser')
}, {
})

export default Mapped(({ children, loggedInUser }) =>
  <header className={styles.wrapper}>
    <a href='https://bitwig.community'><img alt='Bitwig Community Logo by Amadeus Paulussen' src='/bitwig-logo.png' className={styles.img} /></a>
    <Typography>
      {!loggedInUser && <Login />}
      {loggedInUser && <Logout><span>welcome {loggedInUser.displayName}</span></Logout>}
    </Typography>
    <Typography>
      <a href='/' className={styles.NavLinks}>Startpage</a>
      &nbsp;| <a href='/gridniks/' className={styles.NavLinks}>Gridniks</a>
      &nbsp;| <a href='/presets' className={styles.NavLinks}>Presets</a>
      &nbsp;| <a href='/wiki/' className={styles.NavLinks}>BitWiki</a>
    </Typography>
  </header>
)
