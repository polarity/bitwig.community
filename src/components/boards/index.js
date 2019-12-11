import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { map, each, sortBy, get } from 'lodash'
import Truncate from 'truncate'

import BlogPost from '../blog-post'

/**
 * mapping from the gql names
 * to the real page names
 */
const PageNameMapping = {
  allFeedbitwigReddit: '/r/bitwig',
  allFeedKvr: 'KVR'
}

/**
 * result of the gql query
 * @param {object} data
 */
const Merge = (data, quantity = 7) => {
  let newData = []
  each(data, (site, key) => {
    each(site.edges, (entry) => {
      entry._pageTitle = PageNameMapping[key]
      entry._timestamp = new Date(entry.node.pubDate).getTime()
      entry._date = new Date(entry.node.pubDate).toUTCString()
      entry.node.contentSnippet = Truncate(entry.node.contentSnippet, 400)
      newData.push(entry)
    })
  })
  newData = sortBy(newData, ['_timestamp']).reverse()
  newData.length = quantity
  return newData
}

/**
 * query all rss feeds, and render the individual posts
 */
export default ({ quantity }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allFeedbitwigReddit {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedKvr {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
        }
     `}
      render={(data) => {
        return (
          <div>
            <h2>Boards</h2>
            {map(Merge(data, quantity), (item, i) => {
              if (item) {
                return (
                  <BlogPost
                    key={i}
                    title={item.node.title}
                    link={item.node.link}
                    date={item._date}
                    pageTitle={item._pageTitle}
                  >
                    {item.node.contentSnippet}
                  </BlogPost>
                )
              }
            })}
          </div>
        )
      }}
    />
  )
}
