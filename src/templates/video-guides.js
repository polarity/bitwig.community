import React from 'react'
import Header from '../components/menu-main'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Footer from '../components/footer'
import Leftsplit from '../components/leftsplit'
import VideoGuide from '../components/video-guide-list'
import Typo from '../components/typo'
import Typography from '../components/typography'
import ListFromArray from '../components/video-guide-list-from-array'
import { Link } from 'gatsby'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Video Guides {pageContext.type === 'creatorPage' ? ' by ' + pageContext.videos[0].channel : ''}</title>
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
        <div id='VideoCreatorList'>
          <Typography>
            <h3>Video Guides</h3>
            <ul>
              <li><Link to='/video-guides'>Video Guide Overview</Link></li>
            </ul>
            <h3>Creators</h3>
            <ul>
              <ListFromArray array={pageContext.creators} />
            </ul>
          </Typography>
        </div>
        <div id='Videogrid'>
          <Grid>
            <VideoGuide videos={pageContext.videos} limit='250' />
          </Grid>
          <div>
            <Typo>
              <Link to={'/video-guides' + pageContext.nextPage}>Next Page ({pageContext.numVideoPages})</Link>
            </Typo>
          </div>
        </div>
      </Leftsplit>
    </section>
    <Footer />
  </div>
)
