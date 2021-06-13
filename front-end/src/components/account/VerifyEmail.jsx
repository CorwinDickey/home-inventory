import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { accountService } from '../../services/account'
import { alertService } from '../../services/alert'

function VerifyEmail({ history }) {
    const EmailStatus = {
        Verifying: 'Verifying',
        Failed: 'Failed'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying)

    useEffect(() => {
        const { token } = queryString.parse(window.location.search)

        history.replace(window.location.pathname)

        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Verification successful, you can now login.', { keepAfterRouteChange: true})
                history.push('login')
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed)
            })
    }, [])

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verifying...</div>
            case EmailStatus.Failed:
                return <div>Verification failed, you can also verify your account using the <Link to='forgot-password'>forgot password</Link> page.</div>
        }
    }

    return (
        <div>
            <h3>Verify Email</h3>
            <div>{getBody}</div>
        </div>
    )
}

export { VerifyEmail }
