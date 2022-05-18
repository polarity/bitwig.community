import React from 'react'
import { map } from 'lodash'
import { Link } from 'gatsby'
import firebaseTimestamp2FormattedString from '../../utils/firebaseTimestamp2FormattedString'

const Limit = (data, limit) => {
  if (limit) {
    data.length = limit
  }
  return data
}

export default ({ children, limit, challenges }) => {
  return map(Limit(challenges, limit), (item, i) => {
    return <li>{firebaseTimestamp2FormattedString(item.date)} » {firebaseTimestamp2FormattedString(item.deadline)}: <Link to={'/challenge-' + item.id}>{item.title}</Link>   ({item.participants} 👩‍🍳)</li>
  })
}
