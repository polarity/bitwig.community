const fetch = require('node-fetch')
const Discord = require('discord.js')
const DClient = new Discord.Client()
const path = require('path')
const isFinite = require('lodash').isFinite

const GetDiscordUser = async (id) => {
  if (!process.env.GATSBY_API_DISCORD_TOKEN) {
    console.warn('There should be a Discord API token in the .env')
  }

  if (id) {
    const token = await DClient.login(process.env.GATSBY_API_DISCORD_TOKEN)
    const DUser = new Discord.User(DClient, { id: id })
    const user = await DUser.fetch()
    return user
  }
}

const GetUser = async (id) => {
  const result = await fetch(`https://fierce-spire-25460.herokuapp.com?user=${id}`)
  const res = await result.json()
  console.log('...> ', res)
  return res
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  // get data from GitHub API at build time
  const result = await fetch('https://api.github.com/repos/polarity/bitwig-community-presets/commits')
  const commits = await result.json()
  const Presets = []
  for await (const commit of commits) {
    if (commit.commit.author.name === 'Chefkoch') {
      // get the files
      const commitDetailResult = await fetch(commit.url)
      const commitDetail = await commitDetailResult.json()
      for (const file of commitDetail.files) {
        // get the user id from the path
        const discordUserID = file.filename.split('/')[1]
        // userID should be int & finite number
        if (isFinite(parseInt(discordUserID))) {
          // get the user
          const user = await GetDiscordUser(discordUserID)
          file.added = commitDetail.commit.author.date
          file.desc = commitDetail.commit.message
          file.user = user
          file.name = file.filename.split('/')[2]
          Presets.push(file)
        }
      }
    }
  }
  // create page
  actions.createPage({
    path: '/presets',
    component: path.resolve('src/templates/presets.js'),
    context: {
      presets: Presets
    }
  })
}
