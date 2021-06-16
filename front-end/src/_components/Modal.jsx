import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactDom from 'react-dom'
import { Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid lightgray',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}))

function getModalStyle() {
    return(
        {
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`
        }
    )
}

// const modalStyle = {
//     top: '50%',
//     left: '50%',
//     transform: `translate(-50%, -50%)`
// }


function FunctionModal({ showModal, close, body }) {
    const styles = useStyles()
    const [modalStyle] = useState(getModalStyle)
    // console.log('logging FunctionModal', showModal)

    if (showModal) {
        return (
            ReactDom.createPortal(
                <React.Fragment>
                        <Modal
                            open={showModal}
                            onClose={close}
                        >
                            <div style={modalStyle} className={styles.paper}>
                                {body}
                            </div>
                        </Modal>
                </React.Fragment>, document.body
            )
        )
    } else {
        return null
    }
}

    
    
    
    
    
    
//     const styles = useStyles()

//     // const [modalStyle] = useState(getModalStyle)
//     const [open, setOpen] = useState(false)

//     function handleOpen() {
//         setOpen(true)
//     }

//     function handleClose() {
//         setOpen(false)
//     }

//     return (
//     )

// }

export default FunctionModal