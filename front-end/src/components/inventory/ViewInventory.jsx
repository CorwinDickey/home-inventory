import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { itemService } from '../../services/item'
import ShowList from './ShowList'
import ItemForm from '../item/ItemForm'
import BucketForm from '../bucket/BucketForm'
import { bucketService } from '../../services/bucket'
import { inventoryService } from '../../services/inventory'
import {
    Button,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core'
import Popup from '../Popup'

function ViewInventory() {
    const { id } = useParams()
    const [items, setItems] = useState([])
    const [rooms, setRooms] = useState([])
    const [categories, setCategories] = useState([])

    const [openItemPopup, setOpenItemPopup] = useState(false)
    const [itemObject, setItemObject] = useState()

    const [openBucketPopup, setOpenBucketPopup] = useState(false)
    const [bucketObject, setBucketObject] = useState()
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
    
    function toTitleCase(string) {
        return string.replace(
            /\w\S*/g,
            function(text) {
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
            }
        )
    }

    function submitItem(data) {
        if (itemObject) {
            itemService.updateItem(itemObject._id, data)
        } else {
            itemService.createItem(data)
        }
        setOpenItemPopup(false)
    }

    function submitBucket(data) {
        if (bucketObject) {
            bucketService.updateBucket(bucketObject._id, data)
                .then(response => addBucketToInventory(response))
        } else {
            bucketService.createBucket(data)
                .then(response => addBucketToInventory(response))
        }
        setOpenBucketPopup(false)
    }

    function addBucketToInventory(data) {
        
        function pushToInventory(inventory) {
            inventory['buckets'].push(data._id)
            return inventory
        }

        inventoryService.getInventory(data.inventory)
            .then(inventory => pushToInventory(inventory))
            .then(inventory => inventoryService.updateInventory(inventory._id, inventory))
    }


    return (
        <div className='container'>
            <div className='inventory-content'>
                <div className='list'>
                    <div className='list-header'>
                        <Typography color='primary' variant='h3'>
                            Items
                        </Typography>
                        <Button
                            variant='outlined'
                            color='primary'
                            onClick={()=>{
                                setItemObject(null)
                                setOpenItemPopup(true);
                            }}
                        >Add Item</Button>
                    </div>
                    <div className='list-body'>
                        <List>
                            { items.map((x) => (
                                <ListItem
                                    key={x._id}
                                    button
                                    onClick={()=>{
                                        setItemObject(x);
                                        setOpenItemPopup(true)
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
                            onClick={()=>{
                                setBucketObject(null);
                                setBucketType('category');
                                setOpenBucketPopup(true)
                            }}
                        >Create Category</Button>
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
                            onClick={()=>{
                                setBucketObject(null)
                                setBucketType('room');
                                setOpenBucketPopup(true)
                            }}
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
            <Popup id='item-popup'
                title={itemObject ? `Edit ${itemObject.name}` : 'New Item'}
                openPopup={openItemPopup}
                setOpenPopup={setOpenItemPopup}
            >
                <ItemForm
                    itemObject={itemObject}
                    submitItem={submitItem}
                />
            </Popup>
            <Popup id='bucket-popup'
                title={bucketType && `New ${toTitleCase(bucketType)}`}
                openPopup={openBucketPopup}
                setOpenPopup={setOpenBucketPopup}
            >
                <BucketForm
                    bucketType={bucketType}
                    bucketObject={null}
                    submitBucket={submitBucket}
                />
            </Popup>
        </div>
    )
}

export default ViewInventory
