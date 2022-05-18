import React from 'react'
import { map, size } from 'lodash'
import Youtube from '../youtube'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, entries }) => {
  const i = 1
  return map(entries, (item, i) => {
    if (i >= limit) return null
    return <Youtube key={item.id} title={item.title} link={item.yt} />
  })
}
