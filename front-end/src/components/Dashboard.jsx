import React, { useEffect, useState } from 'react'
import AddItem from './AddItem'
import { fetchWrapper } from '../utils/fetch-wrapper'

function Dashboard() {
    const [itemList, setItemList] = useState([])

    useEffect(() => getItems(), itemList)

    function getItems() {
        fetchWrapper.get('/items')
        .then(response => {
            console.log(response)
            setItemList(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div>
            Testing deployment of react app
            <AddItem />
            {itemList.map((item) => {
                if (item) {
                    return (
                        <div>
                            <p>{item.name}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Dashboard
