import React, { useState, useEffect, Profiler } from 'react'
import firebase from 'firebase/app'
import { map } from 'lodash'
import { Link } from 'gatsby'
import styles from './styles.module.css'
import ForumAdd from '../forum-add'
import Typo from '../typo'
import formatDateRelative from '../../utils/formatDateRelative'

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
    <div className={styles.Forum} id='Forum'>
      <div id={topic.id} className={styles.topic}>
        <div className={styles.topicAvatar}>
          {topic.uimage && <img src={topic.uimage} alt={'profile image of ' + topic.uname} />}
          {!topic.uimage && <img src='/no-avatar.jpg' alt={'profile image of ' + topic.uname} />}
        </div>
        <div className={styles.topicContent}>
          <Typo>
            <h1>{topic.title}</h1>
            <p className={styles.subinfo}>by {topic.uname}</p>
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
          </Typo>
        </div>
      </div>

      {map(replies, (reply, index) => {
        return (
          <div id={reply.id} key={reply.id} className={styles.reply}>
            <div className={styles.replyAvatar}>
              {reply.uimage && <img src={reply.uimage} alt={'profile image of ' + reply.uname} />}
              {!reply.uimage && <img src='/no-avatar.jpg' alt={'profile image of ' + topic.uname} />}
            </div>
            <div className={styles.replyContent}>
              <Typo>
                <p className={styles.subinfoStandalone}>reply by {reply.uname} - {formatDateRelative(reply.added)}</p>
                <div dangerouslySetInnerHTML={{ __html: reply.content }} />
              </Typo>
            </div>
          </div>
        )
      })}

      <div id='AddReplyBox'>
        <ForumAdd type='reply' topictitle={topic.title} topicid={topic.id} />
      </div>
    </div>
  )
}
