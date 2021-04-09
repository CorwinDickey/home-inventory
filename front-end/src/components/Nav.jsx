import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { accountService } from '../services/account'

function Nav() {

    return (
        <div>
            <nav>
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
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