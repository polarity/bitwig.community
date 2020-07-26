import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/storage'
import InputButton from '../input-button'

const storeDoc = async (collection, value, doc, keyString) => {
  if (value) {
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
    console.log('doc saved')
  } catch (error) {
    console.log('something went wrong ', error)
  }
}

const storeImage = async (path, ext, arrayBuffer) => {
  // Create a root reference
  const storageRef = firebase.storage().ref()
  // Create a reference
  const imageRef = storageRef.child(path + firebase.auth().currentUser.uid + ext)
  const snapshot = await imageRef.put(arrayBuffer)
  return snapshot.ref.getDownloadURL()
}

const previewImage = (ev, setDataUrl) => {
  if (ev.target.files && ev.target.files.length > 0) {
    const reader = new window.FileReader()
    reader.onload = () => {
      setDataUrl(reader.result)
    }
    reader.readAsDataURL(ev.target.files[0])
  }
}

const generateArrayBuffer = (ev, setData) => {
  if (ev.target.files && ev.target.files.length > 0) {
    const reader = new window.FileReader()
    reader.onload = () => {
      setData(reader.result)
    }
    reader.readAsArrayBuffer(ev.target.files[0])
  }
}

export default ({ keyString, doc, collection }) => {
  const [dataUrl, setDataUrl] = useState(null)
  const [data, setData] = useState(0)
  const filePath = 'profile-images/'
  const ext = '.jpg'

  return (
    <div>
      {doc && !dataUrl && <div><img style={{ maxWidth: '200px' }} src={doc[keyString]} /></div>}
      {dataUrl &&
        <div>
          <img style={{ maxWidth: '200px' }} src={dataUrl} />
          <br />
          <InputButton onClick={async (ev) => {
            // store the image and get the url
            const url = await storeImage(filePath, ext, data)
            // store the doc with the new image url
            storeDoc(collection, url, doc, keyString)
          }}
          >Save
          </InputButton>
        </div>}
      <input
        type='file' onChange={(ev) => {
          previewImage(ev, setDataUrl)
          generateArrayBuffer(ev, setData)
        }}
      />
    </div>
  )
}
