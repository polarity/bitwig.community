// get the .env file
require('dotenv').config({
  path: '.env.production'
})

// firebase import
const firebase = require('firebase-admin')

// import fetch
const fetch = require('node-fetch')

// define firebase credentials
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

// initialize firebase
firebase.initializeApp(firebaseConfig)

// Returns a Promise that resolves after "ms" Milliseconds
const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * this function checks if youtube videos on firebase are still available on youtube.
 */
const checkFirebaseForVideos = async () => {
  const videos = await firebase.firestore().collection('ext-youtube').get()
  // move the weird array to a real array
  const videoIterable = [...videos.docs]
  // loop through the videos
  for (const video of videoIterable) {
    // get the video data
    const youtubeId = video.data().url.split('v=')[1]
    // get the video data from youtube
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${process.env.GATSBY_YOUTUBE_API_KEY}`)
    const json = await response.json()
    // check if the video is still available
    if (json.items.length === 0) {
      // if not, delete the video
      const deletion = await firebase.firestore().collection('ext-youtube').doc(video.id).delete()
      // and log it
      console.log(`deleted ${video.id} - ${deletion}`)
      await timer(1000)
    }
  }
}

// check videos on youtube for availablity
// remove removed videos from firebase
checkFirebaseForVideos()
