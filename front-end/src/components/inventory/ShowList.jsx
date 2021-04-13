import React, { useState, useEffect } from 'react'

import {
    ListItem,
    ListItemText
} from '@material-ui/core'
import Popup from '../Popup'
import BucketForm from '../bucket/BucketForm'
import { bucketService } from '../../services/bucket'

function BucketList({ items, buckets }) {
    const [bucketObject, setBucketObject] = useState()
    const [openPopup, setOpenPopup] = useState(false)

    function BucketDisplay({ bucketObject, itemsArray }) {
        const [bucketValue, setBucketValue] = useState()

        useEffect(() => {
            getBucketValue(bucketObject)
        },[openPopup])

        function getBucketValue(bucketObject) {
            const items = itemsArray.filter(item => bucketObject['items'].indexOf(item._id) !== -1)
            setBucketValue(items.reduce((a, b) => a + (b['replacementCost'] || 0),0))
        }

        return (
                <ListItemText primary={bucketObject.name} secondary={`$${bucketValue}`}/>
        )
    }

    function submitBucket(data) {
        bucketService.updateBucket(bucketObject._id, data)
        setOpenPopup(false)
    }

    if (items) {
        return(
            <div>
                { buckets.map((x) => (
                    <ListItem
                        key={x._id}
                        button
                        onClick={()=>{
                            setBucketObject(x)
                            setOpenPopup(true)
                        }}
                    >
                        <BucketDisplay bucketObject={x} itemsArray={items} />
                    </ListItem>
                )) }
                <Popup
                    title={bucketObject ? `Edit ${bucketObject.name}` : null}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <BucketForm
                        bucketType={bucketObject ? bucketObject.bucketType : null}
                        bucketObject={bucketObject}
                        submitBucket={submitBucket}
                    />
                </Popup>
            </div>
        )
    } else { return null }
}

export default BucketList
