import React from 'react'
import Header from '../components/header'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Gridniks from '../components/gridniks'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState }) => <div>
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

  <SectionHeader h='Gridniks'>
    The Grid, a modular sound design environment sporting 154 modules and
    lightning-fast workflows is the newest addition to Bitwig Studio.
    Gridniks are Grid Patches/Presets playing by themselves. See what
    the Grid can do and what others can do with it.&nbsp;
    <a href='https://www.youtube.com/playlist?list=PLyCfny1Hc_bvfJ33U-3DN4H37gw9cIYTi&jct=z1d0enqVw1qUM0cwcJwlF6lkjelR3g'>
      Check the collab playlist on youtube
    </a> or <a href='https://www.youtube.com/results?search_query=grid+bitwig&sp=CAI%253D'>search for grid videos</a> on youtube.
  </SectionHeader>
  <Grid>
    <Gridniks />
  </Grid>

</div>)
