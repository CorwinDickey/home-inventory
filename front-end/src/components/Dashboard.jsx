import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Card,
    Typography
} from '@material-ui/core'
import { inventoryService } from '../services/inventory'
import { accountService } from '../services/account'
import { history } from '../utils/history'

function Dashboard() {
    const [ownerInventories, setOwnerInventories] = useState([])
    const [userInventories, setUserInventories] = useState([])
    const user = accountService.userValue
    const location = useLocation()


    useEffect(() => {
        getOwnerInventories()
        getUserInventories()
        history.replace()
    }, [location.pathname])

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
            <div className='container'>
                <div className='my-inventories'>
                    <Typography variant='h1'>
                        My Inventories
                    </Typography>
                    <div className='inventory-list'>
                        {ownerInventories.map((x) => {
                            return (
                                <div className='inventory-card' key={x._id} >
                                    <Link to={{
                                        pathname: `/view-inventory/${x._id}`,
                                        state: {
                                            inventory: x
                                        }
                                    }}>{x.name}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div id='shared-inventories'>
                    <Typography variant='h2'>
                        Shared Inventories
                    </Typography>
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
