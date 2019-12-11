import React from 'react'
import styles from './styles.module.css'

const Linky = require('linkifyjs/html')

export default ({ children, avatar }) => (
  <div className={styles.main}>
    <img
      alt='tweet'
      className={styles.avatar}
      src={'https://avatars.io/twitter/' + avatar}
    />
    <span dangerouslySetInnerHTML={{ __html: Linky(children) }} />
  </div>
)
