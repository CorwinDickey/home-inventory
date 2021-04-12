import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'
import { accountService } from '../../services/account'
import { itemService } from '../../services/item'
// import { alertService } from '../../services/alert'
import { history } from '../../utils/history'
import FormSelect from '../form-controls/FormSelect'
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

function ItemForm({ itemObject, closeModal }) {
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
        console.log('testing itemForm update')
        return itemService.updateItem(id, data)
    }

    function createItem(data) {
        itemService.createItem(data)
            .then(response => {
                addItemToBuckets(response)
            })
    }

    function addItemToBuckets(data) {
        
        function pushToBucket(bucket) {
            bucket['items'].push(data._id)
            console.log('logging bucket', bucket)
            return bucket
        }

        bucketService.getBucket(data.room)
            .then(room => pushToBucket(room))
            .then(room => bucketService.updateBucket(room._id, room))

        bucketService.getBucket(data.category)
            .then(category => pushToBucket(category))
            .then(category => bucketService.updateBucket(category._id, category))

        // for (const bucketId of data.buckets) {
        //     bucketService.getBucket(bucketId)
        //         .then(bucket => pushToBucket(bucket))
        //         .then(bucket => bucketService.updateBucket(bucket._id, bucket))
        // }
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='page-1'>
                        <FormInput
                            name='name'
                            label='Item Name'
                            required={true}
                        />
                        <FormInput
                            name='description'
                            label='Item Description'
                            required={true}
                        />
                        <FormSelect
                            name='room'
                            label='Room'
                            options={filterBuckets('room')}
                        />
                        <FormSelect
                            name='category'
                            label='Category'
                            options={filterBuckets('category')}
                        />
                    </div>
                    <div id='page-2'>
                        <FormInput
                            name='datePurchased'
                            label='Purchase Date'
                            type='date'
                            defaultValue=''
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <FormInput
                            name='quantity'
                            label='Quantity'
                        />
                        <FormInput
                            name='purchasePrice'
                            label='Individual Purchase Price'
                        />
                        <FormInput
                            name='replacementCost'
                            label='Individual Replacement Cost'
                        />
                        <FormInput
                            name='shipping'
                            label='Shipping'
                        />
                        <FormInput
                            name='taxRate'
                            label='Sales Tax Rate'
                        />
                    </div>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >{ isAddMode ? 'Add Item' : 'Update Item'}</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default ItemForm
