const config = require('../config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const mongoose = require('mongoose')

const sendEmail = require('../utils/send-email')
const Role = require('../utils/role')
const Account = require('../models/account')
const RefreshToken = require('../models/refresh-token')

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    register,
    verifyEmail,
    forgotPassword,
    validateResetToken,
    resetPassword,
    getById,
    createAccount,
    updateAccount,
    delete: _delete
}

async function authenticate({ email, password, ipAddress }) {
    const account = await Account.findOne({ email })

    if (!account || !account.isVerified || !bcrypt.compareSync(password, account.password)) {
        throw 'Email or password is incorrect'
    }

    const jwtToken = generateJwtToken(account)
    const refreshToken = generateRefreshToken(account, ipAddress)

    await refreshToken.save()

    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: refreshToken.token
    }
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token)
    const { account } = refreshToken

    const newRefreshToken = generateRefreshToken(account, ipAddress)
    refreshToken.revoked = Date.now()
    refreshToken.revokedByIp = ipAddress
    refreshToken.replacedByToken = newRefreshToken.token
    await refreshToken.save()
    await newRefreshToken.save()

    const jwtToken = generateJwtToken(account)

    return {
        ...basicDetails(account),
        jwtToken,
        refreshToken: newRefreshToken.token
    }
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token)

    refreshToken.revoked = Date.now()
    refreshToken.revokedByIp = ipAddress
    await refreshToken.save()
}

async function register(params, origin) {
    if (await Account.findOne({ email: params.email })) {
        return await sendAlreadyRegisteredEmail(params.email, origin)
    }

    const account = new Account(params)

    const isFirstAccount = (await Account.countDocuments({})) === 0
    account.role = isFirstAccount ? Role.Owner : Role.User
    account.verificationToken = randomTokenString()

    account.password = hash(params.password)

    await account.save()

    await sendVerificationEmail(account, origin)
}

async function verifyEmail({ token }) {
    const account = await Account.findOne({ verificationToken: token })

    if (!account) throw 'Verification failed'

    account.verified = Date.now()
    account.verificationToken = undefined
    await account.save()
}

async function forgotPassword({ email }, origin) {
    const account = await Account.findOne({ email })

    if (!account) {
        return
    }

    // reset token expires after 30 minutes
    account.resetToken = {
        token: randomTokenString(),
        expires: new Date(Date.now() + 30*60*1000)
    }

    await account.save()

    await sendPasswordResetEmail(account, origin)
}

async function validateResetToken({ token }) {
    const account = await Account.findOne({
        'resetToken.token': token,
        'resetToken.expires': { $gt: Date.now() }
    })

    if (!account) throw 'Invalid token 1'
}

async function resetPassword({ token, password }) {
    const account = await Account.findOne({
        'resetToken.token': token,
        'resetToken.expires': { $gt: Date.now() }
    })

    if (!account) throw 'Invalid token 2'

    account.password = hash(password)
    account.passwordReset = Date.now()
    account.resetToken = undefined
    await account.save()
}

async function getById(id) {
    const account = await getAccount(id)
    return basicDetails(account)
}

async function createAccount(params) {
    if (await Account.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already registered'
    }

    const account = new Account(params)
    account.verified = Date.now()

    account.password = hash(params.password)

    await account.save()

    return basicDetails(account)
}

async function updateAccount(id, params) {
    const account = await getAccount(id)

    if (params.email && account.email !== params.email && await Account.findOne({ email: params.email })) {
        throw 'Email "' + params.email + '" is already registered'
    }

    if (params.password) {
        params.password = hash(params.password)
    }

    Object.assign(account, params)
    account.update = Date.now()
    await account.save()

    return basicDetails(account)
}

async function _delete(id) {
    const account = await getAccount(id)
    await account.remove()
}

async function getAccount(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw 'Account not found'
    }

    const account = await Account.findById(id)

    if (!account) {
        throw 'Account not found'
    }

    return account
}

async function getRefreshToken(token) {
    // const refreshToken = await (await RefreshToken.findOne({ token }))
    const refreshToken = await RefreshToken.findOne({ token }).populate('account')
    console.log(token)

    if (!refreshToken || !refreshToken.isActive) {
        throw 'Invalid token 3'
    }

    return refreshToken
}

function hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function generateJwtToken(account) {
    return jwt.sign({ sub: account.id, id: account.id }, config.secret, { expiresIn: '15m'})
}

function generateRefreshToken(account, ipAddress) {
    return new RefreshToken({
        account: account.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    })
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex')
}

function basicDetails(account) {
    const {
        id,
        firstName,
        lastName,
        email,
        role,
        created,
        updated,
        isVerified
    } = account

    return {
        id,
        firstName,
        lastName,
        email,
        role,
        created,
        updated,
        isVerified
    }
}

async function sendVerificationEmail(account, origin) {
    let message
    if (origin) {
        const verifyUrl = `${origin}/account/verify-email?token=${account.verificationToken}`
        message = `<p>Please click the link below to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                   <p><code>${account.verificationToken}</code></p>`
    }

    await sendEmail({
        to: account.email,
        subject: 'Home-Inventory - Verify Email',
        html: `<h4>Verify Email</h4>
               <p>Thanks for registering!</p>
               ${message}`
    })
}

async function sendAlreadyRegisteredEmail(email, origin) {
    let message
    if (origin) {
        message = `<p>If you don't know your password please visit the <a href="${origin}/accounts/forgot-password">forgot password</a> page.</p>`
    } else{
        message = `<p>If you don't know your password you can reset it via the <code>/accounts/forgot-password</code> api route.</p>`
    }

    await sendEmail({
        to: email,
        subject: 'Home-Inventory - Email Already Registered',
        html: `<h4>Email Already Registered</h4>
               <p>Your email <strong>${email}</strong> is already registered.</p>
               ${message}`
    })
}

async function sendPasswordResetEmail(account, origin) {
    let message
    if (origin) {
        const resetUrl = `${origin}/account/reset-password?token=${account.resetToken.token}`
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <p><a href="${resetUrl}">${resetUrl}</a></p>` 
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`
    }

    await sendEmail({
        to: account.email,
        subject: 'Home-Inventory - Reset Password',
        html:`<h4>Reset Password Email</h4>
              ${message}`
    })
}