import { BehaviorSubject } from 'rxjs'
import axios from 'axios'

import { history } from '../utils/history'

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

const route = '/accounts'

function login(email, password) {
    return axios.post(route + '/authenticate', { email, password })
        .then(user => {
            userSubject.next(user)
            startRefreshTokenTimer()
            return user
        })
}

function logout() {
    axios.post(route + '/revoke-token', {})
    stopRefreshTokenTimer()
    userSubject.next(null)
    history.push(route + '/login')
}

function refreshToken() {
    return axios.post(route + '/refresh-token', {})
        .then(user => {
            userSubject.next(user)
            startRefreshTokenTimer()
            return user
        })
}

function register(params) {
    return axios.post(route + '/register', params)
}

function verifyEmail(token) {
    return axios.post(route + '/verify-email', { token })
}

function forgotPassword(email) {
    return axios.post(route + '/forgot-password', { email })
}

function validateResetToken(token) {
    return axios.post(route + '/validate-reset-token', { token })
}

function resetPassword({ token, password, confirmPassword }) {
    return axios.post(route + '/reset-password', { token, password, confirmPassword })
}

function getById(id) {
    return axios.get(route + '/' + id)
}

function createAccount(params) {
    return axios.post(route, params)
}

function updateAccount(id, params) {
    return axios.put(route + '/' + id, params)
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
    return axios.delete(route + '/' + id)
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