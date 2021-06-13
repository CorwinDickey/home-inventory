import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Typography, makeStyles } from '@material-ui/core'

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
                        <Button
                            variant='text'
                            color='primary'
                            onClick={() => history.push('/register')}
                        >Register</Button>
                    </div>
                    <Button
                        variant='text'
                        color='primary'
                        onClick={() => history.push('/forgot-password')}
                    >Forgot Password</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export { Login }
