import React from 'react'
import Header from '../components/menu-main'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Typography from '../components/typography'
import { Router } from '@reach/router'
import ForumDefault from '../components/forum-default'
import ForumAdd from '../components/forum-add'
import ForumTopicView from '../components/forum-topic-view'
import { Link } from 'gatsby'
import Footer from '../components/footer'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState'),
  loggedInUser: store => store.get('loggedInUser')
}, {
})

const div = ({ loggedInUser }) => (
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Forum</title>
      <meta name='viewport' content='width=device-width' />
      <meta property='og:url' content='https://bitwig.community' />
      <meta property='og:title' content='Bitwig Studio News - Bitwig Studio' />
      <meta property='og:description' content='All the important Bitwig news on one Website' />
      <meta property='og:image:width' content='1080' />
      <meta property='og:image:height' content='1080' />
      <meta property='og:type' content='website' />
      <meta property='og:image' content='https://bitwig.community/bitwig-for-life.jpg' />
    </Helmet>

    <Header />
    <SignIn />

    <nav>
      <Typography>
        <h2>Main Menu</h2>
        <ul>
          <li><Link to='/forum'>Forum</Link></li>
          <li><Link to='/forum/add'>new Thread</Link></li>
        </ul>
      </Typography>
    </nav>
    <section>
      <Router basepath='/forum'>
        <ForumDefault path='/' />
        <ForumAdd path='/add' />
        <ForumTopicView path='/topic/:slug' />
      </Router>
    </section>

    <Footer />
  </div>
)

export default Mapped(div)
