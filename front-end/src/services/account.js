import { BehaviorSubject } from 'rxjs'

import { fetchWrapper } from '../utils/fetch-wrapper'

const userSubject = new BehaviorSubject(null)

export const accountService = {
    login,
    logout,
    refreshToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getById,
    createAccount,
    updateAccount,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
}

const baseUrl = '/accounts'

function login(email, password) {
    return fetchWrapper.post(baseUrl + '/authenticate', { email, password })
        .then(user => {
            userSubject.next(user)
            startRefreshTokenTimer()
            return user
        })
}

function logout() {
    fetchWrapper.post(baseUrl + '/revoke-token', {})
    stopRefreshTokenTimer()
    userSubject.next(null)
    // history.push('/')
}

function refreshToken() {
    return fetchWrapper.post(baseUrl + '/refresh-token', {})
        .then(user => {
            userSubject.next(user)
            startRefreshTokenTimer()
            return user
        })
}

function register(params) {
    return fetchWrapper.post(baseUrl + '/register', params)
}

function verifyEmail(token) {
    return fetchWrapper.post(baseUrl + '/verify-email', { token })
}

function forgotPassword(email) {
    return fetchWrapper.post(baseUrl + '/forgot-password', { email })
}

function validateResetToken(token) {
    return fetchWrapper.post(baseUrl + '/validate-reset-token', { token })
}

function resetPassword({ token, password, confirmPassword }) {
    return fetchWrapper.post(baseUrl + '/reset-password', { token, password, confirmPassword })
}

function getById(id) {
    return fetchWrapper.get(baseUrl + '/' + id)
}

function createAccount(params) {
    return fetchWrapper.post(baseUrl, params)
}

function updateAccount(id, params) {
    return fetchWrapper.put(baseUrl + '/' + id, params)
        .then(user => {
            if (user.id === userSubject.value.id) {
                user = {
                    ...userSubject.value,
                    ...user
                }
                userSubject.next(user)
            }
            return user
        })
}

function _delete(id) {
    return fetchWrapper.delete(baseUrl + '/' + id)
        .then(x => {
            if (id === userSubject.value.id) {
                logout()
            }
            return x
        })
}

// helper functions

let refreshTokenTimeout

function startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]))

    const expires = new Date(jwtToken.exp * 1000)
    const timeout = expires.getTime() - Date.now() - (60 * 1000)
    refreshTokenTimeout = setTimeout(refreshToken, timeout)
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout)
}