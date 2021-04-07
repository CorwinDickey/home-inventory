import React, { useState, useEffect } from 'react'

import Alert from './components/Alert'
import AuthApp from './components/AuthApp'
import UnauthApp from './components/UnauthApp'

import accountService from './services/account'

function App() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x))
        return subscription.unsubscribe()
    }, [])

    return (
        <div>
            <Alert />
            { user && user.jwtToken
                ? <AuthApp />
                : <UnauthApp />
            }
        </div>
    )
}

export default App
