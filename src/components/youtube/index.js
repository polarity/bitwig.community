import React, { useState } from 'react'
import styles from './styles.module.css'
import getYoutubeImage from '../../utils/getYoutubeImage'
import getYoutubeSlug from '../../utils/getYoutubeSlug'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ link, title, quality }) => {
  const [player, setPlayer] = useState(false)
  return (
    <div
      rel='noopener noreferrer'
      onClick={() => setPlayer(true)}
      className={styles.wrapper}
      style={{ backgroundImage: `url(${getYoutubeImage(link, quality)})` }}
    >
      {player &&
        <iframe
          title={title}
          className={styles.iframe}
          src={'https://www.youtube.com/embed/' + getYoutubeSlug(link) + '?autoplay=1&controls=1'}
          frameborder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen='allowfullscreen'
        />}
    </div>)
}
