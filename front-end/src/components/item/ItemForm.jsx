import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, makeStyles } from '@material-ui/core'

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

function ItemForm({ itemObject, submitItem, deleteItem }) {
    const [bucketList, setBucketList] = useState([])
    const isAddMode = !itemObject
    const [item, setItem] = useState()
    const location = useLocation()
    const classes = useStyles()

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
                'pictures',
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

        submitItem(data)
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id='page-1'>
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='name'
                            label='Item Name'
                            required={true}
                        />
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='description'
                            label='Item Description'
                            required={true}
                        />
                        <Controls.FormSelect
                            className={classes.inputStyle}
                            name='room'
                            label='Room'
                            options={filterBuckets('room')}
                        />
                        <Controls.FormSelect
                            className={classes.inputStyle}
                            name='category'
                            label='Category'
                            options={filterBuckets('category')}
                        />
                    </div>
                    <div id='page-2'>
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='datePurchased'
                            label='Purchase Date'
                            type='date'
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='quantity'
                            label='Quantity'
                        />
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='purchasePrice'
                            label='Purchase Price'
                        />
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='replacementCost'
                            label='Replacement Cost'
                        />
                        <Controls.FormInput
                            className={classes.inputStyle}
                            name='shipping'
                            label='Shipping'
                        />
                        <Controls.FormInput
                            className={classes.inputStyle}
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
