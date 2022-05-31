import React from 'react'
import { map } from 'lodash'
import Youtube from '../youtube'
import Typography from '../typography'
import styles from './styles.module.css'

const youtube = (item) => {
  if (item.yt && item.yt.length > 0) {
    return <Youtube title={'Submission from ' + item.artist} link={item.yt} />
  } else {
    return <img src='/dummy-patch.jpg' alt='dummy patch' />
  }
}
/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, entries }) => {
  return map(entries, (item, i) => {
    return (
      <div className={styles.main} key={'challengeEntry-' + i}>
        <div className={styles.cover}>
          {youtube(item)}
        </div>
        <Typography>
          <p><span role='img' aria-label='disk symbol'>💾</span>&nbsp;<a href={item.preset}>Download</a> - by {item.artist}</p>
        </Typography>
      </div>
    )
  })
}
