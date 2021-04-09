import React from 'react'
import { withRouter } from 'react-router-dom'

import Nav from '../Nav'
import AuthRoutes from './AuthRoutes'

function AuthApp() {
    
    return (
        <div>
            <Nav />
            <AuthRoutes />
        </div>
    )
}

export default withRouter(AuthApp)
