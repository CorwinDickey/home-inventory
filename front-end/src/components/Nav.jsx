import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { accountService } from '../services/account'

function Nav() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x))
        return subscription.unsubscribe
    }, [])

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