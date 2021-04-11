import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@material-ui/core'
import { itemService } from '../../services/item'
import ShowList from './ShowList'
import { bucketService } from '../../services/bucket'

function Inventory(props) {
    const [inventory] = useState(props.location.state.inventory)
    const [items, setItems] = useState([])
    const [rooms, setRooms] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // console.log('logging inventory', inventory)
        getItems()
        getRooms()
        getCategories()
    }, [])

    function getItems() {
        // console.log('testing getItems')
        itemService.getItemsByInventory(inventory._id)
            .then(response => setItems(response))
    }

    function getRooms() {
        // console.log('testing getRooms')
        bucketService.getBucketsByInventory(inventory._id)
            // .then(response => console.log('logging rooms', response))
            .then(response => setRooms(response.filter(bucket => bucket.bucketType === 'room')))
            // .then(() => console.log(rooms))
    }

    function getCategories() {
        // console.log('testing getCategories')
        bucketService.getBucketsByInventory(inventory._id)
            // .then(response => console.log('logging categories', response))
            .then(response => setCategories(response.filter(bucket => bucket.bucketType === 'category')))
            // .then(() => console.log(categories))
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
                <div id='items'>
                    <h3>Items</h3>
                    <ShowList
                        listSubject='item'
                        items={items}
                    />
                </div>
                <div id='categories'>
                <h3>Categories</h3>
                    <ShowList
                        listSubject='category'
                        items={items}
                        buckets={categories}
                    />
                </div>
                <div id='rooms'>
                <h3>Rooms</h3>
                    <ShowList
                        listSubject='room'
                        items={items}
                        buckets={rooms}
                    />
                </div>
            </div>
        </div>
    )
}

export default Inventory
