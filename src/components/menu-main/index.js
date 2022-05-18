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
    <Typography>
      {loggedInUser && <Link to='/dashboard' className={styles.NavLinks}><b>Dashboard</b></Link>}
      {loggedInUser && <span>&nbsp;|| </span>}
      <Link to='/' className={styles.NavLinks}>Startpage</Link>
      &nbsp;| <Link to='/video-guides/' className={styles.NavLinks}>Videos</Link>
      &nbsp;| <Link to='/gridniks/' className={styles.NavLinks}>Gridniks</Link>
      &nbsp;| <Link to='/challenges/' className={styles.NavLinks}>Challenges</Link>
      &nbsp;| <Link to='/presets' className={styles.NavLinks}>Presets</Link>
      &nbsp;| <a href='https://discord.gg/0g2ZPafIN3eWParf' className={styles.NavLinks}>Discord</a>
      &nbsp;| <a href='https://social.bitwig.community' className={styles.NavLinks}>Mastodon</a>
      &nbsp;| <Link to='/wiki/' className={styles.NavLinks}>BitWiki</Link>
    </Typography>
    <div className={styles.login}>
      <Typography>
        {!loggedInUser && <Login />}
        {loggedInUser && <Logout><span>Welcome <b>{loggedInUser.displayName}</b></span></Logout>}
      </Typography>
      <a href='https://bitwig.community'><img alt='Bitwig Community Logo by Amadeus Paulussen' src='/bitwig-logo.png' className={styles.img} /></a>
    </div>
  </header>
)
