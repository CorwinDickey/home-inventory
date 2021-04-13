import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'

import Controls from '../form-controls/'

import { accountService } from '../../services/account'
import { inventoryService } from '../../services/inventory'
import { alertService } from '../../services/alert'
import { history } from '../../utils/history'

// const validationSchema = yup.object().shape({
//     name: yup.string()
//         .required('Name is required'),
//     owner: yup.string()
//         .required(),
//     // users: yup.array().of(yup.string())
// })

function AddInventory() {
    const methods = useForm()

    const { handleSubmit } = methods

    const user = accountService.userValue
    console.log(user)

    function onSubmit(formData) {
        console.log('testing button click')
        const data = {
            name: formData.name,
            owner: user.id,
            // users: listOfUsers(userEmails)
        }
        console.log(data)
        inventoryService.createInventory(data)
            .then(() => {
                alertService.success('Your new inventory has been created')
                history.push('/')
            })
            .catch(error => {
                alertService.error(error)
            })
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
                    >Create Inventory</Button>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddInventory
