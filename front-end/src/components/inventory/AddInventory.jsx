import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'

import { accountService } from '../../services/account'
import { inventoryService } from '../../services/inventory'
import { alertService } from '../../services/alert'

const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required'),
    owner: yup.string()
        .required(),
    // users: yup.array().of(yup.string())
})

function AddInventory() {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit, errors } = methods

    const user = accountService.userValue

    // function listOfUsers(userEmails) {
    //     let userArray = []
    //     const usersString = userEmails.replace(/\s/g, '')
    //     const userEmailsArray = usersString.split(',')
    //     for (email of userEmailsArray) {

    //     }
    // }

    function onSubmit({name}) {
        const data = {
            name: name,
            owner: user._id,
            // users: listOfUsers(userEmails)
        }
        inventoryService.createInventory(data)
            .then(() => {
                alertService.success('Your new inventory has been created')
                history.push('/dashboard')
            })
            .catch(error => {
                alertService.error(error)
            })
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form>
                    <FormInput
                        name='name'
                        label='Inventory Name'
                        required={true}
                        errorObj={errors}
                    />
                </form>
            </FormProvider>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit(onSubmit)}
            >Create Inventory</Button>
            <Button
                variant='text'
                color='primary'
                onClick={() => history.push('/dashboard')}
            >Cancel</Button>
        </div>
    )
}

export default AddInventory
