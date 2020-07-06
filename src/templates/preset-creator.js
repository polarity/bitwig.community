import React from 'react'
import Header from '../components/header'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Presets from '../components/presets'
import getYoutubeImage from '../utils/getYoutubeImage'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) => {
  const presets = pageContext.presets
  const fp = presets[0]
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{presets[0].user.username + '´s Presets for Bitwig Studio'}</title>
        <meta name='viewport' content='width=device-width' />
        <meta property='og:url' content='https://bitwig.community' />
        <meta property='og:title' content={presets[0].user.username + '´s Presets for Bitwig Studio'} />
        <meta property='og:description' content={'Browse and download many many presets for Bitwig Studio created by the ' + presets[0].user.username} />
        <meta property='og:image:width' content='1080' />
        <meta property='og:image:height' content='1080' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
        {!fp.videoYoutube && <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />}
        {fp.videoYoutube && <meta property='og:image' content={getYoutubeImage(fp.videoYoutube, 'max')} />}
      </Helmet>

      <Header />
      <SignIn />

      <SectionHeader h={presets[0].user.username}>
      Download Presets for Bitwig Studio by {pageContext.presets[0].user.username}.
        <br />Want to add your Preset? Join our <a href='https://discord.gg/nGgWY7w'>Bitwig discord</a> and drag &amp; drop your files.
      </SectionHeader>
      <Grid fill='true'>
        <Presets presets={presets} />
      </Grid>

    </div>
  )
})
