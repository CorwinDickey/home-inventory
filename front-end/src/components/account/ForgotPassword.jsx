import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function ForgotPassword() {
    const initialValues = {
        email: ''
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required')
    })

    function handleSubmit({ email }, { setSubmitting }) {
        alertService.clear()
        accountService.forgotPassword(email)
            .then(() => alertService.success('Please check your email for password reset instructions'))
            .catch(error => alertService.error(error))
            .finally(() => setSubmitting(false))
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className='card-header'>Forgot Password</h3>
                    <div className='card-body'>
                        <div className='form-group'>
                            <label>Email</label>
                            <Field name='email' type='text' />
                            <ErrorMessage name='email' component='div' className='invalid-feedback' />
                        </div>
                        <div className='form-row'>
                            <div className='form-group col'>
                                <button type='submit' disabled={isSubmitting} className='btn btn-primary'>
                                    {isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
                                    Submit
                                </button>
                                <Link to='login'>Cancel</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ForgotPassword
