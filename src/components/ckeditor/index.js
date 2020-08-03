import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './ckstyles.css'

export default ({ setText }) => {
  return (
    <div class='ck-content'>
      <CKEditor
        editor={ClassicEditor}
        data=''
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor)
        }}
        onChange={(event, editor) => {
          setText(editor.getData())
        }}
      />
    </div>
  )
}
