const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    acceptTerms: {
        type: Boolean
    },
    role: {
        type: String,
        required: true
    },
    verificationToken: {
        type: String
    },
    verifiedDate: {
        type: Date
    },
    resetToken: {
        token: String,
        expires: Date
    },
    passwordReset: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

accountSchema.virtual('isVerified').get(() => {
    return !!(this.verified || this.passwordReset)
})

accountSchema.set('toJSON', {
    virtuals: true,
    versionaKey: false,
    transform: (doc, ret) => {
        delete ret._id
        delete ret.password
    }
})

module.exports = mongoose.model('Account', accountSchema)
