import React, { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'

import { itemService } from '../../services/item'
import ShowList from './ShowList'
import FunctionModal from '../Modal'
import ItemForm from '../item/ItemForm'
import AddBucket from '../bucket/AddBucket'
import useModal from '../../hooks/useModal'
import { bucketService } from '../../services/bucket'
import {
    Button,
    Typography,
    List
} from '@material-ui/core'

function ViewInventory() {
    // const [inventory] = useState(props.location.state.inventory)
    const { id } = useParams()
    const [items, setItems] = useState([])
    const [rooms, setRooms] = useState([])
    const [categories, setCategories] = useState([])
    const { open, toggle } = useModal()
    const [modalBody, setModalBody] = useState()

    // const location = useLocation()
    // const inventory = location.state.inventory


    useEffect(() => {
        getItems()
        getRooms()
        getCategories()
    }, [])

    function getItems() {
        itemService.getItemsByInventory(id)
            .then(response => setItems(response))
    }

    function getRooms() {
        bucketService.getBucketsByInventory(id)
            .then(response => setRooms(response.filter(bucket => bucket.bucketType === 'room')))
   }

    function getCategories() {
        bucketService.getBucketsByInventory(id)
            .then(response => setCategories(response.filter(bucket => bucket.bucketType === 'category')))
    }

    return (
        <div className='container'>
            <FunctionModal
                open={open}
                close={toggle}
                body={modalBody}
            />
            <div className='inventory-content'>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Items
                        </Typography>
                        {/* <Button variant='outlined' color='primary' component={Link} to={{
                            pathname: '/add-item',
                            state: {
                                inventory: inventory
                            }
                        }}>Add Item</Button> */}
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                                setModalBody(<ItemForm/>);
                                toggle()
                            }}
                        >Open Item Modal</Button>
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
                        {/* <Button variant='outlined' color='primary' component={Link} to={{
                            pathname: '/add-category',
                            state: {
                                inventory: inventory
                            }
                        }}>Create Category</Button> */}
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                                setModalBody(<AddBucket bucketType='category' closeModal={toggle} />);
                                toggle()
                            }}
                        >Open Category Modal</Button>
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
                        {/* <Button variant='outlined' color='primary' component={Link} to={{
                            pathname: '/add-room',
                            state: {
                                inventory: inventory
                            }
                        }}>Create Room</Button> */}
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                                setModalBody(<AddBucket bucketType='room' closeModal={toggle} />);
                                toggle()
                            }}
                        >Open Room Modal</Button>
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

export default ViewInventory
