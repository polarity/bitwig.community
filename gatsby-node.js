const filter = require('lodash').filter
const uniqBy = require('lodash').uniqBy
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

const loadChallenges = async (details) => {
  const db = firebase.firestore()
  return db.collection('bitwig-challenge').orderBy('date', 'desc').get()
}

const loadVideos = async (details) => {
  const db = firebase.firestore()
  return db.collection('ext-youtube').orderBy('date', 'desc').get()
}

exports.onCreatePage = async ({ page, actions }) => {
  if (page.path.match(/^\/forum/)) {
    page.matchPath = '/forum/*'
    // Update the page.
    actions.createPage(page)
  }
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ page, graphql, actions, reporter }) => {
  // prepare preset data
  const Presets = []
  const Creators = []
  const Devices = []
  const Categories = []
  const snapshotVideos = await loadVideos()

  /**
   * video GUIDES
   * video creators
   * video topics
   */
  const Videos = []

  snapshotVideos.forEach(doc => {
    const data = doc.data()
    Videos.push(data)
  })
  const VideoCreators = uniqBy(Videos, (e) => {
    return e.channel
  })
  const videosPerPage = 150
  const countVideos = Videos.length
  const numVideoPages = Math.ceil(countVideos / videosPerPage)
  Array.from({ length: numVideoPages }).forEach((_, i) => {
    actions.createPage({
      path: i === 0 ? '/video-guides' : `/video-guides-${i + 1}`,
      component: path.resolve('src/templates/video-guides.js'),
      context: {
        limit: videosPerPage,
        nextPage: ((i + 2) > numVideoPages) ? '' : '-' + (i + 2),
        numVideoPages,
        currentPage: i + 1,
        videos: Videos.slice((i * videosPerPage), ((i * videosPerPage) + videosPerPage)),
        creators: VideoCreators
      }
    })
  })

  // pages for each video guide creator
  for (const key in VideoCreators) {
    actions.createPage({
      path: '/video-creator-' + urlSlug(VideoCreators[key].channel),
      component: path.resolve('src/templates/video-guides.js'),
      context: {
        type: 'creatorPage',
        videos: filter(Videos, (e) => {
          return e.channel === VideoCreators[key].channel
        }),
        creators: VideoCreators
      }
    })
  }

  const snapshot = await load()
  snapshot.forEach((doc) => {
    const data = doc.data()
    Presets.push(data)

    if (Creators['__' + urlSlug(data.user.username)]) {
      Creators['__' + urlSlug(data.user.username)].push(data)
    } else {
      Creators['__' + urlSlug(data.user.username)] = []
      Creators['__' + urlSlug(data.user.username)].push(data)
    }

    if (data.device_name && data.device_name.length > 0) {
      if (Devices['__' + urlSlug(data.device_name)]) {
        Devices['__' + urlSlug(data.device_name)].push(data)
      } else {
        Devices['__' + urlSlug(data.device_name)] = []
        Devices['__' + urlSlug(data.device_name)].push(data)
      }
    }
    if (data.preset_category && data.preset_category.length > 0) {
      if (Categories['__' + urlSlug(data.preset_category)]) {
        Categories['__' + urlSlug(data.preset_category)].push(data)
      } else {
        Categories['__' + urlSlug(data.preset_category)] = []
        Categories['__' + urlSlug(data.preset_category)].push(data)
      }
    }
  })

  /*
    challenges
  */
  const Challenges = []
  const snapshotChallenges = await loadChallenges()
  snapshotChallenges.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    Challenges.push(data)
  })
  actions.createPage({
    path: '/challenges',
    component: path.resolve('src/templates/challenges.js'),
    context: {
      challenges: Challenges
    }
  })

  /*
    presets
      create preset overview page
      and send all presets from firebase
 */
  actions.createPage({
    path: '/presets-all',
    component: path.resolve('src/templates/presets.js'),
    context: {
      presets: Presets
    }
  })

  // create preset overview page
  // and send all presets from firebase
  actions.createPage({
    path: '/presets',
    component: path.resolve('src/templates/presets-featured.js'),
    context: {
      presets: filter(Presets, { featured: true })
    }
  })

  // pages for each challenge
  for (const Challenge of Challenges) {
    if (Challenge.title) {
      actions.createPage({
        path: '/challenge-' + Challenge.id,
        component: path.resolve('src/templates/challenge-detail.js'),
        context: {
          challenge: Challenge
        }
      })
    }
  }

  // pages for each preset
  for (const Preset of Presets) {
    if (Preset.name) {
      actions.createPage({
        path: '/preset-' + Preset.name.split('.')[0],
        component: path.resolve('src/templates/preset-detail.js'),
        context: {
          preset: Preset
        }
      })
    }
  }

  // pages for each creator
  for (const key in Creators) {
    actions.createPage({
      path: '/creator-' + key.replace('__', ''),
      component: path.resolve('src/templates/preset-creator.js'),
      context: {
        presets: Creators[key]
      }
    })
  }

  // pages for each devices
  for (const key in Devices) {
    actions.createPage({
      path: '/device-' + key.replace('__', ''),
      component: path.resolve('src/templates/preset-device.js'),
      context: {
        presets: Devices[key]
      }
    })
  }

  // pages for each category
  for (const key in Categories) {
    actions.createPage({
      path: '/category-' + key.replace('__', ''),
      component: path.resolve('src/templates/preset-category.js'),
      context: {
        presets: Categories[key]
      }
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@ckeditor/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}
