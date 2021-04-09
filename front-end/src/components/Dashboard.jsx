import React, { useEffect, useState } from 'react'
// import AddItem from './AddItem'
import { fetchWrapper } from '../utils/fetch-wrapper'

function Dashboard() {
    const [inventoryList, setInventoryList] = useState([])

    useEffect(() => getInventories(), [inventoryList])

    function getInventories() {
        fetchWrapper.get('/inventory')
        .then(response => {
            console.log(response)
            setInventoryList(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <div>
            Testing deployment of react app
            {inventoryList.map((x) => {
                if (x) {
                    return (
                        <div>
                            <p>{x.name}</p>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Dashboard
