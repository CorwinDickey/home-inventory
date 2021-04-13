import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Card
} from '@material-ui/core'
import { inventoryService } from '../services/inventory'
import { accountService } from '../services/account'

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

function Dashboard() {
    const [ownerInventories, setOwnerInventories] = useState([])
    const [userInventories, setUserInventories] = useState([])
    const user = accountService.userValue

    useEffect(() => {
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
                <div id='my-inventories'>
                    <h1>My Inventories</h1>
                    {ownerInventories.map((x) => {
                        return (
                            <Card key={x._id}>
                                <Link to={{
                                    pathname: `/view-inventory/${x._id}`,
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
