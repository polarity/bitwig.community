import React from 'react'
import Header from '../components/menu-main'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Footer from '../components/footer'
import ContentContainer from '../components/content-container'
import Midsplit from '../components/midsplit'
import Rules from '../components/challenge-rules'
import firebaseTimestamp2FormattedString from '../utils/firebaseTimestamp2FormattedString'
import ChallengeEntries from '../components/challenge-entries'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Grid Challenges - create small patches everyday</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Bitwig Challenges - create small patches everyday in Bitwig Studio' />
      <meta property='og:description' content='Find an idea in our challenges list, create a patch, upload a video and get better!' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />

    <SectionHeader h={pageContext.challenge.title + ' Challenge'}>
      {pageContext.challenge.description}
    </SectionHeader>

    <Midsplit>
      <Grid>
        <section>
          <ContentContainer title='Record your Patch' img='/grid-challenges.png'>
            <h2>{pageContext.challenge.title}</h2>
            <p>{pageContext.challenge.description}</p>
            <h3>Rules</h3>
            <ul><Rules rules={pageContext.challenge.rules} /></ul>
            <h3>Prices</h3>
            <p>{pageContext.challenge.prices}</p>
            <h3>Deadline</h3>
            <p>{firebaseTimestamp2FormattedString(pageContext.challenge.deadline)}</p>
          </ContentContainer>
        </section>
      </Grid>
      <Grid>
        <section>
          <ContentContainer>
            <h2>Entries</h2>
            <ChallengeEntries entries={pageContext.challenge.entries} />
          </ContentContainer>
        </section>
      </Grid>
    </Midsplit>
    <Footer />
  </div>
)
