import React from 'react'
import { map } from 'lodash'

const Limit = (data, limit) => {
  if (limit) {
    data.length = limit
  }
  return data
}

export default ({ children, limit, rules }) => {
  return map(Limit(rules, limit), (item, i) => {
    return <li>{item}</li>
  })
}
