import React, { useState } from 'react'
import firebase from 'firebase/app'
import styles from './styles.module.css'

const storeDoc = async (collection, value, doc, keyString, setToggle) => {
  if (value && value.length > 0) {
    doc[keyString] = value
  } else {
    delete doc[keyString]
  }

  try {
    await firebase
      .firestore()
      .collection(collection)
      .doc(doc.id)
      .set(doc)
    setToggle(false)
    console.log('doc saved')
  } catch (error) {
    console.log('something went wrong ', error)
  }
}

export default ({ keyString, doc, collection }) => {
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(doc[keyString] || '')
  return (
    <>
      {!toggle && <span className={styles.value} onClick={() => setToggle(true)}>{value || 'click to add a value'}</span>}
      {toggle &&
        <span>
          <input
            autoFocus
            type='text'
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
          />
          <button onClick={() => storeDoc(collection, value, doc, keyString, setToggle)}>save</button>
          <button onClick={() => setToggle(false)}>cancel</button>
        </span>}
    </>
  )
}
