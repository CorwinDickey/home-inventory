import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@material-ui/core'

import FormInput from '../form-controls/FormInput'

import { bucketService } from '../../services/bucket'
import { inventoryService } from '../../services/inventory'


function AddBucket({ bucketType, closeModal }) {
    const methods = useForm()
    const { id } = useParams()

    const { handleSubmit, errors } = methods

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            inventory: id,
            bucketType: bucketType
        }

        bucketService.createBucket(data)
            .then(response => {
                addBucketToInventory(response)
            })
            closeModal()
        }

    function addBucketToInventory(data) {
        
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
                        label={(bucketType + ' Name').toUpperCase()}
                        required={true}
                        errorObj={errors}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >Create {bucketType}</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddBucket
