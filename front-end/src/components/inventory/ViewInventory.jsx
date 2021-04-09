import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { history } from '../../utils/history'

import { Button } from '@material-ui/core'

function Inventory(props) {
    const [inventory, setInventory] = useState(props.location.state.inventory)

    return (
        <div>
            <h1>{inventory.name}</h1>
            <Link to={{
                pathname: '/add-room',
                state: {
                    inventory: inventory
                }
            }}>
                <Button>Create Room</Button>
            </Link>
            <Link to={{
                pathname: '/add-category',
                state: {
                    inventory: inventory
                }
            }}>
                <Button>Create Category</Button>
            </Link>
        </div>
    )
}

export default Inventory
