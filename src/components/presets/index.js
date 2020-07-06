import React from 'react'
import { map, startCase } from 'lodash'
import Typography from '../typography'
import styles from './styles.module.css'
import Youtube from '../youtube'
import urlSlug from 'url-slug'

const Limit = (data, limit) => {
  if (limit) {
    data.length = limit
  }
  return data
}

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, limit, presets }) => {
  return map(Limit(presets, limit), (file, i) => {
    return (
      <article style={{ border: '1px solid #666', backgroundColor: '#333' }}>
        <Typography>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <a href={'/preset-' + file.name.split('.')[0]}>{startCase(file.name.split('.')[0])}</a>
              </h3>
              <p className={styles.subheader}>by <a href={`/creator-${urlSlug(file.user.username)}`}>{file.user.username}</a></p>
            </div>
            {file.user.firebaseUrl && <img width='40' height='40' className={styles.avatar} src={file.user.firebaseUrl} alt={'Discord Avatar of ' + file.user.username} />}
          </div>
          <div className={styles.cover}>
            {!file.videoYoutube && <img src='/made-with-bitwig.png' alt='Made with Bitwig Logo' />}
            {file.videoYoutube && <Youtube key={file.id} title={file.name.split('.')[0]} link={file.videoYoutube} />}
          </div>
          {file.desc &&
            <div className={styles.info}>
              <p className={styles.desc}>{file.desc}</p>
            </div>}
          <p><span>💾</span>&nbsp;<a href={file.download} title={'Download ' + file.name + ' Preset'}>Download</a> this preset</p>
        </Typography>
      </article>
    )
  })
}
