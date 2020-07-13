import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { map } from 'lodash'
import styles from './styles.module.css'
import Typography from '../typography'
import TextInpuToggle from '../text-input-toggle'

const getData = async (setPresets, itemsOnPage) => {
  // init db query
  const dbQuery = firebase
    .firestore()
    .collection('presets')
    .where('uid', '==', firebase.auth().currentUser.uid)
    .orderBy('added', 'desc')

  // we have a start? pagination
  // if (start) {
  //  dbQuery = dbQuery.startAt(start.lastReplyDate)
  // }

  // querry nau!!
  dbQuery
    .limit(itemsOnPage).get()
    .then((onSnapshot) => {
      // our items = threads
      const newData = []
      onSnapshot.forEach((doc) => {
        const newDoc = doc.data()
        newDoc.id = doc.id
        newData.push(newDoc)
      })

      // set state and update dom
      setPresets(newData)
    })
}
export default () => {
  const [presets, setPresets] = useState([])
  const [itemsOnPage] = useState(50)

  // load data once
  useEffect(() => {
    const fetch = async () => {
      getData(setPresets, itemsOnPage)
    }
    fetch()
  }, [])

  return (
    <div>
      {map(presets, (preset, index) => {
        return (
          <div key={index} id={preset.id} className={styles.preset}>
            <Typography>
              {preset.name} | <TextInpuToggle doc={preset} keyString='videoYoutube' />
            </Typography>
          </div>
        )
      })}
    </div>
  )
}
