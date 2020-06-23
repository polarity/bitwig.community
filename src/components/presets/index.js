import React from 'react'
import { map, startCase } from 'lodash'
import Typography from '../typography'
import styles from './styles.module.css'

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
          <h3>{startCase(file.name)}</h3>
          <p>by {file.user.username}</p>
          <img style={{ maxWidth: '100%', marginBottom: '10px' }} src='/made-with-bitwig.png' alt='Made with Bitwig Logo' />
          <img style={{ maxWidth: '60px', float: 'left', marginRight: '10px' }} src={file.user.avatarURL} alt='avatar' />
          <p>{file.desc} Click below to download this Bitwig preset! by {file.user.username} <span>💾</span>&nbsp;<a href={'https://github.com/polarity/bitwig-community-presets/raw/master/' + file.name} title={'Download ' + file.name + ' Preset'}>Download</a></p>
        </Typography>
      </article>
    )
  })
}
