import React from 'react'
import Header from '../components/menu-main'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Footer from '../components/footer'
import Leftsplit from '../components/leftsplit'
import VideoGuide from '../components/video-guide'
import Typography from '../components/typography'
import ListFromArray from '../components/list-from-array'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Video Guides</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Video Guides - Bitwig Videos &amp; Tutorials you might enjoy' />
      <meta property='og:description' content='Filter Bitwig Videos by type, creator and content' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>
    <Header />
    <SignIn />

    <SectionHeader h='Bitwig Videos'>
      We present you all the videos about Bitwig on one page. Check out the latest and greatest!
    </SectionHeader>

    <section>
      <Leftsplit>
        <div>
          <Typography>
            <ListFromArray limit={3} array={pageContext.creators} />
          </Typography>
        </div>

        <Grid>
          <VideoGuide videos={pageContext.videos} />
        </Grid>

      </Leftsplit>
    </section>
    <Footer />
  </div>
)
