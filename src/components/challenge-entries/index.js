import React from 'react'
import { map } from 'lodash'
import Youtube from '../youtube'
import Typography from '../typography'
import styles from './styles.module.css'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, entries }) => {
  return map(entries, (item, i) => {
    return (
      <div className={styles.main} key={'challengeEntry-' + i}>
        <Youtube title={'Submission from ' + item.artist} link={item.yt} />
        <Typography>
          <p><span role='img' aria-label='disk symbol'>💾</span>&nbsp;<a href={item.preset}>Download</a></p>
        </Typography>
      </div>
    )
  })
}
