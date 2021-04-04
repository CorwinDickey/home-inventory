import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Button,
    TextField
} from '@material-ui/core'


const initialState = {
    category: '',
    room: '',
    name: ''
}

function AddItem() {
    const [state, setState] = useState(initialState)
    const [categories, setCategories] = useState({})
    const [rooms, setRooms] = useState({})
    
    useEffect(() => setupForm(), [categories, rooms])

    function defaultDate() {
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm =  String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = String(today.getFullYear())

        const defaultDate = yyyy + '-' + mm + '-' + dd
        return defaultDate
    }

    function getCategories() {
        axios.get('/categories')
        .then(response => {
            setCategories(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function getRooms() {
        axios.get('/rooms')
        .then(response => {
            setRooms(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function setupForm() {
        getCategories()
        getRooms()
    }

    function handleChange(event) {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const body = {
            category: state.category,
            room: state.room,
            name: state.name,
            description: state.description,
            datePurchased: state.datePurchased,
            purchasePrice: state.purchasePrice,
            replacementCost: state.replacementCost,
            shipping: state.shipping,
            quantity: state.quantity,
            taxRate: state.taxRate,
            pictures: state.pictures,
            documents: state.documents,
            categoryData: state.categoryData
        }

        axios.post('/items', body)
            .then(response => console.log(response))
            .catch(error => console.log(error))

    }

    return(
        <form onSubmit={handleSubmit}>
            <div id='page-1'>
                <TextField
                    name='category'
                    label='Category'
                    value={state.category}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='room'
                    label='Room'
                    value={state.room}
                    onChange={handleChange}
                    variant='filled'
                />
                {/* <TextField
                    name='category'
                    select
                    label='Category'
                    value={state.category}
                    onChange={handleChange}
                    variant='filled'
                    SelectProps={{
                        native: true
                    }}
                >
                    <option aria-label='None' value='' />
                    <option value='Electronics'>Electronics</option>
                    <option value='Books'>Books</option>
                    <option value='Appliances'>Appliances</option>
                </TextField>
                <TextField
                    name='room'
                    select
                    label='Room'
                    value={state.room}
                    onChange={handleChange}
                    variant='filled'
                    SelectProps={{
                        native: true
                    }}
                >
                    <option aria-label='None' value='' />
                    <option value='Bedroom'>Bedroom</option>
                    <option value='Office'>Office</option>
                    <option value='Kitchen'>Kitchen</option>
                </TextField> */}
                <TextField
                    name='name'
                    label='Item Name'
                    value={state.name}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='description'
                    label='Description'
                    multiline
                    rows={4}
                    placeholder='Item description...'
                    variant='filled'
                />

            </div>
            <br/>
            <div id='page-2'>
                <TextField
                    name='datePurchased'
                    label='Purchase Date'
                    value={state.datePurchased}
                    onChange={handleChange}
                    type='date'
                    defaultValue={defaultDate()}
                    variant='filled'
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <TextField
                    name='quantity'
                    label='Quantity'
                    value={state.quantity}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='purchasePrice'
                    label='Single Item Purchase Price'
                    value={state.purchasePrice}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='replacementCost'
                    label='Single Item Replacement Cost'
                    value={state.replacementCost}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='shipping'
                    label='Shipping'
                    value={state.shipping}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='taxRate'
                    label='Sales Tax Rate'
                    value={state.taxRate}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='pictures'
                    label='Pictures'
                    value={state.pictures}
                    onChange={handleChange}
                    variant='filled'
                />
                <TextField
                    name='documents'
                    label='Documents'
                    value={state.documents}
                    onChange={handleChange}
                    variant='filled'
                />
                {/* <div id='picture-upload'>
                    <input
                        id='pictures'
                        accept='image/*'
                        name='pictures'
                        type='file'
                        multiple
                        hidden
                    />
                    <label htmlFor='pictures'>
                        <Button variant='outlined' component='span'>
                            Upload Pictures
                        </Button>
                    </label>
                </div>
                <div id='document-upload'>
                    <input
                        id='documents'
                        name='documents'
                        type='file'
                        multiple
                        hidden
                    />
                    <label htmlFor='documents'>
                        <Button variant='outlined' component='span'>
                            Upload Documents
                        </Button>
                    </label>
                </div> */}
            </div>
            <div id='page-3'>
                <TextField
                    name='categoryData'
                    label='Category Data'
                    value={state.categoryData}
                    onChange={handleChange}
                    variant='filled'
                />
            </div>
            <input
                id='submit'
                type='submit'
                hidden
            />
            <label htmlFor='submit'>
                <Button variant='contained' component='span'>
                    Submit
                </Button>
            </label>
        </form>
    )
}

export default AddItem
