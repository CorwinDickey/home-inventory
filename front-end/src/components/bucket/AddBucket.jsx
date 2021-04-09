import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'

import { bucketService } from '../../services/bucket'
import { alertService } from '../../services/alert'
import { history } from '../../utils/history'

// const validationSchema = yup.object().shape({
//     name: yup.string()
//         .required('Name is required'),
//     inventory: yup.string()
//         .required(),
//     bucketType: yup.string()
//         .required()
// })

function AddBucket(props) {
    const methods = useForm(
        // resolver: yupResolver(validationSchema)
    )

    const { handleSubmit, errors } = methods

    console.log(props.location.state.inventory._id)
    console.log(props.bucketType)

    function onSubmit(formData) {
        console.log('testing button click')
        console.log(props.location.state.inventory)
        const data = {
            name: formData.name,
            inventory: props.location.state.inventory._id,
            bucketType: props.bucketType
        }
        console.log(data)

        bucketService.createBucket(data)
            .then(() => {
                alertService.success(`Your ${props.bucketType} has been created`)
                history.goBack()
            })
            .catch(error => {
                alertService.error(error)
            })
    }


    // function onSubmit(formData) {
    //     console.log('testing button click')
    //     const data = {
    //         name: formData.name,
    //         inventory: props.location.state.inventory._id,
    //         bucketType: props.bucketType
    //     }
    //     console.log(formData)

    //     bucketService.createBucket(data)
    //         .then(() => {
    //             alertService.success(`Your ${props.bucketType} has been created`)
    //             history.goBack()
    //         })
    //         .catch(error => {
    //             alertService.error(error)
    //         })
    // }

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
