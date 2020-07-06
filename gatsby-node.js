const firebase = require('firebase-admin')
const path = require('path')
const urlSlug = require('url-slug')

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

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const Presets = []
  const Creators = []
  const snapshot = await load()
  snapshot.forEach((doc) => {
    const data = doc.data()
    Presets.push(data)
    if (Creators[urlSlug(data.user.username)]) {
      Creators[urlSlug(data.user.username)].push(data)
    } else {
      Creators[urlSlug(data.user.username)] = []
      Creators[urlSlug(data.user.username)].push(data)
    }
  })

  // create page
  actions.createPage({
    path: '/presets',
    component: path.resolve('src/templates/presets.js'),
    context: {
      presets: Presets
    }
  })

  // pages for each preset
  for (const Preset of Presets) {
    actions.createPage({
      path: '/preset-' + Preset.name.split('.')[0],
      component: path.resolve('src/templates/preset-detail.js'),
      context: {
        preset: Preset
      }
    })
  }

  // pages for each creator
  for (const key in Creators) {
    actions.createPage({
      path: '/creator-' + key,
      component: path.resolve('src/templates/preset-creator.js'),
      context: {
        presets: Creators[key]
      }
    })
  }
}
