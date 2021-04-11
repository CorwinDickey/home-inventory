import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { itemService } from '../../services/item'
import ShowList from './ShowList'
import { bucketService } from '../../services/bucket'
import {
    Button,
    Card,
    CardContent,
    Typography
} from '@material-ui/core'

function Inventory(props) {
    const [inventory] = useState(props.location.state.inventory)
    const [items, setItems] = useState([])
    const [rooms, setRooms] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getItems()
        getRooms()
        getCategories()
    }, [])

    function getItems() {
        itemService.getItemsByInventory(inventory._id)
            .then(response => setItems(response))
    }

    function getRooms() {
        bucketService.getBucketsByInventory(inventory._id)
            .then(response => setRooms(response.filter(bucket => bucket.bucketType === 'room')))
   }

    function getCategories() {
        bucketService.getBucketsByInventory(inventory._id)
            .then(response => setCategories(response.filter(bucket => bucket.bucketType === 'category')))
    }

    return (
        <div>
            <h1>{inventory.name}</h1>
            <div id='actions'>
                <Link to={{
                    pathname: '/add-item',
                    state: {
                        inventory: inventory
                    }
                }}>
                    <Button>Add Item</Button>
                </Link>
                <Link to={{
                    pathname: '/add-category',
                    state: {
                        inventory: inventory
                    }
                }}>
                    <Button>Create Category</Button>
                </Link>
                <Link to={{
                    pathname: '/add-room',
                    state: {
                        inventory: inventory
                    }
                }}>
                    <Button>Create Room</Button>
                </Link>
            </div>
            <div id='content'>
                <Card>
                    <CardContent>
                        <Typography variant='h2' component='h2'>
                            Items
                        </Typography>
                        <ShowList
                            listSubject='item'
                            items={items}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant='h2' component='h2'>
                            Categories
                        </Typography>
                        <ShowList
                            listSubject='category'
                            items={items}
                            buckets={categories}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant='h2' component='h2'>
                            Rooms
                        </Typography>
                        <ShowList
                            listSubject='room'
                            items={items}
                            buckets={rooms}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Inventory
