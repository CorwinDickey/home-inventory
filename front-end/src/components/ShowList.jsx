import React, { useState, useEffect } from 'react'
// import { bucketService } from '../services/bucket'

import {
    Card
} from '@material-ui/core'

function ShowList({ listSubject, items, buckets }) {
    // console.log(buckets)

    function BucketDisplay({ bucketObject, itemsArray }) {
        const [bucketValue, setBucketValue] = useState()

        useEffect(() => {
            // console.log('logging bucket object', bucketObject)
            // console.log('testing getBucketValue useEffect')
            getBucketValue(bucketObject)
        },[itemsArray])

        function getBucketValue(bucketObject) {
            const items = itemsArray.filter(item => bucketObject['items'].indexOf(item._id) !== -1)
            setBucketValue(items.reduce((a, b) => a + (b['replacementCost'] || 0),0))
        }

        return (
                <div>{bucketObject.name} - ${bucketValue}</div>
        )
    }

    // console.log(props.listSubject === 'item', props.listSubject)

    if (items) {
        if (listSubject === 'item') {
            return(
                <Card>
                    { items.map((x) => (
                        <div>{x.name} - ${x.replacementCost * x.quantity}</div>
                    )) }
                </Card>
            )
        } else if (buckets) {
            return(
                <Card>
                    { buckets.map((x) => (
                        <BucketDisplay bucketObject={x} itemsArray={items} />
                    ))}
                </Card>
            )
        } else {
            return null
        }
    }
}

export default ShowList
