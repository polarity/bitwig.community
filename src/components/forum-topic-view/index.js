import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Typography from '../typography'
import { map } from 'lodash'
import { Link } from 'gatsby'
import styles from './styles.module.css'
import ForumAdd from '../forum-add'

const getTopic = async (collection, setData, itemsOnPage, slug) => {
  firebase
    .firestore()
    .collection(collection)
    .doc(slug)
    .onSnapshot((snapshot) => {
      const newData = snapshot.data()
      newData.id = slug
      // set state and update dom
      setData(newData)
    })
}

const getReplies = async (collection, setData, itemsOnPage, slug) => {
  firebase
    .firestore()
    .collection(collection)
    .where('replyForTopic', '==', slug)
    .orderBy('added', 'asc')
    .onSnapshot((snapshot) => {
      const newData = []
      snapshot.forEach((doc) => {
        const newDoc = doc.data()
        newDoc.id = doc.id
        newData.push(newDoc)
      })
      // set state and update dom
      setData(newData) // set state and update dom
    })
}

export default ({ slug }) => {
  const [topic, setTopic] = useState({})
  const [replies, setReplies] = useState([])
  const [itemsOnPage] = useState(50)

  // load data once
  useEffect(() => {
    const fetch = async () => {
      getTopic('forum-topics', setTopic, itemsOnPage, slug)
      getReplies('forum-replies', setReplies, itemsOnPage, slug)
    }
    fetch()
  }, [])

  return (
    <div id='Forum'>
      <div id={topic.id} className={styles.topic}>
        <Typography>
          <h1>{topic.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: topic.content }} />
        </Typography>
      </div>

      {map(replies, (reply, index) => {
        return (
          <div id={reply.id} key={reply.id} className={styles.reply}>
            <Typography>
              <hr />
              <div dangerouslySetInnerHTML={{ __html: reply.content }} />
            </Typography>
          </div>
        )
      })}

      <div>
        <ForumAdd type='reply' topictitle={topic.title} topicid={topic.id} />
      </div>
    </div>
  )
}
