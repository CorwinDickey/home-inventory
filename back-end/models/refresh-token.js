const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account'
    },
    token: {
        type: String
    },
    expires: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    createdByIp: {
        type: String
    },
    revoked: {
        type: Date
    },
    revokedByIp: {
        type: String
    },
    replacedByToken: {
        type: String
    }
})

refreshTokenSchema.virtual('isExpired').get(() => {
    return Date.now() >= this.expires
})

refreshTokenSchema.virtual('isActive').get(() => {
    return !this.revoked && !this.isExpired
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
