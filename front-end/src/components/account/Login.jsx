import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

const validationSchema = yup.object().shape({
    email: yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: yup.string()
        .required('Password is required')
})

function Login({ history, location }) {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit, errors } = methods

    function onSubmit({ email, password }) {
        alertService.clear()
        accountService.login(email, password)
            .then(() => {
                history.push('/')
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
                        name='email'
                        label='Email'
                        type='email'
                        required={true}
                        errorObj={errors}
                    />
                    <FormInput
                        name='password'
                        label='Password'
                        type='password'
                        required={true}
                        errorObj={errors}
                    />
                </form>
            </FormProvider>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit(onSubmit)}
            >Login</Button>
            <Button
                variant='text'
                color='primary'
                onClick={() => history.push('/register')}
            >Register</Button>
            <Button
                variant='text'
                color='primary'
                onClick={() => history.push('/forgot-password')}
            >Forgot Password</Button>
        </div>
    )
}

export default Login
