import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { accountService } from '../../services/account'

import Dashboard from '../Dashboard'

function AuthRoutes() {
    const user = accountService.userValue

    if(!user) {
        return null
    }

    return (
        <div>
            <Switch>
                <Route
                    path='/' exact
                    render={(props) => (
                        <Dashboard {...props} />
                    )}
                />
            </Switch>
        </div>
    )
}

export default AuthRoutes
