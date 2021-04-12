import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { accountService } from '../../services/account'
import Dashboard from '../Dashboard'
import AddInventory from '../inventory/AddInventory'
import Details from '../profile/Details'
import AddBucket from '../bucket/AddBucket'
import ViewInventory from '../inventory/ViewInventory'
import ItemForm from '../item/ItemForm'

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
                <Route
                    path='/new-inventory'
                    component={AddInventory}
                />
                <Route
                    path='/view-inventory/:id'
                    component={ViewInventory}
                />
                <Route
                    path={'/view-item/:id'}
                    component={ItemForm}
                />
                <Route
                    path='/profile'
                    component={Details}
                />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}

export default AuthRoutes
