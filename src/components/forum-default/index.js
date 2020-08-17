import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import Typo from '../typo'
import Typography from '../typography'
import { map } from 'lodash'
import { Link } from 'gatsby'
import styles from './styles.module.css'
import formatDateRelative from '../../utils/formatDateRelative'

const getData = async (collection, setData, itemsOnPage) => {
  // init db query
  const dbQuery = firebase
    .firestore()
    .collection(collection)
    // .where('uid', '==', firebase.auth().currentUser.uid)
    .orderBy('added', 'desc')

  // we have a start? pagination
  // if (start) {
  //  dbQuery = dbQuery.startAt(start.lastReplyDate)
  // }

  // querry nau!!
  dbQuery
    .limit(itemsOnPage)
    .onSnapshot((onSnapshot) => {
      // our items = threads
      const newData = []
      onSnapshot.forEach((doc) => {
        const newDoc = doc.data()
        newDoc.id = doc.id
        newData.push(newDoc)
      })
      // set state and update dom
      setData(newData)
    })
}
export default () => {
  const [topics, setTopics] = useState([])
  const [itemsOnPage] = useState(50)

  // load data once
  useEffect(() => {
    const fetch = async () => {
      getData('forum-topics', setTopics, itemsOnPage)
    }
    fetch()
  }, [])

  return (
    <div id='Forum' className={styles.Forum}>
      <Typography>
        <h1>Welcome to the Bitwig Community Forum</h1>
        <p>Hey guys, normally the <a rel='noopener noreferrer' target='_blank' href='https://discord.gg/0g2ZPafIN3eWParf'>Bitwig Discord</a> is enough for the whole banter,
          but every now and then you need a well maintained forum with persistent
          good information and all the discussions around it.
          And that's where you are right now.
        </p>
      </Typography>
      {map(topics, (topic, index) => {
        return (
          <div key={index} id={topic.id} className={styles.topic}>
            <Typo>
              <h2><Link to={'/forum/topic/' + topic.id}>{topic.title}</Link></h2>
              <span className={styles.subHeader}>by {topic.uname} - {formatDateRelative(topic.added)}</span>
            </Typo>
          </div>
        )
      })}
    </div>
  )
}
