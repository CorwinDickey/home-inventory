import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { accountService } from '../services/account'

function Nav(props) {
    const user = props.user

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
                <Profile />
                <a onClick={accountService.logout}>Logout</a>
            </nav>
        </div>
    )
}

export default Nav