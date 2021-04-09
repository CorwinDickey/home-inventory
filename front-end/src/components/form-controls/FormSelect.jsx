import React, { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    MenuItem,
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core'

function FormSelect(props) {
    const [options, setOptions] = useState(props.options)
    const { control } = useFormContext()

    console.log('logging options', options)

    return (
        <Controller
            render={
                ({ field }) => (
                    <FormControl>
                        <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
                        <Select
                            native
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
