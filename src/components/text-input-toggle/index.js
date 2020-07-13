import React, { useState } from 'react'
import firebase from 'firebase/app'

const storeDoc = async (value, doc, keyString, setToggle) => {
  doc[keyString] = value
  try {
    await firebase
      .firestore()
      .collection('presets')
      .doc(doc.id)
      .set(doc)
    setToggle(false)
    console.log('doc saved ')
  } catch (error) {
    console.log('something went wrong ', error)
  }
}

export default ({ keyString, doc, docId }) => {
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(doc[keyString])
  return (
    <>
      {!toggle && <span onClick={() => setToggle(true)}>{value} </span>}
      {toggle &&
        <span>
          <input type='text' value={value} onChange={(ev) => setValue(ev.target.value)} />
          <button onClick={() => storeDoc(value, doc, keyString, setToggle)}>save</button>
          <button onClick={() => setToggle(false)}>cancel</button>
        </span>}
    </>
  )
}
