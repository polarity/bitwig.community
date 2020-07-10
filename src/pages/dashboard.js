import React from 'react'
import Header from '../components/header'
import Grid from '../components/grid'
import SectionHeader from '../components/section-header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
import Tweets from '../components/tweets'
import Blogs from '../components/blogs'
import Boards from '../components/boards'
import ContentContainer from '../components/content-container'
import Dashboard from '../components/dashboard'
import Typography from '../components/typography'
import { Router } from '@reach/router'
import DashboardPresets from '../components/dashboard-presets'
import DashboardDefault from '../components/dashboard-default'
import { Link } from 'gatsby'
import DashboardDiscord from '../components/dashboard-discord'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState'),
  loggedInUser: store => store.get('loggedInUser')
}, {
})

const div = ({ loggedInUser }) => (
  <div>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Dashboard</title>
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
    {loggedInUser &&
      <Dashboard>
        <nav>
          <Typography>
            <ul>
              <li><Link to='/dashboard'>Dashboard</Link></li>
              <li><Link to='/dashboard/presets'>My Presets</Link></li>
              <li><Link to='/dashboard/songs'>My Songs</Link></li>
            </ul>
          </Typography>
        </nav>
        <section>
          <Router basepath='/dashboard'>
            <DashboardDiscord path='/discord-identify' />
            <DashboardPresets path='/presets' />
            <DashboardDefault path='/' />
          </Router>
        </section>
      </Dashboard>}
    {!loggedInUser &&
      <div>
        <Typography>
          <p>Please login to show your Dashboard</p>
        </Typography>
      </div>}
  </div>
)

export default Mapped(div)
