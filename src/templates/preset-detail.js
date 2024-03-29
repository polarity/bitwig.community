import React from 'react'
import MenuMain from '../components/menu-main'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import styles from './styles.module.css'
import Youtube from '../components/youtube'
import { startCase } from 'lodash'
import SectionContent from '../components/section-content'
import getYoutubeSlug from '../utils/getYoutubeSlug'
import urlSlug from 'url-slug'
import Footer from '../components/footer'
import MenuSub from '../components/menu-presets'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) => {
  const file = pageContext.preset
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{startCase(file.name.split('.')[0]) + ' by ' + file.user.username + ' - Preset for Bitwig Studio'}</title>
        <meta name='viewport' content='width=device-width' />
        <meta property='og:url' content={'https://bitwig.community/preset-' + file.name.split('.')[0]} />
        <meta property='og:title' content={startCase(file.name.split('.')[0]) + ' by ' + file.user.username + ' - Preset for Bitwig Studio'} />
        <meta property='og:description' content={file.desc} />
        <meta property='og:image:width' content='1080' />
        <meta property='og:image:height' content='1080' />
        <meta property='og:type' content='website' />
        {!file.videoYoutube && <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />}
        {file.videoYoutube && <meta property='og:image' content={`https://i3.ytimg.com/vi/${getYoutubeSlug(file.videoYoutube)}/hqdefault.jpg`} />}
      </Helmet>

      <MenuMain />
      <MenuSub />

      <SignIn />

      <SectionHeader h={startCase(file.name.split('.')[0])}>
        <br />{file.comment}
        <br /> <br />{file.desc} <i>by</i> <a href={`/creator-${urlSlug(file.user.username)}`}>{file.user.username}</a>
      </SectionHeader>

      <SectionContent>
        {!file.videoYoutube && <img src='/made-with-bitwig.png' alt='Made with Bitwig Logo' />}
        {file.videoYoutube && <Youtube key={file.id} title={file.name.split('.')[0]} link={file.videoYoutube} quality='max' />}
        <br />for {file.device_name} (<i>{file.device_category}</i>) / Category: {file.preset_category} / Bitwig Version: {file.application_version_name}
      </SectionContent>
      <SectionContent>
        {file.user.firebaseUrl && <img width='40' height='40' className={styles.avatar} src={file.user.firebaseUrl} alt={'Discord Avatar of ' + file.user.username} />}
        <p><a href={file.download} className={styles.downloadButton} title={'Download ' + file.name + ' Preset'}><span role='img' aria-label='disk symbol'>💾</span>&nbsp;Download</a></p>
        <br />Want to add your Bitwig Preset?
        <br />Join our <a href='https://discord.gg/nGgWY7w'>Bitwig discord</a> and drag &amp; drop your files.
      </SectionContent>
      <Footer />
    </div>
  )
})
