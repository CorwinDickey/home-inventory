import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchWrapper } from '../utils/fetch-wrapper'
import { history } from '../utils/history'

import { Button } from '@material-ui/core'

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
                        <div>
                            <Link key={x._id} to={{
                                pathname: '/view-inventory',
                                state: {
                                    inventory: x
                                }
                            }}
                            >{x.name}</Link>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Dashboard
