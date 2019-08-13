import React from 'react'
import styles from './styles.module.css'

const Linky = require('linkifyjs/html')

export default ({ children, title, link, pageTitle, date }) => (
  <div className={styles.main}>
    <h2 className={styles.title}>
      <span className={styles.pageTitle}>{pageTitle}: </span>
      <a href={link}>{title}</a>
    </h2>
    <p className={styles.posttime}>{date}</p>
    <span dangerouslySetInnerHTML={{__html: Linky(children)}} />
  </div>
)
