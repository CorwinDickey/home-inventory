import React, { useState, useLocation } from 'react'

import { Button } from '@material-ui/core'

function Inventory(props) {
    const [inventory, setInventory] = useState(props.location.state.inventory)

    return (
        <div>
            <h1>{inventory.name}</h1>
            <Button
            
            >Create Room</Button>
            <Button

            >Create Category</Button>
        </div>
    )
}

export default Inventory
