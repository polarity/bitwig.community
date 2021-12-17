import React from 'react'
import MenuMain from '../components/menu-main'
import MenuSub from '../components/menu-presets'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Presets from '../components/presets'
import getYoutubeImage from '../utils/getYoutubeImage'
import urlSlug from 'url-slug'
import Footer from '../components/footer'

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
        <title>{presets[0].preset_category + ' Presets for Bitwig Studio'}</title>
        <meta name='viewport' content='width=device-width' />
        <meta property='og:url' content={'https://bitwig.community/category-' + urlSlug(fp.user.username)} />
        <meta property='og:title' content={'All' + presets[0].device_name + ' Presets for Bitwig Studio'} />
        <meta property='og:description' content={'Browse and download many many presets for Bitwig Studio created for ' + presets[0].preset_category} />
        <meta property='og:image:width' content='1080' />
        <meta property='og:image:height' content='1080' />
        <meta property='og:type' content='website' />
        {!fp.videoYoutube && <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />}
        {fp.videoYoutube && <meta property='og:image' content={getYoutubeImage(fp.videoYoutube, 'max')} />}
      </Helmet>

      <MenuMain />
      <MenuSub />
      <SignIn />
      <SectionHeader h={fp.preset_category + ' Presets'}>
      Download {pageContext.presets[0].preset_category} Presets for Bitwig Studio.
        <br />Want to add your Preset? Join our <a href='https://discord.gg/nGgWY7w'>Bitwig discord</a> and drag &amp; drop your files.
      </SectionHeader>
      <Grid fill='true'>
        <Presets presets={presets} />
      </Grid>
      <Footer />
    </div>
  )
})
