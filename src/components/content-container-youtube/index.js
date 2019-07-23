import React from 'react'
import ContentContainer from '../content-container'
import { StaticQuery, graphql } from 'gatsby'
import { find, get } from 'lodash'

const getLastVideo = (data, channelId) => {
  let found = find(data.allYoutubeVideo.edges, ({ node }) => node.channelId === channelId)
  return get(found, 'node', {})
}

export default ({ children, channelId, title }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allYoutubeVideo(sort: {fields: publishedAt, order: DESC}) {
            edges {
              node {
                id
                title
                description
                videoId
                publishedAt
                privacyStatus
                channelTitle
                channelId
                thumbnail {
                  url
                }
              }
            }
          }
        }
     `}
      render={(data) => {
        const ch = getLastVideo(data, channelId)
        return (
          <ContentContainer
            title={title}
            latestYtId={ch.videoId}
            latestYtTitle={ch.title}
            channelId={ch.channelId}>
            {children}
          </ContentContainer>
        )
      }}
    />
  )
}
