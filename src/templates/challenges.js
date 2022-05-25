import React from 'react'
import Header from '../components/menu-main'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Footer from '../components/footer'
import ContentContainer from '../components/content-container'
import Challenges from '../components/challenges'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState, pageContext }) =>
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Bitwig Challenges - create small patches everyday</title>
      <meta name='viewport' content='width=device-width' />
      <meta name='description' content='Find an idea in our challenges list, create a patch or project, upload a video and get better!' />
      <meta name='title' content='Bitwig Challenges - create small patches everyday in Bitwig Studio' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Bitwig Challenges - create small patches and projects everyday in Bitwig Studio' />
      <meta property='og:description' content='Find an idea in our challenges list, create a patch, upload a video and get better!' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />

    <SectionHeader h='Bitwig Challenges'>
      How do you get better at using Bitwig? You build a small <b>project every day</b>.
      And over time you memorise different combinations that sound good. The more often you do this, the better and faster you become. This challenge page should help to give you ideas every day. Try to solve the challenges in Bitwig and record your finished patches or projects as youtube videos.
    </SectionHeader>
    <ContentContainer>
      <h2>Challenges</h2>
      <p>here you can view all current and past challenges.
        <br />Just click on the link and see all the participants, rules and results.
      </p>
      <ul>
        <Challenges challenges={pageContext.challenges} />
      </ul>
      <br /><br />
      <hr />
      <h2>Help, Learn &amp; Ressources</h2>
      <p>If you need a helping hand, here you can find it.</p>
      <ul>
        <li>ask in the <a href='https://discord.gg/PKWNnzmezx'>community discord</a></li>
        <li>watch the free <a href='https://www.youtube.com/playlist?list=PLfXKHnSL0KtTfn8BX6TBxWfyVqr8Iu6Ue'>learn the bitwig grid playlist</a></li>
        <li>take a paid <a href='https://www.bitwig.com/de/learnings/askvideo-302-the-grid-explained-and-explored-35/'>grid course</a></li>
        <li>watch some <a href='https://www.youtube.com/results?search_query=bitwig+grid+tutorial'>youtube tutorials</a></li>
      </ul>
    </ContentContainer>

    <Footer />
  </div>
)
