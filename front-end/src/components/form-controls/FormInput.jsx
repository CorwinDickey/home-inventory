import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'

function FormInput(props) {
    const { control } = useFormContext()
    let isError = false
    let errorMessage = ''
    if (props.errorObj && props.errorObj.hasOwnProperty(props.name)) {
        isError = true
        errorMessage = props.errorObj[props.name].message
    }

    return (
        <Controller
            render={
                ({ field }) => (
                    <TextField 
                        variant={props.variant && props.variant}
                        label={props.label}
                        type={props.type ? props.type : 'text'}
                        required={props.required}
                        error={isError}
                        helperText={errorMessage}
                        {...props}
                        {...field} 
                    />
                )
            }
            name={props.name}
            control={control}
            defaultValue={props.defaultValue ? props.defaultValue : ''}
            fullWidth={true}
            InputLabelProps={{
                className: props.required ? 'required-label' : '',
                required: props.required || false
            }}
            {...props}
        />
    )
}

export default FormInput
