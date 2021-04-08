import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'

function FormInput(props) {
    const { control } = useFormContext()
    const { name, label, required, errorObj, variant } = props
    let isError = false
    let errorMessage = ''
    if (errorObj && errorObj.hasOwnProperty(name)) {
        isError = true
        errorMessage = errorObj[name].message
    }

    return (
        <Controller
            render={
                ({ field }) => (
                    <TextField 
                        variant={variant}
                        label={label}
                        required
                        error={isError}
                        helperText={errorMessage}
                        {...field} 
                    />
                )
            }
            name={name}
            control={control}
            defaultValue=''
            fullWidth={true}
            InputLabelProps={{
                className: required ? 'required-label' : '',
                required: required || false
            }}
            {...props}
        />
    )
}

export default FormInput