import React, { useState, useEffect } from 'react'
import { bucketService } from '../services/bucket'
import { itemService } from '../services/item'

import {
    Card
} from '@material-ui/core'

function ShowList(props) {
    const [list, setList] = useState()
    // console.log(listSubject)

    useEffect(() => createList(), [])


    function createList() {
        if ( props.listSubject === 'item' ) {
            itemService.getItemsByInventory(props.inventory._id)
                .then(response => setList(response))
            // console.log(list)
        } else {
            bucketService.getBucketsByInventory(props.inventory._id)
                .then(response => setList(response.filter(bucket => bucket.bucketType === props.listSubject)))
            }
    }

    return (
        <Card>
            {list && list.map(item => {
                return <div key={item._id}>{item.name}</div>
            })}
        </Card>
    )
}

export default ShowList
