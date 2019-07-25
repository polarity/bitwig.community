import React from 'react'
import { mapper } from '@reduxless/react'

const Mapped = mapper({}, {
  logout: (store, ownProps, data) => {
    store.set('loggedInUser', false)
  }
})

export default Mapped(({ children, logout }) =>
  <div>
    {children} <button onClick={logout}>logout</button>
  </div>
)
