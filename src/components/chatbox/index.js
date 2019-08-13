import React, { useState } from 'react'
import styles from './styles.module.css'
import Typography from '../typography'
import { mapper } from '@reduxless/react'
import Button from '../button'
import { last } from 'lodash'

const chats = useState([])
const itemsOnPage = useState(10)
const lastDoc = useState(false)

const getChats = (start) => {
  // init db query
  let dbQuery = window.firebase
    .firestore()
    .collection('chats')
    .orderBy('lastReplyDate', 'desc')

  // we have a start? pagination
  if (start) {
    dbQuery = dbQuery.startAt(start.lastReplyDate)
  }

  // querry nau!!
  dbQuery
  .limit(this.state.itemsOnPage)
  .get()
  .then((onSnapshot) => {
    // our items = threads
    const newData = []
    onSnapshot.forEach((doc) => {
      let newDoc = doc.data()
      newDoc.id = doc.id
      newData.push(newDoc)
    })

    // set state and update dom
    this.setState({
      lastDoc: last(newData),
      threads: newData
    })
  })
}
export default ({ sendText }) =>
  <div className={styles.chatbox}>
    <input type='text' />
    <Button onClick={sendText}>send</Button>
  </div>
