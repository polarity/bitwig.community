import React from 'react'
import Header from '../menu-main'
import { MDXProvider } from '@mdx-js/react'
import { Helmet } from 'react-helmet'
import SignIn from '../sign-in'

// video player
import { Player } from 'video-react'
import '../../../node_modules/video-react/dist/video-react.css'
import './video-react.css'
import Youtube from '../youtube'

import Typography from '../typography'
import styles from './styles.module.css'

const components = {
  Player: Player,
  Youtube: ({ link }) => <div className={styles.Youtube}><Youtube link={link} /></div>
}

export default ({ children }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Bitwig Studio BitWiki - Everything you need to know</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Bitwig Studio Community - cool people using the best DAW on the planet' />
      <meta property='og:description' content='On this website we want to summarize news and content from all over the net that has been created with Bitwig and of which the community can be proud.' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />

    <div className={styles.Typo}>
      <Typography>
        <MDXProvider components={components}>
          {children}
        </MDXProvider>
      </Typography>
    </div>
  </div>
