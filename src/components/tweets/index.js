import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { map } from 'lodash'
import Tweet from '../tweet'

/**
 * process the query result
 * @param {object} data
 */
const ProcessData = (data) => {
  const result = data.allTwitterSearchTweetsBitwig.edges
  result.length = 30
  return result
}

export default ({ children, channelId, title }) => {
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
            {map(ProcessData(data), (item, i) => {
              return <Tweet key={i} avatar={item.node.user.screen_name}>
                {item.node.text}
              </Tweet>
            })}
          </div>
        )
      }}
    />
  )
}
