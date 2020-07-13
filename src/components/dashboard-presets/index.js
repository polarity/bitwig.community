import React, { useState } from 'react'
import firebase from 'firebase/app'
import { map } from 'lodash'
import styles from './styles.module.css'
import Typography from '../typography'

const getData = async (setPresets, itemsOnPage) => {
  // init db query
  const dbQuery = firebase
    .firestore()
    .collection('presets')
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
  const [itemsOnPage, setItemsOnPage] = useState(50)
  getData(setPresets, itemsOnPage)
  return (
    <div>
      {map(presets, (preset, index) => {
        return (
          <div key={index} id={preset.id} className={styles.preset}>
            <Typography>
              {preset.name} | change

            </Typography>
          </div>
        )
      })}
    </div>
  )
}
