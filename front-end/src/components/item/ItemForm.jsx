import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import Controls from '../form-controls'
import { accountService } from '../../services/account'
import { itemService } from '../../services/item'
// import { alertService } from '../../services/alert'
import { history } from '../../utils/history'
import { bucketService } from '../../services/bucket'

// const validationSchema = yup.object().shape({
//     name: yup.string()
//         .required('Name is required'),
//     description: yup.string()
//         .required('Description is required'),
//     datePurchased: yup.date(),
//     purchasePrice: yup.number(),
//     replacementCost: yup.number(),
//     shipping: yup.number(),
//     quantity: yup.number(),
//     taxRate: yup.number(),
//     buckets: yup.string(),
//     inventory: yup.string(),
//     creator: yup.string()
// })

function ItemForm({ itemObject }) {
    const [bucketList, setBucketList] = useState([])
    const isAddMode = !itemObject
    const [item, setItem] = useState()
    const location = useLocation()

    const methods = useForm()
    const { handleSubmit, setValue } = methods

    useEffect(() => getBuckets(), [])

    useEffect(() => {
        if (!isAddMode) {
            const fields = [
                'name',
                'description',
                'datePurchased',
                'purchasePrice',
                'replacementCost',
                'shipping',
                'quantity',
                'taxRate',
                'room',
                'category'
            ]
            fields.forEach(field => setValue(field, itemObject[field]))
            setItem(item)
        }
    },[])


    const user = accountService.userValue

    function getBuckets() {
        bucketService.getBucketsByInventory(location.state.inventory._id)
            .then(response => setBucketList(response))
    }

    function filterBuckets(bucketType) {
        const filteredBuckets = bucketList.filter(bucket => bucket.bucketType === bucketType)
        return filteredBuckets
    }

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            description: formData.description,
            datePurchased: formData.datePurchased,
            purchasePrice: formData.purchasePrice,
            replacementCost: formData.replacementCost,
            shipping: formData.shipping,
            quantity: formData.quantity,
            taxRate: formData.taxRate,
            room: formData.room,
            category: formData.category,
            inventory: location.state.inventory._id,
            creator: user.id
        }

        return isAddMode
            ? createItem(data)
            : updateItem(itemObject._id, data)
    }

    function updateItem(id, data) {
        if (data.room !== itemObject.room) {
            removeItemFromBucket(itemObject.room)
            addItemToBucket(data.room, itemObject._id)
        }
        if (data.category !== itemObject.category) {
            removeItemFromBucket(itemObject.category)
            addItemToBucket(data.category, itemObject._id)
        }
        return itemService.updateItem(id, data)
    }

    function createItem(data) {
        itemService.createItem(data)
            .then(response => {
                addItemToBuckets(response)
            })
    }

    function deleteItem() {
        itemService.deleteItem(itemObject._id)
    }

    function spliceItemFromBucket(bucket) {
        const itemIndex = bucket.items.indexOf(itemObject._id)
        bucket.items.splice(itemIndex, 1)
        bucketService.updateBucket(bucket._id, bucket)
    }

    function removeItemFromBucket(bucketId) {
        bucketService.getBucket(bucketId)
            .then(bucket => spliceItemFromBucket(bucket))
    }
        
    function pushItemToBucket(bucket, itemId) {
        bucket['items'].push(itemId)
        bucketService.updateBucket(bucket._id, bucket)
    }

    function addItemToBucket(bucketId, itemId) {
        bucketService.getBucket(bucketId)
            .then(bucket => pushItemToBucket(bucket, itemId))
    }

    function addItemToBuckets(item) {
        bucketService.getBucket(item.room)
            .then(room => pushItemToBucket(room, item._id))
            // .then(room => bucketService.updateBucket(room._id, room))

        bucketService.getBucket(item.category)
            .then(category => pushItemToBucket(category, item._id))
            // .then(category => bucketService.updateBucket(category._id, category))
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='page-1'>
                        <Controls.FormInput
                            name='name'
                            label='Item Name'
                            required={true}
                        />
                        <Controls.FormInput
                            name='description'
                            label='Item Description'
                            required={true}
                        />
                        <Controls.FormSelect
                            name='room'
                            label='Room'
                            options={filterBuckets('room')}
                        />
                        <Controls.FormSelect
                            name='category'
                            label='Category'
                            options={filterBuckets('category')}
                        />
                    </div>
                    <div id='page-2'>
                        <Controls.FormInput
                            name='datePurchased'
                            label='Purchase Date'
                            type='date'
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <Controls.FormInput
                            name='quantity'
                            label='Quantity'
                        />
                        <Controls.FormInput
                            name='purchasePrice'
                            label='Individual Purchase Price'
                        />
                        <Controls.FormInput
                            name='replacementCost'
                            label='Individual Replacement Cost'
                        />
                        <Controls.FormInput
                            name='shipping'
                            label='Shipping'
                        />
                        <Controls.FormInput
                            name='taxRate'
                            label='Sales Tax Rate'
                        />
                    </div>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >{ isAddMode ? 'Add Item' : 'Update Item'}</Button>
                    { isAddMode ? null : 
                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={deleteItem}
                        >Delete Item</Button>
                    }
                </form>
            </FormProvider>
        </div>
    )
}

export default ItemForm
