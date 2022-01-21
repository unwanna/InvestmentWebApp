import * as userApi from '../utils/UserApi';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import React from 'react'

/**
 * Assume the following properties are present:
 * this.props.children -- The display of the Form Fields
 * this.props.formName -- The Unique ID of the Form
 * this.props.displayName -- Modal Display Name
 * this.props.saveValue -- Save function for Submitting Redux-Form
 * this.props.onDialogChange -- Open/Close Function for Dialog
 * this.props.dialogState -- Open/Close State for Dialog
 *
 * this.props.pristine
 * this.props.handleSubmit
 *
 */
const LoginComponent = (props) => {
    const {
      additionalContent,
      children, contentClasses, dialogState, displayName, formName, fullWidth,
      maxWidth, onDialogChange, titleClasses, titleContent, setNewUserState,
      newUserState, username, password, email, localUser, setLocalUser
    } = props
    return (
      <Dialog
        open={dialogState}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        onClose={() => { onDialogChange(false) }}
        aria-labelledby='alert-dialog-title'>
        <DialogTitle
          className={titleClasses}
          id='formModal-title'>
          {displayName}
          {titleContent}
        </DialogTitle>
        <DialogContent
          className={contentClasses}
        >
          { children }
        </DialogContent>
        <DialogActions>
          {additionalContent}
          <Button
            color='primary'
            id='formModal-cancel'
            onClick={() => { setNewUserState(true) }}>
            Sign Up
          </Button>
          <Button
            color='primary'
            form={formName}
            id='formModal-save'
            type='submit'
            variant='contained'
            onClick={() => {
              if (newUserState) {
                userApi.createUser(username, password, email, setLocalUser)
              } else {
                userApi.getUser(username, password, setLocalUser)
                  .then(data => {console.warn(data);setLocalUser(data)})
              }
              onDialogChange(false)
              setNewUserState(false)
            }}
            >
              Log In
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default LoginComponent