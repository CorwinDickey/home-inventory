const express = require('express')
const accounts = express.Router()
const Joi = require('joi')
const validateRequest = require('../middleware/validate-request')
const authorize = require('../middleware/authorize')
const Role = require('../utils/role')
const accountService = require('../services/account')

accounts.post('/authenticate', authenticateSchema, authenticate)
accounts.post('/refresh-token', refreshToken)
accounts.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken)
accounts.post('/register', registerSchema, register)
accounts.post('/verify-email', verifyEmailSchema, verifyEmail)
accounts.post('/forgot-password', forgotPasswordSchema, forgotPassword)
accounts.post('/validate-reset-token', validateResetTokenSchema, validateResetToken)
accounts.post('/reset-password', resetPasswordSchema, resetPassword)
accounts.get('/:id', authorize(), getById)
accounts.put('/:id', authorize(), updateSchema, updateAccount)
accounts.post('/', authorize(Role.Owner), createSchema, createAccount)
accounts.delete('/:id', authorize(), _delete)

module.exports = accounts

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    validateRequest(req, next, schema)
}

function authenticate(req, res, next) {
    const { email, password } = req.body
    const ipAddress = req.ip
    accountService.authenticate({ email, password, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken)
            res.json(account)
        })
        .catch(next)
}

function refreshToken(req, res, next) {
    const token = req.cookies.refreshToken
    const ipAddress = req.ip
    accountService.refreshToken({ token, ipAddress })
        .then(({ refreshToken, ...account }) => {
            setTokenCookie(res, refreshToken)
            res.json(account)
        })
        .catch(next)
}

function revokeTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().empty('')
    })
    validateRequest(req, next, schema)
}

function revokeToken(req, res, next) {
    const token = req.body.token || req.cookies.refreshToken
    const ipAddress = req.ip

    if (!token) {
        return res.status(400).json({ message: 'Token is required' })
    }

    if (!req.user.ownsToken(token) && req.user.role !== Role.Owner) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    accountService.revokeToken({ token, ipAddress })
        .then(() => res.json({ message: 'Token revoked' }))
        .catch(next)
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        acceptTerms: Joi.boolean().valid(true).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })
    validateRequest(req, next, schema)
}

function register(req, res, next) {
    accountService.register(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful, please check your email for verification instructions' }))
        .catch(next)
}

function verifyEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    })
    validateRequest(req, next, schema)
}

function verifyEmail(req, res, next) {
    accountService.verifyEmail(req.body)
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next)
}

function forgotPasswordSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    validateRequest(req, next, schema)
}

function forgotPassword(req, res, next) {
    accountService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next)
}

function validateResetTokenSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    })
    validateRequest(req, next, schema)
}

function validateResetToken(req, res, next) {
    accountService.validateResetToken(req.body)
        .then(() => res.json({ message: 'Token is valid' }))
        .catch(next)
}

function resetPasswordSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })
    validateRequest(req, next, schema)
}

function resetPassword(req, res, next) {
    accountService.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next)
}

function getById(req, res, next) {
    if (req.params.id !== req.user.id && req.user.role !== Role.Owner) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    accountService.getById(req.params.id)
        .then(account => account ? res.json(account) : res.sendStatus(404))
        .catch(next)
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        acceptTerms: Joi.boolean().valid(true).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string().valid(Role.Owner, Role.User).required()
    })
    validateRequest(req, next, schema)
}

function createAccount(req, res, next) {
    accountService.createAccount(req.body)
        .then(account => res.json(account))
        .catch(next)
}

function updateSchema(req, res, next) {
    const schemaRules = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        acceptTerms: Joi.boolean().valid(true).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })

    if (req.user.role === Role.Owner) {
        schemaRules.role = Joi.string().valid(Role.Owner, Role.User).empty('')
    }

    const schema = Joi.object(schemaRules).with('password', 'confirmPassword')
    validateRequest(req, next, schema)
}

function updateAccount(req, res, next) {
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    accountService.updateAccount(req.params.id, req.body)
        .then(account => res.json(account))
        .catch(next)
}

function _delete(req, res, next) {
    if (req.params.id !== req.user.id && req.user.role !== Role.Owner) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    accountService.delete(req.params.id)
        .then(() => res.json({ message: 'Account deleted successfully' }))
        .catch(next)
}

function setTokenCookie(res, token) {
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    }
    res.cookie('refreshToken', token, cookieOptions)
}
