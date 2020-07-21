import React from 'react'
import styles from './styles.module.css'
import Typography from '../typography'

export default ({ children, fill }) => {
  return (
    <div className={styles.footer}>
      <Typography>
        <ul>
          <li>Terms of Service</li>
          <li><a href='https://bitwig.community/'>bitwig.community</a> created by <a href='https://polarity.me'>polarity</a> © 2020</li>
        </ul>
      </Typography>
    </div>
  )
}
