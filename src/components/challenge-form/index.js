import React, { Component } from 'react'
import { mapper } from '@reduxless/react'
import styles from './styles.module.css'
import Typography from '../typography'
import FormRow from '../form-row'
import 'firebase/auth'
import Button from '../input-button'
import InputText from '../input-text'
import InputFile from '../input-file'
import Label from '../input-label'

const Mapped = mapper({
  loggedInUser: (store) => { return store.get('loggedInUser') },
  modalChallengeForm: store => store.get('modalChallengeForm')
}, {
  handleModalState: store => store.set('modalChallengeForm', false)
})

class ChallengeForm extends Component {
  constructor ({ challenge }) {
    super()
    this.state = {
      user: false,
      email: false,
      preset: false,
      yt: false,
      artist: false,
      homebase: false,
      inProcess: false,
      challenge: challenge
    }
  }

  handleMailChange (ev) {
    this.setState({
      email: ev.target.value
    })
  }

  handlePresetChange (ev) {
    this.setState({
      preset: ev.target.files[0]
    })
  }

  handleVideoChange (ev) {
    this.setState({
      yt: ev.target.value
    })
  }

  handleArtistChange (ev) {
    this.setState({
      artist: ev.target.value
    })
  }

  handleHomebaseChange (ev) {
    this.setState({
      homebase: ev.target.value
    })
  }

  handleSend (ev) {
    this.setState({
      inProcess: true
    })
    if (this.state.homebase && this.state.preset && this.state.yt && this.state.artist && this.state.email) {
      const formData = new window.FormData()
      formData.append('Homebase', this.state.homebase)
      formData.append('preset', this.state.preset)
      formData.append('Youtube', this.state.yt)
      formData.append('Artist', this.state.artist)
      formData.append('Email', this.state.email)
      formData.append('challenge', this.state.challenge)

      formData.append('userUid', this.props.loggedInUser.uid)
      formData.append('photoURL', this.props.loggedInUser.photoURL)
      formData.append('displayName', this.props.loggedInUser.displayName)

      window.fetch('https://presetupload.herokuapp.com/challenge', { // http://localhost:5000/challenge
        method: 'POST',
        body: formData
      })
        .then(res => res.text())
        .then((response) => {
          this.setState({
            inProcess: false,
            info: response
          })
        })
        .catch((error) => {
          // log server response
          this.setState({
            inProcess: false,
            info: 'error: ' + error
          })
        })
    } else {
      this.setState({
        inProcess: false,
        info: 'please fill all fields'
      })
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    this.setState({
      artist: this.props.loggedInUser.displayName,
      email: this.props.loggedInUser.email
    })
  }

  render () {
    if (this.props.modalChallengeForm) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.modal}>
            <div>
              <Typography>
                <h1>Challenge Submission</h1>
                <p>You do not need a password for this website. Enter your email address below and we will send you a link to log in. <b>Your account will be bound to this email address.</b></p>
                {this.state.info && <p className={styles.error}>{this.state.info}</p>}
              </Typography>
            </div>
            {!this.state.inProcess && !this.state.usermail &&
              <Typography>
                <FormRow>
                  <Label style={{ width: '30%' }} className={styles.label}>Challenge:</Label>
                  <InputText style={{ width: '70%' }} name='challenge' placeholder='Challenge ID' value={this.state.challenge} readOnly />
                </FormRow>
                <FormRow>
                  <Label style={{ width: '30%' }} className={styles.label}>Artist Name:</Label>
                  <InputText style={{ width: '70%' }} name='artist' placeholder='Lady Gaga' value={this.state.artist} onChange={this.handleArtistChange.bind(this)} />
                </FormRow>
                <FormRow>
                  <Label style={{ width: '30%' }} className={styles.label}>E-Mail:</Label>
                  <InputText style={{ width: '70%' }} name='email' placeholder='your email' value={this.state.email} readOnly />
                </FormRow>
                <FormRow>
                  <Label style={{ width: '30%' }} className={styles.label}>Preset/Clip:</Label>
                  <InputFile style={{ width: '70%' }} name='bwpreset' placeholder='your preset file' onChange={this.handlePresetChange.bind(this)} />
                </FormRow>
                <FormRow>
                  <Label style={{ width: '30%' }} className={styles.label}>Youtube:</Label>
                  <InputText style={{ width: '70%' }} name='youtube' placeholder='https://www.youtube.com/watch?v=_pUL7u-mYqA' onChange={this.handleVideoChange.bind(this)} />
                </FormRow>
                <FormRow>
                  <Label style={{ width: '30%' }} className={styles.label}>Homebase URL:</Label>
                  <InputText style={{ width: '70%' }} name='homebase' placeholder='https://my-homepage.com/' onChange={this.handleHomebaseChange.bind(this)} />
                </FormRow>
                <hr />
                <FormRow>
                  <Label style={{ width: '30%' }}>Ready?</Label>
                  <Button onClick={this.handleSend.bind(this)} color='red'>Send!!</Button>
                  <Button onClick={this.props.handleModalState}>Cancel</Button>
                </FormRow>
              </Typography>}
          </div>
        </div>
      )
    } else {
      return false
    }
  }
}

export default Mapped(ChallengeForm)
