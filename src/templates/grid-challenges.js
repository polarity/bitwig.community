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
import Gridniks from '../components/gridniks'
import Challenges from '../components/challenges'
import Youtube from '../components/youtube'

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
      <meta property='og:title' content='Grid Challenges - create small patches everyday in Bitwig Studio' />
      <meta property='og:description' content='Find an idea in our challenges list, create a patch, upload a video and get better!' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />

    <SectionHeader h='Grid Challenges'>
    How do you get better at patch building? You build a small patch every day.
    And over time you memorise different combinations that sound good. The more often you do this, the better and faster you become.
      <br /><br />This challenge page should help to give you ideas every day.
    Try to solve the challenges in the grid and record your finished patches as youtube videos. Step by step to a better modular nerd.
    </SectionHeader>
    <Midsplit>
      <Grid>
        <section>
          <ContentContainer title='Pick your Challenge' img='/grid-challenges.png'>
            <p>1.) Pick a challenge from this list, 2.) record a video of your solution, 3.) upload a video on youtube and use the <b>challenge code</b> in the youtube title. 4.) your video will show up on the right side of this page (within a day)</p>
            <ul>
              <li>create a very small, good sounding reverb.  <br />challenge code: <i>[bwcreverb1]</i></li>
              <li>create a sequencer with pitch, gate and velocity parameters for each step. dont use the "gates" and "pitches" modules!!<br />challenge code: <i>[bwcseq1]</i></li>
              <li>create a self sequencing and playing patch in C minor with as few modules as possible.  <br />challenge code: [bwcgenerate1]</li>
              <li>create an simple stutter effect for beats and percussions. make it nicely tweakable for end users with useful macro knob mappings. <br />challenge code: [bwcstutter1]</li>
              <li>create an audio effect that can pitch audio streams up or down in realtime<br />challenge code: [bwcaudiopitch1]</li>
              <li>create an audio effect that adds nice textures to pads<br />challenge code: [bwcaudiotexture1]</li>
            </ul>

            <h2>Archived Challenges</h2>
            <ul>
              <li>create a grid patch that fits withing a 10x10 square <br />challenge code: [10x10 Grid Challenge]</li>
            </ul>
          </ContentContainer>

          <ContentContainer title='Pick your Challenge'>
            <h2>Help, Learn &amp; Ressources</h2>
            <p>If you need a helping hand, here you can find it.</p>
            <ul>
              <li>ask in the <a href='https://discord.gg/PKWNnzmezx'>community discord</a></li>
              <li>watch the free <a href='https://www.youtube.com/playlist?list=PLfXKHnSL0KtTfn8BX6TBxWfyVqr8Iu6Ue'>bitwig grid playlist</a></li>
            </ul>
          </ContentContainer>
          <Grid>
            <Youtube key='Learn1' title='Getting Around in The Grid [Bitwig Studio]' link='https://www.youtube.com/watch?v=zvPhIm6Ttd8' />
            <Youtube key='Learn2' title='Modular Concepts: Phase, a Matter of Timing [Bitwig Studio | The Grid]' link='https://www.youtube.com/watch?v=rIGcOpf59_g' />
            <Youtube key='Learn3' title='Lets Build a Synthesizer' link='https://youtu.be/m6A7v4ij--U' />
            <Youtube key='Learn3' title='Generative Beginner' link='https://www.youtube.com/watch?v=oTpyYgeC2H0' />
          </Grid>
        </section>
      </Grid>

      <section>
        <ContentContainer title='Latest Solutions' img='/grid-solutions.png'>
          <p>Videos we found on youtube with challenge codes in the title (website is updated once a day). Want to participate? Pick a challenge and upload a video on youtube and use the challenge code in the title!</p>
        </ContentContainer>
        <Grid>
          <Challenges challenges={pageContext.challenges} />
        </Grid>
      </section>
    </Midsplit>
    <Footer />
  </div>
)
