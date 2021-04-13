import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core'

function FormSelect(props) {
    const { control } = useFormContext()

    return (
        <Controller
            render={
                ({ field }) => (
                    <FormControl
                        variant={props.variant && props.variant}
                    >
                        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
                        <Select
                            native
                            label={props.label}
                            {...field}
                        >
                            <option value='' />
                            {props.options.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                )
            }
            name={props.name}
            control={control}
            defaultValue=''
            fullWidth={true}
        />
    )
}

export default FormSelect
