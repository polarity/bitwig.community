import React from 'react'
const clientId = process.env.GATSBY_DISCORD_CLIENT
const state = process.env.GATSBY_DISCORD_STATE
const scope = 'identify'
const redirect = process.env.GATSBY_DISCORD_REDIRECT

export default () => {
  return (
    <div>
      <a href={`https://discord.com/api/oauth2/authorize?response_type=token&redirect_uri=${redirect}&client_id=${clientId}&state=${state}&scope=${scope}`}>Discord oAuth</a>
    </div>
  )
}
