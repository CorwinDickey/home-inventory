import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'
    
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required')
})

function ForgotPassword({ history, location }) {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit, errors } = methods

    function onSubmit({ email }, { setSubmitting }) {
        alertService.clear()
        accountService.forgotPassword(email)
            .then(() => alertService.success('Please check your email for password reset instructions'))
            .catch(error => alertService.error(error))
            .finally(() => setSubmitting(false))
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form>
                    <FormInput
                        name='email'
                        label='Email'
                        variant='outlined'
                        required={true}
                        errorObj={errors}
                    />
                </form>
            </FormProvider>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit(onSubmit)}
            >
                Submit
            </Button>
            <Button
                variant='outlined'
                color='primary'
                onClick={() => history.push('/login')}
            >
                Cancel
            </Button>
        </div>
    )
}

export default ForgotPassword
