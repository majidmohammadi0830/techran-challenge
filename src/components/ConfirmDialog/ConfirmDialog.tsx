import React from 'react';
import Classes from './ConfirmDialog.module.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

type ConfirmDialogProps = {
    isOpen: boolean,
    title: string,
    content: string,
    handleClose: () => void
    handleConfirm: () => void
}
const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = (props) => {

    return <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {props.title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose}>Disagree</Button>
            <Button onClick={props.handleConfirm} autoFocus>Agree</Button>
        </DialogActions>
    </Dialog>
}

export default ConfirmDialog