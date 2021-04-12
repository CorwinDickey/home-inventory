import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { history } from '../../utils/history'

import {
    Button,
    ListItem,
    ListItemText,
    Typography
} from '@material-ui/core'

function ShowList({ listSubject, items, buckets }) {

    function BucketDisplay({ bucketObject, itemsArray }) {
        const [bucketValue, setBucketValue] = useState()

        useEffect(() => {
            getBucketValue(bucketObject)
        },[itemsArray])

        function getBucketValue(bucketObject) {
            const items = itemsArray.filter(item => bucketObject['items'].indexOf(item._id) !== -1)
            setBucketValue(items.reduce((a, b) => a + (b['replacementCost'] || 0),0))
        }

        return (
                <ListItemText primary={bucketObject.name} secondary={`$${bucketValue}`}/>
        )
    }

    if (items) {
        if (listSubject === 'item') {
            return(
                <div>
                    { items.map((x) => (
                        <ListItem
                            button
                            component={Link}
                            key={x._id}
                            to={'/view-item/' + x._id}
                        >
                            <ListItemText primary={x.name} secondary={`$${x.replacementCost * x.quantity}`}/>
                        </ListItem>
                    )) }
                </div>
            )
        } else if (buckets) {
            return(
                <div>
                    { buckets.map((x) => (
                        <ListItem
                            button
                            // component={Link}
                            key={x._id}
                            // to={'/view-item/' + x._id}
                        >
                            <BucketDisplay bucketObject={x} itemsArray={items} />
                        </ListItem>
                    )) }
                </div>
            )
        } else {
            return null
        }
    }
}

export default ShowList
