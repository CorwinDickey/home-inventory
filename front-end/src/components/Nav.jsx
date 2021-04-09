import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { Role } from '../utils/role'
import { accountService } from '../services/account'

function Nav() {
    const user = accountService.userValue

    if (!user) {
        return null
    }

    return (
        <div>
            <nav>
                <NavLink exact to='/'>Home</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
                {user.role === Role.Owner && 
                    <NavLink to ='/owner'>Owner</NavLink>
                }
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