const jwt = require('express-jwt')
const Account = require('../models/account')
const RefreshToken = require('../models/refresh-token')

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles]
    }

    const secret = process.env.SECRET

    return [
        jwt({ secret, algorithms: ['HS256'] }),

        async (req, res, next) => {
            const account = await Account.findById(req.user.id)
            const refreshTokens = await RefreshToken.find({ account: account.id })

            if (!account || (roles.length && !roles.includes(account.role))) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            req.user.role = account.role
            req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token)
            next()
        }
    ]
}

module.exports = authorize
