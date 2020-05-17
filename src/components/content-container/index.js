import React from 'react'
import styles from './styles.module.css'
import Typography from '../typography'

const getBgYt = (yt) => {
  if (yt) {
    return { backgroundImage: `url(https://i3.ytimg.com/vi/${yt}/hqdefault.jpg)` }
  } else {
    return {}
  }
}
const getImgBg = (img) => {
  if (img) {
    return { backgroundImage: `url(${img})` }
  } else {
    return {}
  }
}
const getYT = (yt, title) => {
  if (yt) {
    const url = `https://youtu.be/${yt}`
    return <p>
      <span role='img' aria-label='TV Symbol'>📺</span>&nbsp;
      Watch <a href={url}>{title}</a>
    </p>
  }
}

export default ({ children, channelId, latestYtId, latestYtTitle, img, link, title }) => (
  <article className={styles.wrapper}>
    {latestYtId && <a href={'https://youtu.be/' + latestYtId} rel='noopener noreferrer' target='_blank' className={styles.articleImage} style={getBgYt(latestYtId)}>{latestYtTitle}</a>}
    {img && <a href={link} rel='noopener noreferrer' target='_blank' className={styles.articleImage} style={getImgBg(img)}>{link}</a>}
    <Typography>
      {link && <h2><a href={link} rel='noopener noreferrer' target='_blank'>{title}</a></h2>}
      {latestYtId && <h2><a href={'https://www.youtube.com/channel/' + channelId} rel='noopener noreferrer' target='_blank'>{title}</a></h2>}
      {children}
      {getYT(latestYtId, latestYtTitle)}
    </Typography>
  </article>
)
