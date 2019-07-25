import React from 'react'
import { mapper } from '@reduxless/react'

const Mapped = mapper({}, {
  openLogin: (store, ownProps, data) => {
    store.set('modalLoginState', true)
  }
})

export default Mapped(({openLogin}) => {
  return <div><button onClick={openLogin}>login</button></div>
})
