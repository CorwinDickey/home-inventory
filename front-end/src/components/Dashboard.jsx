import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddItem from './AddItem'

function Dashboard() {
    const [itemList, setItemList] = useState([])

    useEffect(() => getItems(), itemList)

    function getItems() {
        axios.get('/items')
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
