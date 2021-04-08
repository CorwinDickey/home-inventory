import React from 'react'
import { Link } from 'react-router-dom'
import { userForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function Login({ history, location }) {
    const initialValues = {
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    })

    function handleSubmit({ email, password }, { setSubmitting }) {
        alertService.clear()
        accountService.login(email, password)
            .then(() => {
                const { from } = location.state || { from: { pathname: '/' } }
                history.push(from)
            })
            .catch(error => {
                setSubmitting(false)
                alertService.error(error)
            })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3>Login</h3>
                    <div>
                        <label>Email</label>
                        <Field name='email' type='text' />
                        <ErrorMessage name='email' component='div' />
                    </div>
                    <div>
                        <label>Password</label>
                        <Field name='password' type='text' />
                        <ErrorMessage name='password' component='div' />
                    </div>
                    <div>
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting && <span className='spinner-border spinner-border-sm'></span>}
                            Login
                        </button>
                        <Link to='register'>Register</Link>
                    </div>
                    <Link to='forgot-password'>Forgot Password</Link>
                </Form>
            )}
        </Formik>
    )
}

export default Login
