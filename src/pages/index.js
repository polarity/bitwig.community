import React from 'react'
import Header from '../components/menu-main'
import ContentContainer from '../components/content-container'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Gridniks from '../components/gridniks'
import Footer from '../components/footer'
import { Link } from 'gatsby'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
})

export default Mapped(({ modalLoginState }) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Bitwig Studio Community - Everything about Bitwig</title>
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
      <SectionHeader h='Bitwig Community'>
        Collected Bitwig Studio ressources. Join our <a href='https://discord.gg/nGgWY7w' target='_blank' rel='noopener noreferrer'>Bitwig discord</a> and say hello!
      </SectionHeader>
      <Grid>
        <ContentContainer img='made-with-bitwig.png'>
          <h2>Welcome Bitwigger</h2>
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
            the <span role='img' aria-label='Champion Emojj'>🏆</span> <a href='https://www.patreon.com/polarity_music'>patreon</a>.
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
          <p>
            <a href='https://discord.gg/0g2ZPafIN3eWParf' target='_blank' rel='noopener noreferrer'>
              <img style={{ maxWidth: '100%' }} src='/join-discord.png' alt='join the bitwig discord' />
            </a>
          </p>
        </ContentContainer>
        <ContentContainer img='Bitwig-Studio-Screenshot.png'>
          <h2>Quick Links</h2>
          <ul>
            <li><b>#bitwig</b> on <a href='https://twitter.com/hashtag/bitwig'>twitter</a>, <a href='https://www.instagram.com/explore/tags/bitwig/'>instagram</a> and <a href='https://www.facebook.com/hashtag/bitwig'>facebook</a></li>
            <li><a href='https://discord.gg/0g2ZPafIN3eWParf'>Bitwig Chat</a> - Discord</li>
            <li><a href='https://www.reddit.com/r/Bitwig/'>Bitwig Reddit Discussion Board</a></li>
            <li><a href='https://www.kvraudio.com/forum/viewforum.php?f=259'>Bitwig KVR Discussion Board</a></li>
            <li><a href='https://www.facebook.com/groups/bitwigusers'>Bitwig Facebook Group (en)</a></li>
            <li><a href='https://bitwish.top/'>Bitwish Community Feature requests</a></li>
            <li>lastest Bitwig Videos on <a href='https://www.youtube.com/results?search_query=bitwig&sp=CAI%253D'>youtube</a> and <a href='https://vimeo.com/search/sort:latest?q=bitwig'>vimeo</a> / <sub>thx wavedigit</sub></li>
            <li>Made With Bitwig <a href='https://open.spotify.com/playlist/579Upg3ro2afKOn25UpPor'>Spotify Playlist</a> by Martin Glover <span title='new addition to the site!' role='img' aria-label='Fire Emojj'>🔥</span></li>
          </ul>

          <h2>Presets</h2>
          <ul>
            <li>
              <Link to='/presets'>Bitwig Presets from the Community</Link>
            </li>
            <li>
              <a href='https://www.bitwig.com/en/bitwig-studio/sound-content.html'>Official Sound Packs</a> - use the bitwig package manager
            </li>
            <li>
              <a href='https://www.audiobombs.com/?category=Bitwig&q=&sort='>Audiobombs</a> - collection of user contributed presets
            </li>
            <li>
              <a href='https://aavepyora.online/product/outer-limits/'>Outer Limits</a> - Experimental sound tools for Bitwig 4 <span title='new addition to the site!' role='img' aria-label='Cupcake Emojj'>🧁</span>
            </li>
            <li>
              <a href='http://www.mossgrabers.de/Software/Software.html'>Jürgen Moßgraber</a> - Scripts to support several controller devices (Push 1/2, APC40 / APC40mkII, Komplete Kontrol, Maschine and more)
            </li>
            <li>
              <a href='https://www.patreon.com/polarity_music'>Polarity Productions</a> - Free/Payed Bitwig Presets
            </li>
          </ul>

        </ContentContainer>
        <ContentContainer img='bitwig-studio-3-package.png'>
          <h2>Buy Bitwig Studio</h2>
          <p>
            Bitwig Studio is a dynamic software for creating and performing your musical ideas in the studio and on stage.
            Here's a quick overview of what Bitwig Studio is all about:
          </p>
          <ul>
            <li> A professional Digital Audio Workstation for Windows, macOS, and Linux</li>
            <li> Super-fast workflow for sound design, recording, live performance, and beyond</li>
            <li> A complete package with 80+ instruments and effects</li>
            <li> Enjoy over 10 GB (and counting) of world-class sound content from Bitwig and selected partners</li>
            <li> Out-of-the-box support for standard audio interfaces and controllers</li>
            <li> A unique and highly flexible modulation system for unbound creativity</li>
            <li> Excellent hardware integration</li>
          </ul>
          <ul>
            <li><a href='https://shop.bitwig.com/order/checkout.php?PRODS=4710161&QTY=1&AFFILIATE=124276&CART=1'>order Bitwig Studio</a></li>
            <li><a href='https://shop.bitwig.com/order/checkout.php?PRODS=4713256&QTY=1&AFFILIATE=124276&CART=1'>order Bitwig Studio license renewal</a></li>
            <li><a href='https://www.bitwig.com/en/download.html'>Demo / Trial</a> - Try it for yourself (Linux/Mac/Win)</li>
            <li><a href='mailto:contact@bitwig.com'>Support Mail</a> - Found a Bug?</li>
          </ul>
        </ContentContainer>
      </Grid>

      <SectionHeader h='Gridniks'>
        Grids playing by themselves. See what the Grid can do and what others can do with it. <a href='/gridniks'>Watch more Videos!</a>&nbsp;
        <a href='https://www.youtube.com/playlist?list=PLyCfny1Hc_bvfJ33U-3DN4H37gw9cIYTi&jct=z1d0enqVw1qUM0cwcJwlF6lkjelR3g'>
        Check the collab playlist on youtube
        </a> or <a href='https://www.youtube.com/results?search_query=grid+bitwig&sp=CAI%253D'>search for grid videos</a> on youtube.
      </SectionHeader>
      <Grid>
        <Gridniks limit='12' />
      </Grid>

      <Footer />
    </div>
  )
})
