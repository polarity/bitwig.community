import React from 'react'
import { map, startCase } from 'lodash'
import Typography from '../typography'
import styles from './styles.module.css'
import Youtube from '../youtube'

const Limit = (data, limit) => {
  if (limit) {
    data.length = limit
  }
  return data
}

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, challenges }) => {
  return map(Limit(challenges, limit), (item, i) => {
    return <Youtube key={item.id} title={item.title} link={item.url} />
  })
}
