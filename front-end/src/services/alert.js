import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

const alertSubject = new Subject()
const defaultSeverity = 'info'

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear
}

export const AlertType = {
    Error: 'error',
    Warning: 'warning',
    Info: 'info',
    Success: 'success'
}

function onAlert(sev = defaultSeverity) {
    return alertSubject.asObservable().pipe(filter(x => x && x.sev === sev))
}

function error(message, options) {
    alert({
        ...options,
        type: AlertType.Error,
        message
    })
}

function warning(message, options) {
    alert({
        ...options,
        type: AlertType.Warning,
        message
    })
}

function info(message, options) {
    alert({
        ...options,
        type: AlertType.Info,
        message
    })
}

function success(message, options) {
    alert({
        ...options,
        type: AlertType.Success,
        message
    })
}

function alert(alert) {
    alert.sev = alert.sev || defaultSeverity
    alert.autoClose = (alert.autoClose === undefined ? true : alert.autoClose)
    alertSubject.next(alert)
}

function clear(sev = defaultSeverity) {
    alertSubject.next({ sev })
}