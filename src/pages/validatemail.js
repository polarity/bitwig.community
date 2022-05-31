import React from 'react'
import Typography from '../components/typography'
import Header from '../components/menu-main'
import SignIn from '../components/sign-in'
import { Link } from 'gatsby'
import firebase from 'firebase/app'

const validate = () => {
  // Confirm the link is a sign-in with email link.
  if (window.firebase.auth().isSignInWithEmailLink(window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    var email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation')
    }
    // The client SDK will parse the code from the link for you.
    window.firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(async (result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn')

        // current logged in user id
        const uid = firebase.auth().currentUser.uid

        // prepare the new user profile object
        const userDoc = {
          uid: uid,
          discordUid: '',
          username: (email).split('@')[0]
        }

        const db = firebase.firestore()

        // add new user profile doc to firebase
        try {
          const docRef = await db
            .collection('profile')
            .doc(firebase.auth().currentUser.uid)
            .set(userDoc)
          console.log('Document written with ID: ', docRef)
        } catch (error) {
          console.error('Error adding document: ', error)
        }

        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        window.location = '/'
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        console.log(error)
      })
  }
}
const ValidateMail = () => {
  if (typeof window !== 'undefined') {
    validate()
  }

  return (
    <div>
      <Header />
      <SignIn />

      <Typography>
        <p>You are logged in now. <Link to='/'>back to the site</Link></p>
      </Typography>
    </div>
  )
}

export default ValidateMail
