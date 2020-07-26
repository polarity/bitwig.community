import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { map } from 'lodash'
import styles from './styles.module.css'
import Typography from '../typography'
import InlineEdit from '../inline-edit'
import ImageUpload from '../image-upload'

const getData = async (setProfiles, itemsOnPage) => {
  // init db query
  const dbQuery = firebase
    .firestore()
    .collection('profile')
    .where('uid', '==', firebase.auth().currentUser.uid)

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
      setProfiles(newData)
    })
}
export default () => {
  const [profiles, setProfiles] = useState(0)
  const [itemsOnPage] = useState(50)

  // load data once
  useEffect(() => {
    const fetch = async () => {
      getData(setProfiles, itemsOnPage)
    }
    fetch()
  }, [])

  return (
    <div>
      <Typography>
        <h1>My Profile</h1>
        <p>You can define your Artist biography here, add some links or define your Artists pics
        </p>
        <p>
          <i>All changes on this site, will be only after a page rewrite reflect.
            <br />This happens one or two times a day atm.
          </i>
        </p>
        <ul>
          <li><ImageUpload keyString='imageProfile' doc={profiles[0]} collection='profile' /></li>
          {map(profiles, (profile, index) => {
            return map(profile, (info, key) => {
              if (['uid', 'id', 'user'].indexOf(key) < 0) {
                return (<li key={key}><b>{key}:</b> <InlineEdit collection='profile' doc={profile} keyString={key} /></li>)
              }
            })
          })}
        </ul>
      </Typography>
    </div>
  )
}
