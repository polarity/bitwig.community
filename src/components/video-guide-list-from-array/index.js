import React from 'react'
import { map } from 'lodash'
import { Link } from 'gatsby'
import urlSlug from 'url-slug'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, array }) => {
  return map(array, (item, i) => {
    return <li><Link to={'/video-creator-' + urlSlug(item.channel)}>{item.channel}</Link></li>
  })
}
