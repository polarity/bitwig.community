import React from 'react'
import MenuMain from '../components/menu-main'
import MenuSub from '../components/menu-presets'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Presets from '../components/presets'
import Footer from '../components/footer'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Presets for Bitwig Studio by the community</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Presets for Bitwig Studio' />
      <meta property='og:description' content='Browse and download many many presets for Bitwig Studio created by the Community' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <MenuMain />
    <MenuSub />

    <SignIn />

    <SectionHeader h='Featured Presets'>
      Download Presets for Bitwig Studio from the community.
      <br />Want to add your Preset? Join our <a href='https://discord.gg/nGgWY7w' target='_blank' rel='noopener noreferrer'>Bitwig discord</a> and drag &amp; drop your files.
    </SectionHeader>
    <Grid fill='true'>
      <Presets presets={pageContext.presets} />
    </Grid>
    <Footer />
  </div>)
