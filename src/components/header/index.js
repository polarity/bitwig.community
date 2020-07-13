import React from 'react'
import styles from './styles.module.css'
import Login from '../login'
import { mapper } from '@reduxless/react'
import Typography from '../typography'
import Logout from '../logout'
import { Link } from 'gatsby'

const Mapped = mapper({
  loggedInUser: store => store.get('loggedInUser')
}, {
})

export default Mapped(({ children, loggedInUser }) =>
  <header className={styles.wrapper}>
    <a href='https://bitwig.community'><img alt='Bitwig Community Logo by Amadeus Paulussen' src='/bitwig-logo.png' className={styles.img} /></a>
    <Typography>
      {!loggedInUser && <Login />}
      {loggedInUser && <Logout><span>Welcome <b>{loggedInUser.displayName}</b></span></Logout>}
    </Typography>
    <Typography>
      {loggedInUser && <Link to='/dashboard' className={styles.NavLinks}><b>Dashboard</b></Link>}
      {loggedInUser && <span>&nbsp;|| </span>}
      <Link to='/' className={styles.NavLinks}>Startpage</Link>
      &nbsp;| <Link to='/gridniks/' className={styles.NavLinks}>Gridniks</Link>
      &nbsp;| <Link to='/presets' className={styles.NavLinks}>Presets</Link>
      &nbsp;| <Link to='/wiki/' className={styles.NavLinks}>BitWiki</Link>
    </Typography>
  </header>
)
