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
class FormModal extends React.Component {
  render() {
    const {
      additionalContent,
      children, contentClasses, dialogState, displayName, formName, fullWidth,
      maxWidth, onDialogChange, titleClasses, titleContent
    } = this.props
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
            onClick={() => { onDialogChange(false) }}>
            Cancel
          </Button>
          <Button
            color='primary'
            disabled={this.props.pristine}
            form={formName}
            id='formModal-save'
            type='submit'
            variant='contained'
            onClick={() => {
              this.props.handleSubmit()
              onDialogChange(false)
            }}
            >
              Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default FormModal