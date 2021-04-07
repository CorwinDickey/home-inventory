import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { alertService, AlertType } from '../services/alert'
import { history } from '../utils/history'

const propTypes = {
    sev: PropTypes.string,
    fade: PropTypes.bool
}

const defaultProps = {
    sev: 'default-alert',
    fade: true
}

function Alert({ sev, fade }) {
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        const subscription = alertService.onAlert(sev)
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange)

                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange)
                        return filteredAlerts
                    })
                } else {
                    setAlerts(alert => ([...alerts, alert]))

                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000)
                    }
                }
            })

        const historyUnlisten = history.listen(({ pathname }) => {
            if (pathname.endsWith('/')) {
                return
            }

            alertService.clear(sev)
        })

        return () => {
            subscription.unsubscribe()
            historyUnlisten()
        }
    }, [])

    function removeAlert(alert) {
        if (fade) {
            const alertWithFade = { ...alert, fade: true }
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x))

            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade))
            }, 250)
        } else {
            setAlerts(alerts => alerts.filter(x => x !== alert))
        }
    }

    if (!alerts.length) {
        return null
    }

    return (
        <div>
            {alerts.map((alert, index) =>
                <div key={index} >
                    <a className='close' onClick={() => removeAlert(alert)}>&times</a>
                    <span dangerouslySetInnerHTML={{__html: alert.message}}></span>
                </div>
            )}
        </div>
    )
}

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps
export default Alert
