import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { Button } from '@material-ui/core'

import FormInput from '../form-controls/FormInput'

import { bucketService } from '../../services/bucket'
import { history } from '../../utils/history'
import { inventoryService } from '../../services/inventory'


function AddBucket({ bucketType }) {
    const methods = useForm()
    const location = useLocation()

    const { handleSubmit, errors } = methods

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            inventory: location.state.inventory._id,
            bucketType: bucketType
        }
        // console.log('logging data', data)

        bucketService.createBucket(data)
            .then(response => {
                addBucketToInventory(response)
            })
            history.push('/view-inventory')
        }

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
                        label={(bucketType + ' Name').toUpperCase()}
                        required={true}
                        errorObj={errors}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >Create {bucketType}</Button>
                    {/* <Button
                        variant='text'
                        color='primary'
                        onClick={props.closeModal}
                    >Cancel</Button> */}
                </form>
            </FormProvider>
        </div>
    )
}

export default AddBucket
