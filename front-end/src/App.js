import React, { useState, useEffect } from 'react'

import Alert from './components/Alert'
import AuthApp from './components/auth/AuthApp'
import UnauthApp from './components/auth/UnauthApp'
import { accountService } from './services/account'


function App() {
    const [user, setUser] = useState({})

    useEffect(() => {
        accountService.user.subscribe(x => setUser(x))
    }, [])

    return (
        <div>
            <Alert />
            { user
                ? <AuthApp />
                : <UnauthApp setUser={setUser} />
            }
        </div>
    )
}

export default App
