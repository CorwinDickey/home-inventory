import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, Redirect } from 'react-router-dom'
import {
    Button,
    Typography
} from '@material-ui/core'

import Popup from './Popup'
import InventoryForm from './inventory/InventoryForm'
import { accountService } from '../services/account'
import { inventoryService } from '../services/inventory'

function Nav() {
    const [openPopup, setOpenPopup] = useState(false)
    const location = useLocation()

    function submitInventory(data) {
        if (location.state) {
            inventoryService.updateInventory(location.state.inventory._id, data)
        } else {
            inventoryService.createInventory(data)
        }
        setOpenPopup(false)
    }

    return (
        <div className='nav'>
            <div className='nav-header'>
                { location.state ? <Typography variant='h2'>{location.state.inventory.name}</Typography> : <Typography variant='h2'>Dashboard</Typography>}
            </div>
            <div className='nav-actions'>
                <Button
                    variant='contained'
                    color='primary'
                    disableElevation
                    component={NavLink}
                    to='/'
                >Dashboard</Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={()=>setOpenPopup(true)}
                >{ location.state ? 'Edit Inventory' : 'New Inventory' }</Button>
                <Button
                    component={NavLink}
                    to='/profile'
                >Profile</Button>
                <Button
                    onClick={accountService.logout}
                >Logout</Button>
            </div>
            <Popup
                title={ location.state ? 'Edit Inventory' : 'New Inventory' }
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <InventoryForm
                    submitInventory={submitInventory}
                    inventoryObject={ location.state ? location.state.inventory : null}
                />
            </Popup>
        </div>
    )
}

export default Nav