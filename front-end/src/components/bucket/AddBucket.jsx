import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'

import { bucketService } from '../../services/bucket'
import { alertService } from '../../services/alert'
import { history } from '../../utils/history'

const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required'),
    inventory: yup.string()
        .required(),
    bucketType: yup.string()
        .required()
})

function AddBucket(props) {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit, errors } = methods

    function onSubmit({name}) {
        const data = {
            name: name,
            inventory: props.inventoryId,
            bucketType: props.bucketType
        }

        bucketService.createBucket(data)
            .then(() => {
                alertService.success(`Your ${props.bucketType} has been created`)
                history.pushState('/inventory')
            })
            .catch(error => {
                alertService.error(error)
            })
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form>
                    <FormInput
                        name='name'
                        label={`${props.bucketType} Name`}
                        required={true}
                        errorObj={errors}
                    />
                </form>
            </FormProvider>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit(onSubmit)}
            >Create {props.bucketType}</Button>
            <Button
                variant='text'
                color='primary'
                onClick={() => history.push('/inventory')}
            >Cancel</Button>
        </div>
    )
}

export default AddBucket
