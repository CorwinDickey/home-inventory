import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    makeStyles,
    Typography,
    Divider
} from '@material-ui/core/'

import ActionButton from './form-controls/ActionButton'

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2)
    }
}))

export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup } = props
    const classes = useStyles()

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                            X
                    </ActionButton>
                </div>
            </DialogTitle>
            <Divider variant='middle' />
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}