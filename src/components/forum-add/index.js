import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Typography from '../typography'
import styles from './styles.module.css'
import getUserProfile from '../../utils/getUserProfile'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import Button from '../input-button'
import urlSlug from 'url-slug'
import UUID from 'uuid-v4'

import getProfileImage from '../../utils/getProfileImage'

import './ckstyles.css'

const sendData = async (type, collection, title, text, topicId) => {
  const userProfile = await getUserProfile(firebase.auth().currentUser)
  const profileName = userProfile.username

  if (profileName && title && title.length > 5 && text && text.length > 10) {
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
    } catch (error) {
      console.log('something went wrong ', error)
    }
  } else {
    console.log('???', profileName, title, title.length > 5, text, text.length > 10)
  }
}

export default ({ type, topicid, topictitle }) => {
  const [text, setText] = useState(false)
  const [title, setTitle] = useState('')
  const [id, setId] = useState(false)

  useEffect(() => {
    setTitle(topictitle)
    setId(topicid)
    console.log('id???', topicid)
  }, [topictitle, topicid])

  let collName = 'forum-topics'
  let elemInputTitle = <input type='text' onChange={(ev) => setTitle(ev.target.value)} placeholder='please insert a topic title' />
  let elemHeader = <Typography><h1>Add a new Topic</h1></Typography>

  // use the same editor for adding replies
  if (type === 'reply') {
    collName = 'forum-replies'
    elemHeader = <Typography><h1>add a reply</h1></Typography>
    elemInputTitle = ''
  }

  return (
    <div id='Forum'>
      {elemHeader}
      {elemInputTitle}
      <div class='ck-content'>
        <CKEditor
          editor={ClassicEditor}
          data=''
          onInit={editor => {
          // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor)
          }}
          onChange={(event, editor) => {
            setText(editor.getData())
          }}
        />
      </div>
      <Button onClick={(ev) => sendData(type, collName, title, text, id)}>Send</Button>
    </div>
  )
}
