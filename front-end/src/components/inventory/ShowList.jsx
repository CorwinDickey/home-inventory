import React, { useState, useEffect } from 'react'

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
                <div key={bucketObject._id}>{bucketObject.name} - ${bucketValue}</div>
        )
    }

    if (items) {
        if (listSubject === 'item') {
            return(
                <div>
                    { items.map((x) => (
                        <div key={x._id}>{x.name} - ${x.replacementCost * x.quantity}</div>
                    )) }
                </div>
            )
        } else if (buckets) {
            return(
                <div>
                    { buckets.map((x) => (
                        <BucketDisplay bucketObject={x} itemsArray={items} />
                    ))}
                </div>
            )
        } else {
            return null
        }
    }
}

export default ShowList
