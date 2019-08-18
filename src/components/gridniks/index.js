import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { map } from 'lodash'
import Youtube from '../youtube'

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ children, channelId, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allFeedGridniks(sort: {fields: pubDate, order: ASC}) {
            edges {
              node {
                id
                link
                pubDate
                title
                author
              }
            }
          }
        }
     `}
      render={(data) => {
        return (
          <React.Fragment>
            {map(data.allFeedGridniks.edges, (item, i) => {
              return <Youtube
                key={item.node.id}
                title={item.node.title}
                link={item.node.link} />
            })}
          </React.Fragment>
        )
      }}
    />
  )
}
