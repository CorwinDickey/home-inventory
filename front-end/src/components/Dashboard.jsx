import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchWrapper } from '../utils/fetch-wrapper'
import { history } from '../utils/history'

import {
    Card,
    Button
} from '@material-ui/core'

function Dashboard() {
    const [inventoryList, setInventoryList] = useState([])

    useEffect(() => getInventories(), [])

    function getInventories() {
        fetchWrapper.get('/inventory')
        .then(response => {
            setInventoryList(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div>
            <Button
                variant='outlined'
                color='primary'
                onClick={() => history.push('/new-inventory')}
            >New Inventory</Button>
            {inventoryList.map((x) => {
                if (x) {
                    return (
                        <Card>
                            <Link key={x._id} to={{
                                pathname: '/view-inventory',
                                state: {
                                    inventory: x
                                }
                            }}
                            >{x.name}</Link>
                        </Card>
                    )
                }
            })}
        </div>
    )
}

export default Dashboard
