import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@material-ui/core'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import FormInput from '../form-controls/FormInput'
import { accountService } from '../../services/account'
// import { itemService } from '../../services/item'
import { alertService } from '../../services/alert'
import { history } from '../../utils/history'

const validationSchema = yup.object().shape({
    name: yup.string()
        .required('Name is required'),
    description: yup.string()
        .required('Description is required'),
    datePurchased: yup.date(),
    purchasePrice: yup.number(),
    replacementCost: yup.number(),
    shipping: yup.number(),
    quantity: yup.number(),
    taxRate: yup.number(),
    buckets: yup.string(),
    inventory: yup.string(),
    creator: yup.string()
})

function AddItem(props) {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    const { handleSubmit } = methods

    const user = accountService.userValue

    function getCategories() {

    }

    function getRooms() {

    }

    function onSubmit(formData) {
        const data = {
            name: formData.name,
            description: formData.description,
            datePurchased: formData.datePurchased,
            purchasedPrice: formData.purchasePrice,
            replacementCost: formData.replacementCost,
            shipping: formData.shipping,
            quantity: formData.quantity,
            taxRate: formData.taxRate,
            buckets: [formData.room, formData.category],
            inventory: props.location.state.inventory._id,
            creator: user._id
        }

        // itemService.createItem(data)
        //     .then(() => {
        //         alertService.success('Your item has been created')
        //         history.goBack()
        //     })
    }

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <FormInput
                            name='name'
                            label='Item Name'
                            required={true}
                        />
                        <FormInput
                            name='description'
                            label='Item Description'
                            required={true}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddItem













// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import {
//     Button,
//     TextField
// } from '@material-ui/core'

// function AddItem() {
//     const initialState = {
//         category: '',
//         room: '',
//         name: ''
//     }
//     const [state, setState] = useState(initialState)
//     const [categories, setCategories] = useState({})
//     const [rooms, setRooms] = useState({})
    
//     useEffect(() => setupForm(), [categories, rooms])

//     function defaultDate() {
//         const today = new Date()
//         const dd = String(today.getDate()).padStart(2, '0')
//         const mm =  String(today.getMonth() + 1).padStart(2, '0')
//         const yyyy = String(today.getFullYear())

//         const defaultDate = yyyy + '-' + mm + '-' + dd
//         return defaultDate
//     }

//     function getCategories() {
//         axios.get('/categories')
//         .then(response => {
//             setCategories(response.data)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }

//     function getRooms() {
//         axios.get('/rooms')
//         .then(response => {
//             setRooms(response.data)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }

//     function setupForm() {
//         getCategories()
//         getRooms()
//     }

//     function handleChange(event) {
//         const { name, value } = event.target
//         setState({
//             ...state,
//             [name]: value
//         })
//     }

//     function handleSubmit(event) {
//         event.preventDefault()

//         const body = {
//             category: state.category,
//             room: state.room,
//             name: state.name,
//             description: state.description,
//             datePurchased: state.datePurchased,
//             purchasePrice: state.purchasePrice,
//             replacementCost: state.replacementCost,
//             shipping: state.shipping,
//             quantity: state.quantity,
//             taxRate: state.taxRate,
//             pictures: state.pictures,
//             documents: state.documents,
//             categoryData: state.categoryData
//         }

//         axios.post('/items', body)
//             .then(response => console.log(response))
//             .catch(error => console.log(error))

//     }

//     return(
//         <form onSubmit={handleSubmit}>
//             <div id='page-1'>
//                 <TextField
//                     name='category'
//                     label='Category'
//                     value={state.category}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='room'
//                     label='Room'
//                     value={state.room}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 {/* <TextField
//                     name='category'
//                     select
//                     label='Category'
//                     value={state.category}
//                     onChange={handleChange}
//                     variant='filled'
//                     SelectProps={{
//                         native: true
//                     }}
//                 >
//                     <option aria-label='None' value='' />
//                     <option value='Electronics'>Electronics</option>
//                     <option value='Books'>Books</option>
//                     <option value='Appliances'>Appliances</option>
//                 </TextField>
//                 <TextField
//                     name='room'
//                     select
//                     label='Room'
//                     value={state.room}
//                     onChange={handleChange}
//                     variant='filled'
//                     SelectProps={{
//                         native: true
//                     }}
//                 >
//                     <option aria-label='None' value='' />
//                     <option value='Bedroom'>Bedroom</option>
//                     <option value='Office'>Office</option>
//                     <option value='Kitchen'>Kitchen</option>
//                 </TextField> */}
//                 <TextField
//                     name='name'
//                     label='Item Name'
//                     value={state.name}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='description'
//                     label='Description'
//                     multiline
//                     rows={4}
//                     placeholder='Item description...'
//                     variant='filled'
//                 />

//             </div>
//             <br/>
//             <div id='page-2'>
//                 <TextField
//                     name='datePurchased'
//                     label='Purchase Date'
//                     value={state.datePurchased}
//                     onChange={handleChange}
//                     type='date'
//                     defaultValue={defaultDate()}
//                     variant='filled'
//                     InputLabelProps={{
//                         shrink: true
//                     }}
//                 />
//                 <TextField
//                     name='quantity'
//                     label='Quantity'
//                     value={state.quantity}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='purchasePrice'
//                     label='Single Item Purchase Price'
//                     value={state.purchasePrice}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='replacementCost'
//                     label='Single Item Replacement Cost'
//                     value={state.replacementCost}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='shipping'
//                     label='Shipping'
//                     value={state.shipping}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='taxRate'
//                     label='Sales Tax Rate'
//                     value={state.taxRate}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='pictures'
//                     label='Pictures'
//                     value={state.pictures}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 <TextField
//                     name='documents'
//                     label='Documents'
//                     value={state.documents}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//                 {/* <div id='picture-upload'>
//                     <input
//                         id='pictures'
//                         accept='image/*'
//                         name='pictures'
//                         type='file'
//                         multiple
//                         hidden
//                     />
//                     <label htmlFor='pictures'>
//                         <Button variant='outlined' component='span'>
//                             Upload Pictures
//                         </Button>
//                     </label>
//                 </div>
//                 <div id='document-upload'>
//                     <input
//                         id='documents'
//                         name='documents'
//                         type='file'
//                         multiple
//                         hidden
//                     />
//                     <label htmlFor='documents'>
//                         <Button variant='outlined' component='span'>
//                             Upload Documents
//                         </Button>
//                     </label>
//                 </div> */}
//             </div>
//             <div id='page-3'>
//                 <TextField
//                     name='categoryData'
//                     label='Category Data'
//                     value={state.categoryData}
//                     onChange={handleChange}
//                     variant='filled'
//                 />
//             </div>
//             <input
//                 id='submit'
//                 type='submit'
//                 hidden
//             />
//             <label htmlFor='submit'>
//                 <Button variant='contained' component='span'>
//                     Submit
//                 </Button>
//             </label>
//         </form>
//     )
// }

// export default AddItem
