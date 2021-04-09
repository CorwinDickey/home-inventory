import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, CheckBox } from '@material-ui/core'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'
import FormCheck from '../form-controls/FormCheck'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Terms & Conditions is required')
    })

function Register({ history }) {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit, errors } = methods

    function onSubmit(data) {
        accountService.register(data)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions')
                history.push('login')
            })
            .catch(error => {
                alertService.error(error)
            })
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form>
                    <div>
                        <FormInput
                            name='firstName'
                            label='First Name'
                            required={true}
                            errorObj={errors}
                        />
                        <FormInput
                            name='lastName'
                            label='Last Name'
                            required={true}
                            errorObj={errors}
                        />
                    </div>
                    <FormInput
                        name='email'
                        label='Email'
                        type='email'
                        required={true}
                        errorObj={errors}
                    />
                    <div>
                        <FormInput
                            name='password'
                            label='Password'
                            type='password'
                            required={true}
                            errorObj={errors}
                        />
                        <FormInput
                            name='confirmPassword'
                            label='Confirm Password'
                            type='password'
                            required={true}
                            errorObj={errors}
                        />
                    </div>
                    <FormCheck
                        name='acceptTerms'
                        label='I accept the Terms and Conditions'
                        required={true}
                        errorObj={errors}
                        color='primary'
                    />
                </form>
            </FormProvider>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit(onSubmit)}
            >Sign-up</Button>
            <Button
                variant='outlined'
                color='primary'
                onClick={() => history.push('/login')}
            >Cancel</Button>
        </div>
    )
}

export default Register
