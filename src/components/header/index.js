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
      <a href='/news/'>Bitwig News</a>
      &nbsp;| <a href='/gridniks/'>Gridniks</a>
      &nbsp;| <a href='/wiki/'>Bitwiggi</a>
    </Typography>
  </header>
)
