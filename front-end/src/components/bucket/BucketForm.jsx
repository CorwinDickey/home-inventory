import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@material-ui/core'

import Controls from '../form-controls'

function BucketForm({ bucketType, bucketObject, submitBucket }) {
    const isAddMode = !bucketObject
    const { id } = useParams()
    const [bucket, setBucket] = useState()

    const methods = useForm()
    const { handleSubmit, setValue, errors } = methods

    useEffect(() => {
        if (!isAddMode) {
            const fields = [
                'name'
            ]
            fields.forEach(field => setValue(field, bucketObject[field]))
            setBucket(bucket)
        }
    })

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            inventory: id,
            bucketType: bucketType
        }
        submitBucket(data)
    }

    return (
        <div className='bucket-form'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controls.FormInput
                        name='name'
                        label={(bucketType + ' Name').toUpperCase()}
                        required={true}
                        // errorObj={errors}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >{isAddMode ? `Create ${bucketType}` : `Edit ${bucketType}`}</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default BucketForm
