import React, { useState } from 'react'
import firebase from 'firebase/app'

const storeDoc = async (value, doc, keyString) => {
  doc[keyString] = value
  try {
    const docRef = await firebase
      .firestore()
      .collection('presets')
      .doc(doc.id)
      .set(doc)
    console.log('doc saved ', docRef)
  } catch (error) {
    console.log('something went wrong ', error)
  }
}

export default ({ keyString, doc }) => {
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(doc[keyString])
  return (
    <>
      {!toggle && <span onClick={() => setToggle(true)}>{value} </span>}
      {toggle &&
        <span>
          <input type='text' value={value} onChange={(ev) => setValue(ev.target.value)} />
          <button onClick={() => storeDoc(value, doc, keyString)}>save</button>
          <button onClick={() => setToggle(false)}>cancel</button>
        </span>}
    </>
  )
}
