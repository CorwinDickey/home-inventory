import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
    const [itemList, setItemList] = useState([])
    const baseURL = process.env.REACT_APP_SERVER_URL

    useEffect(() => getItems(), itemList)

    function getItems() {
        axios.get(baseURL + '/items')
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
