import React from 'react'
import styles from './styles.module.css'

export default ({ children, fill }) => {
  const wrapper = (fill) ? styles.wrapperFill : styles.wrapper
  return (
    <div className={wrapper}>
      {children}
    </div>
  )
}
