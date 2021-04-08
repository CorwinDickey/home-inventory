import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import queryString from 'query-string'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '@material-ui/core'
import FormInput from '../form-controls/FormInput'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function ResetPassword({ history, location }) {
    const TokenStatus = {
        Validating: 'Validating',
        Valid: 'Valid',
        Invalid: 'Invalid'
    }

    const [token, setToken] = useState(null)
    const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating)

    useEffect(() => {
        const { token } = queryString.parse(location.search)

        history.replace(location.pathname)

        accountService.validateResetToken(token)
            .then(() => {
                setToken(token)
                setTokenStatus(TokenStatus.Valid)
            })
            .catch(() => {
                setTokenStatus(TokenStatus.Invalid)
            })
    }, [])


    function PasswordResetForm() {
        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        })

        const methods = useForm({
            resolver: yupResolver(validationSchema)
        })

        const { handleSubmit, errors } = methods


        function onSubmit({ password, confirmPassword }) {
            alertService.clear()
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true })
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
                    </form>
                </FormProvider>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit(onSubmit)}
                >Reset Password</Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => history.push('/login')}
                >Cancel</Button>
            </div>
        )
    }

    switch (tokenStatus) {
        case TokenStatus.Valid:
            return <PasswordResetForm />
        case TokenStatus.Invalid:
            return <div>Token validation failed, if the token has expired you can get a new one at the <Link to='forgot-password'>forgot password</Link> page.</div>
        case TokenStatus.Validating:
            return <div>Validating token...</div>
    }
}

export default ResetPassword
