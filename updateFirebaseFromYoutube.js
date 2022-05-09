require('dotenv').config({
  path: '.env.production'
})

const firebase = require('firebase-admin')

// import fetch
const fetch = require('node-fetch')

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

/**
 * this function takes a search term and calls the youtube api to get the video data.
 * it then loops over each item and updates the document in the firabase with each video data.
 */
const updateFirebaseFromYoutubeSearch = async (searchTerm) => {
  const db = firebase.firestore()
  const videoData = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&key=${process.env.GATSBY_YOUTUBE_API_KEY}&order=date&maxResults=250`)
  const videoJson = await videoData.json()
  for (let i = 0; i < videoJson.items.length; i++) {
    const videoItem = videoJson.items[i]
    const videoData = {
      channel: videoItem.snippet.channelTitle,
      date: videoItem.snippet.publishedAt,
      description: videoItem.snippet.description,
      embed: videoItem.snippet.thumbnails.medium.url,
      isStream: (videoItem.snippet.liveBroadcastContent === 'live'),
      'thumb-default': videoItem.snippet.thumbnails.default.url,
      'thumb-high': videoItem.snippet.thumbnails.high.url,
      'thumb-med': videoItem.snippet.thumbnails.medium.url,
      title: videoItem.snippet.title,
      url: `https://www.youtube.com/watch?v=${videoItem.id.videoId}`
    }
    // check if video is already in firebase
    const docID = videoItem.snippet.channelTitle + '-' + videoItem.snippet.channelId + '-' + videoItem.id.videoId
    const docRef = db.collection('ext-youtube').doc(docID)
    const doc = await docRef.get()
    if (doc.exists) {
      // if video is already in firebase, update it
      try {
        await docRef.update(videoData)
      } catch (error) {
        console.log(error)
      }
    } else {
      // if video is not in firebase, create it
      await docRef.set(videoData)
    }
  }
}
updateFirebaseFromYoutubeSearch('Bitwig')
