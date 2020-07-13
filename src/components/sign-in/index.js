import React, { Component } from 'react'
import { mapper } from '@reduxless/react'
import styles from './styles.module.css'
import Typography from '../typography'
import FormRow from '../form-row'
import firebase from 'firebase/app'
import 'firebase/auth'
import Button from '../input-button'
import InputText from '../input-text'
import Label from '../input-label'

const Mapped = mapper({
  modalLoginState: store => store.get('modalLoginState')
}, {
  handleModalState: store => store.set('modalLoginState', false)
})

class Signin extends Component {
  constructor () {
    super()
    this.state = {
      user: false,
      email: false
    }
    if (typeof window !== 'undefined') {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            usermail: user.email
          })
        } else {

        }
      })
    }
  }

  createLink (email) {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: window.location.origin + '/validatemail/',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'bitwig.page.link'
    }
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email)
        this.setState({
          inProcess: true,
          info: 'email sent, check your mail and click the link!'
        })
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        this.setState({
          info: 'something went wrong!' + error
        })
      })
  }

  handleChange (ev) {
    this.setState({
      email: ev.target.value
    })
  }

  handleSend (ev) {
    this.createLink(this.state.email)
  }

  handleCancel (ev) {

  }

  render () {
    if (this.props.modalLoginState) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.modal}>
            <div>
              <Typography>
                <h1>Passwordless Login</h1>
                <p>
                  You do not need a password for this website. Enter your email address below and we will send you a link to log in.
                  <b>Your account will be bound to this email address.</b>
                </p>
                {this.state.info &&
                  <p>{this.state.info}</p>}
                {this.state.usermail &&
                  <div>
                    <p>
                      looks like you are still logged in with "{this.state.usermail}"
                    </p>
                    <p>
                      <Button onClick={this.props.handleModalState}>Cancel</Button>
                    </p>
                  </div>}
              </Typography>
            </div>

            {!this.state.inProcess && !this.state.usermail &&
              <Typography>
                <FormRow>
                  <Label style={{ width: '10vw' }} className={styles.label}>E-Mail:</Label>
                  <InputText type='email' placeholder='your email' onChange={this.handleChange.bind(this)} />
                </FormRow>
                <FormRow>
                  <Label style={{ width: '10vw' }}>send</Label>
                  <Button onClick={this.handleSend.bind(this)} color='red'>Login</Button>
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

export default Mapped(Signin)
