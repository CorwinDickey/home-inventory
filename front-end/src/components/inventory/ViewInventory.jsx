import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@material-ui/core'
import { bucketService } from '../../services/bucket'
import { itemService } from '../../services/item'
import ShowList from '../ShowList'

function Inventory(props) {
    const [inventory, setInventory] = useState(props.location.state.inventory)
    const [bucketList, setBucketList] = useState([])
    const [rooms, setRooms] = useState([])
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])

    // useEffect(() => {
    //     console.log('testing')
    //     bucketService.getAllBuckets()
    //         .then(response => setBuckets(response))
    //         .then(response => splitBuckets(response))
    //     itemService.getAllItems()
    //         .then(response => {setItems(response)})
    //     // splitBuckets()
    // }, [])

    // function getBuckets() {
    //     bucketService.getAllBuckets()
    //         // .then(response => console.log(response))
    //         .then(response => setBucketList(response))
    // }

    // function setBuckets(data) {
    //     setBucketList(data)
    //     return bucketList
    // }

    // function splitBuckets() {
    //     setRooms(bucketList.filter(bucket => bucket.bucketType === 'room'))
    //     setCategories(bucketList.filter(bucket => bucket.bucketType === 'category'))
    // }

    // function getItems() {
    //     itemService.getAllItems()
    //         .then(response => setItems(response))
    // }

    // console.log('testing')

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
                    <ShowList listSubject='item' inventory={inventory} />
                </div>
                <div id='categories'>
                    <ShowList listSubject='category' inventory={inventory} />
                </div>
                <div id='rooms'>
                    <ShowList listSubject='room' inventory={inventory} />
                </div>
            </div>
        </div>
    )
}

export default Inventory
