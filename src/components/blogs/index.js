import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { map, each, sortBy } from 'lodash'
import Truncate from 'truncate'

import BlogPost from '../blog-post'

/**
 * mapping from the gql names
 * to the real page names
 */
const PageNameMapping = {
  allFeedCdm: 'CDM',
  allFeedSonicState: 'Sonic State',
  allFeedrssPolarityBlog: 'Polarity Blog',
  allFeedrssBitwigNews: 'Bitwig News',
  allFeedSynthAnatomy: 'SynthSnatomy',
  allFeedAmazona: 'Amazona',
  allFeedHeise: 'Heise',
  allFeedSoundrecording: 'Soundrecording',
  allFeedAudiofanzine: 'Audiofanzine',
  allFeedBonedo: 'Bonedo',
  allFeedGoogle: 'Google'
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
          allFeedAmazona(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedAmazona(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedHeise(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedSoundrecording(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedAudiofanzine(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedBonedo(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedCdm(filter: {title: {regex: ""}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedGoogle(filter: {title: {regex: ""}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedSonicState(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedSynthAnatomy(filter: {title: {regex: "/bitwig|grid/gi"}}) {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedrssPolarityBlog {
            edges {
              node {
                title
                contentSnippet
                link
                pubDate
              }
            }
          }
          allFeedrssBitwigNews {
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
            <h2>RSS</h2>
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
