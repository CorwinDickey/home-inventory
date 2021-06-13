import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Login } from '../account/Login'
import { Register } from '../account/Register'
import { ForgotPassword } from '../account/ForgotPassword'
import { ResetPassword } from '../account/ResetPassword'

function UnauthRoutes(props) {

    return (
        <div>
            <Switch>
                <Route
                    path='/' exact
                    component={Login}
                />
                <Route
                    path='/register'
                    component={Register}
                />
                <Route
                    path='/forgot-password'
                    component={ForgotPassword}
                />
                <Route
                    path='/reset-password'
                    component={ResetPassword}
                />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}

export default UnauthRoutes
