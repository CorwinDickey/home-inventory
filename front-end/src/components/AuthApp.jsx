import React , { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { accountService } from '../services/account'
import Nav from './Nav'
import Routes from './Routes'

function AuthApp() {
    const [user, setUser] = useState({})

    useEffect(() => {
        axiosAuth()
        const subscription = accountService.user.subscribe(x => setUser(x))
        return subscription.unsubscribe
    })
    
    function axiosAuth(url) {
        const isLoggedIn = user && user.jwtToken
        const isApiUrl = url.startsWith(process.env.REACT_APP_SERVER_URL)
        if (isLoggedIn && isApiUrl) {
            return (
                axios.defaults.headers.common['Authorization'] = `Bearer ${user.jwtToken}`
            )
        } else {
            return null
        }
    }

    return (
        <div>
            <Nav user={user}/>
            <Routes user={user}/>
        </div>
    )
}

export default withRouter(AuthApp)
