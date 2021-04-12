import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'ghostwhite',
        border: '1px solid lightgray',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}))

function FunctionModal(props) {
    const styles = useStyles()

    // const [modalStyle] = useState(getModalStyle)
    const [open, setOpen] = useState(false)

    function handleClose() {
        setOpen(false)
    }

    return (
        <Modal
            className={styles.paper}
            open={open}
            onClose={handleClose}
        >{props.body}</Modal>
    )

}

export default FunctionModal