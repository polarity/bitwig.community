import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import { map } from 'lodash'
import styles from './styles.module.css'
import Typography from '../typography'
import InlineEdit from '../inline-edit'

const clientId = process.env.GATSBY_DISCORD_CLIENT
const state = process.env.GATSBY_DISCORD_STATE
const scope = 'identify'
const redirect = process.env.GATSBY_DISCORD_REDIRECT

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
      <Typography>
        <h1>My Presets</h1>
        <p>If you already uploaded presets in the Bitwig Discord, then should be listed here.
        If not, try and <a href={`https://discord.com/api/oauth2/authorize?response_type=token&redirect_uri=${redirect}&client_id=${clientId}&state=${state}&scope=${scope}`}>connect your Discord ID</a> with your account here.
        </p>
        <p>
          <i>All changes on this site, will be only after a page rewrite reflect.
            <br />This happens one or two times a day atm.
          </i>
        </p>
      </Typography>
      {map(presets, (preset, index) => {
        return (
          <div key={index} id={preset.id} className={styles.preset}>
            <Typography>
              <h3>{preset.name}</h3>
              <ul className={styles.list}>
                {map(preset, (info, key) => {
                  if (['uid', 'id', 'user', 'type', 'added', 'download', 'name'].indexOf(key) < 0) {
                    return (<li key={key}><b>{key}:</b> <InlineEdit collection='presets' doc={preset} keyString={key} /></li>)
                  } else {
                    return ''
                  }
                })}
              </ul>
            </Typography>
          </div>
        )
      })}
    </div>
  )
}
