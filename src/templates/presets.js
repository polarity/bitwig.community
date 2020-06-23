import React from 'react'
import Header from '../components/header'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Presets from '../components/presets'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Gridniks are Grid Vids from Bitwig - check the newest patches</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Grid Video Music - Bitwig Studio' />
      <meta property='og:description' content='Listen to great Bitwig Studio Grid patches. Various videos show what the Grid is capable of.' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />

    <SectionHeader h='Presets'>
      Download Presets for Bitwig Studio from the community
    </SectionHeader>
    <Grid>
      <Presets presets={pageContext.presets} />
    </Grid>

  </div>)
