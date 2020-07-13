import React from 'react'
import Header from '../components/header'
import { Helmet } from 'react-helmet'
import SignIn from '../components/sign-in'
import { mapper } from '@reduxless/react'
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
            <h2>Main Menu</h2>
            <ul>
              <li><Link to='/dashboard'>Dashboard</Link></li>
            </ul>
            <h2>Your Creations</h2>
            <ul>
              <li>My Articles</li>
              <li><Link to='/dashboard/presets'>My Presets</Link></li>
              <li><Link to='/dashboard/songs'>My Songs</Link></li>
              <li>My Wiki Entries</li>
            </ul>
            <h2>Your Pofile</h2>
            <ul>
              <li>My Artist Profile</li>
              <li>My Customer Profile</li>
            </ul>
            <h2>General</h2>
            <ul>
              <li>My Login / Avatar</li>
              <li>My Connections</li>
              <li>Contact Admin / Help</li>
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
