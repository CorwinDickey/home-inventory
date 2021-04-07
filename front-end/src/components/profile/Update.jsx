import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function Update({ history }) {
    const user = accountService.userValue
    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) {
                    return schema.required('Confirm Password is required')
                }
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    })

    function handleSubmit(fields, { setStatus, setSubmitting }) {
        setStatus()
        accountService.updateAccount(user.id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true})
                history.push('.')
            })
            .catch(error => {
                setSubmitting(false)
                alertService.error(error)
            })
    }

    const [isDeleting, setIsDeleting] = useState(false)
    function handleDelete() {
        if (confirm('Are you sure?')) {
            setIsDeleting(true)
            accountService.delete(user.id)
                .then(() => alertService.success('Account deleted successfully'))
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Update Profile</h1>
                    <div className='form-row'>
                        <div className='form-group col'>
                            <label>First Name</label>
                            <Field name='firstName' type='text' />
                            <ErrorMessage name='firstName' component='div' />
                        </div>
                        <div className='form-group col'>
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
                        <div className='form-group col'>
                            <label>Password</label>
                            <Field name='password' type='password' />
                            <ErrorMessage name='password' component='div' />
                        </div>
                        <div className='form-group col'>
                            <label>Confirm Password</label>
                            <Field name='confirmPassword' type='password' />
                            <ErrorMessage name='confirmPassword' component='div' />
                        </div>
                    </div>
                    <div>
                        <button type='submit' disabled={isSubmitting}>
                            {isSubmitting && <span className='spinner-border spinner-border-sm'></span>}
                            Update
                        </button>
                        <button type='button' onClick={() => handleDelete()} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Delete</span>
                            }
                        </button>
                        <Link to='.'>Cancel</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Update
