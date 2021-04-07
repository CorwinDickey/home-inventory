import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function Register({ history }) {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    }

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

    function handleSubmit(fields, { setStatus, setSubmitting }) {
        setStatus()
        accountService.register(fields)
            .then(() => {
                alertService.success('Registration successful, please check your email for verification instructions')
                history.push('login')
            })
            .catch(error => {
                setSubmitting(false)
                alertService.error(error)
            })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <h3 className='card-title'>Register</h3>
                    <div className='card-body'>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label>First Name</label>
                                <Field name='firstName' type='text' />
                                <ErrorMessage name='firstName' component='div' />
                            </div>
                            <div className='form-group'>
                                <label>Last Name</label>
                                <Field name='lastName' type='text' />
                                <ErrorMessage name='lastName' component='div' />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <Field name='email' type='text' />
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label>Password</label>
                                <Field name='password' type='password' />
                                <ErrorMessage name='password' component='div' />
                            </div>
                            <div className='form-group'>
                                <label>Confirm Password</label>
                                <Field name='confirmPassword' type='password' />
                                <ErrorMessage name='confirmPassword' component='div' />
                            </div>
                        </div>
                        <div>
                            <button type='submit' disabled={isSubmitting}>
                                {isSubmitting && <span className='spinner-border spinner-border-sm'></span>}
                                Register
                            </button>
                            <Link to='login'>Cancel</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Register
