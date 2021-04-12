import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import FormInput from '../form-controls/FormInput'

import { bucketService } from '../../services/bucket'
import { history } from '../../utils/history'
import { inventoryService } from '../../services/inventory'


function AddBucket(props) {
    const methods = useForm()

    const { handleSubmit, errors } = methods

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            inventory: props.location.state.inventory._id,
            bucketType: props.bucketType
        }
        // console.log('logging data', data)

        bucketService.createBucket(data)
            .then(response => {
                addBucketToInventory(response)
            })
         history.goBack()    }

    function addBucketToInventory(data) {
        // console.log('logging data', data)
        
        function pushToInventory(inventory) {
            inventory['buckets'].push(data._id)
            return inventory
        }

        inventoryService.getInventory(data.inventory)
            .then(inventory => pushToInventory(inventory))
            .then(inventory => inventoryService.updateInventory(inventory._id, inventory))
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        name='name'
                        label={(props.bucketType + ' Name').toUpperCase()}
                        required={true}
                        errorObj={errors}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >Create {props.bucketType}</Button>
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

export default AddBucket
