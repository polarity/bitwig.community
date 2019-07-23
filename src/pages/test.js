import React from 'react'

const drag = (e) => {
  if (e.dataset) {
    e.dataTransfer.setData('DownloadURL', this.dataset.downloadurl)
  }
}

export default () => <div>
  <a
    onDragStart={drag.bind(this)}
    data-downloadurl='https://firebasestorage.googleapis.com/v0/b/ss-pn-96a7c.appspot.com/o/bwpresets%2FPolarity_broken-phase-drift.bwpreset?alt=media&token=49e2e7e1-f865-422f-9764-2d58f05dc42c'
    href='https://firebasestorage.googleapis.com/v0/b/ss-pn-96a7c.appspot.com/o/bwpresets%2FPolarity_broken-phase-drift.bwpreset?alt=media&token=49e2e7e1-f865-422f-9764-2d58f05dc42c'>Test</a>
</div>
