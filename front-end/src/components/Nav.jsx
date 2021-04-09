import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { Role } from '../utils/role'
import { accountService } from '../services/account'

function Nav() {

    return (
        <div>
            <nav>
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                <NavLink to='/add-item'>Add Item</NavLink>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={accountService.logout}
                >Logout</Button>
            </nav>
        </div>
    )
}

export default Nav