import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import Controls from '../form-controls/'

import { accountService } from '../../services/account'
// import { inventoryService } from '../../services/inventory'
// import { alertService } from '../../services/alert'
// import { history } from '../../utils/history'

// const validationSchema = yup.object().shape({
//     name: yup.string()
//         .required('Name is required'),
//     owner: yup.string()
//         .required(),
//     // users: yup.array().of(yup.string())
// })

function InventoryForm({ submitInventory, inventoryObject }) {
    const isAddMode = !inventoryObject
    const user = accountService.userValue
    const [inventory, setInventory] = useState()

    const methods = useForm()
    const { handleSubmit, setValue } = methods

    useEffect(() => {
        if (!isAddMode) {
            const fields = [
                'name'
            ]
            fields.forEach(field => setValue(field, inventoryObject[field]))
            setInventory(inventory)
        }
    })

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            owner: user.id,
            // users: listOfUsers(userEmails)
        }
        submitInventory(data)
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controls.FormInput
                        name='name'
                        label='Inventory Name'
                        required={true}
                        // errorObj={errors}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                    >{isAddMode ? 'Create Inventory' : 'Edit Inventory'}</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default InventoryForm
