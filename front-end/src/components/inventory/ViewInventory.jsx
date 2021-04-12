import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { itemService } from '../../services/item'
import ShowList from './ShowList'
import FunctionModal from '../Modal'
import ItemForm from '../item/ItemForm'
import AddBucket from '../bucket/AddBucket'
import { bucketService } from '../../services/bucket'
import {
    Button,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core'

function ViewInventory() {
    const { id } = useParams()
    const [items, setItems] = useState([])
    const [rooms, setRooms] = useState([])
    const [categories, setCategories] = useState([])
    const [openModal, toggleModal] = useState()
    const [modalBody, setModalBody] = useState()

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

    function flipModal() {
        toggleModal(!openModal)
    }

    return (
        <div className='container'>
            <FunctionModal
                open={openModal}
                close={flipModal}
                body={modalBody}
            />
            <div className='inventory-content'>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Items
                        </Typography>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                                setModalBody(<ItemForm/>);
                                flipModal()
                            }}
                        >Add Item</Button>
                    </div>
                    <div className='list-body'>
                        <List>
                            { items.map((x) => (
                                <ListItem
                                    key={x._id}
                                    button
                                    onClick={ () => {
                                        setModalBody(<ItemForm itemObject={x} closeModal={flipModal} />);
                                        flipModal()
                                    }}
                                >
                                    <ListItemText primary={x.name} secondary={`$${x.replacementCost}`} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Categories
                        </Typography>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                                setModalBody(<AddBucket bucketType='category' toggleModal={toggleModal} openModal={openModal} />);
                                flipModal()
                            }}
                        >Create Category</Button>
                        {/* <AddBucket bucketType='category' closeModal={() => {toggleModal(!openModal)}} /> */}
                    </div>
                    <List>
                        <ShowList
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
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={ () => {
                                setModalBody(<AddBucket bucketType='room' closeModal={flipModal} />);
                                flipModal()
                            }}
                        >Create Room</Button>
                    </div>
                    <List>
                        <ShowList
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
