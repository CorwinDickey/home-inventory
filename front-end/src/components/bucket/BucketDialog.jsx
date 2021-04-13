import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core'

import Controls from '../form-controls'
import { bucketService } from '../../services/bucket'
import { inventoryService } from '../../services/inventory'

function BucketDialog({ showModal, bucketType, toggle }) {
    const { id } = useParams()
    const methods = useForm()

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
        
        
        toggle()
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

    function toggle() {
        toggle()
    }


    return (
        <div>
            <Dialog open={showModal} onClose={toggle}>
                <FormProvider {...methods}>
                    <form>
                        <DialogTitle>Create new {bucketType}</DialogTitle>
                        <DialogContent>
                            <Controls.FormInput
                                name='name'
                                label='Name'
                                required={true}
                                errorobj={errors}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggle} color='primary'>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit(onSubmit)} variant='outlined' color='primary'>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </FormProvider>

            </Dialog>
        </div>
    )
}

export default BucketDialog
