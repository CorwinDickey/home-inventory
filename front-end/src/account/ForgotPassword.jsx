import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Link } from '@material-ui/core'
import { Link as RouterLink, Redirect } from 'react-router-dom'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../_components/form-controls/FormInput'

import { accountService } from '../_services/account'
import { alertService } from '../_services/alert'
    
const validationSchema = yup.object().shape({
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required')
})

function ForgotPassword({ history }) {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit, errors } = methods

    function onSubmit({ email }) {
        alertService.clear()
        accountService.forgotPassword(email)
            .then(() => alertService.success('Please check your email for password reset instructions'))
            .catch(error => alertService.error(error))
        // history.push('/')
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        name='email'
                        label='Email'
                        type='email'
                        required={true}
                        // errorObj={errors}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >Submit</Button>
                    <Link
                        component={RouterLink}
                        to='login'
                        variant='button'
                    >Cancel</Link>
                </form>
            </FormProvider>
        </div>
    )
}

export { ForgotPassword }
