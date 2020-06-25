import React from 'react'
import { map, startCase } from 'lodash'
import Typography from '../typography'
import styles from './styles.module.css'
import Youtube from '../youtube'

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
          <h3 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{startCase(file.name.split('.')[0])}</h3>
          <p>by {file.user.username}</p>
          {!file.videoYoutube && <img style={{ maxWidth: '100%', marginBottom: '10px' }} src='/made-with-bitwig.png' alt='Made with Bitwig Logo' />}
          {file.videoYoutube && <Youtube key={file.id} title={file.name.split('.')[0]} link={file.videoYoutube} />}
          <img style={{ maxWidth: '60px', float: 'left', marginRight: '10px' }} src={file.user.firebaseUrl} alt='avatar' />
          <p>{file.desc} Click below to download this Bitwig preset! by <b>{file.user.username}</b></p>
          <p><span>💾</span>&nbsp;<a href={file.download} title={'Download ' + file.name + ' Preset'}>Download</a></p>
        </Typography>
      </article>
    )
  })
}
