import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function ResetPassword({ history }) {
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

    function getForm() {
        const initialValues = {
            password: '',
            confirmPassword: ''
        }

        const validationSchema = Yup.object().shape({
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
            confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
        })

        function handleSubmit({ password, confirmPassword }, { setSubmitting }) {
            alertService.clear()
            accountService.resetPassword({ token, password, confirmPassword })
                .then(() => {
                    alertService.success('Password reset successful, you can now login', { keepAfterRouteChange: true })
                    history.push('login')
                })
                .catch(error => {
                    setSubmitting(false)
                    alertService.error(error)
                })
        }

        return (
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label>Password</label>
                            <Field name='password' type='password' />
                            <ErrorMessage name='password' component='div' />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <Field name='confirmPassword' type='password' />
                            <ErrorMessage name='confirmPassword' component='div' />
                        </div>
                        <div>
                            <button type='submit' disabled={isSubmitting}>
                                {isSubmitting && <span className='spinner-border spinner-border-sm'></span>}
                                Reset Password
                            </button>
                            <Link to='/login'>Cancel</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    function getBody() {
        switch (tokenStatus) {
            case TokenStatus.Valid:
                return getForm()
            case TokenStatus.Invalid:
                return <div>Token validation failed, if the token has expired you can get a new one at the <Link to='forgot-password'>forgot password</Link> page.</div>
            case TokenStatus.Validating:
                return <div>Validation token...</div>
        }
    }

    return (
        <div>
            <h3 className='card-title'>Reset Password</h3>
            <div className='card-body'>{getBody()}</div>
        </div>
    )
}

export default ResetPassword
