import React from 'react'
import Header from '../components/header'
import ContentContainer from '../components/content-container'
import Grid from '../components/grid'
// import IndexStyles from '../styles/Index.css'
import YoutubeContainer from '../components/content-container-youtube'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState }) => <div>
  <Helmet>
    <meta charSet='utf-8' />
    <title>Bitwig Studio Community - Cool people using the best DAW</title>
    <meta name='viewport' content='width=device-width' />
    <meta property='og:url' content='https://bitwig.community' />
    <meta property='og:title' content='Bitwig Studio Community - cool people using the best DAW on the planet' />
    <meta property='og:description' content='On this website we want to summarize news and content from all over the net that has been created with Bitwig and of which the community can be proud.' />
    <meta property='og:image:width' content='1080' />
    <meta property='og:image:height' content='1080' />
    <meta property='og:type' content='website' />
    <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
  </Helmet>

  <Header />
  <SignIn />
  <Grid>
    <ContentContainer img='made-with-bitwig.png'>
      <h2>Welcome Bitwigger ->{modalLoginState}</h2>
      <p>
        On this website we want to summarize news and content
        from all over the net that has been created
        with <span role='img' aria-label='Rocket Emoji'>🚀 </span><a href='https://bitwig.com'>Bitwig Studio</a>, the innovative music creation and performance software, and of
        which the community can be proud of.
        Do you have a post that should appear here?&nbsp;
        <a href='https://discord.gg/0g2ZPafIN3eWParf'>Write to us!</a>
      </p>
      <p>
        Make this page your browser <b>startpage</b> or at least <a href='https://bitwig.community'>bookmark it</a>.
        If you want to support the development, use
        the <a href='https://www.patreon.com/polarity_music'><span role='img' aria-label='Champion Emojj'>🏆 </span>patreon</a>.
        For feedback use
        the <a href='https://discord.gg/0g2ZPafIN3eWParf'>bitwig discord</a>.
      </p>
      <p>
        Thanks for the nice hero image
        to <a href='https://amadeuspaulussen.bandcamp.com/'>Amadeus Paulussen</a>.
        Project by <a href='https://polarity-dnb.de'>polarity</a>. You can
        also <a href='made-with-bitwig-pack.zip'>download a press pack (3mb)</a> with
        the logo and a teaser video to use with your posts, videos etc.
      </p>
    </ContentContainer>
    <ContentContainer img='Bitwig-Studio-Screenshot.png'>
      <h2>Quick Links</h2>
      <ul>
        <li><a target='_blank' href='https://www.bitwig.com/en/download.html'>Bitwig Download / Demo</a> - Try it for yourself (Linux/Mac/Win)</li>
        <li><a target='_blank' href='mailto:contact@bitwig.com'>Support Mail</a> - Found a Bug?</li>
        <li><a target='_blank' href='https://www.youtube.com/watch?v=GRNzPc3UpYg'>Bitwig Key Features</a> Plug-in Hosting & Crash Protection (video)</li>
        <li><a target='_blank' href='https://www.youtube.com/watch?v=zvPhIm6Ttd8'>Getting around in The Grid</a> (video)</li>
        <li><b>#bitwig</b> on <a href='https://twitter.com/hashtag/bitwig'>twitter</a>, <a target='_blank' href='https://www.instagram.com/explore/tags/bitwig/'>instagram</a> and <a target='_blank' href='https://www.facebook.com/hashtag/bitwig'>facebook</a></li>
        <li><a target='_blank' href='https://discord.gg/0g2ZPafIN3eWParf'>Bitwig Chat</a> - Discord</li>
        <li><a target='_blank' href='https://www.youtube.com/user/thechangeofends'>Brian Bollmann</a> - Videos of all bitwig devices & modulators (maybe outdated)</li>
        <li>lastest Bitwig Videos on <a target='_blank' href='https://www.youtube.com/results?search_query=bitwig&sp=CAI%253D'>youtube</a> and <a href='https://vimeo.com/search/sort:latest?q=bitwig'>vimeo</a> / <sub>thx wavedigit</sub></li>
        <li><span title='new addition to the site!' role='img' aria-label='Fire Emojj'>🔥</span> Made With Bitwig <a target='_blank' href='https://open.spotify.com/playlist/579Upg3ro2afKOn25UpPor'>Spotify Playlist</a> by Martin Glover</li>
      </ul>

      <h2>Samples</h2>
      <ul>
        <li>
          <a href='https://intimatenoise.com/'>Intimate Noise</a> - unusual samples
        </li>
        <li>
          <a href='https://hiphopdrumsamples.com/'>The Drum Broker</a> - vinyl samples
        </li>
        <li>
          <a href='https://freesound.org/'>Freesounds</a> - Sample community with all kinds of random samples
        </li>
      </ul>
    </ContentContainer>
    <YoutubeContainer title='Gridniks: Sparvnätter' channelId='UCn2Z_OilkVqNzkBTWOmkDMQ'>
      <p>Youtube is a great place to show what you've done. Get a youtube account, film your Bitwig creation and send it to us (mail coming soon, use <a href='https://discord.gg/0g2ZPafIN3eWParf'>discord</a> in the meantime).</p>
      <p>This time <a href='https://www.youtube.com/channel/UCn2Z_OilkVqNzkBTWOmkDMQ'>Sparvnätter</a> is showing off some nice Grid patches on youtube.</p>
    </YoutubeContainer>
  </Grid>

  <SectionHeader h='Video Tutorials'>
   If you like watching videos and learning something, you are in good hands with these Youtube channels.
  </SectionHeader>

  <Grid>
    <YoutubeContainer title='Bitwig Official' channelId='UCkVdkd-DBrvSbpC4gefsnkw'>
      <p>The official Bitwig Youtube channel with tutorials and trailers. If you are a Bitwig user you have to subscribe!</p>
    </YoutubeContainer>
    <YoutubeContainer title='Mattias Holmgren' channelId='UCPI1x2iyASeNaeRYVSGXTqA'>
      <p>I created this channel to bring my interest in technology, music and design to a tight platform. I've been a professional artist, composer and designer for 20 years and thought I should share a few tricks and help the future generation of creative producers.</p>
    </YoutubeContainer>
    <YoutubeContainer title='Baphometrix' channelId='UCuzDmHD4WeS4dwhFXPgm7GA'>
      <p>Baphometrix makes very detailed videos on all topics concerning Bitwig. If other videos are too flat or don't give you enough information, here you can find long and detailed videos with all details.</p>
    </YoutubeContainer>
    <YoutubeContainer title='Land Of Bits' channelId='UCy734gZ6oxkntXZMfCcpbbQ'>
      <p>Small music oriented tutorials. How to get things done in bitwig without loosing the focus of making music.</p>
    </YoutubeContainer>
    <YoutubeContainer title='Polarity Music' channelId='UC6fkScAhWG63SUSr3D1MI6w'>
      <p>
        Polarity is a musician from berlin, germany who coded this website,
        and is busy on Youtube and Discord doing all kinds of stuff. The Videos
        are always practial.
      </p>
    </YoutubeContainer>
    <YoutubeContainer title='Audio Digital' channelId='UCMLl5O-kS7iEMJgMrsZayMw'>
      <p>Kevin is the man for synthesis. He knows the different synthesis
        forms inside out and explains in his tutorials how
        to use them in Bitwig
      </p>
    </YoutubeContainer>
    <YoutubeContainer title='TraNzeM' channelId='UCsT5lJNXlbaphmYeK9J4mxw'>
      <p>He is a russian musician but likes to build Bitwig instruments
        which he provides as presets. Download his presets
        from <a href='https://www.patreon.com/tranzem'>patreon</a>&nbsp;
        or <a href='https://github.com/TraNzeM/tnm-bitwig-presets'>github</a>.
      </p>
    </YoutubeContainer>
  </Grid>

  <SectionHeader h='Resources & Downloads'>
    Here you can find websites & tools to download additional content that you can use in Bitwig.
  </SectionHeader>

  <Grid>
    <ContentContainer
      title='Jürgen Moßgraber - Software'
      link='http://www.mossgrabers.de/Software/Software.html' img='mossgraber.png'>
      <p>Jürgen is a great developer & musician creating scripts to support several controller devices (Push 1/2, APC40 / APC40mkII, Komplete Kontrol, Maschine and more) and protocols in Bitwig Studio.</p>
    </ContentContainer>
    <ContentContainer
      title='Bitwiggers - Presets'
      link='https://bitwiggers.com'
      img='bitwiggers.png'>
      <p>A frequent topic of discussion in Bitwig-related channels is that sharing presets is a common but unmet need by the users. Presets are attached to forum posts, shared as Dropbox links, or whatever the sharer is familiar with, and the result is that it's hard to find any of them unless you're actively participating. I hope this changes that.</p>
    </ContentContainer>
    <ContentContainer
      title='Bitwigbits - Presets'
      link='https://www.bitwigbits.com/' img='bitwigbits.png'>
      <p>We are a community of active Bitwig enthusiasts who present and share their musical ideas!</p>
    </ContentContainer>
    <ContentContainer
      link='https://github.com/polarity/preset-party-app/releases'
      title='Preset Party - Standalone Tool'
      img='preset-party.png'>
      <p>Cross-platform GUI application for sharing and caring presets. Ready to run on all platforms.</p>
      <p>You can this standalone App on your PC to download github hosted presets into your local preset directory with one click.</p>
    </ContentContainer>
    <ContentContainer
      title='Kim Åke - Text Tutorials'
      link='https://aavepyora.com/category/bitwig/' img='aavepyora.png'>
      <p>Kim Åke's blog contains many articles about Bitwig written in text form. If you prefer to read and don't watch videos, this is the place for you.</p>
    </ContentContainer>
    <ContentContainer
      title='Audio Bombs - Presets'
      link='https://www.audiobombs.com/?category=Bitwig&q=&sort=' img='audio-bombs.png'>
      <p>Audiobombs is a collection of user contributed presets and tools for music production, djing, and live performance. All the items on the site are free to download.</p>
    </ContentContainer>
  </Grid>

  <SectionHeader h='Social Media'>
    Would you like to have a chat or get to know other Bitwig users?
  </SectionHeader>
  <Grid>
    <ContentContainer title='Discord' link='https://discord.gg/0g2ZPafIN3eWParf' img='discord.png'>
      <p>Inofficial Bitwig Discord Server. Come in, only frienldy bitwiggers in here and always someone to talk to! Discord can be used via a webapp or a standalonve native client.</p>
    </ContentContainer>
    <ContentContainer title='reddit /r/bitwig' link='https://www.reddit.com/r/Bitwig/' img='reddit.png'>
      <p>Half forum half chat, reddit is a website and a nice source of information around bitwig.</p>
    </ContentContainer>
    <ContentContainer title='Facebook' link='https://www.facebook.com/groups/bitwigusers' img='facebook.png'>
      <p>Everyone is on Facebook. Join the inofficial facebook group "Bitwig User Group"</p>
    </ContentContainer>
    <ContentContainer title='KVR' link='https://www.kvraudio.com/forum/viewforum.php?f=259' img='kvr.png'>
      <p>KVR is older than the Internet just like the users there. If you want to have a forum with all its macken, here you are in good hands.</p>
    </ContentContainer>
  </Grid>

</div>)
