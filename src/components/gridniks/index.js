import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { map } from 'lodash'
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
export default ({ children, limit }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allFeedGridniks(sort: {fields: pubDate, order: DESC}) {
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
          <>
            {map(Limit(data.allFeedGridniks.edges, limit), (item, i) => {
              return <Youtube
                key={item.node.id}
                title={item.node.title}
                link={item.node.link} />
            })}
          </>
        )
      }}
    />
  )
}
