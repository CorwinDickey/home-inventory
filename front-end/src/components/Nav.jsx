import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
    Button,
    Typography
} from '@material-ui/core'

import { accountService } from '../services/account'

function Nav() {

    const user = accountService.userValue
    const location = useLocation()
    
    return (
        <div className='nav'>
            <div className='nav-header'>
                { location.state ? <Typography variant='h2'>{location.state.inventory.name}</Typography> : <Typography variant='h2'>{user.firstName}'s Dashboard</Typography>}
            </div>
            <div className='nav-actions'>
                
                <Button
                    className='nav-button'
                    variant='contained'
                    color='primary'
                    disableElevation
                    component={NavLink}
                    to='/'

                >Dashboard</Button>
                <Button
                    className='nav-button'
                    variant='outlined'
                    color='primary'
                    component={NavLink}
                    to='/profile'
                >Profile</Button>
                <Button
                    className='nav-button'
                    variant='outlined'
                    color='primary'
                    onClick={accountService.logout}
                >Logout</Button>
            </div>
        </div>
    )
}

export default Nav