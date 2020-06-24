const fetch = require('node-fetch')
const Discord = require('discord.js')
const DClient = new Discord.Client()
const isFinite = require('lodash').isFinite
const firebase = require('firebase-admin')

const GetDiscordUser = async (id) => {
  if (!process.env.GATSBY_API_DISCORD_TOKEN) {
    console.warn('There should be a Discord API token in the .env')
  }

  if (id) {
    await DClient.login(process.env.GATSBY_API_DISCORD_TOKEN)
    const DUser = new Discord.User(DClient, { id: id })
    const user = await DUser.fetch()
    return user
  }
}

const grabPresets = async () => {
  // get data from GitHub API at build time
  const result = await fetch('https://api.github.com/repos/polarity/bitwig-community-presets/commits?page=3')
  const commits = await result.json()
  const Presets = []
  if (commits.message) {
    console.log('message: ', commits)
  }

  for await (const commit of commits) {
    if (commit.commit.author.name === 'Chefkoch') {
      // get the files
      const commitDetailResult = await fetch(commit.url)
      const commitDetail = await commitDetailResult.json()
      const details = {}
      for (const file of commitDetail.files) {
        // get the user id from the path
        const discordUserID = file.filename.split('/')[1]
        details.type = file.filename.split('.').pop()
        // userID should be int & finite number
        if (isFinite(parseInt(discordUserID)) && details.type === 'bwpreset') {
          // get the user
          const user = await GetDiscordUser(discordUserID)
          details.name = file.filename.split('/')[2]
          details.added = commitDetail.commit.author.date
          details.desc = commitDetail.commit.message
          details.download = 'https://github.com/polarity/bitwig-community-presets/raw/master/' + file.filename
          details.user = {
            avatarURL: user.avatarURL(),
            id: user.id,
            username: user.username
          }

          Presets.push(details)
        }
      }
    }
  }
  return Presets
}
const firebaseConfig = {
  credential: firebase.credential.cert({
    type: process.env.GATSBY_FIREBASE_TYPE,
    project_id: process.env.GATSBY_FIREBASE_PROJECT_ID,
    private_key_id: process.env.GATSBY_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.GATSBY_FIREBASE_PRIVATE_KEY[0] === '-' ? process.env.GATSBY_FIREBASE_PRIVATE_KEY : JSON.parse(process.env.GATSBY_FIREBASE_PRIVATE_KEY),
    client_email: process.env.GATSBY_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.GATSBY_FIREBASE_CLIENT_ID,
    auth_uri: process.env.GATSBY_FIREBASE_AUTH_URI,
    token_uri: process.env.GATSBY_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GATSBY_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GATSBY_FIREBASE_CLIENT_X509_CERT_URL
  }),
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DB_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_SENDER_ID
}

firebase.initializeApp(firebaseConfig)

const load = async (details) => {
  const db = firebase.firestore()
  return db.collection('presets').orderBy('added', 'desc').get()
}
const save = async (details) => {
  const db = firebase.firestore()
  await db.collection('presets').doc(details.user.id + '-' + details.name).set(details)
}
module.exports = { grabPresets, GetDiscordUser, save, load }
