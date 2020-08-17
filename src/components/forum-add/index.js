import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Typo from '../typo'
import styles from './styles.module.css'
import getUserProfile from '../../utils/getUserProfile'
import Button from '../input-button'
import urlSlug from 'url-slug'
import UUID from 'uuid-v4'
import getProfileImage from '../../utils/getProfileImage'
import CKEditor from '../ckeditor'

const createValidation = (fn, errorMsg, type) => {
  return (data) => {
    if (fn(data)) {
      return true
    } else {
      return errorMsg
    }
  }
}
const showErrors = (valObj) => {
  const displayError = []
  for (const index in valObj) {
    if (typeof valObj[index] === 'string') {
      displayError.push(<p key={'error-' + index} className={styles.errorline}>{valObj[index]}</p>)
    }
  }
  return <div class='validationErrors'>{displayError}</div>
}
const checkUser = createValidation(
  a => a,
  'user must be logged in'
)
const checkTitle = createValidation(
  a => a && a.length > 5,
  'title must be defined and longer the 5 chars'
)
const checkText = createValidation(
  a => a && a.length > 10 && a.length < 1000,
  'content must be defined and longer the 10 chars and smaller than 1000'
)
const check = (checkObj) => {
  let result = true
  for (const check in checkObj) {
    if (typeof checkObj[check] === 'string') {
      result = false
    }
  }
  if (result === true) {
    return true
  } else {
    return false
  }
}

const sendData = async (setError, type, collection, title, text, topicId) => {
  const userProfile = await getUserProfile(firebase.auth().currentUser)
  const profileName = userProfile.username
  const validationObj = {
    user: checkUser(profileName),
    title: checkTitle(title),
    text: checkText(text)
  }
  const validation = check(validationObj)

  if (validation) {
    const slug = urlSlug(title + ' by ' + profileName + ' ' + UUID())
    const doc = {
      uid: firebase.auth().currentUser.uid,
      uname: profileName,
      uimage: await getProfileImage(firebase.auth().currentUser.uid),
      added: new Date().toISOString(),
      content: text
    }

    if (type === 'reply') {
      console.log('replllly ', topicId)
      doc.replyForTopic = topicId
    } else {
      doc.title = title
    }

    try {
      await firebase
        .firestore()
        .collection(collection)
        .doc(slug)
        .set(doc)
      console.log('doc saved')
      setError('')
    } catch (error) {
      console.log('something went wrong ', error)
    }
  } else {
    setError(showErrors(validationObj))
  }
}

export default ({ type, topicid, topictitle }) => {
  const [text, setText] = useState(false)
  const [title, setTitle] = useState('')
  const [id, setId] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setTitle(topictitle)
    setId(topicid)
    console.log('id???', topicid)
  }, [topictitle, topicid])

  let collName = 'forum-topics'
  let elemInputTitle = <input type='text' onChange={(ev) => setTitle(ev.target.value)} placeholder='please insert a topic title' />
  let elemHeader = <Typo><h1>Add a new Topic</h1></Typo>

  // use the same editor for adding replies
  if (type === 'reply') {
    collName = 'forum-replies'
    elemHeader = <Typo><h1>Add a reply</h1><p>Please think before you write! Express yourself meaningfully, comprehensibly and politely. We are all in the same boat.</p></Typo>
    elemInputTitle = ''
  }

  return (
    <div id='Forum' className={styles.Forum}>
      {elemHeader}
      {elemInputTitle}
      {error && <div className={styles.error}>{error}</div>}
      <CKEditor {...{ setText }} />
      <Button onClick={(ev) => sendData(setError, type, collName, title, text, id)}>Send</Button>
    </div>
  )
}
