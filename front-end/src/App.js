import React, { useState, useEffect } from 'react'
import { Switch, Route, useLocation, Redirect } from 'react-router-dom'

import Alert from './_components/Alert'
import PrivateRoute from './_components/PrivateRoute'
import Dashboard from './Dashboard'
import { Account } from './account'
import { accountService } from './_services/account'


function App() {
    const { pathname } = useLocation()
    const [user, setUser] = useState({})

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x))
        return subscription.unsubscribe
    }, [])

    return (
        <div>
            <Alert />
            <Switch>
                <Redirect from='/:url*(/+)' to={pathname.slice(0, -1)} />
                <PrivateRoute exact path='/' component={Dashboard} />
                {/* <PrivateRoute path='/profile' component={Profile} /> */}
                <Route path='/account' component={Account} />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}

export default App
