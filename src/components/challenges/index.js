import React from 'react'
import { map } from 'lodash'
import { Link } from 'gatsby'
import firebaseTimestamp2FormattedString from '../../utils/firebaseTimestamp2FormattedString'
import styles from './styles.module.css'

const Limit = (data, limit) => {
  if (limit) {
    data.length = limit
  }
  return data
}

export default ({ children, limit, challenges }) => {
  return map(Limit(challenges, limit), (item, i) => {
    if (item.closed) {
      return <li key={'challenge-' + item.id} className={styles.entryClosed}><span className={styles.closedTag}>closed</span> - <Link to={'/challenge-' + item.id}>{item.title}</Link>   ({item.participants} 👩‍🍳)</li>
    } else {
      return <li key={'challenge-' + item.id} className={styles.entry}><span className={styles.openTag}>open</span> » {firebaseTimestamp2FormattedString(item.deadline)} - <Link to={'/challenge-' + item.id}>{item.title}</Link> - {item.participants} 👩‍🍳</li>
    }
  })
}
