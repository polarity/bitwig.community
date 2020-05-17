import React from 'react'
import Header from '../header'
import { Helmet } from 'react-helmet'
import SignIn from '../sign-in'

import Typography from '../typography'
import styles from './styles.module.css'

export default ({ children }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Bitwig Studio 🐱‍🏍 BitWiki - Everything you need to know</title>
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
        {children}
      </Typography>
    </div>
  </div>
