import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { itemService } from '../../services/item'
import ShowList from './ShowList'
import FunctionModal from '../Modal'
import ItemForm from '../item/ItemForm'
import AddBucket from '../bucket/AddBucket'
import BucketDialog from '../bucket/BucketDialog'
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
    const [showBucketDialog, setShowBucketDialog] = useState(false)
    const [bucketType, setBucketType] = useState()

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

    function toggleBucketDialog() {
        setShowBucketDialog(!showBucketDialog)
    }

    return (
        <div className='container'>
            <BucketDialog showModal={showBucketDialog} toggle={toggleBucketDialog} bucketType={bucketType} />
            <div className='inventory-content'>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Items
                        </Typography>
                        <Button
                            variant='outlined'
                            color='primary'
                            // onClick={ () => {
                            //     setModalBody(<ItemForm/>);
                            //     toggleModal()
                            // }}
                        >Add Item</Button>
                    </div>
                    <div className='list-body'>
                        <List>
                            { items.map((x) => (
                                <ListItem
                                    key={x._id}
                                    button
                                    // onClick={ () => {
                                    //     setModalBody(<ItemForm itemObject={x} closeModal={() => toggleModal()} />);
                                    //     toggleModal()
                                    // }}
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
                                setBucketType('category');
                                toggleBucketDialog();
                            }}
                        >Create Category</Button>
                        {/* <AddBucket bucketType='category' closeModal={() => {toggleModal(!openModal)}} /> */}
                    </div>
                    <div className='list-body'>
                        <List>
                            <ShowList
                                items={items}
                                buckets={categories}
                            />
                        </List>
                    </div>
                </div>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Rooms
                        </Typography>
                        <Button
                            variant='outlined'
                            color='primary'
                            // onClick={ () => {
                            //     setModalBody(<AddBucket bucketType='room' closeModal={toggleModal} />);
                            //     toggleModal()
                            // }}
                        >Create Room</Button>
                    </div>
                    <div className='list-body'>
                        <List>
                            <ShowList
                                items={items}
                                buckets={rooms}
                            />
                        </List>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewInventory
