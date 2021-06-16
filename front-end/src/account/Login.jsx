import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Typography, makeStyles, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../_components/form-controls/FormInput'

import { accountService } from '../_services/account'
import { alertService } from '../_services/alert'

// const validationSchema = yup.object().shape({
//     email: yup.string()
//         .email('Email is invalid')
//         .required('Email is required'),
//     password: yup.string()
//         .required('Password is required')
// })

const useStyles = makeStyles(theme => ({
    inputStyle: {
        margin: '10px'
    }
}))

function Login({ history }) {
    const methods = useForm()
    const classes = useStyles()

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
        <div className='login-page'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant='h2'>
                        Login
                    </Typography>
                    <div>
                        <FormInput
                            className={classes.inputStyle}
                            name='email'
                            label='Email'
                            type='email'
                            required={true}
                            // errorObj={errors}
                            fullWidth
                        />
                        <FormInput
                            className={classes.inputStyle}
                            name='password'
                            label='Password'
                            type='password'
                            required={true}
                            // errorObj={errors}
                            fullWidth
                        />
                    </div>
                    <div>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                        >Login</Button>
                        <Link
                            component={RouterLink}
                            to='register'
                            variant='button'
                        >Register</Link>
                        
                    </div>
                    <Link
                        component={RouterLink}
                        to='forgot-password'
                        variant='button'
                    >Forgot Password</Link>
                </form>
            </FormProvider>
        </div>
    )
}

export { Login }
