import React from 'react'

import accountService from '../services/account'

function Home() {
    const user = accountService.userValue

    return (
        <div>
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in with React & JWT!</p>
        </div>
    )
}

export default Home
