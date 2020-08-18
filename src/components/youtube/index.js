import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'
import getYoutubeImage from '../../utils/getYoutubeImage'
import getYoutubeSlug from '../../utils/getYoutubeSlug'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ link, title, quality }) => {
  const [player, setPlayer] = useState(false)
  const [youtubeImage, setYoutubeImage] = useState('/made-with-bitwig.png')

  // the youtube image needs some time to check for the maxres
  // image for availability. so we set a local state when the result
  // is ready
  useEffect(() => {
    // each useEffect can return a cleanup function
    const get = async () => {
      setYoutubeImage(await getYoutubeImage(link, quality))
    }
    get()
  }, [])

  return (
    <div
      rel='noopener noreferrer'
      onClick={() => setPlayer(true)}
      className={styles.wrapper}
      style={{ backgroundImage: `url(${youtubeImage})` }}
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
