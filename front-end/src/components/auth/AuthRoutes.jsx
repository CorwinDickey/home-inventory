import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { accountService } from '../../services/account'

import Home from '../Home'

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
                        <Home {...props} />
                    )}
                />
            </Switch>
        </div>
    )
}

export default AuthRoutes
