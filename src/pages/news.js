import React from 'react'
import Header from '../components/header'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Tweets from '../components/tweets'
import Blogs from '../components/blogs'
import Boards from '../components/boards'
import ContentContainer from '../components/content-container'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

const div = ({ modalLoginState }) => (
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Bitwig News from around the Net</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Bitwig Studio News - Bitwig Studio' />
      <meta property='og:description' content='All the important Bitwig news on one Website' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />
    <SectionHeader h='RSS / Blogs / Forum Posts'>
      All the new threads and posts from Bitwig Boards and Blogs.
    </SectionHeader>
    <Grid>
      <ContentContainer>
        <Tweets quantity={50} />
      </ContentContainer>
      <ContentContainer>
        <Blogs quantity={50} />
      </ContentContainer>
      <ContentContainer>
        <Boards quantity={50} />
      </ContentContainer>
    </Grid>
  </div>
)

export default Mapped(div)
