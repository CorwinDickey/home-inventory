import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import {
    MenuItem,
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core'

function FormSelect(props) {
    const { control } = useFormContext()
    const { name, label, options } = props

    return (
        <Controller
            render={
                ({ field }) => (
                    <FormControl>
                        <InputLabel htmlFor={name}>{label}</InputLabel>
                        <Select
                            native
                            {...field}
                        >
                            <MenuItem value=''>
                                <em>None</em>
                            </MenuItem>
                            {options.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
            }
            name={name}
            control={control}
            defaultValue=''
            fullWidth={true}
        />
    )
}

export default FormSelect
