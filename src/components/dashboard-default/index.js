import React from 'react'
import Typography from '../typography'
const clientId = process.env.GATSBY_DISCORD_CLIENT
const state = process.env.GATSBY_DISCORD_STATE
const scope = 'identify'
const redirect = process.env.GATSBY_DISCORD_REDIRECT

export default () => {
  return (
    <div id='Dashboard'>
      <Typography>
        <h1>Welcome to your Dashboard</h1>
        <p>In the future you can upload and manage Songs, Presets and Articles here.</p>
        <hr />
        <h2>Bitwig Discord - Bitwig Community</h2>
        <p>If you have already uploaded presets in the discord and they are displayed here on the page, you can <b>link your discord account</b> with the community account here. After that you can manage all your presets.</p>
        <p><a href={`https://discord.com/api/oauth2/authorize?response_type=token&redirect_uri=${redirect}&client_id=${clientId}&state=${state}&scope=${scope}`}><span role='img' aria-label='wrench symbol'>🔧</span> Discord oAuth</a></p>
      </Typography>
    </div>
  )
}
