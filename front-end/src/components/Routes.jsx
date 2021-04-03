import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

function Routes() {
    return (
        <div>
            <Switch>
                <Route path='/' exact
                    render={(props) => (
                        <Dashboard {...props} />
                    )}
                />
            </Switch>
        </div>
    )
}

export default Routes
