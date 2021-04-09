import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'
import { accountService } from '../../services/account'
// import { itemService } from '../../services/item'
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

function AddItem(props) {
    const [bucketList, setBucketList] = useState([])

    const methods = useForm()

    useEffect(() => getBuckets(), [])

    const { handleSubmit } = methods

    const user = accountService.userValue

    function getBuckets() {
        bucketService.getAllBuckets()
            .then(response => setBucketList(response))
    }

    function filterBuckets(bucketType) {
        const filteredBuckets = bucketList.filter(bucket => bucket.bucketType === bucketType)
        return filteredBuckets
    }

        function defaultDate() {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm =  String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = String(today.getFullYear())

        const defaultDate = yyyy + '-' + mm + '-' + dd
        return defaultDate
    }

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            description: formData.description,
            datePurchased: formData.datePurchased,
            purchasedPrice: formData.purchasePrice,
            replacementCost: formData.replacementCost,
            shipping: formData.shipping,
            quantity: formData.quantity,
            taxRate: formData.taxRate,
            buckets: [formData.room, formData.category],
            inventory: props.location.state.inventory._id,
            creator: user._id
        }

        console.log(data)

        // itemService.createItem(data)
        //     .then(() => {
        //         alertService.success('Your item has been created')
        //         history.goBack()
        //     })
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
                            defaultValue={defaultDate()}
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
                    >Add Item</Button>
                    <Button
                        variant='text'
                        color='primary'
                        onClick={() => history.goBack()}
                    >Cancel</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddItem
