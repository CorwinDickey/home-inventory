import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'

function FormCheck(props) {
    const { control } = useFormContext()
    const { name, label, required, color } = props

    return (
        <Controller
            render={
                ({ field }) => (
                    <FormControlLabel
                        control={<Checkbox
                            required={required}
                            color={color ? color : 'primary'}
                            {...field}
                        />}
                        label={label}
                    />
                )
            }
            name={name}
            control={control}
            {...props}
        />
    )
}

export default FormCheck
