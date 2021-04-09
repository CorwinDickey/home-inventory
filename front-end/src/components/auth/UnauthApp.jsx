import React from 'react'

import UnauthRoutes from './UnauthRoutes'

function UnauthApp(props) {
    return (
        <div>
            <UnauthRoutes setUser={props.setUser} />
        </div>
    )
}

export default UnauthApp