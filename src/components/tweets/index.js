import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { map } from 'lodash'
import Tweet from '../tweet'

/**
 * process the query result
 * @param {object} data
 */
const ProcessData = (data, quantity = 20) => {
  const result = data.allTwitterSearchTweetsBitwig.edges
  result.length = quantity
  return result
}

export default ({ quantity }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allTwitterSearchTweetsBitwig {
            edges {
              node {
                id
                text
                user {
                  screen_name
                  profile_image_url_https
                  name
                }
              }
            }
          }
        }
     `}
      render={(data) => {
        return (
          <div>
            <h2>Twitter</h2>
            {map(ProcessData(data, quantity), (item, i) => {
              if (item) {
                return (
                  <Tweet
                    key={i}
                    avatar={item.node.user.screen_name}
                  >
                    {item.node.text}
                  </Tweet>
                )
              }
            })}
          </div>
        )
      }}
    />
  )
}
