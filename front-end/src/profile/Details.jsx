import React from 'react'
import { Link } from 'react-router-dom'

import { accountService } from '../../services/account'

function Details({ match }) {
    const { path } = match
    const user = accountService.userValue

    return (
        <div>
            <h1>My Profile</h1>
            <p>
                <strong>Name: </strong> {user.firstName} {user.lastName}<br/>
                <strong>Email: </strong> {user.email}
            </p>
            <p><Link to={`${path}/update`}>Update Profile</Link></p>
        </div>
    )
}

export default Details