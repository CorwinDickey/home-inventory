import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { itemService } from '../../services/item'
import ShowList from './ShowList'
import FunctionModal from '../Modal'
import { bucketService } from '../../services/bucket'
import {
    Button,
    Typography,
    List
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
        <div className='container'>
            <div className='inventory-content'>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Items
                        </Typography>
                        <Button variant='outlined' color='primary' component={Link} to={{
                            pathname: '/add-item',
                            state: {
                                inventory: inventory
                            }
                        }}>Add Item</Button>
                        <Button >Open Modal</Button>
                    </div>
                    <div className='list-body'>
                        <List>
                            <ShowList
                                listSubject='item'
                                items={items}
                            />
                        </List>
                    </div>
                </div>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Categories
                        </Typography>
                        <Button variant='outlined' color='primary' component={Link} to={{
                            pathname: '/add-category',
                            state: {
                                inventory: inventory
                            }
                        }}>Create Category</Button>
                    </div>
                    <List>
                        <ShowList
                            listSubject='category'
                            items={items}
                            buckets={categories}
                        />
                    </List>
                </div>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Rooms
                        </Typography>
                        <Button variant='outlined' color='primary' component={Link} to={{
                            pathname: '/add-room',
                            state: {
                                inventory: inventory
                            }
                        }}>Create Room</Button>
                    </div>
                    <List>
                        <ShowList
                            listSubject='room'
                            items={items}
                            buckets={rooms}
                        />
                    </List>
                </div>
            </div>
        </div>
    )
}

export default Inventory
