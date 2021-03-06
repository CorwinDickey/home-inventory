import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Card } from '@material-ui/core'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

// const validationSchema = yup.object().shape({
//     email: yup.string()
//         .email('Email is invalid')
//         .required('Email is required'),
//     password: yup.string()
//         .required('Password is required')
// })

function Login({ history }) {
    const methods = useForm()

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
        <Card>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
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
                </form>
            </FormProvider>
        </Card>
    )
}

export default Login
