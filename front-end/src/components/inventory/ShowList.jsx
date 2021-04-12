import React, { useState, useEffect } from 'react'

import {
    ListItem,
    ListItemText
} from '@material-ui/core'

function BucketList({ items, buckets }) {

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
    } else { return null }
}

export default BucketList
