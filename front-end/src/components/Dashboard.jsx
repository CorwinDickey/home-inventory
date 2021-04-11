import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { history } from '../utils/history'

import {
    Card,
    Button
} from '@material-ui/core'
import { inventoryService } from '../services/inventory'
import { accountService } from '../services/account'

function Dashboard() {
    const [ownerInventories, setOwnerInventories] = useState([])
    const [userInventories, setUserInventories] = useState([])
    const user = accountService.userValue

    useEffect(() => {
        console.log('testing useEffect')
        getOwnerInventories()
        getUserInventories()
    }, [])

    function getOwnerInventories() {
        inventoryService.getInventoriesByAccount(user.id)
            .then(response => setOwnerInventories(response.ownerInventories))
    }

    function getUserInventories() {
        inventoryService.getInventoriesByAccount(user.id)
            .then(response => setUserInventories(response.userInventories))
    }

    if (ownerInventories) {
        return(
            <div>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => history.push('/new-inventory')}
                >New Inventory</Button>
                <div id='my-inventories'>
                    <h1>My Inventories</h1>
                    {ownerInventories.map((x) => {
                        return (
                            <Card>
                                <Link key={x._id} to={{
                                    pathname: '/view-inventory',
                                    state: {
                                        inventory: x
                                    }
                                }}>{x.name}</Link>
                            </Card>
                        )
                    })}
                </div>
                <div id='shared-inventories'>
                    <h2>Shared Inventories</h2>
                    {userInventories.map((x) => {
                        return (
                            <Card>
                                <Link key={x._id} to={{
                                    pathname: '/view-inventory',
                                    state: {
                                        inventory: x
                                    }
                                }}>{x.name}</Link>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Dashboard
