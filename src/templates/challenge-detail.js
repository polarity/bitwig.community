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
import Youtube from '../components/youtube'
import Link from 'gatsby-link'
import Typography from '../components/typography'
import ChallengeForm from '../components/challenge-form'
import styles from './styles.module.css'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
  handleOpenChallengeForm: (store, ownProps, data) => {
    // if the user is not logged in, open the login modal
    if (store.get('loggedInUser')) {
      store.set('modalChallengeForm', true)
    } else {
      // user is logged in, open submission form
      store.set('modalLoginState', true)
    }
  }
})

export default Mapped(({ modalLoginState, handleOpenChallengeForm, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>{pageContext.challenge.description} - Grid Challenges</title>
      <meta name='description' content={pageContext.challenge.description} />
      <meta name='title' content={pageContext.challenge.description} />
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content={'https://bitwig.community/challenge-' + pageContext.challenge.id} />
      <meta property='og:title' content={pageContext.challenge.description} />
      <meta property='og:description' content={pageContext.challenge.description} />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={'https://bitwig.community/' + pageContext.challenge.cover} />
    </Helmet>

    <Header />
    <SignIn />
    <ChallengeForm challenge={pageContext.challenge.id} />

    <SectionHeader h={pageContext.challenge.title + ' Challenge'}>
      {pageContext.challenge.description}
    </SectionHeader>

    <Midsplit>
      <Grid>
        <section>
          <ContentContainer title='Record your Patch'>
            <h2>Presentation ceremony</h2>
            <p>At the end of each Bitwig challenge, we discuss the entries and enjoy what we have achieved. You missed the challenge? Look on the <Link to='/challenges'>overview page for the next upcoming challenge</Link>.</p>
            {pageContext.challenge.resultYt && <Youtube link={pageContext.challenge.resultYt} />}
            <hr />
            <h2>Challenge Outline</h2>
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
          <Typography>
            <h2>All Entries {pageContext.challenge.closed}</h2>
            <p>Here you will find all the individual submissions of all users and, if available, even the individual presets or projects.</p>
            {!pageContext.challenge.closed && <p>If you want to add your content, please login and use the <br /><br /><button className={styles.downloadButton} onClick={handleOpenChallengeForm}>submission form!</button></p>}
            {pageContext.challenge.closed && <p>The battle is <b>closed!</b> Take a look at the <b><Link to='/challenges'>overview page for the next upcoming challenge</Link></b><br /><br />but you can still add your content to the page <button className={styles.downloadButton} onClick={handleOpenChallengeForm}>submission form!</button></p>}
          </Typography>
          <Grid>
            <ChallengeEntries entries={pageContext.challenge.entries} />
          </Grid>
        </section>
      </Grid>
    </Midsplit>
    <Footer />
  </div>
)
