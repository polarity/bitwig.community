import React from 'react'
import { map } from 'lodash'
import Youtube from '../youtube'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, videos }) => {
  return map(videos, (item, i) => {
    return <Youtube key={'videoguide-' + i} title={item.title} link={item.url} />
  })
}
